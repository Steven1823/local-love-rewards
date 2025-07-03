
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, DollarSign, Gift } from "lucide-react";
import { toast } from "sonner";

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
  onAddVisit: (phoneNumber: string, amountUSD: number, customerName?: string, referralCode?: string) => Promise<void>;
}

const AddVisitForm = ({ customers, onAddVisit }: AddVisitFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [amountUSD, setAmountUSD] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if customer exists
  const existingCustomer = customers.find(c => c.phone === phoneNumber);
  const isNewCustomer = phoneNumber && !existingCustomer;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim() || !amountUSD.trim()) {
      toast.error("Please fill in phone number and amount");
      return;
    }

    const amount = parseFloat(amountUSD);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // For new customers, require a name
    if (isNewCustomer && !customerName.trim()) {
      toast.error("Please enter the customer's name");
      return;
    }

    try {
      setLoading(true);
      await onAddVisit(
        phoneNumber.trim(), 
        amount, 
        customerName.trim() || undefined,
        referralCode.trim() || undefined
      );
      
      // Reset form
      setPhoneNumber("");
      setCustomerName("");
      setAmountUSD("");
      setReferralCode("");
    } catch (error) {
      console.error('Error adding visit:', error);
    } finally {
      setLoading(false);
    }
  };

  const pointsToEarn = amountUSD ? Math.floor(parseFloat(amountUSD) / 5) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add Customer Visit
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Customer Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="e.g., +254700000000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            {existingCustomer && (
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                Existing customer: {existingCustomer.name}
              </Badge>
            )}
            {isNewCustomer && (
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                New customer
              </Badge>
            )}
          </div>

          {/* Customer Name - Required for new customers, optional for existing */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Customer Name {isNewCustomer && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter customer's full name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required={isNewCustomer}
            />
            {existingCustomer && customerName && (
              <p className="text-sm text-gray-600">
                This will update the customer's name from "{existingCustomer.name}" to "{customerName}"
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount Spent (USD)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amountUSD}
                onChange={(e) => setAmountUSD(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            {pointsToEarn > 0 && (
              <p className="text-sm text-green-600">
                Customer will earn {pointsToEarn} point{pointsToEarn !== 1 ? 's' : ''} (1 point per $5 spent)
              </p>
            )}
          </div>

          {/* Referral Code - Only for new customers */}
          {isNewCustomer && (
            <div className="space-y-2">
              <Label htmlFor="referral" className="flex items-center">
                <Gift className="h-4 w-4 mr-1" />
                Referral Code (Optional)
              </Label>
              <Input
                id="referral"
                type="text"
                placeholder="Enter referral code if any"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                maxLength={6}
              />
              <p className="text-sm text-gray-600">
                If this customer was referred by another customer, enter the referral code here. 
                Both customers will earn bonus points!
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? "Adding Visit..." : "Add Visit"}
          </Button>
        </form>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Enter customer's phone number and amount spent</li>
            <li>• New customers automatically get a referral code</li>
            <li>• Customers earn 1 point for every $5 spent</li>
            <li>• Referral bonuses: Referrer gets 50 points, new customer gets 25 points</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddVisitForm;
