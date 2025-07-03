
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X, Sparkles } from "lucide-react";
import CustomerAIChat from "./CustomerAIChat";

interface FloatingAIChatProps {
  customerPhone?: string;
  businessContext?: string;
}

const FloatingAIChat = ({ customerPhone, businessContext }: FloatingAIChatProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Enhanced Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 shadow-xl border-2 border-white animate-pulse hover:animate-none transition-all duration-300"
          size="sm"
        >
          {isOpen ? (
            <X className="h-7 w-7 text-white" />
          ) : (
            <div className="relative">
              <Bot className="h-7 w-7 text-white" />
              <Sparkles className="h-3 w-3 text-yellow-300 absolute -top-1 -right-1 animate-bounce" />
            </div>
          )}
        </Button>
        
        {/* Helper tooltip */}
        {!isOpen && (
          <div className="absolute bottom-20 right-0 bg-black text-white text-xs px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            💬 Ask me anything about Tunza Rewards!
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
          </div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 animate-fade-in">
          <CustomerAIChat 
            customerPhone={customerPhone}
            businessContext={businessContext}
          />
        </div>
      )}
    </>
  );
};

export default FloatingAIChat;
