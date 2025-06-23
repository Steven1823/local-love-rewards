
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff, Heart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { wasLoggedIn, getSavedEmail } = useAuth();

  // Pre-fill email if user was previously logged in
  useEffect(() => {
    const savedEmail = getSavedEmail();
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, [getSavedEmail]);

  const cleanupAuthState = () => {
    // Clear all auth-related localStorage items except our saved login info
    Object.keys(localStorage).forEach((key) => {
      if ((key.startsWith('supabase.auth.') || key.includes('sb-')) && 
          !key.includes('tunza_user')) {
        localStorage.removeItem(key);
      }
    });
    
    // Clear sessionStorage as well
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key);
        }
      });
    }
  };

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const minLength = password.length >= 6;

    if (!minLength) {
      return "Password must be at least 6 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    return null;
  };

  const handleMagicLink = async () => {
    try {
      toast.info("Sending magic link...");
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          shouldCreateUser: false
        }
      });
      
      if (error) {
        console.error('Magic link error:', error);
        toast.error("Unable to send magic link. Please try signing in with your password instead.");
        return;
      }
      
      toast.success("Check your email for a magic link to sign in!");
    } catch (error) {
      console.error('Magic link error:', error);
      toast.error("Unable to send magic link. Please try signing in with your password instead.");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean up any existing auth state first (but preserve our saved login info)
      cleanupAuthState();
      
      // Attempt to sign out any existing session
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.log('Sign out cleanup attempt:', err);
      }

      if (isLogin) {
        console.log('Attempting to sign in with:', email);
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password: password
        });
        
        if (error) {
          console.error('Sign in error:', error);
          if (error.message.includes('captcha') || error.message.includes('verification process failed')) {
            toast.error("Try the 'Magic Link' option below for easier sign in.");
            return;
          } else if (error.message.includes('Invalid login credentials') || error.message.includes('invalid_credentials')) {
            toast.error("Invalid email or password. Please check your credentials and try again.");
          } else if (error.message.includes('Email not confirmed')) {
            toast.error("Please check your email and confirm your account before signing in.");
          } else {
            toast.error(error.message);
          }
          return;
        }
        
        if (data.user && data.session) {
          console.log('Sign in successful:', data.user.email);
          toast.success("Welcome back!");
          // Force page reload to ensure clean state
          window.location.href = '/dashboard';
        }
      } else {
        // Validate password before attempting signup
        const passwordError = validatePassword(password);
        if (passwordError) {
          toast.error(passwordError);
          return;
        }

        if (password !== confirmPassword) {
          toast.error("Passwords don't match");
          return;
        }
        
        console.log('Attempting to sign up with:', email);
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password: password,
          options: {
            emailRedirectTo: window.location.origin + '/dashboard'
          }
        });
        
        if (error) {
          console.error('Sign up error:', error);
          if (error.message.includes('captcha') || error.message.includes('verification process failed')) {
            toast.error("There was an issue creating your account. Please try again.");
            return;
          } else if (error.message.includes('User already registered')) {
            toast.error("An account with this email already exists. Please sign in instead.");
            setIsLogin(true);
          } else if (error.message.includes('Error sending confirmation email')) {
            // Still create account but inform user about email issue
            toast.success("Account created! You can now sign in.");
            setIsLogin(true);
            setPassword("");
            setConfirmPassword("");
          } else if (error.message.includes('weak_password')) {
            toast.error("Password must contain uppercase, lowercase letters and numbers");
          } else {
            toast.error(error.message);
          }
          return;
        }
        
        if (data.user) {
          console.log('Sign up successful:', data.user.email);
          if (data.session) {
            toast.success("Welcome to Tunza! Your account has been created.");
            // Force page reload to ensure clean state
            window.location.href = '/dashboard';
          } else {
            toast.success("Account created! Please check your email to verify your account, or try signing in directly.");
            setIsLogin(true);
            setPassword("");
            setConfirmPassword("");
          }
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-400/10 rounded-full blur-2xl animate-bounce-gentle"></div>
      </div>
      
      <Card className="w-full max-w-md bg-white/5 backdrop-blur-xl border-green-400/20 relative z-10 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="absolute left-4 top-4 text-green-200/80 hover:text-green-100 hover:bg-green-400/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="h-7 w-7 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-200 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back!" : "Join Tunza"}
          </CardTitle>
          <p className="text-green-100/80 mt-2">
            {isLogin 
              ? "Sign in to check your rewards and loyalty points" 
              : "Create your account and start earning rewards"
            }
          </p>
          
          {/* Show saved login info if available */}
          {wasLoggedIn() && getSavedEmail() && isLogin && (
            <div className="mt-3 p-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg border border-green-400/30">
              <div className="flex items-center space-x-2 text-green-200">
                <User className="h-4 w-4" />
                <span className="text-sm">Welcome back: {getSavedEmail()}</span>
              </div>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-2">
              <label className="text-green-200 text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="bg-white/5 border-green-400/30 text-green-50 placeholder:text-green-300/60 focus:border-green-400 focus:ring-green-400/20 h-12"
              />
            </div>
            
            <div className="relative space-y-2">
              <label className="text-green-200 text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={isLogin ? "Enter your password" : "Min 6 chars, with A-z, 0-9"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  className="bg-white/5 border-green-400/30 text-green-50 placeholder:text-green-300/60 focus:border-green-400 focus:ring-green-400/20 pr-12 h-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-green-300/60 hover:text-green-200 h-8 w-8 p-0"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-green-200 text-sm font-medium">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="bg-white/5 border-green-400/30 text-green-50 placeholder:text-green-300/60 focus:border-green-400 focus:ring-green-400/20 h-12"
                />
              </div>
            )}
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 h-12 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>

          {/* Alternative login method */}
          {isLogin && (
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="flex-1 h-px bg-green-400/30"></div>
                <span className="text-green-200/60 text-sm">or</span>
                <div className="flex-1 h-px bg-green-400/30"></div>
              </div>
              <Button
                onClick={handleMagicLink}
                variant="outline"
                className="w-full border-green-400/40 text-green-200 hover:bg-green-400/10 hover:border-green-400/60 h-11 transition-all duration-200"
              >
                Send Magic Link (No Password Needed)
              </Button>
            </div>
          )}
          
          <div className="text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setPassword("");
                setConfirmPassword("");
              }}
              className="text-green-200/80 hover:text-green-100 underline text-sm transition-colors duration-200 hover:decoration-green-300"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-4 p-3 bg-green-800/20 rounded-lg border border-green-500/20">
            <p className="text-green-200/90 text-xs text-center">
              🔒 Your login will be saved securely for easy access next time
            </p>
          </div>

          {/* Benefits reminder */}
          <div className="mt-4 p-3 bg-green-800/20 rounded-lg border border-green-500/20">
            <p className="text-green-200/90 text-xs text-center">
              ✨ Earn rewards • Track your points • Get exclusive offers
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
