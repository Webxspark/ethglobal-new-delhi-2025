# Quick Configuration for SimplifiedNoForma API

## The Error You're Seeing

The error `Connection refused` on `localhost:8545` means:
1. **No local blockchain is running** (most common)
2. **Wrong port** - your blockchain might be on a different port
3. **Wrong network configuration**

## Quick Solutions

### Option 1: Use a Public Testnet (Recommended for testing)
```bash
# Set these environment variables
export WEB3_PROVIDER_URL="https://eth-sepolia.g.alchemy.com/v2/demo"
export CONTRACT_ADDRESS="YOUR_CONTRACT_ADDRESS_HERE"
export PRIVATE_KEY="YOUR_PRIVATE_KEY_HERE" 
export FROM_ADDRESS="YOUR_WALLET_ADDRESS_HERE"

# Then run
python app.py
```

### Option 2: Start Local Blockchain

**With Hardhat:**
```bash
# In your contracts directory
npx hardhat node
# This starts a blockchain on localhost:8545
```

**With Ganache:**
```bash
# Install globally
npm install -g ganache-cli

# Start ganache
ganache-cli
# This starts a blockchain on localhost:8545
```

### Option 3: Use Anvil (from Foundry)
```bash
# Install foundry first: https://book.getfoundry.sh/getting-started/installation
anvil
# This starts a blockchain on localhost:8545
```

## Test Your Connection

Run the setup script:
```bash
python setup.py
```

Or test manually:
```bash
# Test the health endpoint
curl http://localhost:5000/

# Should return something like:
# {
#   "status": "healthy",
#   "web3_connected": true,
#   "active_provider": "http://localhost:8545",
#   "contract_initialized": false
# }
```

## Deploy Your Contract

If you haven't deployed your contract yet:

**With Hardhat:**
```bash
# In your contracts directory
npx hardhat run scripts/deploy.js --network localhost
```

**With Foundry:**
```bash
# Compile
forge build

# Deploy (replace with your actual deployment script)
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast
```

## Set Contract Address

After deploying, set the contract address:
```bash
export CONTRACT_ADDRESS="0x..." # Your deployed contract address
```

Or update via API:
```bash
curl -X POST http://localhost:5000/config \
  -H "Content-Type: application/json" \
  -d '{
    "contract_address": "0x...",
    "private_key": "0x...",
    "from_address": "0x..."
  }'
```

## Common Issues & Solutions

1. **"Contract not initialized"**
   - Set CONTRACT_ADDRESS environment variable
   - Ensure contract is deployed

2. **"Insufficient funds for gas"**
   - Make sure your wallet has ETH
   - For testnets, get funds from faucets

3. **"Invalid private key"**
   - Ensure private key starts with 0x
   - Make sure it matches FROM_ADDRESS

4. **"Network mismatch"**
   - Check if contract is deployed on the network you're connecting to
   - Verify chain ID matches

## Environment Variables Template

Create a `.env` file:
```
WEB3_PROVIDER_URL=http://localhost:8545
CONTRACT_ADDRESS=0x...
PRIVATE_KEY=0x...
FROM_ADDRESS=0x...
```

## Next Steps

1. Choose your blockchain setup (local or testnet)
2. Deploy your contract
3. Set environment variables
4. Test with `curl http://localhost:5000/`
5. Try creating a customer: `curl -X POST http://localhost:5000/customers -H "Content-Type: application/json" -d '{"name": "Test", "email": "test@example.com"}'`