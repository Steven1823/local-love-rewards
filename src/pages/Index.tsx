
import { useState } from "react";
import { Phone, Store, Gift, Users, TrendingUp, Star, MessageCircle, Mail, Figma, Sparkles, Zap, Heart } from "lucide-react";
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
      title: "🎉 Welcome to the Future!",
      description: "You're now part of the Tunza revolution!",
    });
    setEmail('');
    
    // Wow moment - confetti effect
    createConfettiEffect();
  };

  const createConfettiEffect = () => {
    // Create multiple colored particles
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'fixed pointer-events-none z-50';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = ['#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 5)];
      confetti.style.animation = `confetti-fall ${2 + Math.random() * 3}s linear forwards`;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden relative">
      {/* Enhanced Animated Background Elements with Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-purple-500 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-blue-500 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-pink-500 rounded-full opacity-20 blur-2xl animate-float"></div>
        <div className="absolute top-2/3 right-1/4 w-48 h-48 bg-cyan-400 rounded-full opacity-15 blur-xl animate-bounce-gentle"></div>
        
        {/* Floating Sparkles */}
        <div className="absolute top-20 left-20 animate-float">
          <Sparkles className="h-6 w-6 text-yellow-400 opacity-70" />
        </div>
        <div className="absolute top-40 right-40 animate-bounce-gentle">
          <Zap className="h-8 w-8 text-purple-400 opacity-60" />
        </div>
        <div className="absolute bottom-32 left-32 animate-pulse-subtle">
          <Heart className="h-5 w-5 text-pink-400 opacity-80" />
        </div>
      </div>

      {/* Hero Section with Enhanced Animations */}
      <div className="relative px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <Badge variant="outline" className="border-purple-400 text-purple-300 mb-6 px-6 py-3 text-sm font-medium bg-black/30 backdrop-blur-sm animate-glow hover:scale-110 transition-all duration-300">
              🚀 100% Free For Now • No Hidden Costs • Revolutionary
            </Badge>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
              Tunza
              <span className="block text-3xl sm:text-4xl lg:text-6xl mt-2 text-white/90 animate-slide-in-left">Rewards</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              Turn every customer visit into lasting loyalty. Simple phone-based rewards that work for any business.
            </p>
          </div>

          {/* Business Owner Phone Input with Glow Effect */}
          <div className="mb-8 max-w-md mx-auto animate-scale-in">
            <Label htmlFor="businessPhone" className="block text-sm font-medium mb-3 text-purple-300">Business Owner WhatsApp/SMS Number (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="businessPhone"
                placeholder="+1234567890"
                value={businessOwnerPhone}
                onChange={(e) => setBusinessOwnerPhone(e.target.value)}
                className="bg-black/30 border-white/30 text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
              />
              <Button
                onClick={() => {
                  if (businessOwnerPhone) {
                    toast({
                      title: "✨ Number saved! 🎉",
                      description: "Contact buttons will now use your number.",
                    });
                    createConfettiEffect();
                  }
                }}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
              >
                Save
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-in-right">
            <Button 
              onClick={handleBusinessSetup}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-2xl shadow-purple-500/25 transform transition-all duration-300 hover:scale-110 hover:shadow-purple-500/50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Store className="mr-2 h-5 w-5" />
              I'm a Business Owner
            </Button>
            <Button 
              onClick={() => setActiveView('customer')}
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 text-white bg-black/20 hover:bg-white/10 backdrop-blur-sm transform transition-all duration-300 hover:scale-110 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-400/25"
            >
              <Phone className="mr-2 h-5 w-5" />
              I'm a Customer
            </Button>
          </div>

          {/* Enhanced Features Grid with More Wow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Phone,
                title: "Phone-Based Magic",
                description: "No apps to download. Just enter your phone number and watch the magic happen instantly.",
                gradient: "from-blue-600 to-cyan-600",
                delay: "0ms"
              },
              {
                icon: Gift,
                title: "Automatic Rewards",
                description: "Earn points with every visit. Redeem for discounts, free services, or special perks.",
                gradient: "from-purple-600 to-pink-600",
                delay: "200ms"
              },
              {
                icon: TrendingUp,
                title: "Business Growth",
                description: "Increase customer retention by 67% with our proven loyalty system.",
                gradient: "from-green-600 to-teal-600",
                delay: "400ms"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className="bg-black/30 border-white/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30 group relative overflow-hidden animate-fade-in"
                style={{ animationDelay: feature.delay }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:scale-125 transition-transform duration-500 group-hover:rotate-12`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced How It Works Section */}
      <div className="py-16 bg-black/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">How The Magic Works</h2>
            <p className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto animate-fade-in">
              Simple, effective loyalty in three magical steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Customer Visits", description: "Customer provides phone number at checkout", color: "from-blue-500 to-cyan-500", delay: "0ms" },
              { step: "2", title: "Points Added", description: "Automatic points based on purchase amount", color: "from-purple-500 to-pink-500", delay: "300ms" },
              { step: "3", title: "Rewards Earned", description: "Redeem points for discounts and free services", color: "from-green-500 to-teal-500", delay: "600ms" }
            ].map((item, index) => (
              <div key={index} className="text-center group animate-scale-in" style={{ animationDelay: item.delay }}>
                <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${item.color} text-white rounded-full text-3xl font-bold mb-6 shadow-2xl group-hover:scale-125 transition-all duration-500 group-hover:rotate-12 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 max-w-xs mx-auto">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Contact & Newsletter Section */}
      <div className="py-16 relative">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Join The Revolution</h2>
              
              {/* Newsletter Signup with Enhanced Effects */}
              <Card className="mb-8 bg-black/30 border-white/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center text-white">
                    <Mail className="mr-2 h-5 w-5 text-purple-400" />
                    Get Exclusive Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email for magic updates"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-black/30 border-white/30 text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
                    />
                    <Button 
                      onClick={handleEmailSubscribe}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-purple-500/50"
                    >
                      Join Revolution
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Contact Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* WhatsApp Contact */}
                <Card className="bg-black/30 border-white/30 backdrop-blur-sm hover:bg-green-500/20 hover:border-green-400/70 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-green-500/25 group">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <MessageCircle className="mx-auto h-10 w-10 text-green-400 mb-3 group-hover:scale-125 transition-transform duration-300" />
                      <h3 className="text-white font-bold mb-3">WhatsApp</h3>
                      <Button 
                        onClick={handleWhatsAppContact}
                        size="sm"
                        className="w-full bg-green-500 text-white hover:bg-green-600 border-0 shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        Chat Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* SMS Contact */}
                <Card className="bg-black/30 border-white/30 backdrop-blur-sm hover:bg-blue-500/20 hover:border-blue-400/70 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/25 group">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Phone className="mx-auto h-10 w-10 text-blue-400 mb-3 group-hover:scale-125 transition-transform duration-300" />
                      <h3 className="text-white font-bold mb-3">SMS</h3>
                      <Button 
                        onClick={handleSMSContact}
                        size="sm"
                        className="w-full bg-blue-500 text-white hover:bg-blue-600 border-0 shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        Send SMS
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Enhanced Benefits Section */}
            <div className="animate-slide-in-right">
              <div className="flex items-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Perfect for Any Business</h2>
                <Figma className="ml-4 h-8 w-8 text-purple-400 animate-pulse-subtle" />
              </div>
              
              <div className="space-y-6">
                {[
                  { title: "Salons & Spas", description: "Reward regular clients with service discounts and exclusive perks", icon: "💅", delay: "0ms" },
                  { title: "Barbershops", description: "Build a loyal customer base with points for every cut and shave", icon: "✂️", delay: "200ms" },
                  { title: "Local Eateries", description: "Encourage repeat visits with meal rewards and special offers", icon: "🍕", delay: "400ms" },
                  { title: "Retail Stores", description: "Transform one-time shoppers into loyal brand advocates", icon: "🛍️", delay: "600ms" },
                  { title: "Fitness Centers", description: "Motivate members with workout rewards and milestone bonuses", icon: "💪", delay: "800ms" }
                ].map((business, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 hover:scale-105 group border border-white/20 hover:border-purple-400/50 animate-fade-in relative overflow-hidden"
                    style={{ animationDelay: business.delay }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="text-2xl group-hover:scale-125 transition-transform duration-300 relative z-10">{business.icon}</div>
                    <div className="relative z-10">
                      <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-purple-300 transition-colors duration-300">{business.title}</h3>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{business.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-8 rounded-2xl backdrop-blur-sm border border-white/30 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-center relative z-10">
                  <Star className="mx-auto h-12 w-12 text-yellow-400 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">Ready to Transform?</h3>
                  <p className="text-gray-300 mb-6 max-w-md mx-auto group-hover:text-gray-200 transition-colors duration-300">
                    Join thousands of businesses already using Tunza Rewards to build unbreakable customer loyalty.
                  </p>
                  <Button 
                    onClick={handleBusinessSetup}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-2xl shadow-purple-500/25 hover:scale-105 transition-all duration-300 hover:shadow-purple-500/50 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative z-10">Start Your Revolution</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-black/50 backdrop-blur-sm py-12 border-t border-white/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse-subtle">Tunza Rewards</h3>
            <p className="text-gray-300 lg:text-lg max-w-xl mx-auto mb-8">
              Building stronger communities, one loyal customer at a time. 🌟
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsAppContact}
                variant="outline" 
                size="sm"
                className="border-white/30 text-white bg-black/30 hover:bg-green-500/20 hover:border-green-400 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/25"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Support
              </Button>
              <Button 
                onClick={handleSMSContact}
                variant="outline" 
                size="sm"
                className="border-white/30 text-white bg-black/30 hover:bg-blue-500/20 hover:border-blue-400 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/25"
              >
                <Phone className="mr-2 h-4 w-4" />
                SMS Support
              </Button>
              <Button 
                onClick={() => window.open('mailto:support@tunza.com', '_blank')}
                variant="outline" 
                size="sm"
                className="border-white/30 text-white bg-black/30 hover:bg-purple-500/20 hover:border-purple-400 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/25"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles for Confetti Animation */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
