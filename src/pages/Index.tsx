
import { useState } from "react";
import { Phone, Store, Gift, Users, TrendingUp, Star, MessageCircle, Mail, Figma, Volume2, VolumeX, Play, Pause } from "lucide-react";
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
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (!isAudioEnabled) {
      playWelcomeAudio();
    }
  };

  const playWelcomeAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Welcome to Tunza Rewards! Turn every customer visit into lasting loyalty.");
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-pink-500 rounded-full opacity-10 blur-2xl animate-pulse"></div>
      </div>

      {/* Audio Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={toggleAudio}
          size="sm"
          variant="outline"
          className="bg-black/20 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
        >
          {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
        {isAudioEnabled && (
          <Button
            onClick={isPlaying ? stopAudio : playWelcomeAudio}
            size="sm"
            variant="outline"
            className="bg-black/20 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Hero Section */}
      <div className="relative px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <Badge variant="outline" className="border-purple-400 text-purple-300 mb-6 px-4 py-2 text-sm font-medium bg-black/20 backdrop-blur-sm">
              🚀 100% Free • No Hidden Costs • Forever
            </Badge>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Tunza
              <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 text-white/90">Rewards</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Turn every customer visit into lasting loyalty. Simple phone-based rewards that work for salons, barbershops, and local eateries.
            </p>
          </div>

          {/* Business Owner Phone Input */}
          <div className="mb-8 max-w-md mx-auto">
            <Label htmlFor="businessPhone" className="block text-sm font-medium mb-3 text-purple-300">Business Owner WhatsApp/SMS Number (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="businessPhone"
                placeholder="+1234567890"
                value={businessOwnerPhone}
                onChange={(e) => setBusinessOwnerPhone(e.target.value)}
                className="bg-black/20 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-purple-400"
              />
              <Button
                onClick={() => {
                  if (businessOwnerPhone) {
                    toast({
                      title: "Number saved! 🎉",
                      description: "Contact buttons will now use your number.",
                    });
                  }
                }}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
              >
                Save
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={handleBusinessSetup}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-2xl shadow-purple-500/25 transform transition-all duration-300 hover:scale-105"
            >
              <Store className="mr-2 h-5 w-5" />
              I'm a Business Owner
            </Button>
            <Button 
              onClick={() => setActiveView('customer')}
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 text-white bg-black/20 hover:bg-white/10 backdrop-blur-sm transform transition-all duration-300 hover:scale-105"
            >
              <Phone className="mr-2 h-5 w-5" />
              I'm a Customer
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Phone,
                title: "Phone-Based Tracking",
                description: "No apps to download. Just enter your phone number and start earning rewards instantly.",
                gradient: "from-blue-600 to-cyan-600"
              },
              {
                icon: Gift,
                title: "Automatic Rewards",
                description: "Earn points with every visit. Redeem for discounts, free services, or special perks.",
                gradient: "from-purple-600 to-pink-600"
              },
              {
                icon: TrendingUp,
                title: "Business Growth",
                description: "Increase customer retention by 67% with our proven loyalty system.",
                gradient: "from-green-600 to-teal-600"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className="bg-black/20 border-white/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 group"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">How It Works</h2>
            <p className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto">
              Simple, effective loyalty in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Customer Visits", description: "Customer provides phone number at checkout", color: "from-blue-500 to-cyan-500" },
              { step: "2", title: "Points Added", description: "Automatic points based on purchase amount", color: "from-purple-500 to-pink-500" },
              { step: "3", title: "Rewards Earned", description: "Redeem points for discounts and free services", color: "from-green-500 to-teal-500" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${item.color} text-white rounded-full text-2xl font-bold mb-6 shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 max-w-xs mx-auto">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact & Newsletter Section */}
      <div className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Stay Connected</h2>
              
              {/* Newsletter Signup */}
              <Card className="mb-8 bg-black/20 border-white/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Mail className="mr-2 h-5 w-5 text-purple-400" />
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
                      className="flex-1 bg-black/20 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-purple-400"
                    />
                    <Button 
                      onClick={handleEmailSubscribe}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg"
                    >
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* WhatsApp Contact */}
                <Card className="bg-black/20 border-white/20 backdrop-blur-sm hover:bg-green-500/10 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <MessageCircle className="mx-auto h-10 w-10 text-green-400 mb-3" />
                      <h3 className="text-white font-bold mb-3">WhatsApp</h3>
                      <Button 
                        onClick={handleWhatsAppContact}
                        size="sm"
                        className="w-full bg-green-500 text-white hover:bg-green-600 border-0 shadow-lg"
                      >
                        Chat Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* SMS Contact */}
                <Card className="bg-black/20 border-white/20 backdrop-blur-sm hover:bg-blue-500/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Phone className="mx-auto h-10 w-10 text-blue-400 mb-3" />
                      <h3 className="text-white font-bold mb-3">SMS</h3>
                      <Button 
                        onClick={handleSMSContact}
                        size="sm"
                        className="w-full bg-blue-500 text-white hover:bg-blue-600 border-0 shadow-lg"
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
              <div className="flex items-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Perfect for Local Businesses</h2>
                <Figma className="ml-4 h-8 w-8 text-purple-400" />
              </div>
              
              <div className="space-y-6">
                {[
                  { title: "Salons & Spas", description: "Reward regular clients with service discounts and exclusive perks", icon: "💅" },
                  { title: "Barbershops", description: "Build a loyal customer base with points for every cut and shave", icon: "✂️" },
                  { title: "Local Eateries", description: "Encourage repeat visits with meal rewards and special offers", icon: "🍕" }
                ].map((business, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-300 hover:scale-105 group border border-white/10"
                  >
                    <div className="text-2xl">{business.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-purple-300 transition-colors duration-300">{business.title}</h3>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{business.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-8 rounded-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <Star className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-white">Ready to Start?</h3>
                  <p className="text-gray-300 mb-6 max-w-md mx-auto">
                    Join hundreds of local businesses already using Tunza Rewards to build customer loyalty.
                  </p>
                  <Button 
                    onClick={handleBusinessSetup}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-2xl shadow-purple-500/25"
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
      <footer className="bg-black/40 backdrop-blur-sm py-12 border-t border-white/20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Tunza Rewards</h3>
            <p className="text-gray-300 lg:text-lg max-w-xl mx-auto mb-8">
              Building stronger communities, one loyal customer at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsAppContact}
                variant="outline" 
                size="sm"
                className="border-white/30 text-white bg-black/20 hover:bg-green-500/20 hover:border-green-400 backdrop-blur-sm"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Support
              </Button>
              <Button 
                onClick={handleSMSContact}
                variant="outline" 
                size="sm"
                className="border-white/30 text-white bg-black/20 hover:bg-blue-500/20 hover:border-blue-400 backdrop-blur-sm"
              >
                <Phone className="mr-2 h-4 w-4" />
                SMS Support
              </Button>
              <Button 
                onClick={() => window.open('mailto:support@tunza.com', '_blank')}
                variant="outline" 
                size="sm"
                className="border-white/30 text-white bg-black/20 hover:bg-purple-500/20 hover:border-purple-400 backdrop-blur-sm"
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
