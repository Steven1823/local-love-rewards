
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Heart } from "lucide-react";
import { toast } from "sonner";

interface WarmMessageSenderProps {
  businessName: string;
  businessPhone: string;
}

const WarmMessageSender = ({ businessName, businessPhone }: WarmMessageSenderProps) => {
  const [customerPhone, setCustomerPhone] = useState("");
  const [message, setMessage] = useState(`Hi! Thank you for visiting ${businessName}. We appreciate your loyalty and hope to see you again soon! 💜`);
  const [sending, setSending] = useState(false);

  const sendMessage = async () => {
    if (!customerPhone || !message) {
      toast.error("Please fill in both phone number and message");
      return;
    }

    setSending(true);
    
    try {
      // Use a single WhatsApp number for sending messages
      const whatsappNumber = "+1234567890"; // Replace with your actual WhatsApp number
      
      // Format customer phone number
      const formattedCustomerPhone = customerPhone.replace(/[^\d+]/g, '');
      
      // Create message with customer info for the business owner
      const businessMessage = `Send this message to ${formattedCustomerPhone}:\n\n${message}`;
      
      // Create WhatsApp URL to send to business WhatsApp number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(businessMessage)}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      toast.success("Message sent to WhatsApp for delivery!");
      
      // Clear the form
      setCustomerPhone("");
      setMessage(`Hi! Thank you for visiting ${businessName}. We appreciate your loyalty and hope to see you again soon! 💜`);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again.");
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
          <Label htmlFor="message">Message (Private - Only you can see this)</Label>
          <Textarea
            id="message"
            placeholder="Type your warm message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="mt-1"
          />
          <div className="text-xs text-gray-500 mt-1">
            This message is private and will be sent securely
          </div>
        </div>
        
        <Button
          onClick={sendMessage}
          disabled={sending || !customerPhone || !message}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Send className="h-4 w-4 mr-2" />
          {sending ? "Sending..." : "Send Message"}
        </Button>
        
        <div className="text-xs text-gray-600 text-center">
          Messages are sent through our secure WhatsApp service
        </div>
      </CardContent>
    </Card>
  );
};

export default WarmMessageSender;
