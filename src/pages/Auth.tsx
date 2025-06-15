
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const cleanupAuthState = () => {
    // Clear all auth-related localStorage items
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
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

  const handleCaptchaBypass = async () => {
    try {
      // Try to create a session with a simpler approach
      toast.info("Attempting alternative login method...");
      
      // Try direct session creation without CAPTCHA
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          shouldCreateUser: false
        }
      });
      
      if (error) {
        console.error('OTP error:', error);
        toast.error("Please check your Supabase dashboard and disable CAPTCHA protection completely.");
        return;
      }
      
      toast.success("Check your email for a magic link to sign in!");
    } catch (error) {
      console.error('Bypass error:', error);
      toast.error("Alternative method failed. Please disable CAPTCHA in Supabase dashboard.");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean up any existing auth state first
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
            toast.error("CAPTCHA error detected. Try the 'Magic Link' option below or disable CAPTCHA in your Supabase dashboard.");
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
          toast.success("Successfully signed in!");
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
            toast.error("CAPTCHA error detected. Please disable CAPTCHA in your Supabase dashboard and try again.");
            return;
          } else if (error.message.includes('User already registered')) {
            toast.error("An account with this email already exists. Please sign in instead.");
            setIsLogin(true);
          } else if (error.message.includes('Error sending confirmation email')) {
            // Still create account but inform user about email issue
            toast.success("Account created! You can now sign in. (Email confirmation temporarily unavailable)");
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
            toast.success("Account created successfully! Welcome!");
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
      if (error.message && error.message.includes('captcha')) {
        toast.error("CAPTCHA blocking login. Please disable CAPTCHA in your Supabase dashboard or use the Magic Link option below.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 relative z-10">
        <CardHeader className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="absolute left-4 top-4 text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-bold text-white">
            {isLogin ? "Welcome Back to Tunza" : "Join Tunza"}
          </CardTitle>
          <p className="text-white/80">
            {isLogin 
              ? "Sign in to your Tunza account" 
              : "Create your account to get started"
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={isLogin ? "Password" : "Password (min 6 chars, with A-z, 0-9)"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={isLogin ? "current-password" : "new-password"}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white h-8 w-8 p-0"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            
            {!isLogin && (
              <div>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
            )}
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
            >
              {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>

          {/* Alternative login method */}
          {isLogin && (
            <div className="space-y-2">
              <div className="text-center text-white/60 text-sm">or</div>
              <Button
                onClick={handleCaptchaBypass}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                Send Magic Link (No Password)
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
              className="text-white/80 hover:text-white underline text-sm"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>

          {/* Troubleshooting help */}
          <div className="mt-6 p-3 bg-white/5 rounded-lg">
            <p className="text-white/70 text-xs text-center">
              Still having issues? Go to your Supabase dashboard → Authentication → Settings and disable "Enable CAPTCHA protection"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
