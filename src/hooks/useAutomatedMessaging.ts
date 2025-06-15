
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Customer, AutomatedMessage } from "@/types/automatedMessaging";

export const useAutomatedMessaging = (businessName: string) => {
  const [automatedMessages, setAutomatedMessages] = useState<AutomatedMessage[]>([]);
  const [generating, setGenerating] = useState(false);

  const generateAutomatedMessages = async (customers: Customer[]) => {
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

  return {
    automatedMessages,
    generating,
    generateAutomatedMessages,
    sendAutomatedMessage,
    sendAllMessages
  };
};
