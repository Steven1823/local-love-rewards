
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, Heart } from "lucide-react";
import { toast } from "sonner";

interface WarmMessageSenderProps {
  businessName: string;
  businessPhone: string;
}

const WarmMessageSender = ({ businessName, businessPhone }: WarmMessageSenderProps) => {
  const [customerPhone, setCustomerPhone] = useState("");
  const [message, setMessage] = useState(`Hi! Thank you for visiting ${businessName}. We appreciate your loyalty and hope to see you again soon! 💜`);
  const [sending, setSending] = useState(false);

  const sendWhatsAppMessage = async () => {
    if (!customerPhone || !message) {
      toast.error("Please fill in both phone number and message");
      return;
    }

    setSending(true);
    
    try {
      // Format phone number (remove any non-digits except +)
      const formattedPhone = customerPhone.replace(/[^\d+]/g, '');
      
      // Create WhatsApp message URL
      const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      toast.success("WhatsApp opened! Send the message to your customer.");
      
      // Clear the form
      setCustomerPhone("");
      setMessage(`Hi! Thank you for visiting ${businessName}. We appreciate your loyalty and hope to see you again soon! 💜`);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to open WhatsApp. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const sendSMSMessage = async () => {
    if (!customerPhone || !message) {
      toast.error("Please fill in both phone number and message");
      return;
    }

    setSending(true);
    
    try {
      // Format phone number (remove any non-digits except +)
      const formattedPhone = customerPhone.replace(/[^\d+]/g, '');
      
      // Create SMS URL
      const smsUrl = `sms:${formattedPhone}?body=${encodeURIComponent(message)}`;
      
      // Open SMS
      window.open(smsUrl, '_blank');
      
      toast.success("SMS app opened! Send the message to your customer.");
      
      // Clear the form
      setCustomerPhone("");
      setMessage(`Hi! Thank you for visiting ${businessName}. We appreciate your loyalty and hope to see you again soon! 💜`);
      
    } catch (error) {
      console.error('Error sending SMS:', error);
      toast.error("Failed to open SMS app. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="h-5 w-5 mr-2 text-pink-500" />
          Send Warm Message to Customer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="customerPhone">Customer Phone Number</Label>
          <Input
            id="customerPhone"
            placeholder="+1234567890"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Type your warm message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="mt-1"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={sendWhatsAppMessage}
            disabled={sending || !customerPhone || !message}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Send via WhatsApp
          </Button>
          
          <Button
            onClick={sendSMSMessage}
            disabled={sending || !customerPhone || !message}
            variant="outline"
            className="flex-1"
          >
            <Send className="h-4 w-4 mr-2" />
            Send via SMS
          </Button>
        </div>
        
        <div className="text-xs text-gray-600 text-center">
          This will open your default messaging app with the message pre-filled
        </div>
      </CardContent>
    </Card>
  );
};

export default WarmMessageSender;
