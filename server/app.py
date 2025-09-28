from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from web3 import Web3
import os
import json
import requests
from typing import Dict, Any
import logging
from abi import contract_abi
# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
class Config:
    # Provider URLs - try multiple options
    PROVIDER_URLS = [
        os.getenv('WEB3_PROVIDER_URL', 'http://localhost:8545'),
        'https://eth-sepolia.g.alchemy.com/v2/demo',  # Sepolia testnet
        'https://eth-goerli.g.alchemy.com/v2/demo',   # Goerli testnet (if needed)
        'https://rpc.ankr.com/eth_sepolia',           # Alternative Sepolia
    ]
    WEB3_PROVIDER_URL = os.getenv('WEB3_PROVIDER_URL', 'http://localhost:8545')
    CONTRACT_ADDRESS = os.getenv('CONTRACT_ADDRESS', '')
    PRIVATE_KEY = os.getenv('PRIVATE_KEY', '')
    FROM_ADDRESS = os.getenv('FROM_ADDRESS', '')
    
    # Network settings
    DEFAULT_GAS_LIMIT = 300000
    GAS_PRICE_MULTIPLIER = 1.1

# Initialize Web3 with fallback providers
def create_web3_instance():
    """Create Web3 instance with fallback providers"""
    for provider_url in Config.PROVIDER_URLS:
        try:
            w3 = Web3(Web3.HTTPProvider(provider_url))
            if w3.is_connected():
                logger.info(f"Successfully connected to Web3 provider: {provider_url}")
                return w3, provider_url
            else:
                logger.warning(f"Failed to connect to provider: {provider_url}")
        except Exception as e:
            logger.warning(f"Error connecting to {provider_url}: {str(e)}")
    
    # Fallback to the original URL even if connection fails
    logger.error("All provider connections failed. Using original URL with no connection.")
    return Web3(Web3.HTTPProvider(Config.WEB3_PROVIDER_URL)), Config.WEB3_PROVIDER_URL

w3, active_provider = create_web3_instance()

# Contract ABI - This should match your deployed contract
CONTRACT_ABI = contract_abi

# Global variables
contract = None

def init_contract():
    """Initialize the contract instance"""
    global contract
    try:
        if Config.CONTRACT_ADDRESS and CONTRACT_ABI:
            contract = w3.eth.contract(
                address=Config.CONTRACT_ADDRESS,
                abi=CONTRACT_ABI
            )
            logger.info(f"Contract initialized at address: {Config.CONTRACT_ADDRESS}")
        else:
            logger.warning("Contract address or ABI not configured")
    except Exception as e:
        logger.error(f"Failed to initialize contract: {str(e)}")

def handle_transaction(tx_function, *args, **kwargs):
    """Handle contract transactions with proper error handling"""
    try:
        if not contract:
            return {"success": False, "error": "Contract not initialized"}
        
        # Build transaction
        tx = tx_function(*args, **kwargs)
        
        # Estimate gas
        gas_estimate = w3.eth.estimate_gas(tx.build_transaction({
            'from': Config.FROM_ADDRESS,
            'nonce': w3.eth.get_transaction_count(Config.FROM_ADDRESS),
        }))
        
        # Build and sign transaction
        tx_dict = tx.build_transaction({
            'from': Config.FROM_ADDRESS,
            'nonce': w3.eth.get_transaction_count(Config.FROM_ADDRESS),
            'gas': gas_estimate,
            'gasPrice': w3.eth.gas_price,
        })
        
        signed_tx = w3.eth.account.sign_transaction(tx_dict, Config.PRIVATE_KEY)
        
        # Send transaction
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        
        # Wait for confirmation
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        
        return {
            "success": True,
            "transaction_hash": receipt.transactionHash.hex(),
            "block_number": receipt.blockNumber,
            "gas_used": receipt.gasUsed
        }
        
    except Exception as e:
        logger.error(f"Transaction failed: {str(e)}")
        return {"success": False, "error": str(e)}

def handle_call(call_function, *args):
    """Handle contract calls with proper error handling"""
    try:
        if not contract:
            return {"success": False, "error": "Contract not initialized"}
        
        result = call_function(*args).call()
        return {"success": True, "data": result}
        
    except Exception as e:
        logger.error(f"Call failed: {str(e)}")
        return {"success": False, "error": str(e)}

@app.route('/', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        is_connected = w3.is_connected()
        network_info = {}
        
        if is_connected:
            try:
                network_info = {
                    "network_id": w3.net.version,
                    "latest_block": w3.eth.block_number,
                    "gas_price": w3.eth.gas_price,
                    "chain_id": w3.eth.chain_id
                }
            except Exception as e:
                network_info = {"error": f"Failed to get network info: {str(e)}"}
        
        return jsonify({
            "status": "healthy",
            "web3_connected": is_connected,
            "active_provider": active_provider,
            "contract_initialized": contract is not None,
            "contract_address": Config.CONTRACT_ADDRESS,
            "network_info": network_info
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e),
            "web3_connected": False,
            "contract_initialized": False
        }), 500

@app.route('/config', methods=['POST'])
def update_config():
    """Update contract configuration"""
    try:
        data = request.get_json()
        
        if 'contract_address' in data:
            Config.CONTRACT_ADDRESS = data['contract_address']
        if 'private_key' in data:
            Config.PRIVATE_KEY = data['private_key']
        if 'from_address' in data:
            Config.FROM_ADDRESS = data['from_address']
        if 'contract_abi' in data:
            global CONTRACT_ABI
            CONTRACT_ABI = data['contract_abi']
        
        init_contract()
        
        return jsonify({"success": True, "message": "Configuration updated"})
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

# Knowledge Base Endpoints

@app.route('/knowledge-base', methods=['POST'])
def create_knowledge_base():
    """Create a new knowledge base entry"""
    try:
        data = request.get_json()
        title = data.get('title', '')
        group = data.get('group', '')
        content = data.get('content', '')
        
        if not title or not content:
            return jsonify({"success": False, "error": "Title and content are required"}), 400
        
        result = handle_transaction(
            contract.functions.createKnowledgeBase,
            title, group, content
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/knowledge-base/<int:kb_id>', methods=['PUT'])
def update_knowledge_base(kb_id):
    """Update an existing knowledge base entry"""
    try:
        data = request.get_json()
        title = data.get('title', '')
        group = data.get('group', '')
        content = data.get('content', '')
        
        if not title or not content:
            return jsonify({"success": False, "error": "Title and content are required"}), 400
        
        result = handle_transaction(
            contract.functions.updateKnowledgeBase,
            kb_id, title, group, content
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/knowledge-base/<int:kb_id>', methods=['DELETE'])
def delete_knowledge_base(kb_id):
    """Delete a knowledge base entry"""
    try:
        result = handle_transaction(
            contract.functions.deleteKnowledgeBase,
            kb_id
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/knowledge-base/<int:kb_id>', methods=['GET'])
def get_knowledge_base(kb_id):
    """Get a knowledge base entry by ID"""
    try:
        result = handle_call(contract.functions.getKnowledgeBase, kb_id)
        
        if result["success"]:
            # Convert the tuple result to a structured response
            data = result["data"]
            result["data"] = {
                "id": data[0],
                "title": data[1],
                "group": data[2],
                "content": data[3]
            }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/knowledge-base', methods=['GET'])
def get_all_knowledge_base():
    """Get all knowledge base entries"""
    try:
        result = handle_call(contract.functions.getAllKnowledgeBase)
        
        if result["success"]:
            # Convert the tuple result to a structured response
            data = result["data"]
            knowledge_bases = []
            
            for i in range(len(data[0])):
                knowledge_bases.append({
                    "id": data[0][i],
                    "title": data[1][i],
                    "group": data[2][i],
                    "content": data[3][i]
                })
            
            result["data"] = knowledge_bases
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/knowledge-base/ids', methods=['GET'])
def get_all_knowledge_base_ids():
    """Get all knowledge base IDs"""
    try:
        result = handle_call(contract.functions.getAllKnowledgeBaseIds)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# Customer Endpoints

@app.route('/customers', methods=['POST'])
def create_customer():
    """Create a new customer"""
    try:
        data = request.get_json()
        name = data.get('name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        
        if not name or not email:
            return jsonify({"success": False, "error": "Name and email are required"}), 400
        
        result = handle_transaction(
            contract.functions.createCustomer,
            name, email, phone
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/customers/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    """Update an existing customer"""
    try:
        data = request.get_json()
        name = data.get('name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        
        if not name or not email:
            return jsonify({"success": False, "error": "Name and email are required"}), 400
        
        result = handle_transaction(
            contract.functions.updateCustomer,
            customer_id, name, email, phone
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/customers/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    """Delete a customer"""
    try:
        result = handle_transaction(
            contract.functions.deleteCustomer,
            customer_id
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/customers/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    """Get a customer by ID"""
    try:
        result = handle_call(contract.functions.getCustomer, customer_id)
        
        if result["success"]:
            # Convert the tuple result to a structured response
            data = result["data"]
            result["data"] = {
                "id": data[0],
                "name": data[1],
                "email": data[2],
                "phone": data[3]
            }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/customers', methods=['GET'])
def get_all_customers():
    """Get all customers"""
    try:
        result = handle_call(contract.functions.getAllCustomers)
        
        if result["success"]:
            # Convert the tuple result to a structured response
            data = result["data"]
            customers = []
            
            for i in range(len(data[0])):
                customers.append({
                    "id": data[0][i],
                    "name": data[1][i],
                    "email": data[2][i],
                    "phone": data[3][i]
                })
            
            result["data"] = customers
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/customers/ids', methods=['GET'])
def get_all_customer_ids():
    """Get all customer IDs"""
    try:
        result = handle_call(contract.functions.getAllCustomerIds)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# Project Endpoints

@app.route('/projects', methods=['POST'])
def create_project():
    """Create a new project"""
    try:
        data = request.get_json()
        name = data.get('name', '')
        customer = data.get('customer', '')
        status = data.get('status', '')
        details = data.get('details', '')
        
        if not name or not customer:
            return jsonify({"success": False, "error": "Name and customer are required"}), 400
        
        result = handle_transaction(
            contract.functions.createProject,
            name, customer, status, details
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/projects/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    """Update an existing project"""
    try:
        data = request.get_json()
        name = data.get('name', '')
        customer = data.get('customer', '')
        status = data.get('status', '')
        details = data.get('details', '')
        
        if not name or not customer:
            return jsonify({"success": False, "error": "Name and customer are required"}), 400
        
        result = handle_transaction(
            contract.functions.updateProject,
            project_id, name, customer, status, details
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    """Delete a project"""
    try:
        result = handle_transaction(
            contract.functions.deleteProject,
            project_id
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    """Get a project by ID"""
    try:
        result = handle_call(contract.functions.getProject, project_id)
        
        if result["success"]:
            # Convert the tuple result to a structured response
            data = result["data"]
            result["data"] = {
                "id": data[0],
                "name": data[1],
                "customer": data[2],
                "status": data[3],
                "details": data[4]
            }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/projects', methods=['GET'])
def get_all_projects_with_customer_info():
    """Get all projects with customer information"""
    try:
        result = handle_call(contract.functions.getAllProjectsWithCustomerInformation)
        
        if result["success"]:
            # Convert the tuple result to a structured response
            data = result["data"]
            projects = []
            
            for i in range(len(data[0])):
                projects.append({
                    "id": data[0][i],
                    "name": data[1][i],
                    "customer": data[2][i],
                    "status": data[3][i],
                    "details": data[4][i]
                })
            
            result["data"] = projects
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/projects/ids', methods=['GET'])
def get_all_project_ids():
    """Get all project IDs"""
    try:
        result = handle_call(contract.functions.getAllProjectIds)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# Utility Endpoints

@app.route('/counts', methods=['GET'])
def get_counts():
    """Get total counts of all entities"""
    try:
        result = handle_call(contract.functions.getCounts)
        
        if result["success"]:
            # Convert the tuple result to a structured response
            data = result["data"]
            result["data"] = {
                "knowledge_base_count": data[0],
                "customer_count": data[1],
                "project_count": data[2]
            }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/contract-info', methods=['GET'])
def get_contract_info():
    """Get contract information and status"""
    return jsonify({
        "success": True,
        "data": {
            "contract_address": Config.CONTRACT_ADDRESS,
            "from_address": Config.FROM_ADDRESS,
            "web3_connected": w3.is_connected(),
            "contract_initialized": contract is not None,
            "network_id": w3.net.version if w3.is_connected() else None,
            "latest_block": w3.eth.block_number if w3.is_connected() else None
        }
    })

# Cal.com Scheduling Endpoints

@app.route("/free-slots", methods=['GET', 'OPTIONS'])
def get_free_slots():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        flask_response = make_response()
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
        return flask_response
    
    # Check if Cal.com API key is configured
    cal_api_key = os.getenv("CAL_API_KEY", "")
    if not cal_api_key:
        flask_response = make_response(jsonify({
            "error": "CAL_API_KEY environment variable not set. Please configure your Cal.com API key.",
            "setup_info": "Get your API key from https://app.cal.com/settings/developer/api-keys"
        }))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
        return flask_response, 400
        
    url = "https://api.cal.com/v2/schedules"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {cal_api_key}",
        "cal-api-version": "2024-06-11"
    }
    
    try:
        logger.info(f"Making request to Cal.com API: {url}")
        logger.info(f"Using API key: {'*' * (len(cal_api_key) - 4)}{cal_api_key[-4:] if len(cal_api_key) > 4 else 'SHORT_KEY'}")
        
        cal_response = requests.get(url, headers=headers)
        logger.info(f"Cal.com API response status: {cal_response.status_code}")
        
        if cal_response.status_code == 401:
            flask_response = make_response(jsonify({
                "error": "Unauthorized: Invalid Cal.com API key",
                "status_code": 401,
                "setup_info": "Please check your CAL_API_KEY environment variable. Get a valid key from https://app.cal.com/settings/developer/api-keys"
            }))
            flask_response.headers.add("Access-Control-Allow-Origin", "*")
            flask_response.headers.add("Access-Control-Allow-Headers", "*")
            flask_response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
            return flask_response, 401
        
        cal_response.raise_for_status()
        
        data = cal_response.json()
        logger.info(f"Successfully fetched schedules: {len(data.get('data', []))} items")
        
        # fetch existing bookings
        bookings_url = "https://api.cal.com/v2/bookings"
        bookings_response = requests.get(bookings_url, headers=headers)
        
        if bookings_response.status_code == 200:
            bookings_data = bookings_response.json()
            logger.info(f"Successfully fetched bookings: {len(bookings_data.get('data', {}).get('bookings', []))} items")
            
            # Safely process bookings
            if 'data' in bookings_data and 'bookings' in bookings_data['data']:
                for booking in bookings_data['data']['bookings']:
                    # append unavailable slots to the data
                    start = booking.get('startTime')
                    end = booking.get('endTime')
                    if start and end:
                        # Ensure data structure exists
                        if 'data' not in data:
                            data['data'] = []
                        # Append unavailable slots to the data
                        data["data"].append({
                            "start": start,
                            "end": end,
                            "type": "unavailable"
                        })
            
            # Create response with proper CORS headers
            flask_response = make_response(jsonify(data))
            flask_response.headers.add("Access-Control-Allow-Origin", "*")
            flask_response.headers.add("Access-Control-Allow-Headers", "*")
            flask_response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
            return flask_response
        else:
            logger.warning(f"Failed to fetch bookings: {bookings_response.status_code}")
            flask_response = make_response(jsonify({
                "error": f"Failed to fetch bookings, status code: {bookings_response.status_code}",
                "schedules_data": data  # Still return schedule data even if bookings fail
            }))
            flask_response.headers.add("Access-Control-Allow-Origin", "*")
            flask_response.headers.add("Access-Control-Allow-Headers", "*")
            flask_response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
            return flask_response, 200  # Return 200 since schedules worked
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Cal.com API Error: {e}")
        flask_response = make_response(jsonify({
            "error": "Failed to fetch data from Cal.com API",
            "details": str(e),
            "api_key_configured": bool(cal_api_key)
        }))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
        return flask_response, 500
    except json.JSONDecodeError:
        flask_response = make_response(jsonify({
            "error": "Failed to parse response from Cal.com"
        }))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
        return flask_response, 500
    
@app.route("/new-schedule", methods=['POST', 'OPTIONS'])
def create_new_schedule():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        flask_response = make_response()
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return flask_response
    
    # Check if Cal.com API key is configured
    cal_api_key = os.getenv("CAL_API_KEY", "")
    if not cal_api_key:
        flask_response = make_response(jsonify({
            "error": "CAL_API_KEY environment variable not set. Please configure your Cal.com API key.",
            "setup_info": "Get your API key from https://app.cal.com/settings/developer/api-keys"
        }))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return flask_response, 400
    
    # Check if request has JSON data
    if not request.is_json:
        flask_response = make_response(jsonify({
            "error": "Request must be JSON with Content-Type: application/json"
        }))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return flask_response, 400
    
    # Check if JSON data exists
    if not request.json:
        flask_response = make_response(jsonify({
            "error": "No JSON data provided"
        }))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return flask_response, 400
        
    # validate required fields
    required_fields = ["name", "email", "phone", "start"]
    for field in required_fields:
        if field not in request.json:
            flask_response = make_response(jsonify({
                "error": f"Missing required field: {field}"
            }))
            flask_response.headers.add("Access-Control-Allow-Origin", "*")
            flask_response.headers.add("Access-Control-Allow-Headers", "*")
            flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
            return flask_response, 400
    
    # Prepare the payload for booking
    url = "https://api.cal.com/v2/bookings"
    
    payload = {
        "start": request.json.get("start"),
        "attendee": {
            "name": request.json.get("name"),
            "email": request.json.get("email"),
            "phoneNumber": request.json.get("phone"),
            "language": "en",
            "timeZone": "Asia/Kolkata",  # Adjust timezone as needed
        },
        "eventTypeId": int(os.getenv("CAL_EVENT_ID", "2698509")),
    }
    
    headers = {
        "Content-Type": "application/json",
        "cal-api-version": "2024-08-13",
        "Authorization": f"Bearer {cal_api_key}",
    }
    
    try:
        logger.info(f"Creating booking for {payload['attendee']['name']} at {payload['start']}")
        booking_response = requests.post(url, json=payload, headers=headers)
        logger.info(f"Booking API response status: {booking_response.status_code}")
        
        if booking_response.status_code == 201:
            booking_data = booking_response.json()
            logger.info("Booking created successfully")
            # Create response with proper CORS headers
            flask_response = make_response(jsonify(booking_data))
            flask_response.headers.add("Access-Control-Allow-Origin", "*")
            flask_response.headers.add("Access-Control-Allow-Headers", "*")
            flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
            return flask_response, 201
        else:
            logger.error(f"Cal.com API Error: {booking_response.status_code} - {booking_response.text}")
            flask_response = make_response(jsonify({
                "error": f"Failed to create booking, status code: {booking_response.status_code}",
                "message": booking_response.text,
                "payload_sent": payload
            }))
            flask_response.headers.add("Access-Control-Allow-Origin", "*")
            flask_response.headers.add("Access-Control-Allow-Headers", "*")
            flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
            return flask_response, booking_response.status_code
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Request failed: {e}")
        flask_response = make_response(jsonify({
            "error": "Failed to connect to Cal.com API",
            "details": str(e)
        }))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return flask_response, 500

# Initialize contract on startup
init_contract()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)