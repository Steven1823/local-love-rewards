
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";
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
      content: "🎉 Welcome to Tunza Rewards! I'm your AI assistant and I'm excited to help you discover how our loyalty program works!\n\n✨ Here's what makes Tunza special:\n• Earn points just by visiting participating businesses\n• No apps to download - just use your phone number\n• Redeem rewards when you're ready\n• Track your loyalty across multiple businesses\n\nI can help answer questions about rewards, how to earn points, finding participating businesses, or anything else about Tunza Rewards. What would you like to know?",
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
      const systemPrompt = `You are a friendly AI assistant for Tunza Rewards, a customer loyalty platform. Your role is to welcome users and explain how the app works.

      Key information about Tunza Rewards:
      - It's a phone-based loyalty system (no app downloads needed)
      - Customers earn points by visiting participating businesses
      - Points can be redeemed for rewards
      - Works across multiple businesses
      - Simple and accessible to everyone
      - Currently FREE to use for both businesses and customers
      
      ${businessContext ? `Additional context: ${businessContext}` : ''}
      ${customerPhone ? `User phone: ${customerPhone}` : ''}
      
      You should:
      - Be enthusiastic and welcoming
      - Explain features clearly and simply
      - Encourage users to try the platform
      - Answer questions about how loyalty programs work
      - If you don't know specific business details, suggest they contact businesses directly
      - Always maintain a positive, helpful tone
      - Use emojis appropriately to make conversations friendly
      
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
        content: data.generatedText || "I'm sorry, I couldn't process your request right now. Please try again! 😊",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again.");
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now. But don't worry! Tunza Rewards is designed to be simple - just visit participating businesses and provide your phone number to start earning points! 🌟",
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
    <Card className="w-full max-w-2xl mx-auto h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Bot className="h-5 w-5 mr-2 text-blue-500" />
          Tunza AI Assistant
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
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
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
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about Tunza Rewards..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="sm"
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
