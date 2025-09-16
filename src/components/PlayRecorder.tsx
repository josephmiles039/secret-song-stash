import { useState, useEffect } from 'react';
import { useSecretSongStash } from '../hooks/useContract';
import { prepareContractData } from '../lib/fhe';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Play, Pause, Square, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PlayRecorderProps {
  songId: number;
  songTitle: string;
  artist: string;
}

export const PlayRecorder = ({ songId, songTitle, artist }: PlayRecorderProps) => {
  const { recordPlay, isLoading, isSuccess, error } = useSecretSongStash();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playDuration, setPlayDuration] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && startTime) {
      interval = setInterval(() => {
        setPlayDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, startTime]);

  const handlePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setStartTime(Date.now());
      setPlayDuration(0);
      setHasRecorded(false);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setStartTime(null);
  };

  const handleRecordPlay = async () => {
    if (playDuration === 0) {
      toast.error('Please play the song for at least 1 second');
      return;
    }

    try {
      const playData = prepareContractData.recordPlay(songId, playDuration);
      
      const result = await recordPlay(
        playData.songId,
        playData.playDuration,
        playData.inputProof
      );

      toast.success('Play recorded successfully! Your listening data is encrypted and stored on-chain.');
      setHasRecorded(true);
    } catch (err) {
      console.error('Error recording play:', err);
      toast.error('Failed to record play. Please try again.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Play Recorder
        </CardTitle>
        <CardDescription>
          Record your listening session with encrypted data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="font-semibold">{songTitle}</h3>
          <p className="text-sm text-muted-foreground">by {artist}</p>
        </div>

        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-primary">
            {formatTime(playDuration)}
          </div>
          <p className="text-sm text-muted-foreground">Play Duration</p>
        </div>

        <div className="flex justify-center gap-2">
          {!isPlaying ? (
            <Button onClick={handlePlay} variant="default" size="lg">
              <Play className="mr-2 h-4 w-4" />
              Play
            </Button>
          ) : (
            <>
              <Button onClick={handlePause} variant="outline" size="lg">
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
              <Button onClick={handleStop} variant="outline" size="lg">
                <Square className="mr-2 h-4 w-4" />
                Stop
              </Button>
            </>
          )}
        </div>

        {playDuration > 0 && !hasRecorded && (
          <Button
            onClick={handleRecordPlay}
            className="w-full"
            disabled={isLoading}
            variant="secondary"
          >
            {isLoading ? (
              <>
                <Lock className="mr-2 h-4 w-4 animate-spin" />
                Recording Play...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Record Encrypted Play
              </>
            )}
          </Button>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error.message || 'An error occurred while recording the play'}
            </AlertDescription>
          </Alert>
        )}

        {isSuccess && hasRecorded && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Play recorded successfully! Your listening data is encrypted and stored on-chain.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <Lock className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            Your play duration is encrypted using FHE and stored securely on the blockchain
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
