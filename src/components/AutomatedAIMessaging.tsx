
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Zap, MessageSquare, Loader2 } from "lucide-react";
import { useAutomatedMessaging } from "@/hooks/useAutomatedMessaging";
import MessagesList from "./messaging/MessagesList";
import type { AutomatedAIMessagingProps } from "@/types/automatedMessaging";

const AutomatedAIMessaging = ({ customers, businessName }: AutomatedAIMessagingProps) => {
  const [autoSendEnabled, setAutoSendEnabled] = useState(false);
  
  const {
    automatedMessages,
    generating,
    generateAutomatedMessages,
    sendAutomatedMessage,
    sendAllMessages
  } = useAutomatedMessaging(businessName);

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
            onClick={() => generateAutomatedMessages(customers)}
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

          <MessagesList
            messages={automatedMessages}
            onSendMessage={sendAutomatedMessage}
            onSendAllMessages={sendAllMessages}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedAIMessaging;
