
import { Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, signOut, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-20 px-4 sm:px-6 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 sm:space-x-3 cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
            <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold text-white">Tunza</span>
            <div className="text-xs text-white/60 -mt-1">Rewards</div>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a 
            href="#features" 
            className="text-white/80 hover:text-white transition-all duration-200 hover:underline decoration-2 underline-offset-4 decoration-purple-300 font-medium"
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="text-white/80 hover:text-white transition-all duration-200 hover:underline decoration-2 underline-offset-4 decoration-purple-300 font-medium"
          >
            How It Works
          </a>
        </div>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <div className="text-white/80 text-sm mr-2">
                Welcome back!
              </div>
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 transition-all duration-200"
              >
                Dashboard
              </Button>
              <Button
                onClick={signOut}
                variant="outline"
                className="border-white/30 text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 sm:px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <User className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          variant="ghost"
          className="md:hidden text-white hover:bg-white/10 p-2 min-h-[44px] min-w-[44px]"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border-b border-white/10 animate-fade-in">
          <div className="px-4 sm:px-6 py-4 space-y-4">
            <a 
              href="#features" 
              className="block text-white/80 hover:text-white py-3 transition-colors text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="block text-white/80 hover:text-white py-3 transition-colors text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <div className="pt-4 border-t border-white/20">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      navigate("/dashboard");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 min-h-[48px] text-base"
                  >
                    Dashboard
                  </Button>
                  <Button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 min-h-[48px] text-base"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/auth");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold min-h-[48px] text-base"
                >
                  <User className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
