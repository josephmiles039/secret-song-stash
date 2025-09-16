# 🎵 Secret Song Stash

> *Where Music Meets Privacy: The Future of Decentralized Audio Streaming*

**Secret Song Stash** revolutionizes the music industry by combining the power of blockchain technology with cutting-edge privacy-preserving encryption. Built for artists who value both transparency and confidentiality, our platform ensures that your creative work and earnings remain protected while maintaining complete verifiability.

## 🌟 Why Secret Song Stash?

In a world where streaming platforms take massive cuts and artists struggle to get fair compensation, **Secret Song Stash** emerges as the game-changer. We're not just another music platform – we're a movement towards:

- **🔒 Privacy-First Approach**: Your earnings data is encrypted using FHE, visible only to you
- **🎯 Fair Compensation**: Artists receive 90% of streaming revenue (vs. industry standard 70%)
- **⚡ Real-Time Payments**: Instant royalty distribution without waiting periods
- **🌐 True Ownership**: Your music, your data, your control
- **🔍 Transparent Yet Private**: Public verification without exposing sensitive information

## 🛠️ The Tech Behind the Magic

We've carefully selected each technology to create a seamless, secure, and scalable experience:

| Component | Technology | Why We Chose It |
|-----------|------------|-----------------|
| **Frontend** | React 18 + TypeScript | Type safety meets modern development |
| **Styling** | Tailwind CSS + shadcn/ui | Beautiful, accessible components |
| **Blockchain** | Ethereum Sepolia | Proven security with testnet flexibility |
| **Privacy** | FHE via Zama | Industry-leading homomorphic encryption |
| **Wallets** | RainbowKit + Wagmi | Best-in-class Web3 integration |
| **Smart Contracts** | Solidity ^0.8.24 | Battle-tested blockchain development |

## 🚀 Quick Start Guide

Ready to revolutionize your music experience? Let's get you up and running in minutes!

### 📋 What You'll Need

- **Node.js 18+** (Download from [nodejs.org](https://nodejs.org))
- **Git** (For version control)
- **Web3 Wallet** (MetaMask, Rainbow, or Coinbase Wallet)
- **Sepolia ETH** (For gas fees - get free testnet ETH from [faucets](https://sepoliafaucet.com))

### ⚡ Installation (3 Simple Steps)

```bash
# 1. Clone and enter the project
git clone https://github.com/josephmiles039/secret-song-stash.git
cd secret-song-stash

# 2. Install dependencies
npm install

# 3. Start the magic ✨
npm run dev
```

**That's it!** Your local development server will be running at `http://localhost:8080`

### 🔧 Environment Setup (Required for Full Functionality)

Create a `.env` file in the project root with your own credentials:

```bash
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Contract Addresses (Update after deployment)
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
VITE_FHE_CONTRACT_ADDRESS=YOUR_FHE_CONTRACT_ADDRESS
```

> **📖 Need help?** Check out our detailed [Setup Guide](./SETUP.md) for step-by-step instructions on obtaining API keys and configuring your environment.

> **⚠️ Security Note**: Never commit your `.env` file to version control. Use `.env.example` for sharing configuration templates.

## 🎼 Smart Contract Magic

Our **SecretSongStash** contract is the heart of our platform, featuring revolutionary FHE-powered privacy:

### 🔐 Core Features

- **🎵 Song Management**: Create, verify, and manage your musical creations
- **🔒 Encrypted Analytics**: Play counts and earnings remain private yet verifiable
- **💰 Fair Royalties**: Automated distribution with transparent fee structure
- **⭐ Reputation System**: Build trust through encrypted reputation scores
- **🛡️ Privacy Protection**: All sensitive data encrypted using FHE

### 🚀 Deploy Your Own Contract

```bash
# Install deployment tools
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers

# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia
```

> **Pro Tip**: Start with Sepolia testnet to experiment without real ETH costs!

## 🔐 Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_CHAIN_ID` | Ethereum chain ID | Yes | `11155111` (Sepolia) |
| `VITE_RPC_URL` | RPC endpoint URL | Yes | `https://sepolia.infura.io/v3/YOUR_KEY` |
| `VITE_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | Yes | Get from [WalletConnect Cloud](https://cloud.walletconnect.com) |
| `VITE_CONTRACT_ADDRESS` | Deployed contract address | Yes | `0x...` (after deployment) |
| `VITE_FHE_CONTRACT_ADDRESS` | FHE-enabled contract address | Yes | `0x...` (after deployment) |

### 🔑 How to Get Your API Keys

1. **Infura API Key**: 
   - Visit [infura.io](https://infura.io)
   - Create a free account
   - Create a new project
   - Copy your project ID

2. **WalletConnect Project ID**:
   - Visit [cloud.walletconnect.com](https://cloud.walletconnect.com)
   - Create a new project
   - Copy your project ID

3. **Contract Addresses**:
   - Deploy your contracts using the deployment guide below
   - Copy the deployed contract addresses

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── config/             # Configuration files
│   ├── env.ts          # Environment configuration
│   └── wagmi.ts        # Wagmi configuration
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── main.tsx            # Application entry point

contracts/
└── SecretSongStash.sol # Main smart contract
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Security

This project uses FHE to ensure that sensitive financial data remains encrypted while still allowing for computations. All smart contracts have been audited and follow best practices for security.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@secretsongstash.com or join our Discord community.

## Roadmap

- [ ] Multi-chain support
- [ ] NFT integration for songs
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Social features and community building
- [ ] AI-powered music recommendations

## Acknowledgments

- Zama for FHE technology
- RainbowKit for wallet integration
- shadcn/ui for beautiful components
- The Ethereum community for blockchain infrastructure