
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import BusinessDashboard from "@/components/BusinessDashboard";
import CustomerDashboard from "@/components/CustomerDashboard";
import RoleSelection from "@/components/RoleSelection";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
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
        setUserRole(role || null);
      } catch (error) {
        console.error('Error getting user role:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      getUserRole();
    }
  }, [user, authLoading]);

  const handleRoleSelected = (role: 'business' | 'customer') => {
    setUserRole(role);
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

  if (userRole === 'business') {
    return <BusinessDashboard businessPhone={user.phone || ''} onBack={() => {}} />;
  }

  return <CustomerDashboard phoneNumber={user.phone || ''} onBack={() => {}} />;
};

export default Dashboard;
