import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';
import { config } from '../config/env';

// Contract ABI - This would be generated from your compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_artist", "type": "string"},
      {"internalType": "string", "name": "_ipfsHash", "type": "string"},
      {"internalType": "uint256", "name": "_royaltyRate", "type": "uint256"}
    ],
    "name": "createSong",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "songId", "type": "uint256"},
      {"internalType": "bytes", "name": "playDuration", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "recordPlay",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "songId", "type": "uint256"},
      {"internalType": "bytes", "name": "totalAmount", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "distributeRoyalties",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "songId", "type": "uint256"}],
    "name": "getSongInfo",
    "outputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "artist", "type": "string"},
      {"internalType": "string", "name": "ipfsHash", "type": "string"},
      {"internalType": "uint8", "name": "totalPlays", "type": "uint8"},
      {"internalType": "uint8", "name": "totalEarnings", "type": "uint8"},
      {"internalType": "uint8", "name": "royaltyRate", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "updatedAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const useSecretSongStash = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Create a new song with encrypted data
  const createSong = async (title: string, artist: string, ipfsHash: string, royaltyRate: number) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first');
    }

    setIsLoading(true);
    try {
      const result = await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createSong',
        args: [title, artist, ipfsHash, royaltyRate],
      });
      return result;
    } catch (err) {
      console.error('Error creating song:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Record a play with encrypted duration data
  const recordPlay = async (songId: number, playDuration: Uint8Array, inputProof: Uint8Array) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first');
    }

    setIsLoading(true);
    try {
      const result = await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'recordPlay',
        args: [BigInt(songId), playDuration, inputProof],
      });
      return result;
    } catch (err) {
      console.error('Error recording play:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Distribute royalties with encrypted amount data
  const distributeRoyalties = async (songId: number, totalAmount: Uint8Array, inputProof: Uint8Array) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first');
    }

    setIsLoading(true);
    try {
      const result = await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'distributeRoyalties',
        args: [BigInt(songId), totalAmount, inputProof],
      });
      return result;
    } catch (err) {
      console.error('Error distributing royalties:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createSong,
    recordPlay,
    distributeRoyalties,
    isLoading: isLoading || isPending || isConfirming,
    isSuccess: isConfirmed,
    error,
    hash,
    isConnected,
    address,
  };
};

// Hook for reading song information
export const useSongInfo = (songId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: config.contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getSongInfo',
    args: [BigInt(songId)],
  });

  return {
    songInfo: data,
    isLoading,
    error,
  };
};
