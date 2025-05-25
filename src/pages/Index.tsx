
import { useState } from "react";
import { Phone, Store, Gift, Users, TrendingUp, Star, MessageCircle, Mail, Figma } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import BusinessDashboard from "@/components/BusinessDashboard";
import CustomerLookup from "@/components/CustomerLookup";
import BusinessOwnerSetup from "@/components/BusinessOwnerSetup";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeView, setActiveView] = useState<'landing' | 'business' | 'customer' | 'setup'>('landing');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [businessOwnerPhone, setBusinessOwnerPhone] = useState('');
  const { toast } = useToast();

  const handleCustomerLookup = (phone: string) => {
    setPhoneNumber(phone);
    setActiveView('customer');
  };

  const handleBusinessSetup = () => {
    setActiveView('setup');
  };

  const handleWhatsAppContact = () => {
    const targetNumber = businessOwnerPhone || '1234567890';
    const message = encodeURIComponent("Hi! I'm interested in Tunza Rewards for my business. Can you help me get started?");
    window.open(`https://wa.me/${targetNumber}?text=${message}`, '_blank');
  };

  const handleSMSContact = () => {
    const targetNumber = businessOwnerPhone || '1234567890';
    const message = encodeURIComponent("Hi! I'm interested in Tunza Rewards for my business.");
    window.open(`sms:${targetNumber}?body=${message}`, '_blank');
  };

  const handleEmailSubscribe = () => {
    if (!email) {
      toast({
        title: "Please enter your email",
        description: "We need your email address to send you updates.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Thanks for subscribing!",
      description: "We'll keep you updated on Tunza Rewards.",
    });
    setEmail('');
  };

  if (activeView === 'business') {
    return <BusinessDashboard onBack={() => setActiveView('landing')} />;
  }

  if (activeView === 'customer') {
    return <CustomerLookup phoneNumber={phoneNumber} onBack={() => setActiveView('landing')} />;
  }

  if (activeView === 'setup') {
    return <BusinessOwnerSetup onBack={() => setActiveView('landing')} onComplete={(phone) => {
      setBusinessOwnerPhone(phone);
      setActiveView('business');
    }} />;
  }

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Simplified Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-5 w-16 h-16 md:w-32 md:h-32 bg-black opacity-3 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-8 w-20 h-20 md:w-40 md:h-40 bg-gray-300 opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 md:w-24 md:h-24 bg-black opacity-3 rounded-full blur-lg"></div>
        </div>
        
        <div className="relative px-3 py-8 sm:px-4 sm:py-12 lg:px-6 lg:py-16 xl:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-6">
              <Badge variant="outline" className="border-black text-black mb-4 px-3 py-1 text-xs sm:text-sm font-medium hover:bg-black hover:text-white transition-all duration-300">
                100% Free • No Hidden Costs • Forever
              </Badge>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
                <span className="inline-block hover:scale-105 transition-transform duration-300">Tunza</span>
                <span className="block text-gray-600 mt-1 text-lg sm:text-2xl md:text-3xl lg:text-4xl">Rewards</span>
              </h1>
              <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
                Turn every customer visit into lasting loyalty. Simple phone-based rewards that work for salons, barbershops, and local eateries.
              </p>
            </div>

            {/* Business Owner Phone Input */}
            <div className="mb-6 max-w-md mx-auto px-3">
              <Label htmlFor="businessPhone" className="block text-sm font-medium mb-2">Business Owner WhatsApp/SMS Number (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="businessPhone"
                  placeholder="+1234567890"
                  value={businessOwnerPhone}
                  onChange={(e) => setBusinessOwnerPhone(e.target.value)}
                  className="text-sm"
                />
                <Button
                  onClick={() => {
                    if (businessOwnerPhone) {
                      toast({
                        title: "Number saved!",
                        description: "Contact buttons will now use your number.",
                      });
                    }
                  }}
                  size="sm"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Save
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 px-3">
              <Button 
                onClick={handleBusinessSetup}
                size="lg" 
                className="bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg pulse-subtle text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6"
              >
                <Store className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                I'm a Business Owner
              </Button>
              <Button 
                onClick={() => setActiveView('customer')}
                variant="outline" 
                size="lg"
                className="border-2 border-black text-black hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6"
              >
                <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                I'm a Customer
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12 px-3">
              {[
                {
                  icon: Phone,
                  title: "Phone-Based Tracking",
                  description: "No apps to download. Just enter your phone number and start earning rewards instantly."
                },
                {
                  icon: Gift,
                  title: "Automatic Rewards",
                  description: "Earn points with every visit. Redeem for discounts, free services, or special perks."
                },
                {
                  icon: TrendingUp,
                  title: "Business Growth",
                  description: "Increase customer retention by 67% with our proven loyalty system."
                }
              ].map((feature, index) => (
                <Card 
                  key={index}
                  className="border-gray-200 hover:border-black transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105 group bg-white/80 backdrop-blur-sm"
                >
                  <CardHeader className="text-center pb-3">
                    <div className="mx-auto mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black group-hover:bg-gray-800 transition-all duration-300 group-hover:scale-105">
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg group-hover:text-black transition-colors duration-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center text-xs sm:text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-12 lg:py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 hover:scale-105 transition-transform duration-300">How It Works</h2>
            <p className="text-gray-600 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Simple, effective loyalty in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { step: "1", title: "Customer Visits", description: "Customer provides phone number at checkout" },
              { step: "2", title: "Points Added", description: "Automatic points based on purchase amount" },
              { step: "3", title: "Rewards Earned", description: "Redeem points for discounts and free services" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-black text-white rounded-full text-lg sm:text-2xl font-bold mb-4 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:bg-gray-800">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 group-hover:text-black transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base group-hover:text-gray-800 transition-colors duration-300 max-w-xs mx-auto">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact & Newsletter Section */}
      <div className="py-12 lg:py-16 bg-white">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Stay Connected</h2>
              
              {/* Newsletter Signup */}
              <Card className="mb-6 border-2 hover:border-black transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Get Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 border-2 focus:border-black transition-all duration-300 text-sm"
                    />
                    <Button 
                      onClick={handleEmailSubscribe}
                      className="bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                    >
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* WhatsApp Contact */}
                <Card className="border-2 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <MessageCircle className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-green-500 mb-2 bounce-gentle" />
                      <h3 className="text-sm sm:text-base font-bold mb-2">WhatsApp</h3>
                      <Button 
                        onClick={handleWhatsAppContact}
                        size="sm"
                        className="w-full bg-green-500 text-white hover:bg-green-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-xs"
                      >
                        Chat Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* SMS Contact */}
                <Card className="border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <Phone className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-blue-500 mb-2 pulse-subtle" />
                      <h3 className="text-sm sm:text-base font-bold mb-2">SMS</h3>
                      <Button 
                        onClick={handleSMSContact}
                        size="sm"
                        className="w-full bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-xs"
                      >
                        Send SMS
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Benefits & Figma Integration */}
            <div>
              <div className="flex items-center mb-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold hover:scale-105 transition-transform duration-300">Perfect for Local Businesses</h2>
                <Figma className="ml-3 h-6 w-6 sm:h-8 sm:w-8 text-purple-600 pulse-subtle" />
              </div>
              
              <div className="space-y-4">
                {[
                  { title: "Salons & Spas", description: "Reward regular clients with service discounts and exclusive perks" },
                  { title: "Barbershops", description: "Build a loyal customer base with points for every cut and shave" },
                  { title: "Local Eateries", description: "Encourage repeat visits with meal rewards and special offers" }
                ].map((business, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-black rounded-full flex items-center justify-center mt-1 group-hover:scale-105 transition-transform duration-300">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg mb-1 group-hover:text-black transition-colors duration-300">{business.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm group-hover:text-gray-800 transition-colors duration-300">{business.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <Star className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-black mb-3 pulse-subtle" />
                  <h3 className="text-lg sm:text-2xl font-bold mb-3">Ready to Start?</h3>
                  <p className="text-gray-600 mb-4 text-xs sm:text-sm max-w-md mx-auto">
                    Join hundreds of local businesses already using Tunza Rewards to build customer loyalty.
                  </p>
                  <Button 
                    onClick={handleBusinessSetup}
                    className="w-full bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm py-2"
                  >
                    Get Started Free
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 lg:py-12">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 hover:scale-105 transition-transform duration-300">Tunza Rewards</h3>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl mx-auto">
              Building stronger communities, one loyal customer at a time.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={handleWhatsAppContact}
                variant="outline" 
                size="sm"
                className="border-white text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 text-xs"
              >
                <MessageCircle className="mr-2 h-3 w-3" />
                WhatsApp Support
              </Button>
              <Button 
                onClick={handleSMSContact}
                variant="outline" 
                size="sm"
                className="border-white text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 text-xs"
              >
                <Phone className="mr-2 h-3 w-3" />
                SMS Support
              </Button>
              <Button 
                onClick={() => window.open('mailto:support@tunza.com', '_blank')}
                variant="outline" 
                size="sm"
                className="border-white text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 text-xs"
              >
                <Mail className="mr-2 h-3 w-3" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
