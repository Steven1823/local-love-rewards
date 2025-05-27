
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RoleSelectionProps {
  onRoleSelected: (role: 'business' | 'customer') => void;
}

const RoleSelection = ({ onRoleSelected }: RoleSelectionProps) => {
  const [loading, setLoading] = useState(false);

  const handleRoleSelection = async (role: 'business' | 'customer') => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Update user metadata with role
      const { error } = await supabase.auth.updateUser({
        data: { role: role }
      });

      if (error) throw error;

      toast.success(`Welcome! You've been registered as a ${role}.`);
      onRoleSelected(role);
    } catch (error: any) {
      console.error('Role selection error:', error);
      toast.error(error.message || 'Failed to set role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white mb-4">
            Welcome to Tunza!
          </CardTitle>
          <p className="text-white/80 text-lg">
            Please select your role to get started
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className="bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-200 cursor-pointer"
              onClick={() => handleRoleSelection('business')}
            >
              <CardContent className="p-8 text-center">
                <Building2 className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Business Owner</h3>
                <p className="text-white/70 mb-6">
                  Manage your business, track customers, and send loyalty messages
                </p>
                <Button 
                  onClick={() => handleRoleSelection('business')}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {loading ? 'Setting up...' : 'I\'m a Business Owner'}
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-200 cursor-pointer"
              onClick={() => handleRoleSelection('customer')}
            >
              <CardContent className="p-8 text-center">
                <Users className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Customer</h3>
                <p className="text-white/70 mb-6">
                  Check your rewards and loyalty points from your favorite businesses
                </p>
                <Button 
                  onClick={() => handleRoleSelection('customer')}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                >
                  {loading ? 'Setting up...' : 'I\'m a Customer'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelection;
