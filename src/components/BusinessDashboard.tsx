
import { useState, useEffect } from "react";
import { Plus, MessageCircle, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import BusinessDashboardHeader from "./dashboard/BusinessDashboardHeader";
import BusinessStats from "./dashboard/BusinessStats";
import AddVisitForm from "./dashboard/AddVisitForm";
import RecentCustomers from "./dashboard/RecentCustomers";
import CustomerMessaging from "./CustomerMessaging";
import WarmMessageSender from "./WarmMessageSender";
import AICustomerAssistant from "./AICustomerAssistant";
import AutomatedAIMessaging from "./AutomatedAIMessaging";

interface BusinessDashboardProps {
  businessPhone?: string | null;
  onBack: () => void;
}

interface Customer {
  id: string;
  phone_number: string;
  name: string;
  points: number;
  total_visits: number;
  total_spent: number;
  last_visit: string | null;
  created_at: string;
}

const BusinessDashboard = ({ businessPhone, onBack }: BusinessDashboardProps) => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize business and fetch data
  useEffect(() => {
    const initializeBusiness = async () => {
      if (!user) return;

      try {
        // Check if business exists
        let { data: business, error: fetchError } = await supabase
          .from('businesses')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError;
        }

        // Create business if it doesn't exist
        if (!business) {
          const { data: newBusiness, error: createError } = await supabase
            .from('businesses')
            .insert({
              user_id: user.id,
              business_name: 'My Business',
              owner_name: user.email?.split('@')[0] || 'Owner',
              phone_number: businessPhone || user.phone || '0000000000',
              email: user.email
            })
            .select('id')
            .single();

          if (createError) throw createError;
          business = newBusiness;
        }

        setBusinessId(business.id);
        await fetchCustomers(business.id);
      } catch (error) {
        console.error('Error initializing business:', error);
        toast.error('Failed to initialize business data');
      } finally {
        setLoading(false);
      }
    };

    initializeBusiness();
  }, [user, businessPhone]);

  const fetchCustomers = async (busId: string) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('business_id', busId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers');
    }
  };

  const handleAddVisit = async (phoneNumber: string, amountUSD: number) => {
    if (!businessId) {
      toast.error('Business not initialized');
      return;
    }

    try {
      setLoading(true);
      
      // Convert USD to KSh for storage (maintain consistency)
      const kshAmount = amountUSD * 129.50;
      const points = Math.floor(amountUSD); // 1 point per USD spent

      // Find or create customer
      let { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('business_id', businessId)
        .eq('phone_number', phoneNumber)
        .single();

      if (customerError && customerError.code !== 'PGRST116') {
        throw customerError;
      }

      // Create customer if doesn't exist
      if (!customer) {
        const { data: newCustomer, error: createError } = await supabase
          .from('customers')
          .insert({
            business_id: businessId,
            phone_number: phoneNumber,
            name: 'Customer'
          })
          .select('id')
          .single();

        if (createError) throw createError;
        customer = newCustomer;
      }

      // Add visit record (this will automatically update customer stats via trigger)
      const { error: visitError } = await supabase
        .from('visits')
        .insert({
          customer_id: customer.id,
          business_id: businessId,
          amount: kshAmount, // Store in KSh
          points_earned: points
        });

      if (visitError) throw visitError;

      // Refresh customer data
      await fetchCustomers(businessId);
      toast.success('Visit added successfully!');
      
    } catch (error) {
      console.error('Error adding visit:', error);
      toast.error('Failed to add visit');
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from real data
  const stats = {
    totalCustomers: customers.length,
    monthlyVisits: customers.reduce((sum, c) => sum + c.total_visits, 0),
    averageSpend: customers.length > 0 
      ? customers.reduce((sum, c) => sum + Number(c.total_spent), 0) / customers.length 
      : 0,
    rewardsClaimed: 0 // Will implement later
  };

  // Transform data for components
  const transformedCustomers = customers.map(c => ({
    phone: c.phone_number,
    name: c.name,
    visits: c.total_visits,
    points: c.points,
    totalSpent: Number(c.total_spent),
    lastVisit: c.last_visit ? new Date(c.last_visit).toLocaleDateString() : 'Never',
    rewardsClaimed: 0
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessDashboardHeader onBack={onBack} />

      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <BusinessStats stats={stats} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="add-visit" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="add-visit" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Visit
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="auto-messaging" className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Auto AI Messages
            </TabsTrigger>
            <TabsTrigger value="messaging" className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              Manual Messages
            </TabsTrigger>
            <TabsTrigger value="warm-messages" className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Warm Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add-visit" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AddVisitForm customers={transformedCustomers} onAddVisit={handleAddVisit} />
              <RecentCustomers customers={transformedCustomers} />
            </div>
          </TabsContent>

          <TabsContent value="ai-assistant">
            <AICustomerAssistant 
              customers={transformedCustomers}
              businessName="Your Business"
            />
          </TabsContent>

          <TabsContent value="auto-messaging">
            <AutomatedAIMessaging 
              customers={transformedCustomers}
              businessName="Your Business"
            />
          </TabsContent>

          <TabsContent value="messaging">
            <CustomerMessaging 
              businessName="Your Business" 
              customers={transformedCustomers}
            />
          </TabsContent>

          <TabsContent value="warm-messages">
            <WarmMessageSender 
              businessName="Your Business" 
              businessPhone={businessPhone || ""}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessDashboard;
