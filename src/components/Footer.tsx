
import { Heart } from "lucide-react";

const Footer = () => {
  return (
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
  );
};

export default Footer;
