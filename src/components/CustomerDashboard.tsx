
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Star, Gift, MessageCircle, Bot } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import CustomerAIChat from "./CustomerAIChat";
import { formatKsh } from "@/utils/currency";

interface CustomerDashboardProps {
  phoneNumber: string;
  onBack: () => void;
}

interface CustomerData {
  phone_number: string;
  name: string;
  points: number;
  total_visits: number;
  total_spent: number;
  last_visit: string | null;
  business_name: string;
  business_id: string;
}

const CustomerDashboard = ({ phoneNumber, onBack }: CustomerDashboardProps) => {
  const { user, signOut } = useAuth();
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('customers')
          .select(`
            *,
            businesses:business_id (
              business_name
            )
          `)
          .eq('phone_number', phoneNumber || user.phone || '');

        if (error) throw error;

        const transformedData = data?.map(customer => ({
          phone_number: customer.phone_number,
          name: customer.name,
          points: customer.points,
          total_visits: customer.total_visits,
          total_spent: Number(customer.total_spent),
          last_visit: customer.last_visit,
          business_name: customer.businesses?.business_name || 'Unknown Business',
          business_id: customer.business_id
        })) || [];

        setCustomerData(transformedData);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        toast.error('Failed to load customer data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [user, phoneNumber]);

  const totalPoints = customerData.reduce((sum, customer) => sum + customer.points, 0);
  const totalVisits = customerData.reduce((sum, customer) => sum + customer.total_visits, 0);
  const totalSpent = customerData.reduce((sum, customer) => sum + customer.total_spent, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading your rewards...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">My Rewards</h1>
            <p className="text-white/80">Track your loyalty points and rewards</p>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Sign Out
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{totalPoints}</div>
              <p className="text-gray-600">Across all businesses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-500" />
                Total Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{totalVisits}</div>
              <p className="text-gray-600">Loyalty visits made</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="h-5 w-5 mr-2 text-green-500" />
                Total Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{formatKsh(totalSpent)}</div>
              <p className="text-gray-600">Lifetime spending</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="rewards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rewards" className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              My Rewards
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center">
              <Bot className="h-4 w-4 mr-2" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rewards" className="space-y-6">
            {customerData.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Star className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No rewards yet</h3>
                  <p className="text-gray-500">Visit participating businesses to start earning points!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {customerData.map((customer, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{customer.business_name}</span>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                          {customer.points} points
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Visits</p>
                          <p className="font-semibold">{customer.total_visits}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Spent</p>
                          <p className="font-semibold">{formatKsh(customer.total_spent)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Last Visit</p>
                          <p className="font-semibold">
                            {customer.last_visit 
                              ? new Date(customer.last_visit).toLocaleDateString()
                              : 'Never'
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <Badge variant={customer.points > 10 ? "default" : "secondary"}>
                            {customer.points > 10 ? "Gold Member" : "Member"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ai-chat">
            <CustomerAIChat 
              customerPhone={phoneNumber || user?.phone || ''}
              businessContext={customerData.length > 0 
                ? `Customer has accounts with: ${customerData.map(c => c.business_name).join(', ')}`
                : undefined
              }
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
