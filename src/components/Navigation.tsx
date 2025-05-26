
import { Heart } from "lucide-react";

const Navigation = () => {
  return (
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
  );
};

export default Navigation;
