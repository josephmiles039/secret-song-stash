import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, PlayCircle } from "lucide-react";

const TotalEarnings = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-primary backdrop-blur-lg border-primary/30 shadow-glow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-primary-foreground/80 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Total Public Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary-foreground">$24,567.89</div>
          <p className="text-xs text-primary-foreground/70 flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            +12.5% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-glass backdrop-blur-lg border-border/50 shadow-card-custom">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <PlayCircle className="h-4 w-4" />
            Total Streams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">1.2M</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            +8.2% this week
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-glass backdrop-blur-lg border-border/50 shadow-card-custom">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Monthly Listeners
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">45.2K</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            +15.3% growth
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-secondary backdrop-blur-lg border-accent/30 shadow-glow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-accent-foreground/80 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Avg. Per Stream
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent-foreground">$0.0205</div>
          <p className="text-xs text-accent-foreground/70 flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            +3.1% improvement
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalEarnings;