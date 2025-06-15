
import { Users, Star, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatKsh } from "@/utils/currency";

interface BusinessStatsProps {
  stats: {
    totalCustomers: number;
    monthlyVisits: number;
    averageSpend: number;
    rewardsClaimed: number;
  };
}

const BusinessStats = ({ stats }: BusinessStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="hover:shadow-lg transition-shadow duration-200 animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-gray-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCustomers}</div>
          <p className="text-xs text-gray-600">Active customers</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200 animate-fade-in" style={{animationDelay: '0.1s'}}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
          <Star className="h-4 w-4 text-gray-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.monthlyVisits}</div>
          <p className="text-xs text-gray-600">All time visits</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200 animate-fade-in" style={{animationDelay: '0.2s'}}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Spend</CardTitle>
          <DollarSign className="h-4 w-4 text-gray-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatKsh(stats.averageSpend * 129.50)}</div>
          <p className="text-xs text-gray-600">Per customer</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200 animate-fade-in" style={{animationDelay: '0.3s'}}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rewards Claimed</CardTitle>
          <Star className="h-4 w-4 text-gray-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.rewardsClaimed}</div>
          <p className="text-xs text-gray-600">Total redeemed</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessStats;
