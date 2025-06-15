
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
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Encouraging Header */}
        <div className="inline-flex items-center px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full text-green-300 text-sm mb-6 animate-fade-in border border-green-400/30">
          <Heart className="w-4 h-4 mr-2" />
          Join thousands of happy businesses
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
          Ready to Reward Your
          <span className="block bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mt-2">
            Amazing Customers?
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-white/80 mb-10 animate-fade-in max-w-2xl mx-auto leading-relaxed">
          Start building stronger relationships with your customers today. 
          It's completely free and takes less than 5 minutes to set up.
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Easy Setup</h3>
            <p className="text-white/70 text-sm">Get started in minutes, not hours</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Gift className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Happy Customers</h3>
            <p className="text-white/70 text-sm">Keep them coming back for more</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">100% Free</h3>
            <p className="text-white/70 text-sm">No hidden costs, ever</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in">
          <Button
            onClick={() => navigate("/auth")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20"
          >
            Yes, Let's Start!
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
          <Button
            onClick={onCheckRewards}
            variant="outline"
            className="border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm px-12 py-4 text-xl font-bold rounded-2xl transform hover:scale-105 transition-all duration-300"
          >
            Check My Points
            <Gift className="ml-3 h-6 w-6" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="text-white/60 animate-fade-in">
          <p className="text-lg font-medium mb-4">✓ No credit card required  ✓ Setup in under 5 minutes  ✓ Cancel anytime</p>
          <p className="text-sm">
            "The easiest loyalty program I've ever used!" - Happy Business Owner
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
