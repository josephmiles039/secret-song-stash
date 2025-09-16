import Header from "@/components/Header";
import TotalEarnings from "@/components/TotalEarnings";
import RoyaltyCard from "@/components/RoyaltyCard";
import PaymentSyncDemo from "@/components/PaymentSyncDemo";
import EncryptionViewer from "@/components/EncryptionViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const royaltyData = [
    {
      title: "Spotify Royalties",
      amount: "$8,234.56",
      encrypted: true,
      source: "Spotify",
      growth: "+5.2%",
      period: "Last 30 days"
    },
    {
      title: "Apple Music",
      amount: "$6,789.12",
      encrypted: true,
      source: "Apple Music",
      growth: "+8.1%",
      period: "Last 30 days"
    },
    {
      title: "YouTube Music",
      amount: "$4,567.89",
      encrypted: true,
      source: "YouTube",
      growth: "+12.3%",
      period: "Last 30 days"
    },
    {
      title: "SoundCloud Pro",
      amount: "$2,123.45",
      encrypted: true,
      source: "SoundCloud",
      growth: "+3.7%",
      period: "Last 30 days"
    },
    {
      title: "Sync Licensing",
      amount: "$1,567.82",
      encrypted: true,
      source: "Various",
      growth: "+25.4%",
      period: "Last 30 days"
    },
    {
      title: "Direct Sales",
      amount: "$1,285.05",
      encrypted: true,
      source: "Bandcamp",
      growth: "+15.8%",
      period: "Last 30 days"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="sync-demo">Sync Demo</TabsTrigger>
            <TabsTrigger value="encryption">Encryption</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-8">
            {/* Total Earnings Overview */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Public Earnings Overview
              </h2>
              <TotalEarnings />
            </section>

            {/* Encrypted Royalty Payments */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Encrypted Royalty Payments
                </h2>
                <div className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                  Privacy Mode: Enabled
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {royaltyData.map((royalty, index) => (
                  <RoyaltyCard
                    key={index}
                    title={royalty.title}
                    amount={royalty.amount}
                    encrypted={royalty.encrypted}
                    source={royalty.source}
                    growth={royalty.growth}
                    period={royalty.period}
                  />
                ))}
              </div>
            </section>

            {/* Privacy Notice */}
            <section className="mt-8">
              <div className="bg-gradient-glass backdrop-blur-lg border border-primary/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Privacy & Security
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Your individual royalty payments are encrypted and only visible to you. 
                  Only aggregate earnings are publicly visible to maintain transparency 
                  while protecting your financial privacy. All transactions are secured 
                  using blockchain technology.
                </p>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="sync-demo">
            <PaymentSyncDemo />
          </TabsContent>
          
          <TabsContent value="encryption">
            <EncryptionViewer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;