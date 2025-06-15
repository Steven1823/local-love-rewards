
import { Users, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Customer {
  phone: string;
  name: string;
  visits: number;
  points: number;
  totalSpent: number;
  lastVisit: string;
  rewardsClaimed: number;
}

interface RecentCustomersProps {
  customers: Customer[];
}

const RecentCustomers = ({ customers }: RecentCustomersProps) => {
  return (
    <Card className="animate-fade-in" style={{animationDelay: '0.5s'}}>
      <CardHeader>
        <CardTitle>Recent Customers</CardTitle>
      </CardHeader>
      <CardContent>
        {customers.length === 0 ? (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No customers yet</h3>
            <p className="text-gray-500">Add your first customer visit to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {customers.slice(-5).reverse().map((customer, index) => (
              <div
                key={customer.phone}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 animate-fade-in"
                style={{animationDelay: `${0.6 + index * 0.1}s`}}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">{customer.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">{customer.phone}</p>
                  <p className="text-xs text-gray-500">Last visit: {customer.lastVisit}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    {customer.points} points
                  </Badge>
                  <p className="text-xs text-gray-600">{customer.visits} visits</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentCustomers;
