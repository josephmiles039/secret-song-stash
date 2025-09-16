import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Music } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-gradient-glass backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-primary p-2 shadow-glow">
              <Music className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Secret Song Stash
              </h1>
              <p className="text-sm text-muted-foreground">
                Decentralized Music Platform with Encrypted Royalty Tracking
              </p>
            </div>
          </div>
          
          <ConnectButton 
            showBalance={false}
            chainStatus="icon"
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;