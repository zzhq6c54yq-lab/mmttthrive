
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, AlertTriangle } from "lucide-react";

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
        className={`flex-1 min-h-[40px] border text-white text-sm transition-colors duration-300 ${
          isEmergencyMode 
            ? "bg-red-900/20 border-red-600/40 focus-visible:ring-red-600" 
            : "bg-white/5 border-[#B87333]/30 focus-visible:ring-[#B87333]"
        }`}
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
        className={`h-10 w-10 transition-colors duration-300 ${
          isEmergencyMode
            ? "bg-red-600 hover:bg-red-700"
            : "bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A76323] hover:to-[#D4B491]"
        }`}
        disabled={message.trim() === "" || isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isEmergencyMode ? (
          <AlertTriangle className="h-4 w-4" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};

export default MessageInput;
