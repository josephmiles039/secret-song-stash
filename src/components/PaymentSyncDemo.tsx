import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Database, 
  Key, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  Lock,
  Unlock,
  GitBranch,
  Hash
} from "lucide-react";

interface SyncStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  icon: any;
  details?: string;
}

const PaymentSyncDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const syncSteps: SyncStep[] = [
    {
      id: 'collect',
      title: 'Collect Payment Data',
      description: 'Gathering royalty payments from streaming platforms',
      status: 'pending',
      icon: Database,
      details: 'Fetching payment data from Spotify, Apple Music, YouTube Music...'
    },
    {
      id: 'encrypt',
      title: 'Encrypt Sensitive Data',
      description: 'Applying AES-256 encryption to payment amounts',
      status: 'pending',
      icon: Lock,
      details: 'Encrypting payment amounts and artist identification data'
    },
    {
      id: 'generate',
      title: 'Generate Hash Proofs',
      description: 'Creating cryptographic hashes for data integrity',
      status: 'pending',
      icon: Hash,
      details: 'Generating SHA-256 hashes for payment verification'
    },
    {
      id: 'blockchain',
      title: 'Blockchain Transaction',
      description: 'Recording encrypted data hash on blockchain',
      status: 'pending',
      icon: GitBranch,
      details: 'Submitting transaction to Ethereum mainnet'
    },
    {
      id: 'verify',
      title: 'Verify & Complete',
      description: 'Confirming transaction and updating records',
      status: 'pending',
      icon: CheckCircle,
      details: 'Transaction confirmed, data synchronized successfully'
    }
  ];

  const [steps, setSteps] = useState(syncSteps);

  const startSync = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setProgress(0);

    const newSteps = [...steps];
    
    for (let i = 0; i < newSteps.length; i++) {
      // Reset all steps
      newSteps.forEach((step, index) => {
        if (index < i) step.status = 'completed';
        else if (index === i) step.status = 'processing';
        else step.status = 'pending';
      });
      
      setSteps([...newSteps]);
      setCurrentStep(i);
      setProgress((i / newSteps.length) * 100);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Complete all steps
    newSteps.forEach(step => step.status = 'completed');
    setSteps([...newSteps]);
    setProgress(100);
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'processing':
        return <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      case 'error':
        return <div className="h-5 w-5 bg-red-500 rounded-full" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const mockData = {
    totalPayments: 6,
    totalAmount: '$24,567.89',
    encryptedRecords: 6,
    blockchainTxHash: '0x742d35cc6db...',
    lastSync: '2024-01-15 14:30:25 UTC'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Payment Sync Demo</h2>
          <p className="text-muted-foreground">Encrypted Payment Data Synchronization & Blockchain Integration</p>
        </div>
        <Button 
          onClick={startSync}
          disabled={isRunning}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          {isRunning ? 'Syncing...' : 'Start Sync Process'}
        </Button>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-glass backdrop-blur-lg border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Sync Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Progress: {Math.round(progress)}%</span>
              <span>Step {currentStep + 1} of {steps.length}</span>
            </div>
            <Progress value={progress} className="w-full" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{mockData.totalPayments}</div>
                <div className="text-sm text-muted-foreground">Total Payments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{mockData.totalAmount}</div>
                <div className="text-sm text-muted-foreground">Total Amount</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{mockData.encryptedRecords}</div>
                <div className="text-sm text-muted-foreground">Encrypted Records</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync Steps */}
      <div className="grid gap-4">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <Card 
              key={step.id}
              className={`bg-gradient-glass backdrop-blur-lg border-border/50 transition-all duration-300 ${
                step.status === 'processing' ? 'border-primary/50 shadow-glow' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      step.status === 'completed' ? 'bg-green-500/20' :
                      step.status === 'processing' ? 'bg-primary/20' :
                      'bg-secondary/50'
                    }`}>
                      <StepIcon className={`h-5 w-5 ${
                        step.status === 'completed' ? 'text-green-400' :
                        step.status === 'processing' ? 'text-primary' :
                        'text-muted-foreground'
                      }`} />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      {step.status === 'processing' && (
                        <p className="text-xs text-primary mt-1">{step.details}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      step.status === 'completed' ? 'default' :
                      step.status === 'processing' ? 'secondary' :
                      'outline'
                    }>
                      {step.status === 'completed' ? 'Completed' :
                       step.status === 'processing' ? 'Processing' :
                       'Pending'}
                    </Badge>
                    {getStatusIcon(step.status)}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Transaction Details */}
      {progress === 100 && (
        <Card className="bg-gradient-glass backdrop-blur-lg border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              Synchronization Complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Blockchain Transaction:</span>
                <span className="font-mono text-sm text-accent">{mockData.blockchainTxHash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Sync:</span>
                <span className="text-sm">{mockData.lastSync}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Encryption Status:</span>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Lock className="h-3 w-3 mr-1" />
                  All Data Encrypted
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentSyncDemo;