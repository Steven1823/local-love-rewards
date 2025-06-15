
import { useState } from "react";
import { Plus, MessageCircle, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const BusinessDashboard = ({ businessPhone, onBack }: BusinessDashboardProps) => {
  const [customers, setCustomers] = useState<any[]>([]);

  // Real stats that start at 0
  const stats = {
    totalCustomers: customers.length,
    monthlyVisits: customers.reduce((sum, c) => sum + (c.visits || 0), 0),
    averageSpend: customers.length > 0 ? customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0) / customers.length : 0,
    rewardsClaimed: customers.reduce((sum, c) => sum + (c.rewardsClaimed || 0), 0)
  };

  const handleAddVisit = (searchPhone: string, amount: number) => {
    const points = Math.floor(amount); // 1 point per dollar spent
    
    // Find existing customer or create new one
    const existingCustomerIndex = customers.findIndex(c => c.phone === searchPhone);
    
    if (existingCustomerIndex >= 0) {
      // Update existing customer
      const updatedCustomers = [...customers];
      updatedCustomers[existingCustomerIndex] = {
        ...updatedCustomers[existingCustomerIndex],
        visits: (updatedCustomers[existingCustomerIndex].visits || 0) + 1,
        points: (updatedCustomers[existingCustomerIndex].points || 0) + points,
        totalSpent: (updatedCustomers[existingCustomerIndex].totalSpent || 0) + amount,
        lastVisit: "Today"
      };
      setCustomers(updatedCustomers);
    } else {
      // Add new customer
      const newCustomer = {
        phone: searchPhone,
        name: "Customer",
        visits: 1,
        points: points,
        totalSpent: amount,
        lastVisit: "Today",
        rewardsClaimed: 0
      };
      setCustomers([...customers, newCustomer]);
    }
  };

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
              <AddVisitForm customers={customers} onAddVisit={handleAddVisit} />
              <RecentCustomers customers={customers} />
            </div>
          </TabsContent>

          <TabsContent value="ai-assistant">
            <AICustomerAssistant 
              customers={customers}
              businessName="Your Business"
            />
          </TabsContent>

          <TabsContent value="auto-messaging">
            <AutomatedAIMessaging 
              customers={customers}
              businessName="Your Business"
            />
          </TabsContent>

          <TabsContent value="messaging">
            <CustomerMessaging 
              businessName="Your Business" 
              customers={customers}
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
