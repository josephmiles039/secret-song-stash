import { useState } from 'react';
import { useSecretSongStash } from '../hooks/useContract';
import { prepareContractData } from '../lib/fhe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Music, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SongUploadProps {
  onSongCreated?: (songId: number) => void;
}

export const SongUpload = ({ onSongCreated }: SongUploadProps) => {
  const { createSong, isLoading, isSuccess, error } = useSecretSongStash();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    ipfsHash: '',
    royaltyRate: 90,
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.artist || !formData.ipfsHash) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.royaltyRate < 0 || formData.royaltyRate > 100) {
      toast.error('Royalty rate must be between 0 and 100');
      return;
    }

    setIsUploading(true);
    try {
      const songData = prepareContractData.createSong(
        formData.title,
        formData.artist,
        formData.ipfsHash,
        formData.royaltyRate
      );

      const result = await createSong(
        songData.title,
        songData.artist,
        songData.ipfsHash,
        songData.royaltyRate
      );

      toast.success('Song created successfully! Your data is encrypted and stored on-chain.');
      
      // Reset form
      setFormData({
        title: '',
        artist: '',
        ipfsHash: '',
        royaltyRate: 90,
      });

      // Notify parent component
      if (onSongCreated) {
        onSongCreated(Number(result));
      }
    } catch (err) {
      console.error('Error creating song:', err);
      toast.error('Failed to create song. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          Upload Your Song
        </CardTitle>
        <CardDescription>
          Create a new song with encrypted metadata and royalty tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Song Title *</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter song title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="artist">Artist Name *</Label>
              <Input
                id="artist"
                type="text"
                placeholder="Enter artist name"
                value={formData.artist}
                onChange={(e) => handleInputChange('artist', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ipfsHash">IPFS Hash *</Label>
            <Input
              id="ipfsHash"
              type="text"
              placeholder="QmYourIPFSHashHere..."
              value={formData.ipfsHash}
              onChange={(e) => handleInputChange('ipfsHash', e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              Upload your audio file to IPFS and paste the hash here
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="royaltyRate">Royalty Rate (%)</Label>
            <Input
              id="royaltyRate"
              type="number"
              min="0"
              max="100"
              placeholder="90"
              value={formData.royaltyRate}
              onChange={(e) => handleInputChange('royaltyRate', parseInt(e.target.value) || 0)}
            />
            <p className="text-sm text-muted-foreground">
              Percentage of streaming revenue you want to receive (0-100%)
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error.message || 'An error occurred while creating the song'}
              </AlertDescription>
            </Alert>
          )}

          {isSuccess && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Song created successfully! Your data is encrypted and stored on-chain.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Your song data will be encrypted using FHE and stored securely on the blockchain
            </span>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isUploading}
          >
            {isLoading || isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Creating Song...
              </>
            ) : (
              <>
                <Music className="mr-2 h-4 w-4" />
                Create Encrypted Song
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
