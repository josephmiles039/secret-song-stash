// Environment configuration for Secret Song Stash
export const config = {
  // Chain Configuration
  chainId: import.meta.env.VITE_CHAIN_ID || 11155111,
  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990',
  
  // Wallet Connect Configuration
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '2ec9743d0d0cd7fb94dee1a7e6d33475',
  
  // Infura Configuration
  infuraApiKey: import.meta.env.VITE_INFURA_API_KEY || 'b18fb7e6ca7045ac83c41157ab93f990',
  
  // Contract Configuration
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS || '',
  fheContractAddress: import.meta.env.VITE_FHE_CONTRACT_ADDRESS || '',
  
  // App Configuration
  appName: 'Secret Song Stash',
  appDescription: 'Decentralized Music Platform with Encrypted Royalty Tracking',
} as const;
