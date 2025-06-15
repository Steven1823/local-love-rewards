
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { USD_TO_KSH_RATE } from "@/utils/currency";

interface Customer {
  phone: string;
  name: string;
  visits: number;
  points: number;
  totalSpent: number;
  lastVisit: string;
  rewardsClaimed: number;
}

interface AddVisitFormProps {
  customers: Customer[];
  onAddVisit: (phone: string, amountUSD: number) => Promise<void>;
}

const AddVisitForm = ({ customers, onAddVisit }: AddVisitFormProps) => {
  const [searchPhone, setSearchPhone] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddVisit = async () => {
    if (!searchPhone || !purchaseAmount) return;
    
    try {
      setLoading(true);
      
      // Convert KSh to USD for internal processing
      const kshAmount = parseFloat(purchaseAmount);
      const usdAmount = kshAmount / USD_TO_KSH_RATE;
      
      await onAddVisit(searchPhone, usdAmount);
      
      // Reset form
      setSearchPhone('');
      setPurchaseAmount('');
      setSelectedCustomer(null);
    } catch (error) {
      console.error('Error adding visit:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCustomer = () => {
    if (!searchPhone) return;
    
    const customer = customers.find(c => c.phone === searchPhone);
    setSelectedCustomer(customer || { 
      phone: searchPhone, 
      name: "New Customer", 
      visits: 0, 
      points: 0,
      totalSpent: 0,
      lastVisit: 'Never',
      rewardsClaimed: 0
    });
  };

  return (
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
              placeholder="+254712345678"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
            />
          </div>
          <Button
            onClick={handleSearchCustomer}
            className="mt-6 bg-black text-white hover:bg-gray-800"
            disabled={loading}
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
          <Label htmlFor="amount">Purchase Amount (KSh)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="3250"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter amount in Kenyan Shillings
          </p>
        </div>

        <Button
          onClick={handleAddVisit}
          className="w-full bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-200"
          disabled={!searchPhone || !purchaseAmount || loading}
        >
          {loading ? 'Adding...' : 'Add Visit & Points'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddVisitForm;
