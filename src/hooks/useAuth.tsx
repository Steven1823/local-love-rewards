
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email || 'No user');
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Save login state to localStorage for persistence
        if (session) {
          localStorage.setItem('tunza_user_logged_in', 'true');
          localStorage.setItem('tunza_user_email', session.user.email || '');
        } else {
          localStorage.removeItem('tunza_user_logged_in');
          localStorage.removeItem('tunza_user_email');
        }
      }
    );

    // Then get initial session - this will restore saved login
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          console.log('Initial session restored:', session?.user?.email || 'No user');
          setSession(session);
          setUser(session?.user ?? null);
          
          // Update login state
          if (session) {
            localStorage.setItem('tunza_user_logged_in', 'true');
            localStorage.setItem('tunza_user_email', session.user.email || '');
          }
        }
      } catch (error) {
        console.error('Session restoration error:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      
      // Clear saved login info
      localStorage.removeItem('tunza_user_logged_in');
      localStorage.removeItem('tunza_user_email');
      
      // Clean up auth state
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        console.error('Sign out error:', error);
      }
      
      setSession(null);
      setUser(null);
      
      // Force page reload for clean state
      window.location.href = '/auth';
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if user was previously logged in
  const wasLoggedIn = () => {
    return localStorage.getItem('tunza_user_logged_in') === 'true';
  };

  // Helper function to get saved email
  const getSavedEmail = () => {
    return localStorage.getItem('tunza_user_email') || '';
  };

  return {
    user,
    session,
    loading,
    signOut,
    isAuthenticated: !!session && !!user,
    wasLoggedIn,
    getSavedEmail
  };
};
