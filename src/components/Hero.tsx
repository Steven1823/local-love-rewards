
import { ArrowRight, Gift, Star, Users, Zap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onStartSetup: () => void;
  onCheckRewards: () => void;
}

const Hero = ({ onStartSetup, onCheckRewards }: HeroProps) => {
  return (
    <>
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
              onClick={onStartSetup}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-glow"
            >
              Start Free Setup
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={onCheckRewards}
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
    </>
  );
};

export default Hero;
