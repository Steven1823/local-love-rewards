import { useState, useEffect } from "react";
import { ArrowRight, Gift, Smartphone, TrendingUp, Star, Heart, Users, Zap, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BusinessDashboard from "@/components/BusinessDashboard";
import CustomerLookup from "@/components/CustomerLookup";
import BusinessOwnerSetup from "@/components/BusinessOwnerSetup";
import ChurchFeatures from "@/components/ChurchFeatures";
import confetti from 'canvas-confetti';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'business-setup' | 'business-dashboard' | 'customer-lookup'>('landing');
  const [businessPhone, setBusinessPhone] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Tunza Rewards - Simple Loyalty Platform";
  }, []);

  const handleBusinessSetupComplete = (phone: string) => {
    setBusinessPhone(phone);
    setCurrentView('business-dashboard');
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const triggerWowMoment = () => {
    triggerConfetti();
    // Add a subtle animation to the clicked element
    const element = document.activeElement;
    if (element) {
      element.classList.add('animate-bounce-gentle');
      setTimeout(() => {
        element.classList.remove('animate-bounce-gentle');
      }, 2000);
    }
  };

  if (currentView === 'business-setup') {
    return (
      <BusinessOwnerSetup
        onBack={() => setCurrentView('landing')}
        onComplete={handleBusinessSetupComplete}
      />
    );
  }

  if (currentView === 'business-dashboard') {
    return (
      <BusinessDashboard
        businessPhone={businessPhone}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'customer-lookup') {
    return (
      <CustomerLookup
        phoneNumber=""
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center animate-glow">
              <Heart className="h-6 w-6 text-white animate-pulse-subtle" />
            </div>
            <span className="text-2xl font-bold text-white">Tunza</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors duration-200 hover:underline decoration-2 underline-offset-4">Features</a>
            <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors duration-200 hover:underline decoration-2 underline-offset-4">How It Works</a>
            <a href="#testimonials" className="text-white/80 hover:text-white transition-colors duration-200 hover:underline decoration-2 underline-offset-4">Success Stories</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-8 animate-fade-in">
            <Zap className="w-4 h-4 mr-2 text-yellow-400" />
            Free for now (not forever) • Works for any business or church
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Turn Every Visit Into
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-shimmer bg-300% animate-pulse-subtle">
              Lasting Loyalty
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto animate-fade-in">
            Revolutionary phone-based rewards system for businesses, churches, and organizations. 
            No apps to download, no complicated setups. Just phone numbers and instant rewards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button
              onClick={() => {
                setCurrentView('business-setup');
                triggerWowMoment();
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-glow"
            >
              Start Free Setup
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => {
                setCurrentView('customer-lookup');
                triggerWowMoment();
              }}
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
            >
              Check My Rewards
              <Gift className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="mt-12 text-white/60 animate-fade-in">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-green-400 mr-1" />
                <span>10,000+ Happy Businesses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
              Perfect for Every Organization
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in">
              From small businesses to large churches, our platform adapts to your unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Churches & Ministries",
                description: "Reward faithful attendance, volunteer work, and community involvement",
                gradient: "from-purple-600 to-pink-600"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Local Businesses",
                description: "Build customer loyalty with points for every purchase and visit",
                gradient: "from-blue-600 to-cyan-600"
              },
              {
                icon: <Smartphone className="h-8 w-8" />,
                title: "Phone-Based Magic",
                description: "Works with any phone number - no apps or downloads required",
                gradient: "from-green-600 to-teal-600"
              },
              {
                icon: <Gift className="h-8 w-8" />,
                title: "Flexible Rewards",
                description: "Customize rewards for your community's specific needs and values",
                gradient: "from-orange-600 to-red-600"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Growth Analytics",
                description: "Track engagement and build stronger community connections",
                gradient: "from-indigo-600 to-purple-600"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Instant Setup",
                description: "Get started in minutes with our simple setup process",
                gradient: "from-yellow-600 to-orange-600"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in cursor-pointer"
                onClick={triggerWowMoment}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-4 animate-glow`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Church Features Section */}
      <ChurchFeatures />

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 animate-fade-in">
            Simple. Powerful. Universal.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Quick Setup",
                description: "Register your business or church in under 5 minutes. Set your reward structure and you're ready to go.",
                icon: <Zap className="h-12 w-12" />
              },
              {
                step: "2", 
                title: "Members Join",
                description: "People simply provide their phone number - no apps, no cards, no complications.",
                icon: <Smartphone className="h-12 w-12" />
              },
              {
                step: "3",
                title: "Automatic Rewards",
                description: "Points are earned automatically with each visit or action. Rewards unlock instantly when thresholds are met.",
                icon: <Gift className="h-12 w-12" />
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="animate-fade-in cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={triggerWowMoment}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold animate-glow">
                  {step.step}
                </div>
                <div className="text-white mb-4">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3 >
                <p className="text-white/80 text-lg max-w-sm mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 px-6 py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 animate-fade-in">
            Loved by Communities Everywhere
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Pastor Michael Johnson",
                role: "Grace Community Church",
                content: "Our congregation engagement has increased by 40% since implementing Tunza. Members love earning points for attendance and volunteer work.",
                avatar: "👨‍💼"
              },
              {
                name: "Sarah Chen",
                role: "Sunny's Hair Salon",
                content: "Customer retention improved by 67% in just 3 months. The phone-based system is so simple that even my oldest clients love it.",
                avatar: "👩‍💼"
              },
              {
                name: "Rabbi David Goldman",
                role: "Temple Beth Shalom",
                content: "Tunza has transformed how we connect with our community. The simplicity is perfect for our diverse congregation.",
                avatar: "👨‍🎓"
              }
            ].map((testimonial, index) => (
              <Card 
                key={index} 
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in cursor-pointer"
                onClick={triggerWowMoment}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-white/60 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/80 italic">"{testimonial.content}"</p>
                  <div className="flex text-yellow-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App CTA Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <Smartphone className="w-20 h-20 text-white mx-auto mb-8 animate-float" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
              Coming Soon to App Stores
            </h2>
            <p className="text-xl text-white/80 mb-8 animate-fade-in">
              We're working on bringing Tunza to iOS and Android app stores. 
              Join our waitlist to be the first to know when it's available!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={triggerWowMoment}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-glow"
              >
                Join App Store Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="mt-8 flex justify-center space-x-8 text-white/60">
              <div className="flex items-center">
                <span className="text-2xl mr-2">📱</span>
                <span>iOS App Store</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">🤖</span>
                <span>Google Play Store</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Ready to Transform Your Community?
          </h2>
          <p className="text-xl text-white/80 mb-12 animate-fade-in">
            Join thousands of businesses and churches already using Tunza to build stronger connections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={() => {
                setCurrentView('business-setup');
                triggerWowMoment();
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-glow"
            >
              Start Free Today
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              onClick={() => {
                setCurrentView('customer-lookup');
                triggerWowMoment();
              }}
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-12 py-6 text-xl font-bold rounded-2xl transform hover:scale-105 transition-all duration-300"
            >
              Check Rewards
              <Gift className="ml-3 h-6 w-6" />
            </Button>
          </div>

          <div className="mt-16 text-white/60">
            <p className="text-lg">Free for now (not forever) • No credit card required • Setup in under 5 minutes</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Tunza</span>
          </div>
          <p className="text-white/60 mb-4">
            Built with ❤️ using Lovable • Transforming communities one visit at a time
          </p>
          <div className="flex justify-center space-x-6 text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .bg-300% { background-size: 300% 300%; }
        `}
      </style>
    </div>
  );
};

export default Index;
