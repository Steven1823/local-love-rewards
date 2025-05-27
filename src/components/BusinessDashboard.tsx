
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
  const [customers, setCustomers] = useState<any[]>([]);

  // Real stats that start at 0
  const stats = {
    totalCustomers: customers.length,
    monthlyVisits: customers.reduce((sum, c) => sum + (c.visits || 0), 0),
    averageSpend: customers.length > 0 ? customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0) / customers.length : 0,
    rewardsClaimed: customers.reduce((sum, c) => sum + (c.rewardsClaimed || 0), 0)
  };

  const handleAddVisit = () => {
    if (!searchPhone || !purchaseAmount) return;
    
    const amount = parseFloat(purchaseAmount);
    const points = Math.floor(amount); // 1 point per dollar spent
    
    // Find existing customer or create new one
    const existingCustomerIndex = customers.findIndex(c => c.phone === searchPhone);
    
    if (existingCustomerIndex >= 0) {
      // Update existing customer
      const updatedCustomers = [...customers];
      updatedCustomers[existingCustomerIndex] = {
        ...updatedCustomers[existingCustomerIndex],
        visits: (updatedCustomers[existingCustomerIndex].visits || 0) + 1,
        points: (updatedCustomers[existingCustomerIndex].points || 0) + points,
        totalSpent: (updatedCustomers[existingCustomerIndex].totalSpent || 0) + amount,
        lastVisit: "Today"
      };
      setCustomers(updatedCustomers);
    } else {
      // Add new customer
      const newCustomer = {
        phone: searchPhone,
        name: selectedCustomer?.name || "Customer",
        visits: 1,
        points: points,
        totalSpent: amount,
        lastVisit: "Today",
        rewardsClaimed: 0
      };
      setCustomers([...customers, newCustomer]);
    }
    
    // Reset form
    setSearchPhone('');
    setPurchaseAmount('');
    setSelectedCustomer(null);
  };

  const handleSearchCustomer = () => {
    if (!searchPhone) return;
    
    const customer = customers.find(c => c.phone === searchPhone);
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
              <div className="text-2xl font-bold">${stats.averageSpend.toFixed(2)}</div>
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
                    Current Points: {selectedCustomer.points || 0}
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
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
