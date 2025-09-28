# SimplifiedNoForma API Documentation

This Flask API provides endpoints to interact with your SimplifiedNoForma smart contract deployed on the blockchain.

## Setup Instructions

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set environment variables (or update via `/config` endpoint):
```bash
export WEB3_PROVIDER_URL=http://localhost:8545  # Your blockchain RPC URL
export CONTRACT_ADDRESS=0x...                  # Your deployed contract address
export PRIVATE_KEY=0x...                      # Private key for signing transactions
export FROM_ADDRESS=0x...                     # Address corresponding to the private key
```

3. Run the server:
```bash
python app.py
```

The server will run on `http://localhost:5000`

## Configuration Endpoints

### POST /config
Update contract configuration dynamically.

**Request Body:**
```json
{
  "contract_address": "0x...",
  "private_key": "0x...",
  "from_address": "0x...",
  "contract_abi": [...] // Your contract ABI array
}
```

### GET /
Health check endpoint.

### GET /contract-info
Get contract information and connection status.

## Knowledge Base Endpoints

### POST /knowledge-base
Create a new knowledge base entry.

**Request Body:**
```json
{
  "title": "How to use the API",
  "group": "Documentation", 
  "content": "Step-by-step guide..."
}
```

**Response:**
```json
{
  "success": true,
  "transaction_hash": "0x...",
  "block_number": 12345,
  "gas_used": 150000
}
```

### GET /knowledge-base/{id}
Get a specific knowledge base entry.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1640995200,
    "title": "How to use the API",
    "group": "Documentation",
    "content": "Step-by-step guide..."
  }
}
```

### PUT /knowledge-base/{id}
Update an existing knowledge base entry.

**Request Body:** Same as POST

### DELETE /knowledge-base/{id}
Delete a knowledge base entry.

### GET /knowledge-base
Get all knowledge base entries.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1640995200,
      "title": "How to use the API",
      "group": "Documentation",
      "content": "Step-by-step guide..."
    }
  ]
}
```

### GET /knowledge-base/ids
Get all knowledge base entry IDs.

## Customer Endpoints

### POST /customers
Create a new customer.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

### GET /customers/{id}
Get a specific customer.

### PUT /customers/{id}
Update an existing customer.

### DELETE /customers/{id}
Delete a customer.

### GET /customers
Get all customers.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1640995200,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    }
  ]
}
```

### GET /customers/ids
Get all customer IDs.

## Project Endpoints

### POST /projects
Create a new project.

**Request Body:**
```json
{
  "name": "Website Redesign",
  "customer": "John Doe",
  "status": "In Progress",
  "details": "Redesigning company website with modern UI"
}
```

### GET /projects/{id}
Get a specific project.

### PUT /projects/{id}
Update an existing project.

### DELETE /projects/{id}
Delete a project.

### GET /projects
Get all projects with customer information.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1640995200,
      "name": "Website Redesign",
      "customer": "John Doe",
      "status": "In Progress",
      "details": "Redesigning company website with modern UI"
    }
  ]
}
```

### GET /projects/ids
Get all project IDs.

## Utility Endpoints

### GET /counts
Get total counts of all entities.

**Response:**
```json
{
  "success": true,
  "data": {
    "knowledge_base_count": 5,
    "customer_count": 3,
    "project_count": 8
  }
}
```

## Error Handling

All endpoints return errors in the following format:
```json
{
  "success": false,
  "error": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (validation errors)
- `500` - Internal Server Error

## Transaction vs Call Operations

- **Transactions** (POST, PUT, DELETE): Write to blockchain, cost gas, return transaction hash
- **Calls** (GET): Read from blockchain, free, return data immediately

## Important Notes

1. **Gas Costs**: All write operations (POST, PUT, DELETE) require gas fees
2. **Transaction Confirmation**: Write operations wait for blockchain confirmation
3. **IDs**: All entities use timestamp-based IDs (Unix timestamp)
4. **Validation**: Required fields are validated both in API and smart contract
5. **CORS**: Cross-origin requests are enabled for frontend integration

## Example Usage with curl

```bash
# Create a customer
curl -X POST http://localhost:5000/customers \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Smith", "email": "alice@example.com", "phone": "123-456-7890"}'

# Get all customers  
curl http://localhost:5000/customers

# Update contract configuration
curl -X POST http://localhost:5000/config \
  -H "Content-Type: application/json" \
  -d '{"contract_address": "0x...", "private_key": "0x...", "from_address": "0x..."}'
```