
import { useState } from "react";
import { ArrowLeft, Gift, Star, Phone, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface CustomerLookupProps {
  phoneNumber: string;
  onBack: () => void;
}

const CustomerLookup = ({ phoneNumber, onBack }: CustomerLookupProps) => {
  const [searchPhone, setSearchPhone] = useState(phoneNumber);
  const [customerData, setCustomerData] = useState<any>(null);

  // Mock data - will be replaced with Supabase data
  const mockCustomer = {
    name: "Sarah Johnson",
    phone: "(555) 123-4567",
    totalPoints: 480,
    totalVisits: 12,
    joinDate: "March 2024",
    tier: "Gold",
    nextReward: { points: 520, reward: "Free Service" },
    recentVisits: [
      { date: "2024-01-15", business: "Sunny Salon", points: 45, amount: 65.00 },
      { date: "2024-01-08", business: "Downtown Barber", points: 25, amount: 35.00 },
      { date: "2024-01-02", business: "Sunny Salon", points: 55, amount: 85.00 }
    ],
    availableRewards: [
      { id: 1, business: "Sunny Salon", reward: "10% off next service", pointsCost: 100 },
      { id: 2, business: "Downtown Barber", reward: "Free beard trim", pointsCost: 150 },
      { id: 3, business: "Local Cafe", reward: "Free coffee", pointsCost: 50 }
    ]
  };

  const handleLookup = () => {
    if (!searchPhone) return;
    
    // Mock lookup - will be replaced with Supabase
    if (searchPhone === "(555) 123-4567" || searchPhone === mockCustomer.phone) {
      setCustomerData(mockCustomer);
    } else {
      setCustomerData({ 
        phone: searchPhone, 
        name: "New Customer", 
        totalPoints: 0, 
        totalVisits: 0,
        recentVisits: [],
        availableRewards: []
      });
    }
  };

  const progressToNextReward = customerData ? 
    (customerData.totalPoints / (customerData.nextReward?.points || 500)) * 100 : 0;

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
                  {customerData.tier && (
                    <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">
                      {customerData.tier} Member
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
                    <div className="text-3xl font-bold text-black mb-1">{customerData.joinDate || 'New'}</div>
                    <p className="text-gray-600">Member Since</p>
                  </div>
                </div>

                {customerData.nextReward && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg animate-scale-in">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Progress to Next Reward</span>
                      <span className="text-sm text-gray-600">
                        {customerData.totalPoints} / {customerData.nextReward.points} points
                      </span>
                    </div>
                    <Progress value={progressToNextReward} className="mb-2" />
                    <p className="text-sm text-gray-600">
                      {customerData.nextReward.points - customerData.totalPoints} points until: {customerData.nextReward.reward}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Available Rewards */}
            {customerData.availableRewards && customerData.availableRewards.length > 0 && (
              <Card className="animate-fade-in" style={{animationDelay: '0.3s'}}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="h-5 w-5 mr-2" />
                    Available Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {customerData.availableRewards.map((reward: any, index: number) => (
                      <div
                        key={reward.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-black transition-colors duration-200 animate-fade-in"
                        style={{animationDelay: `${0.4 + index * 0.1}s`}}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{reward.business}</h4>
                          <Badge variant="outline">{reward.pointsCost} points</Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{reward.reward}</p>
                        <Button
                          className="w-full bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-200"
                          disabled={customerData.totalPoints < reward.pointsCost}
                        >
                          {customerData.totalPoints >= reward.pointsCost ? 'Redeem' : 'Not Enough Points'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Visits */}
            {customerData.recentVisits && customerData.recentVisits.length > 0 && (
              <Card className="animate-fade-in" style={{animationDelay: '0.4s'}}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Recent Visits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {customerData.recentVisits.map((visit: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-fade-in"
                        style={{animationDelay: `${0.5 + index * 0.1}s`}}
                      >
                        <div>
                          <div className="font-medium">{visit.business}</div>
                          <div className="text-sm text-gray-600">{visit.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">+{visit.points} points</div>
                          <div className="text-sm text-gray-600">${visit.amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {customerData.totalVisits === 0 && (
              <Card className="text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
                <CardContent className="py-8">
                  <Star className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Welcome to Local Love Rewards!</h3>
                  <p className="text-gray-600 mb-4">
                    Start earning points with your first visit to any participating business.
                  </p>
                  <Badge variant="outline">New Member</Badge>
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
