
import { ArrowRight, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileAppSectionProps {
  onTriggerWowMoment: () => void;
}

const MobileAppSection = ({ onTriggerWowMoment }: MobileAppSectionProps) => {
  return (
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
              onClick={onTriggerWowMoment}
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
  );
};

export default MobileAppSection;
