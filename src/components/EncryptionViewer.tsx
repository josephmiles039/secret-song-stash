import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, 
  EyeOff, 
  Shield, 
  Key, 
  Lock, 
  Unlock,
  Copy,
  CheckCircle
} from "lucide-react";

const EncryptionViewer = () => {
  const [showDecrypted, setShowDecrypted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const sampleData = {
    original: {
      artist: "Artist Name",
      amount: "$8,234.56",
      source: "Spotify",
      timestamp: "2024-01-15T14:30:25Z",
      transactionId: "TXN_2024_001234"
    },
    encrypted: {
      artist: "U2FsdGVkX1+vupppZksvRf5pq5g5XjFRIipRkwB0K1Y=",
      amount: "U2FsdGVkX19FBtaXDgp4F8WvH3aXJkLm9Q8ZtE2K4xM=",
      source: "U2FsdGVkX1/WjKBZo9P4TmNrQ1F5L8K9PqR2Vx7M=",
      timestamp: "U2FsdGVkX1+8KnP4Qm9LfE2XvR5K8pL3NqS9Wx7T=",
      transactionId: "U2FsdGVkX1+nP8Lm4Qx7FrT2Vw5K9pN3SqE8Wx2Y="
    },
    hash: "0x742d35cc6db39f4af025e394b4d8d9b98ac9d175bfb002",
    encryptionKey: "AES-256-GCM",
    blockchainAddress: "0x1234567890abcdef1234567890abcdef12345678"
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const FieldDisplay = ({ label, original, encrypted, fieldKey }: {
    label: string;
    original: string;
    encrypted: string;
    fieldKey: string;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(showDecrypted ? original : encrypted, fieldKey)}
          className="h-6 w-6 p-0"
        >
          {copiedField === fieldKey ? (
            <CheckCircle className="h-3 w-3 text-green-400" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
      <div className="bg-secondary/30 rounded-md p-3 font-mono text-sm">
        {showDecrypted ? (
          <span className="text-green-400">{original}</span>
        ) : (
          <span className="text-muted-foreground break-all">{encrypted}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Encryption Viewer</h2>
          <p className="text-muted-foreground">View encrypted vs decrypted payment data</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowDecrypted(!showDecrypted)}
          className="flex items-center gap-2"
        >
          {showDecrypted ? (
            <>
              <EyeOff className="h-4 w-4" />
              Hide Data
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Show Decrypted
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Data View */}
        <Card className="bg-gradient-glass backdrop-blur-lg border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {showDecrypted ? (
                <>
                  <Unlock className="h-5 w-5 text-green-400" />
                  Decrypted Data
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5 text-primary" />
                  Encrypted Data
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldDisplay
              label="Artist Name"
              original={sampleData.original.artist}
              encrypted={sampleData.encrypted.artist}
              fieldKey="artist"
            />
            <FieldDisplay
              label="Payment Amount"
              original={sampleData.original.amount}
              encrypted={sampleData.encrypted.amount}
              fieldKey="amount"
            />
            <FieldDisplay
              label="Payment Source"
              original={sampleData.original.source}
              encrypted={sampleData.encrypted.source}
              fieldKey="source"
            />
            <FieldDisplay
              label="Timestamp"
              original={sampleData.original.timestamp}
              encrypted={sampleData.encrypted.timestamp}
              fieldKey="timestamp"
            />
            <FieldDisplay
              label="Transaction ID"
              original={sampleData.original.transactionId}
              encrypted={sampleData.encrypted.transactionId}
              fieldKey="transactionId"
            />
          </CardContent>
        </Card>

        {/* Encryption Details */}
        <Card className="bg-gradient-glass backdrop-blur-lg border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Encryption Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="encryption" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="encryption">Encryption</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
              </TabsList>
              
              <TabsContent value="encryption" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Algorithm</label>
                    <div className="bg-secondary/30 rounded-md p-3 mt-1">
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        <Key className="h-3 w-3 mr-1" />
                        {sampleData.encryptionKey}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Data Hash</label>
                    <div className="bg-secondary/30 rounded-md p-3 mt-1 font-mono text-sm break-all">
                      {sampleData.hash}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-500/10 rounded-lg">
                      <div className="text-lg font-bold text-green-400">256-bit</div>
                      <div className="text-xs text-muted-foreground">Key Length</div>
                    </div>
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <div className="text-lg font-bold text-primary">GCM</div>
                      <div className="text-xs text-muted-foreground">Mode</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="blockchain" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Smart Contract</label>
                    <div className="bg-secondary/30 rounded-md p-3 mt-1 font-mono text-sm break-all">
                      {sampleData.blockchainAddress}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Network</label>
                    <div className="bg-secondary/30 rounded-md p-3 mt-1">
                      <Badge variant="secondary" className="bg-accent/20 text-accent">
                        Ethereum Mainnet
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-accent/10 rounded-lg">
                      <div className="text-lg font-bold text-accent">12</div>
                      <div className="text-xs text-muted-foreground">Confirmations</div>
                    </div>
                    <div className="text-center p-3 bg-green-500/10 rounded-lg">
                      <div className="text-lg font-bold text-green-400">Final</div>
                      <div className="text-xs text-muted-foreground">Status</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className="bg-gradient-glass backdrop-blur-lg border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground">Security Notice</h4>
              <p className="text-sm text-muted-foreground mt-1">
                This is a demo showing encrypted payment data. In production, sensitive data would never be displayed 
                in decrypted form in the UI. Only hash proofs and encrypted data would be visible to maintain privacy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EncryptionViewer;