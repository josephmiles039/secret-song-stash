# Secret Song Stash

A decentralized music platform with encrypted royalty tracking and transparent payment distribution using Fully Homomorphic Encryption (FHE).

## Features

- **Encrypted Royalty Tracking**: Uses FHE to protect sensitive financial data while maintaining transparency
- **Decentralized Architecture**: Built on Ethereum Sepolia testnet with smart contracts
- **Wallet Integration**: Seamless connection with popular Web3 wallets via RainbowKit
- **Real-time Analytics**: Encrypted play tracking and earnings calculation
- **Artist Dashboard**: Comprehensive tools for music creators
- **Listener Rewards**: Earn tokens for listening and supporting artists

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Web3**: Wagmi, RainbowKit, Viem
- **Blockchain**: Ethereum Sepolia
- **Encryption**: FHE (Fully Homomorphic Encryption) via Zama
- **Smart Contracts**: Solidity ^0.8.24

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/josephmiles039/secret-song-stash.git
cd secret-song-stash
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:8080`

## Smart Contract Deployment

The project includes a Solidity smart contract with FHE capabilities:

```solidity
// Key features:
- Song creation and management
- Encrypted play tracking
- Royalty distribution
- Reputation system
- Platform fee management
```

### Deploy to Sepolia

1. Install Hardhat:
```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
```

2. Configure your deployment script
3. Deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CHAIN_ID` | Ethereum chain ID (11155111 for Sepolia) | Yes |
| `VITE_RPC_URL` | RPC endpoint URL | Yes |
| `VITE_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `VITE_INFURA_API_KEY` | Infura API key | Optional |
| `VITE_CONTRACT_ADDRESS` | Deployed contract address | Yes |
| `VITE_FHE_CONTRACT_ADDRESS` | FHE-enabled contract address | Yes |

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