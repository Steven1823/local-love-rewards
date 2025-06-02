
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Send, Clock, User, Search } from "lucide-react";
import { toast } from "sonner";

interface Customer {
  phone: string;
  name: string;
  visits: number;
  points: number;
  lastVisit: string;
  totalSpent: number;
}

interface Message {
  id: string;
  customerPhone: string;
  customerName: string;
  message: string;
  sentAt: string;
  messageType: 'whatsapp' | 'sms';
}

interface CustomerMessagingProps {
  businessName: string;
  customers: Customer[];
}

const CustomerMessaging = ({ businessName, customers }: CustomerMessagingProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [messageType, setMessageType] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [sending, setSending] = useState(false);

  // Predefined check-up message templates
  const messageTemplates = [
    `Hi! Just checking in from ${businessName}. How are you doing? We miss seeing you! 😊`,
    `Hello! It's been a while since your last visit to ${businessName}. We have some exciting updates! 🎉`,
    `Hi there! We hope you're doing well. Thank you for being a valued customer of ${businessName}! 💜`,
    `Hey! We wanted to reach out and see how everything is going. Hope to see you soon at ${businessName}! 👋`,
    `Hello! Just a friendly check-in from the ${businessName} team. You're always welcome here! ❤️`,
  ];

  useEffect(() => {
    if (selectedCustomer) {
      setMessage(messageTemplates[0]);
    }
  }, [selectedCustomer, businessName]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const sendMessage = async () => {
    if (!selectedCustomer || !message) {
      toast.error("Please select a customer and enter a message");
      return;
    }

    setSending(true);
    
    try {
      const formattedPhone = selectedCustomer.phone.replace(/[^\d+]/g, '');
      const encodedMessage = encodeURIComponent(message);
      
      let url = '';
      if (messageType === 'whatsapp') {
        url = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
      } else {
        url = `sms:${formattedPhone}?body=${encodedMessage}`;
      }
      
      window.open(url, '_blank');
      
      // Add to message history
      const newMessage: Message = {
        id: Date.now().toString(),
        customerPhone: selectedCustomer.phone,
        customerName: selectedCustomer.name,
        message: message,
        sentAt: new Date().toLocaleString(),
        messageType: messageType
      };
      
      setMessageHistory(prev => [newMessage, ...prev]);
      
      toast.success(`${messageType === 'whatsapp' ? 'WhatsApp' : 'SMS'} opened! Send the message to complete.`);
      
      // Clear message after sending
      setMessage(messageTemplates[0]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to open messaging app. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const getRecentMessages = (customerPhone: string) => {
    return messageHistory.filter(msg => msg.customerPhone === customerPhone).slice(0, 3);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
            Send Check-up Messages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Customer Search */}
          <div>
            <Label htmlFor="search">Search Customer</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="search"
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Customer List */}
          <div className="max-h-40 overflow-y-auto border rounded-lg">
            {filteredCustomers.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <User className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                No customers found
              </div>
            ) : (
              filteredCustomers.map((customer) => (
                <div
                  key={customer.phone}
                  onClick={() => setSelectedCustomer(customer)}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedCustomer?.phone === customer.phone ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-600">{customer.phone}</div>
                      <div className="text-xs text-gray-500">
                        {customer.visits} visits • {customer.points} points • Last: {customer.lastVisit}
                      </div>
                    </div>
                    {getRecentMessages(customer.phone).length > 0 && (
                      <div className="text-xs text-blue-600">
                        Last message: {getRecentMessages(customer.phone)[0].sentAt}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedCustomer && (
            <>
              {/* Selected Customer Info */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900">Selected Customer</h3>
                <p className="text-blue-700">{selectedCustomer.name} - {selectedCustomer.phone}</p>
                <p className="text-sm text-blue-600">
                  {selectedCustomer.visits} visits • {selectedCustomer.points} points • ${selectedCustomer.totalSpent} spent
                </p>
              </div>

              {/* Message Templates */}
              <div>
                <Label>Quick Templates</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {messageTemplates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setMessage(template)}
                      className="text-left h-auto p-2 text-xs"
                    >
                      {template}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Message Type Selection */}
              <div>
                <Label htmlFor="messageType">Message Type</Label>
                <Select value={messageType} onValueChange={(value: 'whatsapp' | 'sms') => setMessageType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message Input */}
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your check-up message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="mt-1"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {message.length} characters
                </div>
              </div>

              {/* Send Button */}
              <Button
                onClick={sendMessage}
                disabled={sending || !message}
                className={`w-full ${
                  messageType === 'whatsapp' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {sending ? (
                  "Opening..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send via {messageType === 'whatsapp' ? 'WhatsApp' : 'SMS'}
                  </>
                )}
              </Button>

              {/* Recent Messages for Selected Customer */}
              {getRecentMessages(selectedCustomer.phone).length > 0 && (
                <div className="mt-4">
                  <Label>Recent Messages to {selectedCustomer.name}</Label>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                    {getRecentMessages(selectedCustomer.phone).map((msg) => (
                      <div key={msg.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-gray-900">
                            {msg.messageType === 'whatsapp' ? '📱 WhatsApp' : '💬 SMS'}
                          </span>
                          <span className="text-gray-500 text-xs">{msg.sentAt}</span>
                        </div>
                        <p className="text-gray-700">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Message History */}
      {messageHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-500" />
              Message History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {messageHistory.map((msg) => (
                <div key={msg.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-medium">{msg.customerName}</span>
                      <span className="text-gray-500 text-sm ml-2">{msg.customerPhone}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{msg.sentAt}</div>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                        {msg.messageType === 'whatsapp' ? 'WhatsApp' : 'SMS'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{msg.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerMessaging;
