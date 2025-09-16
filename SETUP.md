# 🔧 Setup Guide - Secret Song Stash

This guide will help you set up your environment variables and API keys securely.

## 📋 Prerequisites

Before you begin, make sure you have:
- Node.js 18+ installed
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Basic understanding of environment variables

## 🔑 Required API Keys

### 1. Infura API Key

1. Visit [infura.io](https://infura.io)
2. Create a free account
3. Create a new project
4. Select "Web3 API" as the product
5. Choose "Sepolia" as the network
6. Copy your Project ID

### 2. WalletConnect Project ID

1. Visit [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create a free account
3. Create a new project
4. Copy your Project ID

## 🛠️ Environment Setup

### Step 1: Create Environment File

Create a `.env` file in your project root:

```bash
# Copy the template
cp .env.example .env
```

### Step 2: Configure Variables

Edit your `.env` file with your actual values:

```bash
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Contract Addresses (Update after deployment)
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
VITE_FHE_CONTRACT_ADDRESS=YOUR_FHE_CONTRACT_ADDRESS
```

### Step 3: Verify Configuration

Test your setup by running:

```bash
npm run dev
```

## 🔒 Security Best Practices

### ✅ Do's
- Use environment variables for all sensitive data
- Never commit `.env` files to version control
- Use different API keys for development and production
- Regularly rotate your API keys
- Use testnet for development

### ❌ Don'ts
- Don't hardcode API keys in your source code
- Don't share your `.env` file
- Don't use mainnet for testing
- Don't commit sensitive data to Git

## 🚀 Deployment Configuration

### Vercel Deployment

When deploying to Vercel, add your environment variables in the dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable from your `.env` file
4. Set the environment (Production, Preview, Development)

### Other Platforms

For other deployment platforms, refer to their documentation on how to set environment variables.

## 🆘 Troubleshooting

### Common Issues

1. **"Invalid API Key" Error**
   - Verify your Infura project ID is correct
   - Ensure you're using the right network (Sepolia)

2. **Wallet Connection Issues**
   - Check your WalletConnect project ID
   - Verify your RPC URL is accessible

3. **Contract Interaction Errors**
   - Ensure contract addresses are correct
   - Check that contracts are deployed on the right network

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify your environment variables
3. Test with a simple transaction first
4. Join our Discord community for support

## 📚 Additional Resources

- [Infura Documentation](https://docs.infura.io/)
- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Ethereum Sepolia Faucet](https://sepoliafaucet.com/)
