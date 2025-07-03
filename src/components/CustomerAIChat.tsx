
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface CustomerAIChatProps {
  customerPhone?: string;
  businessContext?: string;
}

const CustomerAIChat = ({ customerPhone, businessContext }: CustomerAIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "🎉 Welcome to Tunza Rewards! I'm your friendly AI assistant and I'm here to help everyone!\n\n✨ Here's what makes Tunza special:\n• Earn points just by visiting participating businesses\n• No apps to download - just use your phone number\n• Redeem rewards when you're ready\n• Refer friends and earn KES 30 for each successful referral!\n• Track your loyalty across multiple businesses\n\nI can help answer questions about rewards, referrals, earning points, finding participating businesses, or anything else about Tunza Rewards. What would you like to know? 😊",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const systemPrompt = `You are a friendly AI assistant for Tunza Rewards, a customer loyalty platform. You are available to help EVERYONE - both customers and businesses, whether they have accounts or not.

      Key information about Tunza Rewards:
      - It's a phone-based loyalty system (no app downloads needed)
      - Customers earn points by visiting participating businesses
      - Points can be redeemed for rewards
      - Referral system: Referrer gets KES 30, new customer gets KES 15
      - Works across multiple businesses
      - Simple and accessible to everyone
      - Currently FREE to use for both businesses and customers
      
      ${businessContext ? `Additional context: ${businessContext}` : ''}
      ${customerPhone ? `User phone: ${customerPhone}` : ''}
      
      You should:
      - Be enthusiastic and welcoming to EVERYONE
      - Help both customers and business owners
      - Explain features clearly and simply
      - Encourage users to try the platform
      - Answer questions about loyalty programs and referrals
      - Promote the KES 30 referral reward system
      - If you don't know specific business details, suggest they contact businesses directly
      - Always maintain a positive, helpful tone
      - Use emojis appropriately to make conversations friendly
      - Never refuse to help or say you can't assist someone
      
      Keep responses concise but informative.`;

      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { 
          prompt: `${systemPrompt}\n\nUser question: ${inputValue}`,
          model: 'gemini-1.5-flash'
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.generatedText || "I'm here to help with anything about Tunza Rewards! Feel free to ask me about earning points, referrals, or how businesses can join. 😊",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("I'm having a small hiccup, but I'm still here to help!");
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now, but don't worry! Here's what I can tell you about Tunza Rewards:\n\n• Visit participating businesses and provide your phone number to earn points\n• Refer friends with your code to earn KES 30 each time\n• Your friend gets KES 15 when they join\n• It's completely free for everyone! 🌟\n\nFeel free to ask me anything else!",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-96 flex flex-col border-purple-200 shadow-lg">
      <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardTitle className="flex items-center text-lg">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
            <Sparkles className="h-5 w-5 text-purple-600" />
          </div>
          Tunza AI Assistant - Here for Everyone! 🤖
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {!message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-purple-600" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                
                {message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-purple-600" />
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t bg-gray-50">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Tunza Rewards..."
              disabled={isLoading}
              className="flex-1 border-purple-200 focus:border-purple-400"
            />
            <Button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerAIChat;
