import { useState } from "react";
import { ArrowLeft, Users, TrendingUp, DollarSign, Star, Phone, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface BusinessDashboardProps {
  businessPhone?: string | null;
  onBack: () => void;
}

const BusinessDashboard = ({ businessPhone, onBack }: BusinessDashboardProps) => {
  const [searchPhone, setSearchPhone] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Mock data - will be replaced with Supabase data
  const stats = {
    totalCustomers: 247,
    monthlyVisits: 89,
    averageSpend: 45.60,
    rewardsClaimed: 23
  };

  const recentCustomers = [
    { phone: "(555) 123-4567", name: "Sarah Johnson", visits: 12, points: 480, lastVisit: "2 days ago" },
    { phone: "(555) 987-6543", name: "Mike Chen", visits: 8, points: 320, lastVisit: "1 week ago" },
    { phone: "(555) 456-7890", name: "Emma Davis", visits: 15, points: 600, lastVisit: "Today" }
  ];

  const handleAddVisit = () => {
    if (!searchPhone || !purchaseAmount) return;
    
    // This will be replaced with Supabase integration
    console.log('Adding visit:', { phone: searchPhone, amount: purchaseAmount });
    
    // Reset form
    setSearchPhone('');
    setPurchaseAmount('');
    setSelectedCustomer(null);
  };

  const handleSearchCustomer = () => {
    if (!searchPhone) return;
    
    // Mock customer lookup - will be replaced with Supabase
    const customer = recentCustomers.find(c => c.phone === searchPhone);
    setSelectedCustomer(customer || { phone: searchPhone, name: "New Customer", visits: 0, points: 0 });
  };

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
                <h1 className="text-2xl font-bold text-black">Business Dashboard</h1>
                <p className="text-gray-600">Manage your loyalty program</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-200 animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 animate-fade-in" style={{animationDelay: '0.1s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Visits</CardTitle>
              <Star className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyVisits}</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Spend</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.averageSpend}</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rewards Claimed</CardTitle>
              <Star className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rewardsClaimed}</div>
              <p className="text-xs text-gray-600">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Visit Form */}
          <Card className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add Customer Visit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="phone">Customer Phone</Label>
                  <Input
                    id="phone"
                    placeholder="(555) 123-4567"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleSearchCustomer}
                  className="mt-6 bg-black text-white hover:bg-gray-800"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {selectedCustomer && (
                <div className="p-4 bg-gray-50 rounded-lg animate-scale-in">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{selectedCustomer.name}</span>
                    <Badge variant="outline">{selectedCustomer.visits} visits</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Current Points: {selectedCustomer.points}
                  </p>
                </div>
              )}

              <div>
                <Label htmlFor="amount">Purchase Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="25.00"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                />
              </div>

              <Button
                onClick={handleAddVisit}
                className="w-full bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-200"
                disabled={!searchPhone || !purchaseAmount}
              >
                Add Visit & Points
              </Button>
            </CardContent>
          </Card>

          {/* Recent Customers */}
          <Card className="animate-fade-in" style={{animationDelay: '0.5s'}}>
            <CardHeader>
              <CardTitle>Recent Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCustomers.map((customer, index) => (
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
