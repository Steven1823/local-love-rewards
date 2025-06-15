
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import CustomerAIChat from "./CustomerAIChat";

interface FloatingAIChatProps {
  customerPhone?: string;
  businessContext?: string;
}

const FloatingAIChat = ({ customerPhone, businessContext }: FloatingAIChatProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          size="sm"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Bot className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 sm:w-96">
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
