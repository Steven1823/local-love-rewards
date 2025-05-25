
import { useState } from "react";
import { Phone, Store, Gift, Users, TrendingUp, Star, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BusinessDashboard from "@/components/BusinessDashboard";
import CustomerLookup from "@/components/CustomerLookup";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeView, setActiveView] = useState<'landing' | 'business' | 'customer'>('landing');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleCustomerLookup = (phone: string) => {
    setPhoneNumber(phone);
    setActiveView('customer');
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Hi! I'm interested in Tunza Rewards for my business. Can you help me get started?");
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
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
    
    // Here you would integrate with your email service
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

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-black opacity-5 rounded-full animate-[pulse_4s_ease-in-out_infinite] blur-xl"></div>
          <div className="absolute bottom-32 right-16 w-40 h-40 bg-gray-300 opacity-10 rounded-full animate-[bounce_6s_ease-in-out_infinite] blur-2xl" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-black opacity-5 rounded-full animate-[spin_20s_linear_infinite] blur-lg"></div>
        </div>
        
        <div className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24 xl:py-32">
          <div className="mx-auto max-w-6xl text-center">
            <div className="mb-8 animate-fade-in">
              <Badge variant="outline" className="border-black text-black mb-6 px-4 py-2 text-sm font-medium animate-[bounce_2s_ease-in-out_infinite] hover:bg-black hover:text-white transition-all duration-300">
                100% Free • No Hidden Costs • Forever
              </Badge>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 animate-[scale-in_0.8s_ease-out] leading-tight">
                <span className="inline-block transform hover:scale-110 transition-transform duration-300">Tunza</span>
                <span className="block text-gray-600 mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl animate-[fade-in_1s_ease-out_0.5s_both]">Rewards</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-[fade-in_1s_ease-out_0.8s_both] px-4">
                Turn every customer visit into lasting loyalty. Simple phone-based rewards that work for salons, barbershops, and local eateries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-[fade-in_1s_ease-out_1.2s_both] px-4">
              <Button 
                onClick={() => setActiveView('business')}
                size="lg" 
                className="bg-black text-white hover:bg-gray-800 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg animate-[pulse_3s_ease-in-out_infinite] text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
              >
                <Store className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                I'm a Business Owner
              </Button>
              <Button 
                onClick={() => setActiveView('customer')}
                variant="outline" 
                size="lg"
                className="border-2 border-black text-black hover:bg-black hover:text-white transform hover:scale-105 hover:shadow-2xl transition-all duration-300 text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
              >
                <Phone className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                I'm a Customer
              </Button>
            </div>

            {/* Enhanced Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 animate-[fade-in_1s_ease-out_1.5s_both] px-4">
              {[
                {
                  icon: Phone,
                  title: "Phone-Based Tracking",
                  description: "No apps to download. Just enter your phone number and start earning rewards instantly.",
                  delay: "0s"
                },
                {
                  icon: Gift,
                  title: "Automatic Rewards",
                  description: "Earn points with every visit. Redeem for discounts, free services, or special perks.",
                  delay: "0.2s"
                },
                {
                  icon: TrendingUp,
                  title: "Business Growth",
                  description: "Increase customer retention by 67% with our proven loyalty system.",
                  delay: "0.4s"
                }
              ].map((feature, index) => (
                <Card 
                  key={index}
                  className="border-gray-200 hover:border-black transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 group animate-[fade-in_0.8s_ease-out] bg-white/80 backdrop-blur-sm"
                  style={{animationDelay: feature.delay}}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-black group-hover:bg-gray-800 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
                      <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl group-hover:text-black transition-colors duration-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center text-sm sm:text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
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
      <div className="py-16 lg:py-24 bg-gradient-to-r from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 animate-[fade-in_0.8s_ease-out] transform hover:scale-105 transition-transform duration-300">How It Works</h2>
            <p className="text-gray-600 text-lg sm:text-xl lg:text-2xl animate-[fade-in_0.8s_ease-out_0.3s_both] max-w-3xl mx-auto">
              Simple, effective loyalty in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "1",
                title: "Customer Visits",
                description: "Customer provides phone number at checkout",
                delay: "0.2s"
              },
              {
                step: "2", 
                title: "Points Added",
                description: "Automatic points based on purchase amount",
                delay: "0.4s"
              },
              {
                step: "3",
                title: "Rewards Earned", 
                description: "Redeem points for discounts and free services",
                delay: "0.6s"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="text-center animate-[fade-in_0.8s_ease-out] group"
                style={{animationDelay: item.delay}}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-full text-2xl sm:text-3xl font-bold mb-6 transform hover:scale-125 hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-2xl group-hover:bg-gray-800">
                  {item.step}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 group-hover:text-black transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 text-base sm:text-lg group-hover:text-gray-800 transition-colors duration-300 max-w-xs mx-auto">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact & Newsletter Section */}
      <div className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-[fade-in_0.8s_ease-out]">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 transform hover:scale-105 transition-transform duration-300">Stay Connected</h2>
              
              {/* Newsletter Signup */}
              <Card className="mb-8 border-2 hover:border-black transition-all duration-300 hover:shadow-xl transform hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Mail className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    Get Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 border-2 focus:border-black transition-all duration-300"
                    />
                    <Button 
                      onClick={handleEmailSubscribe}
                      className="bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp Contact */}
              <Card className="border-2 hover:border-black transition-all duration-300 hover:shadow-xl transform hover:scale-105">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <MessageCircle className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-black mb-4 animate-[bounce_2s_ease-in-out_infinite]" />
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">Need Help?</h3>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">
                      Chat with us on WhatsApp for instant support and setup assistance.
                    </p>
                    <Button 
                      onClick={handleWhatsAppContact}
                      className="w-full bg-green-500 text-white hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Chat on WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Section */}
            <div className="animate-[fade-in_0.8s_ease-out_0.3s_both]">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 transform hover:scale-105 transition-transform duration-300">Perfect for Local Businesses</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Salons & Spas",
                    description: "Reward regular clients with service discounts and exclusive perks"
                  },
                  {
                    title: "Barbershops", 
                    description: "Build a loyal customer base with points for every cut and shave"
                  },
                  {
                    title: "Local Eateries",
                    description: "Encourage repeat visits with meal rewards and special offers"
                  }
                ].map((business, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 animate-[fade-in_0.6s_ease-out] group"
                    style={{animationDelay: `${0.2 + index * 0.1}s`}}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg sm:text-xl mb-2 group-hover:text-black transition-colors duration-300">{business.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base group-hover:text-gray-800 transition-colors duration-300">{business.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl animate-[scale-in_0.8s_ease-out_0.8s_both] hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <Star className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-black mb-4 animate-[pulse_2s_ease-in-out_infinite]" />
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start?</h3>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
                    Join hundreds of local businesses already using Tunza Rewards to build customer loyalty.
                  </p>
                  <Button 
                    onClick={() => setActiveView('business')}
                    className="w-full bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg py-3 sm:py-4"
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
      <footer className="bg-black text-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 animate-[fade-in_0.8s_ease-out] transform hover:scale-105 transition-transform duration-300">Tunza Rewards</h3>
            <p className="text-gray-400 text-base sm:text-lg lg:text-xl animate-[fade-in_0.8s_ease-out_0.3s_both] max-w-2xl mx-auto">
              Building stronger communities, one loyal customer at a time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsAppContact}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Support
              </Button>
              <Button 
                onClick={() => window.open('mailto:support@tunza.com', '_blank')}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300"
              >
                <Mail className="mr-2 h-4 w-4" />
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
