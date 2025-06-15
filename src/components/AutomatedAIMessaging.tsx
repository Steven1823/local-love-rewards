
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Zap, MessageSquare, Calendar, Users, Loader2 } from "lucide-react";
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

interface AutomatedAIMessagingProps {
  customers: Customer[];
  businessName: string;
}

interface AutomatedMessage {
  customer: Customer;
  message: string;
  reason: string;
  priority: "High" | "Medium" | "Low";
}

const AutomatedAIMessaging = ({ customers, businessName }: AutomatedAIMessagingProps) => {
  const [automatedMessages, setAutomatedMessages] = useState<AutomatedMessage[]>([]);
  const [generating, setGenerating] = useState(false);
  const [autoSendEnabled, setAutoSendEnabled] = useState(false);

  const generateAutomatedMessages = async () => {
    setGenerating(true);
    try {
      const messages: AutomatedMessage[] = [];

      // Analyze each customer and generate personalized messages
      for (const customer of customers.slice(0, 10)) { // Limit to prevent too many API calls
        const customerAnalysis = `
        Customer: ${customer.name}
        Visits: ${customer.visits}
        Points: ${customer.points}
        Total Spent: $${customer.totalSpent}
        Last Visit: ${customer.lastVisit}
        `;

        const prompt = `As a customer retention expert for ${businessName}, create a personalized message for this customer based on their behavior:

        ${customerAnalysis}

        Requirements:
        1. Write a warm, personal message (max 160 characters for SMS)
        2. Include specific details about their relationship with the business
        3. Add a gentle call-to-action
        4. Use emojis appropriately
        5. Be conversational and friendly

        Also provide the reason why this customer needs attention (1 sentence).

        Format your response as:
        MESSAGE: [your message here]
        REASON: [why they need attention]
        PRIORITY: [High/Medium/Low]`;

        const { data, error } = await supabase.functions.invoke('gemini-chat', {
          body: { prompt, model: 'gemini-1.5-flash' }
        });

        if (error) throw error;

        const response = data.generatedText;
        const messageMatch = response.match(/MESSAGE: (.*?)(?=REASON:|$)/s);
        const reasonMatch = response.match(/REASON: (.*?)(?=PRIORITY:|$)/s);
        const priorityMatch = response.match(/PRIORITY: (High|Medium|Low)/);

        if (messageMatch && reasonMatch) {
          messages.push({
            customer,
            message: messageMatch[1].trim(),
            reason: reasonMatch[1].trim(),
            priority: (priorityMatch?.[1] as "High" | "Medium" | "Low") || "Medium"
          });
        }
      }

      setAutomatedMessages(messages);
      toast.success(`Generated ${messages.length} personalized messages!`);
    } catch (error) {
      console.error('Error generating automated messages:', error);
      toast.error("Failed to generate automated messages");
    } finally {
      setGenerating(false);
    }
  };

  const sendAutomatedMessage = (automatedMsg: AutomatedMessage) => {
    const whatsappNumber = "+1234567890"; // Replace with actual WhatsApp number
    const formattedPhone = automatedMsg.customer.phone.replace(/[^\d+]/g, '');
    
    const businessMessage = `Send this AI-generated message to ${automatedMsg.customer.name} (${formattedPhone}):\n\n${automatedMsg.message}\n\nReason: ${automatedMsg.reason}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(businessMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success(`Message prepared for ${automatedMsg.customer.name}!`);
  };

  const sendAllMessages = () => {
    automatedMessages.forEach((msg, index) => {
      setTimeout(() => sendAutomatedMessage(msg), index * 1000); // Stagger sends
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-orange-500" />
            Automated AI Customer Messaging
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            AI analyzes customer behavior patterns and automatically generates personalized messages for optimal engagement.
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="auto-send"
              checked={autoSendEnabled}
              onCheckedChange={setAutoSendEnabled}
            />
            <Label htmlFor="auto-send">Enable Auto-Send Mode</Label>
          </div>

          <Button
            onClick={generateAutomatedMessages}
            disabled={generating || customers.length === 0}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                AI Generating Messages...
              </>
            ) : (
              <>
                <MessageSquare className="h-4 w-4 mr-2" />
                Generate AI Messages
              </>
            )}
          </Button>

          {automatedMessages.length > 0 && (
            <>
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Generated Messages ({automatedMessages.length})</h3>
                <Button
                  onClick={sendAllMessages}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Send All Messages
                </Button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {automatedMessages.map((automatedMsg, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{automatedMsg.customer.name}</h4>
                        <p className="text-sm text-gray-600">{automatedMsg.customer.phone}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          automatedMsg.priority === "High" ? "destructive" :
                          automatedMsg.priority === "Medium" ? "default" : "secondary"
                        }>
                          {automatedMsg.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">AI Generated Message:</div>
                      <div className="bg-blue-50 p-3 rounded-lg text-sm">
                        {automatedMsg.message}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs text-gray-600">
                        <strong>AI Reasoning:</strong> {automatedMsg.reason}
                      </div>
                    </div>

                    <Button
                      onClick={() => sendAutomatedMessage(automatedMsg)}
                      size="sm"
                      className="w-full"
                    >
                      Send This Message
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedAIMessaging;
