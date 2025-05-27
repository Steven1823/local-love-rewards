
import { useState } from "react";
import { ArrowLeft, Gift, Star, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface CustomerLookupProps {
  phoneNumber?: string;
  onBack: () => void;
}

const CustomerLookup = ({ phoneNumber = "", onBack }: CustomerLookupProps) => {
  const [searchPhone, setSearchPhone] = useState(phoneNumber);
  const [customerData, setCustomerData] = useState<any>(null);

  const handleLookup = () => {
    if (!searchPhone) return;
    
    // In a real app, this would fetch from your backend
    // For now, return a new customer profile
    setCustomerData({ 
      phone: searchPhone, 
      name: "New Customer", 
      totalPoints: 0, 
      totalVisits: 0,
      joinDate: new Date().toLocaleDateString(),
      recentVisits: [],
      availableRewards: []
    });
  };

  const progressToNextReward = customerData && customerData.totalPoints > 0 ? 
    (customerData.totalPoints / 100) * 100 : 0; // 100 points for first reward

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-black">Customer Rewards</h1>
                <p className="text-gray-600">Check your points and rewards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Phone Number Lookup */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Enter Your Phone Number
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  placeholder="(555) 123-4567"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                />
              </div>
              <Button
                onClick={handleLookup}
                className="mt-6 bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-200"
              >
                Look Up Rewards
              </Button>
            </div>
          </CardContent>
        </Card>

        {customerData && (
          <div className="space-y-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            {/* Customer Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Welcome, {customerData.name}!</span>
                  {customerData.totalPoints >= 100 && (
                    <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">
                      Bronze Member
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-1">{customerData.totalPoints}</div>
                    <p className="text-gray-600">Total Points</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-1">{customerData.totalVisits}</div>
                    <p className="text-gray-600">Total Visits</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-1">{customerData.joinDate}</div>
                    <p className="text-gray-600">Member Since</p>
                  </div>
                </div>

                {customerData.totalPoints < 100 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg animate-scale-in">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Progress to First Reward</span>
                      <span className="text-sm text-gray-600">
                        {customerData.totalPoints} / 100 points
                      </span>
                    </div>
                    <Progress value={progressToNextReward} className="mb-2" />
                    <p className="text-sm text-gray-600">
                      {100 - customerData.totalPoints} points until your first reward!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {customerData.totalVisits === 0 && (
              <Card className="text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
                <CardContent className="py-8">
                  <Star className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Welcome to Tunza Rewards!</h3>
                  <p className="text-gray-600 mb-4">
                    Start earning points with your first visit to any participating business.
                  </p>
                  <Badge variant="outline">New Member</Badge>
                </CardContent>
              </Card>
            )}

            {customerData.totalVisits > 0 && (
              <Card className="animate-fade-in" style={{animationDelay: '0.4s'}}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Visit History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-gray-600">Your visit history will appear here after your first purchase.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerLookup;
