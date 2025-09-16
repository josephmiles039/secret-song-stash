// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecretSongStash is SepoliaConfig {
    using FHE for *;
    
    struct Song {
        euint32 songId;
        euint32 totalPlays;
        euint32 totalEarnings;
        euint32 royaltyRate; // Percentage (0-100)
        bool isActive;
        bool isVerified;
        string title;
        string artist;
        string ipfsHash;
        address owner;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct PlayRecord {
        euint32 playId;
        euint32 songId;
        euint32 playDuration; // in seconds
        euint32 earnings; // Calculated earnings for this play
        address listener;
        uint256 timestamp;
    }
    
    struct RoyaltyDistribution {
        euint32 distributionId;
        euint32 songId;
        euint32 totalAmount;
        euint32 artistShare;
        euint32 platformShare;
        bool isProcessed;
        address artist;
        uint256 timestamp;
    }
    
    struct ListenerStats {
        euint32 totalPlays;
        euint32 totalTimeListened;
        euint32 totalEarnings;
        bool isActive;
    }
    
    mapping(uint256 => Song) public songs;
    mapping(uint256 => PlayRecord) public playRecords;
    mapping(uint256 => RoyaltyDistribution) public royaltyDistributions;
    mapping(address => ListenerStats) public listenerStats;
    mapping(address => euint32) public artistReputation;
    mapping(address => euint32) public listenerReputation;
    
    uint256 public songCounter;
    uint256 public playCounter;
    uint256 public distributionCounter;
    
    address public owner;
    address public verifier;
    euint32 public platformFeeRate; // Platform fee percentage
    
    event SongCreated(uint256 indexed songId, address indexed artist, string title);
    event PlayRecorded(uint256 indexed playId, uint256 indexed songId, address indexed listener);
    event RoyaltyDistributed(uint256 indexed distributionId, uint256 indexed songId, address indexed artist);
    event SongVerified(uint256 indexed songId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        platformFeeRate = FHE.asEuint32(10); // 10% platform fee
    }
    
    function createSong(
        string memory _title,
        string memory _artist,
        string memory _ipfsHash,
        uint256 _royaltyRate
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Song title cannot be empty");
        require(bytes(_artist).length > 0, "Artist name cannot be empty");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(_royaltyRate <= 100, "Royalty rate cannot exceed 100%");
        
        uint256 songId = songCounter++;
        
        songs[songId] = Song({
            songId: FHE.asEuint32(0), // Will be set properly later
            totalPlays: FHE.asEuint32(0),
            totalEarnings: FHE.asEuint32(0),
            royaltyRate: FHE.asEuint32(_royaltyRate),
            isActive: true,
            isVerified: false,
            title: _title,
            artist: _artist,
            ipfsHash: _ipfsHash,
            owner: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        emit SongCreated(songId, msg.sender, _title);
        return songId;
    }
    
    function recordPlay(
        uint256 songId,
        externalEuint32 playDuration,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(songs[songId].owner != address(0), "Song does not exist");
        require(songs[songId].isActive, "Song is not active");
        
        uint256 playId = playCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalDuration = FHE.fromExternal(playDuration, inputProof);
        
        // Calculate earnings based on play duration and royalty rate
        euint32 earnings = FHE.mul(
            FHE.div(internalDuration, FHE.asEuint32(60)), // Convert seconds to minutes
            songs[songId].royaltyRate
        );
        
        playRecords[playId] = PlayRecord({
            playId: FHE.asEuint32(0), // Will be set properly later
            songId: FHE.asEuint32(songId),
            playDuration: internalDuration,
            earnings: earnings,
            listener: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update song statistics
        songs[songId].totalPlays = FHE.add(songs[songId].totalPlays, FHE.asEuint32(1));
        songs[songId].totalEarnings = FHE.add(songs[songId].totalEarnings, earnings);
        songs[songId].updatedAt = block.timestamp;
        
        // Update listener statistics
        listenerStats[msg.sender].totalPlays = FHE.add(
            listenerStats[msg.sender].totalPlays, 
            FHE.asEuint32(1)
        );
        listenerStats[msg.sender].totalTimeListened = FHE.add(
            listenerStats[msg.sender].totalTimeListened, 
            internalDuration
        );
        listenerStats[msg.sender].totalEarnings = FHE.add(
            listenerStats[msg.sender].totalEarnings, 
            earnings
        );
        listenerStats[msg.sender].isActive = true;
        
        emit PlayRecorded(playId, songId, msg.sender);
        return playId;
    }
    
    function distributeRoyalties(
        uint256 songId,
        externalEuint32 totalAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(songs[songId].owner == msg.sender, "Only song owner can distribute royalties");
        require(songs[songId].isActive, "Song must be active");
        
        uint256 distributionId = distributionCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(totalAmount, inputProof);
        
        // Calculate artist and platform shares
        euint32 artistShare = FHE.mul(
            internalAmount,
            FHE.sub(FHE.asEuint32(100), platformFeeRate)
        );
        artistShare = FHE.div(artistShare, FHE.asEuint32(100));
        
        euint32 platformShare = FHE.mul(internalAmount, platformFeeRate);
        platformShare = FHE.div(platformShare, FHE.asEuint32(100));
        
        royaltyDistributions[distributionId] = RoyaltyDistribution({
            distributionId: FHE.asEuint32(0), // Will be set properly later
            songId: FHE.asEuint32(songId),
            totalAmount: internalAmount,
            artistShare: artistShare,
            platformShare: platformShare,
            isProcessed: false,
            artist: msg.sender,
            timestamp: block.timestamp
        });
        
        emit RoyaltyDistributed(distributionId, songId, msg.sender);
        return distributionId;
    }
    
    function verifySong(uint256 songId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify songs");
        require(songs[songId].owner != address(0), "Song does not exist");
        
        songs[songId].isVerified = isVerified;
        emit SongVerified(songId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is artist or listener based on context
        if (songs[songCounter - 1].owner == user) {
            artistReputation[user] = reputation;
        } else {
            listenerReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getSongInfo(uint256 songId) public view returns (
        string memory title,
        string memory artist,
        string memory ipfsHash,
        uint8 totalPlays,
        uint8 totalEarnings,
        uint8 royaltyRate,
        bool isActive,
        bool isVerified,
        address owner,
        uint256 createdAt,
        uint256 updatedAt
    ) {
        Song storage song = songs[songId];
        return (
            song.title,
            song.artist,
            song.ipfsHash,
            0, // FHE.decrypt(song.totalPlays) - will be decrypted off-chain
            0, // FHE.decrypt(song.totalEarnings) - will be decrypted off-chain
            0, // FHE.decrypt(song.royaltyRate) - will be decrypted off-chain
            song.isActive,
            song.isVerified,
            song.owner,
            song.createdAt,
            song.updatedAt
        );
    }
    
    function getPlayRecordInfo(uint256 playId) public view returns (
        uint8 songId,
        uint8 playDuration,
        uint8 earnings,
        address listener,
        uint256 timestamp
    ) {
        PlayRecord storage play = playRecords[playId];
        return (
            0, // FHE.decrypt(play.songId) - will be decrypted off-chain
            0, // FHE.decrypt(play.playDuration) - will be decrypted off-chain
            0, // FHE.decrypt(play.earnings) - will be decrypted off-chain
            play.listener,
            play.timestamp
        );
    }
    
    function getListenerStats(address listener) public view returns (
        uint8 totalPlays,
        uint8 totalTimeListened,
        uint8 totalEarnings,
        bool isActive
    ) {
        ListenerStats storage stats = listenerStats[listener];
        return (
            0, // FHE.decrypt(stats.totalPlays) - will be decrypted off-chain
            0, // FHE.decrypt(stats.totalTimeListened) - will be decrypted off-chain
            0, // FHE.decrypt(stats.totalEarnings) - will be decrypted off-chain
            stats.isActive
        );
    }
    
    function getArtistReputation(address artist) public view returns (uint8) {
        return 0; // FHE.decrypt(artistReputation[artist]) - will be decrypted off-chain
    }
    
    function getListenerReputation(address listener) public view returns (uint8) {
        return 0; // FHE.decrypt(listenerReputation[listener]) - will be decrypted off-chain
    }
    
    function withdrawEarnings(uint256 distributionId) public {
        require(royaltyDistributions[distributionId].artist == msg.sender, "Only artist can withdraw");
        require(!royaltyDistributions[distributionId].isProcessed, "Already processed");
        
        // Mark as processed
        royaltyDistributions[distributionId].isProcessed = true;
        
        // Transfer funds to artist
        // Note: In a real implementation, funds would be transferred based on decrypted amount
        // payable(msg.sender).transfer(amount);
    }
    
    function setPlatformFeeRate(uint256 newRate) public {
        require(msg.sender == owner, "Only owner can set platform fee rate");
        require(newRate <= 50, "Platform fee rate cannot exceed 50%");
        
        platformFeeRate = FHE.asEuint32(newRate);
    }
}
