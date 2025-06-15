
import { Button } from "@/components/ui/button";
import AutomatedMessageItem from "./AutomatedMessageItem";
import type { AutomatedMessage } from "@/types/automatedMessaging";

interface MessagesListProps {
  messages: AutomatedMessage[];
  onSendMessage: (message: AutomatedMessage) => void;
  onSendAllMessages: () => void;
}

const MessagesList = ({ messages, onSendMessage, onSendAllMessages }: MessagesListProps) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Generated Messages ({messages.length})</h3>
        <Button
          onClick={onSendAllMessages}
          size="sm"
          className="bg-green-600 hover:bg-green-700"
        >
          Send All Messages
        </Button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {messages.map((automatedMsg, index) => (
          <AutomatedMessageItem
            key={index}
            automatedMsg={automatedMsg}
            onSend={onSendMessage}
          />
        ))}
      </div>
    </>
  );
};

export default MessagesList;
