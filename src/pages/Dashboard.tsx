
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import BusinessDashboard from "@/components/BusinessDashboard";
import CustomerDashboard from "@/components/CustomerDashboard";
import RoleSelection from "@/components/RoleSelection";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import FloatingAIChat from "@/components/FloatingAIChat";

const Dashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const [userRole, setUserRole] = useState<'business' | 'customer' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserRole = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Check user metadata for role
        const role = user.user_metadata?.role;
        console.log('User role from metadata:', role);
        
        if (role === 'business' || role === 'customer') {
          setUserRole(role);
        } else {
          setUserRole(null);
        }
      } catch (error) {
        console.error('Error getting user role:', error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      getUserRole();
    }
  }, [user, authLoading]);

  const handleRoleSelected = async (role: 'business' | 'customer') => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { role: role }
      });

      if (error) {
        console.error('Error updating user role:', error);
        return;
      }

      setUserRole(role);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <p className="text-white">Please sign in to access your dashboard.</p>
      </div>
    );
  }

  if (!userRole) {
    return <RoleSelection onRoleSelected={handleRoleSelected} />;
  }

  // Simplified navigation header without Gemini
  const DashboardHeader = () => (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-white/80">Welcome to Tunza Rewards - Free forever!</p>
        </div>
        <Button
          onClick={signOut}
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );

  if (userRole === 'business') {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <BusinessDashboard businessPhone={user.phone || ''} onBack={() => {}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <CustomerDashboard phoneNumber={user.phone || ''} onBack={() => {}} />
      <FloatingAIChat 
        customerPhone={user.phone || ''} 
        businessContext="Welcome to Tunza Rewards - your free loyalty platform!"
      />
    </div>
  );
};

export default Dashboard;
