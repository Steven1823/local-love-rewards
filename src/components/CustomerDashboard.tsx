
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gift, Star, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface CustomerDashboardProps {
  phoneNumber: string;
  onBack: () => void;
}

interface CustomerData {
  id: string;
  points: number;
  total_visits: number;
  total_spent: number;
  business: {
    business_name: string;
    address: string;
  };
}

const CustomerDashboard = ({ phoneNumber, onBack }: CustomerDashboardProps) => {
  const { signOut } = useAuth();
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const { data, error } = await supabase
          .from('customers')
          .select(`
            id,
            points,
            total_visits,
            total_spent,
            business:businesses(business_name, address)
          `)
          .eq('phone_number', phoneNumber);

        if (error) throw error;
        setCustomerData(data || []);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        toast.error('Failed to load your rewards data');
      } finally {
        setLoading(false);
      }
    };

    if (phoneNumber) {
      fetchCustomerData();
    }
  }, [phoneNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white">Loading your rewards...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-white">Your Rewards</h1>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Sign Out
          </Button>
        </div>

        {customerData.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8 text-center">
              <Gift className="h-16 w-16 text-white/60 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No rewards found</h3>
              <p className="text-white/70">
                You don't have any loyalty rewards yet. Start visiting participating businesses to earn points!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {customerData.map((customer) => (
              <Card key={customer.id} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    {customer.business.business_name}
                  </CardTitle>
                  {customer.business.address && (
                    <p className="text-white/70 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {customer.business.address}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{customer.points}</div>
                      <div className="text-white/70 text-sm">Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{customer.total_visits}</div>
                      <div className="text-white/70 text-sm">Visits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">${customer.total_spent}</div>
                      <div className="text-white/70 text-sm">Total Spent</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
