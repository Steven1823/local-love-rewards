
import { ArrowRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FinalCTAProps {
  onStartSetup: () => void;
  onCheckRewards: () => void;
}

const FinalCTA = ({ onStartSetup, onCheckRewards }: FinalCTAProps) => {
  return (
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
            onClick={onStartSetup}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-glow"
          >
            Start Free Today
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
          <Button
            onClick={onCheckRewards}
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
  );
};

export default FinalCTA;
