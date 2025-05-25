
import { useState } from "react";
import { ArrowLeft, Store, Phone, MessageCircle, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface BusinessOwnerSetupProps {
  onBack: () => void;
  onComplete: (phone: string) => void;
}

const BusinessOwnerSetup = ({ onBack, onComplete }: BusinessOwnerSetupProps) => {
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleNext = () => {
    if (step === 1) {
      if (!businessName || !ownerName) {
        toast({
          title: "Please fill all fields",
          description: "Business name and owner name are required.",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!phoneNumber) {
        toast({
          title: "Phone number required",
          description: "Please enter your contact phone number.",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
    }
  };

  const handleComplete = () => {
    toast({
      title: "Setup Complete!",
      description: "Your business is now ready to use Tunza Rewards.",
    });
    onComplete(phoneNumber);
  };

  const handleSendTestSMS = () => {
    if (!phoneNumber) {
      toast({
        title: "Enter phone number first",
        description: "Please enter your phone number to test SMS.",
        variant: "destructive",
      });
      return;
    }
    const message = encodeURIComponent(`Hi ${ownerName}! Welcome to Tunza Rewards. Your business ${businessName} is now set up!`);
    window.open(`sms:${phoneNumber}?body=${message}`, '_blank');
  };

  const handleSendTestWhatsApp = () => {
    if (!phoneNumber) {
      toast({
        title: "Enter phone number first",
        description: "Please enter your phone number to test WhatsApp.",
        variant: "destructive",
      });
      return;
    }
    const message = encodeURIComponent(`Hi ${ownerName}! Welcome to Tunza Rewards. Your business ${businessName} is now set up!`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
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
                <h1 className="text-2xl font-bold text-black">Business Setup</h1>
                <p className="text-gray-600">Step {step} of 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-300 ${
                  step >= num ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > num ? <CheckCircle className="h-4 w-4" /> : num}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-black h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Business Information */}
        {step === 1 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Store className="h-5 w-5 mr-2" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  placeholder="e.g., Sunny Salon"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="ownerName">Owner Name *</Label>
                <Input
                  id="ownerName"
                  placeholder="Your full name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address">Business Address (Optional)</Label>
                <Input
                  id="address"
                  placeholder="123 Main St, City, State"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <Button
                onClick={handleNext}
                className="w-full bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-200"
              >
                Next: Contact Information
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Contact Information */}
        {step === 2 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phoneNumber">WhatsApp/SMS Number *</Label>
                <Input
                  id="phoneNumber"
                  placeholder="+1234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <p className="text-xs text-gray-600 mt-1">
                  This number will be used for customer support and notifications
                </p>
              </div>
              <div>
                <Label htmlFor="email">Email Address (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="owner@business.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  onClick={handleSendTestSMS}
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transform hover:scale-105 transition-all duration-200"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Test SMS
                </Button>
                <Button
                  onClick={handleSendTestWhatsApp}
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white transform hover:scale-105 transition-all duration-200"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Test WhatsApp
                </Button>
              </div>
              <Button
                onClick={handleNext}
                className="w-full bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-200"
              >
                Next: Review & Complete
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review & Complete */}
        {step === 3 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Review & Complete
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div><strong>Business:</strong> {businessName}</div>
                <div><strong>Owner:</strong> {ownerName}</div>
                <div><strong>Phone:</strong> {phoneNumber}</div>
                {email && <div><strong>Email:</strong> {email}</div>}
                {address && <div><strong>Address:</strong> {address}</div>}
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Your business dashboard will be ready to use</li>
                  <li>• Customers can start earning points immediately</li>
                  <li>• You'll receive notifications via WhatsApp/SMS</li>
                  <li>• Track customer visits and manage rewards</li>
                </ul>
              </div>

              <Button
                onClick={handleComplete}
                className="w-full bg-green-600 text-white hover:bg-green-700 transform hover:scale-105 transition-all duration-200 animate-pulse"
              >
                Complete Setup & Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BusinessOwnerSetup;
