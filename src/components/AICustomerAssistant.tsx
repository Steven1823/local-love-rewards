
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, Lightbulb, TrendingUp, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Customer {
  phone: string;
  name: string;
  visits: number;
  points: number;
  lastVisit: string;
  totalSpent: number;
}

interface AICustomerAssistantProps {
  customers: Customer[];
  businessName: string;
}

const AICustomerAssistant = ({ customers, businessName }: AICustomerAssistantProps) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string>("");
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const generateInsights = async () => {
    setLoading(true);
    try {
      const customerData = customers.map(c => ({
        visits: c.visits,
        points: c.points,
        totalSpent: c.totalSpent,
        lastVisit: c.lastVisit
      }));

      const prompt = `As a customer relationship expert for ${businessName}, analyze this customer data and provide:
      1. Key insights about customer behavior patterns
      2. Recommendations for customer retention strategies
      3. Specific customers who need attention (identify by spending patterns, not names)
      
      Customer Data Summary: ${JSON.stringify(customerData, null, 2)}
      
      Provide actionable insights and specific recommendations.`;

      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { prompt, model: 'gemini-1.5-flash' }
      });

      if (error) throw error;

      setInsights(data.generatedText);
      
      // Generate specific recommendations
      await generateRecommendations();
      
      toast.success("AI insights generated successfully!");
    } catch (error) {
      console.error('Error generating insights:', error);
      toast.error("Failed to generate insights");
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = async () => {
    try {
      // Identify customers needing attention
      const atRiskCustomers = customers.filter(c => {
        const daysSinceLastVisit = c.lastVisit === "Today" ? 0 : 
          c.lastVisit.includes("ago") ? parseInt(c.lastVisit) : 30;
        return daysSinceLastVisit > 14 || c.visits < 3;
      });

      const highValueCustomers = customers.filter(c => c.totalSpent > 100 || c.visits > 5);
      const newCustomers = customers.filter(c => c.visits <= 2);

      setRecommendations([
        {
          type: "At Risk",
          count: atRiskCustomers.length,
          customers: atRiskCustomers.slice(0, 5),
          action: "Send re-engagement messages",
          priority: "High"
        },
        {
          type: "High Value",
          count: highValueCustomers.length,
          customers: highValueCustomers.slice(0, 5),
          action: "Send loyalty rewards",
          priority: "Medium"
        },
        {
          type: "New Customers",
          count: newCustomers.length,
          customers: newCustomers.slice(0, 5),
          action: "Send welcome messages",
          priority: "Medium"
        }
      ]);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2 text-purple-500" />
            AI Customer Relationship Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            Get AI-powered insights about your customers and personalized recommendations for better engagement.
          </div>
          
          <Button
            onClick={generateInsights}
            disabled={loading || customers.length === 0}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Customer Data...
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4 mr-2" />
                Generate AI Insights
              </>
            )}
          </Button>

          {insights && (
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900 mb-2">AI Insights</h3>
              <div className="text-sm text-purple-800 whitespace-pre-wrap">{insights}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Smart Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{rec.type} Customers</h4>
                      <p className="text-sm text-gray-600">{rec.action}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={rec.priority === "High" ? "destructive" : "secondary"}>
                        {rec.priority}
                      </Badge>
                      <div className="text-sm text-gray-500 mt-1">{rec.count} customers</div>
                    </div>
                  </div>
                  
                  {rec.customers.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-500 mb-2">Sample customers:</div>
                      <div className="space-y-1">
                        {rec.customers.slice(0, 3).map((customer: Customer, idx: number) => (
                          <div key={idx} className="text-xs bg-gray-50 p-2 rounded">
                            {customer.name} - {customer.visits} visits, ${customer.totalSpent} spent
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AICustomerAssistant;
