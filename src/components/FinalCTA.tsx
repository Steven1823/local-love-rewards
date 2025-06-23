
import { ArrowRight, Gift, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FinalCTAProps {
  onStartSetup: () => void;
  onCheckRewards: () => void;
}

const FinalCTA = ({ onStartSetup, onCheckRewards }: FinalCTAProps) => {
  const navigate = useNavigate();

  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Encouraging Header */}
        <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full text-green-300 text-xs sm:text-sm mb-4 sm:mb-6 animate-fade-in border border-green-400/30">
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Join thousands of happy businesses
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 animate-fade-in leading-tight">
          Ready to Reward Your
          <span className="block bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mt-1 sm:mt-2">
            Amazing Customers?
          </span>
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 animate-fade-in max-w-2xl mx-auto leading-relaxed px-2">
          Start building stronger relationships with your customers today. 
          It's completely free and takes less than 5 minutes to set up.
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 animate-fade-in px-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mx-auto mb-2 sm:mb-3" />
            <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Easy Setup</h3>
            <p className="text-white/70 text-xs sm:text-sm">Get started in minutes, not hours</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
            <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2 sm:mb-3" />
            <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Happy Customers</h3>
            <p className="text-white/70 text-xs sm:text-sm">Keep them coming back for more</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 mx-auto mb-2 sm:mb-3" />
            <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">100% Free</h3>
            <p className="text-white/70 text-xs sm:text-sm">No hidden costs, ever</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 animate-fade-in px-4">
          <Button
            onClick={() => navigate("/auth")}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 sm:px-12 py-4 text-lg sm:text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 min-h-[56px]"
          >
            Yes, Let's Start!
            <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <Button
            onClick={onCheckRewards}
            variant="outline"
            className="w-full sm:w-auto border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm px-10 sm:px-12 py-4 text-lg sm:text-xl font-bold rounded-2xl transform hover:scale-105 transition-all duration-300 min-h-[56px]"
          >
            Check My Points
            <Gift className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="text-white/60 animate-fade-in px-2">
          <p className="text-sm sm:text-lg font-medium mb-3 sm:mb-4 leading-relaxed">
            ✓ No credit card required  ✓ Setup in under 5 minutes  ✓ Cancel anytime
          </p>
          <p className="text-xs sm:text-sm italic">
            "The easiest loyalty program I've ever used!" - Happy Business Owner
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
