import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";

interface RoyaltyCardProps {
  title: string;
  amount: string;
  encrypted: boolean;
  source: string;
  growth?: string;
  period: string;
}

const RoyaltyCard = ({ title, amount, encrypted, source, growth, period }: RoyaltyCardProps) => {
  const [showAmount, setShowAmount] = useState(!encrypted);

  return (
    <Card className="bg-gradient-glass backdrop-blur-lg border-border/50 shadow-card-custom hover:shadow-glass transition-all duration-300 hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            {encrypted && <Shield className="h-4 w-4 text-primary" />}
            {title}
          </CardTitle>
          {encrypted && (
            <button
              onClick={() => setShowAmount(!showAmount)}
              className="p-1 rounded-md hover:bg-secondary/50 transition-colors"
            >
              {showAmount ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{period}</p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">
              {showAmount ? amount : "••••••"}
            </span>
            {growth && (
              <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                <TrendingUp className="h-3 w-3 mr-1" />
                {growth}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Source:</span>
            <span className="text-foreground font-medium">{source}</span>
          </div>
          
          {encrypted && (
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Shield className="h-3 w-3 mr-1" />
              Privacy Protected
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoyaltyCard;