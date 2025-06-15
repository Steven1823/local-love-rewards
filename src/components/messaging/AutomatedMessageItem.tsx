
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AutomatedMessage } from "@/types/automatedMessaging";

interface AutomatedMessageItemProps {
  automatedMsg: AutomatedMessage;
  onSend: (automatedMsg: AutomatedMessage) => void;
}

const AutomatedMessageItem = ({ automatedMsg, onSend }: AutomatedMessageItemProps) => {
  return (
    <div className="p-4 border rounded-lg">
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
        onClick={() => onSend(automatedMsg)}
        size="sm"
        className="w-full"
      >
        Send This Message
      </Button>
    </div>
  );
};

export default AutomatedMessageItem;
