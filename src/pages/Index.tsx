
import { useState } from "react";
import { Phone, Store, Gift, Users, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BusinessDashboard from "@/components/BusinessDashboard";
import CustomerLookup from "@/components/CustomerLookup";

const Index = () => {
  const [activeView, setActiveView] = useState<'landing' | 'business' | 'customer'>('landing');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCustomerLookup = (phone: string) => {
    setPhoneNumber(phone);
    setActiveView('customer');
  };

  if (activeView === 'business') {
    return <BusinessDashboard onBack={() => setActiveView('landing')} />;
  }

  if (activeView === 'customer') {
    return <CustomerLookup phoneNumber={phoneNumber} onBack={() => setActiveView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(0,0,0,0.1),transparent)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(0,0,0,0.05),transparent)] animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 animate-fade-in">
              <Badge variant="outline" className="border-black text-black mb-4 animate-bounce">
                Free Forever • No Setup Fees
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6 animate-scale-in">
                Local Love
                <span className="block text-gray-600 mt-2">Rewards</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.3s'}}>
                Turn every customer visit into lasting loyalty. Simple phone-based rewards that work for salons, barbershops, and local eateries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <Button 
                onClick={() => setActiveView('business')}
                size="lg" 
                className="bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Store className="mr-2 h-5 w-5" />
                I'm a Business Owner
              </Button>
              <Button 
                onClick={() => setActiveView('customer')}
                variant="outline" 
                size="lg"
                className="border-black text-black hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-200"
              >
                <Phone className="mr-2 h-5 w-5" />
                I'm a Customer
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-fade-in" style={{animationDelay: '0.9s'}}>
              <Card className="border-gray-200 hover:border-black transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Phone-Based Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    No apps to download. Just enter your phone number and start earning rewards instantly.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-gray-200 hover:border-black transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1" style={{animationDelay: '0.1s'}}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Automatic Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Earn points with every visit. Redeem for discounts, free services, or special perks.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-gray-200 hover:border-black transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1" style={{animationDelay: '0.2s'}}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Business Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Increase customer retention by 67% with our proven loyalty system.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 animate-fade-in">How It Works</h2>
            <p className="text-gray-600 text-lg animate-fade-in" style={{animationDelay: '0.2s'}}>
              Simple, effective loyalty in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full text-2xl font-bold mb-4 transform hover:scale-110 transition-transform duration-200">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Visits</h3>
              <p className="text-gray-600">Customer provides phone number at checkout</p>
            </div>

            <div className="text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full text-2xl font-bold mb-4 transform hover:scale-110 transition-transform duration-200">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Points Added</h3>
              <p className="text-gray-600">Automatic points based on purchase amount</p>
            </div>

            <div className="text-center animate-fade-in" style={{animationDelay: '0.5s'}}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full text-2xl font-bold mb-4 transform hover:scale-110 transition-transform duration-200">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Rewards Earned</h3>
              <p className="text-gray-600">Redeem points for discounts and free services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6">Perfect for Local Businesses</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-black rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Salons & Spas</h3>
                    <p className="text-gray-600">Reward regular clients with service discounts and exclusive perks</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-black rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Barbershops</h3>
                    <p className="text-gray-600">Build a loyal customer base with points for every cut and shave</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-black rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Local Eateries</h3>
                    <p className="text-gray-600">Encourage repeat visits with meal rewards and special offers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="text-center">
                <Star className="mx-auto h-16 w-16 text-black mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                <p className="text-gray-600 mb-6">
                  Join hundreds of local businesses already using Local Love Rewards to build customer loyalty.
                </p>
                <Button 
                  onClick={() => setActiveView('business')}
                  className="w-full bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-200"
                >
                  Get Started Free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold mb-2">Local Love Rewards</h3>
          <p className="text-gray-400">Building stronger communities, one loyal customer at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
