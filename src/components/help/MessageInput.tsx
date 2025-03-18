
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isProcessing?: boolean;
  isEmergencyMode?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  isProcessing = false,
  isEmergencyMode = false
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={isEmergencyMode 
          ? "A human counselor is being connected. Please share how you're feeling..."
          : "Type your message..."
        }
        className="flex-1 min-h-[40px] bg-white/5 border-[#B87333]/20 focus-visible:ring-[#B87333] text-white text-sm"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        disabled={isProcessing}
      />
      <Button 
        type="submit" 
        size="icon"
        className={`h-10 w-10 ${
          isEmergencyMode
            ? "bg-red-600 hover:bg-red-700"
            : "bg-[#B87333] hover:bg-[#B87333]/80"
        }`}
        disabled={message.trim() === "" || isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};

export default MessageInput;
