
import { ArrowRight, Gift, Star, Users, Zap, ChevronDown, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onStartSetup: () => void;
  onCheckRewards: () => void;
}

const Hero = ({ onStartSetup, onCheckRewards }: HeroProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-xs sm:text-sm mb-6 sm:mb-8 animate-fade-in border border-white/20">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-400" />
            100% Free • No Hidden Fees • Instant Setup
          </div>
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 sm:mb-6 animate-fade-in leading-tight">
            Simple Loyalty
            <span className="block bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent mt-1 sm:mt-2">
              Real Results
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto animate-fade-in leading-relaxed px-2">
            The easiest way to reward loyal customers. No apps to download, no complicated setup. 
            Just phone numbers and happy customers.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-4xl mx-auto animate-fade-in px-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300 mx-auto mb-2" />
              <p className="text-white/90 font-medium text-sm sm:text-base">Phone-Based</p>
              <p className="text-white/70 text-xs sm:text-sm">No apps needed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 mx-auto mb-2" />
              <p className="text-white/90 font-medium text-sm sm:text-base">5-Min Setup</p>
              <p className="text-white/70 text-xs sm:text-sm">Ready instantly</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 mx-auto mb-2" />
              <p className="text-white/90 font-medium text-sm sm:text-base">100% Free</p>
              <p className="text-white/70 text-xs sm:text-sm">Forever</p>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center animate-fade-in mb-6 sm:mb-8 px-4">
            <Button
              onClick={() => navigate("/auth")}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 sm:px-10 py-4 text-base sm:text-lg font-bold rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 hover:border-white/30 min-h-[56px]"
            >
              Start Free Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={onCheckRewards}
              variant="outline"
              className="w-full sm:w-auto border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm px-8 sm:px-10 py-4 text-base sm:text-lg font-bold rounded-xl transform hover:scale-105 transition-all duration-300 min-h-[56px]"
            >
              Check My Points
              <Gift className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Social Proof */}
          <div className="text-white/70 animate-fade-in px-2">
            <p className="text-xs sm:text-sm mb-3 sm:mb-4">Trusted by businesses everywhere</p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs">
              <div className="flex items-center">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1" />
                <span>Easy to Use</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="flex items-center">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mr-1" />
                <span>For All Businesses</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="flex items-center">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mr-1" />
                <span>Always Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white/50" />
        </div>
      </div>
    </>
  );
};

export default Hero;
