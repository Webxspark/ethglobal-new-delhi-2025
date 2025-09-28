#!/usr/bin/env python3
"""
Setup script for SimplifiedNoForma API
Helps configure the API for different blockchain networks
"""

import os
import json
from web3 import Web3

def setup_local_development():
    """Setup for local development with Ganache/Hardhat"""
    print("🔧 Setting up for local development...")
    
    # Default local settings
    config = {
        "WEB3_PROVIDER_URL": "http://localhost:8545",
        "CONTRACT_ADDRESS": "",  # You'll need to deploy first
        "PRIVATE_KEY": "",       # Your local test private key
        "FROM_ADDRESS": ""       # Your local test address
    }
    
    print("📋 Local Development Configuration:")
    print("1. Start your local blockchain (Ganache/Hardhat):")
    print("   - Ganache: ganache-cli or Ganache GUI")
    print("   - Hardhat: npx hardhat node")
    print("")
    print("2. Deploy your contract to get CONTRACT_ADDRESS")
    print("3. Set environment variables:")
    
    for key, value in config.items():
        print(f"   export {key}='{value}'")
    
    return config

def setup_sepolia_testnet():
    """Setup for Sepolia testnet"""
    print("🌐 Setting up for Sepolia testnet...")
    
    config = {
        "WEB3_PROVIDER_URL": "https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY",
        "CONTRACT_ADDRESS": "",  # Your deployed contract address
        "PRIVATE_KEY": "",       # Your testnet private key (keep secure!)
        "FROM_ADDRESS": ""       # Your testnet address
    }
    
    print("📋 Sepolia Testnet Configuration:")
    print("1. Get Sepolia ETH from faucet: https://sepoliafaucet.com/")
    print("2. Create Alchemy account and get API key: https://www.alchemy.com/")
    print("3. Deploy your contract to Sepolia")
    print("4. Set environment variables:")
    
    for key, value in config.items():
        if "API_KEY" in value:
            print(f"   export {key}='{value}' # Replace YOUR_API_KEY with actual key")
        else:
            print(f"   export {key}='{value}'")
    
    return config

def check_web3_connection(provider_url):
    """Check if Web3 can connect to the provider"""
    try:
        w3 = Web3(Web3.HTTPProvider(provider_url))
        if w3.is_connected():
            print(f"✅ Successfully connected to {provider_url}")
            try:
                print(f"   Network ID: {w3.net.version}")
                print(f"   Latest Block: {w3.eth.block_number}")
                print(f"   Chain ID: {w3.eth.chain_id}")
            except Exception as e:
                print(f"   ⚠️  Connected but unable to get network info: {e}")
            return True
        else:
            print(f"❌ Failed to connect to {provider_url}")
            return False
    except Exception as e:
        print(f"❌ Error connecting to {provider_url}: {e}")
        return False

def validate_setup():
    """Validate current environment setup"""
    print("🔍 Validating current setup...")
    
    required_vars = ["WEB3_PROVIDER_URL", "CONTRACT_ADDRESS", "PRIVATE_KEY", "FROM_ADDRESS"]
    missing_vars = []
    
    for var in required_vars:
        value = os.getenv(var)
        if not value:
            missing_vars.append(var)
        else:
            if var == "PRIVATE_KEY":
                print(f"   {var}: {'*' * len(value)} (hidden)")
            else:
                print(f"   {var}: {value}")
    
    if missing_vars:
        print(f"❌ Missing environment variables: {', '.join(missing_vars)}")
        return False
    
    # Check Web3 connection
    provider_url = os.getenv("WEB3_PROVIDER_URL")
    if not check_web3_connection(provider_url):
        return False
    
    print("✅ Setup validation completed successfully!")
    return True

def create_env_file(config):
    """Create a .env file with the configuration"""
    env_content = ""
    for key, value in config.items():
        env_content += f"{key}={value}\n"
    
    with open(".env", "w") as f:
        f.write(env_content)
    
    print("📄 Created .env file. Edit it with your actual values.")
    print("⚠️  Don't commit .env file to git (add it to .gitignore)")

def main():
    print("🚀 SimplifiedNoForma API Setup")
    print("=" * 50)
    
    print("\nChoose your setup option:")
    print("1. Local Development (Ganache/Hardhat)")
    print("2. Sepolia Testnet")
    print("3. Validate Current Setup")
    print("4. Test Web3 Connection")
    
    choice = input("\nEnter your choice (1-4): ").strip()
    
    if choice == "1":
        config = setup_local_development()
        create_env = input("\nCreate .env file? (y/n): ").lower().startswith('y')
        if create_env:
            create_env_file(config)
    
    elif choice == "2":
        config = setup_sepolia_testnet()
        create_env = input("\nCreate .env file? (y/n): ").lower().startswith('y')
        if create_env:
            create_env_file(config)
    
    elif choice == "3":
        validate_setup()
    
    elif choice == "4":
        provider_url = input("Enter provider URL to test: ").strip()
        if provider_url:
            check_web3_connection(provider_url)
        else:
            print("❌ No provider URL provided")
    
    else:
        print("❌ Invalid choice")
    
    print("\n" + "=" * 50)
    print("Next steps:")
    print("1. Set your environment variables")
    print("2. Deploy your contract (if not done)")
    print("3. Run: python app.py")
    print("4. Test with: curl http://localhost:5000/")

if __name__ == "__main__":
    main()