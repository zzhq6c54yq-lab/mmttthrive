
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, AlertTriangle, Smile } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isProcessing?: boolean;
  isEmergencyMode?: boolean;
  onResize?: (height: number) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  isProcessing = false,
  isEmergencyMode = false,
  onResize
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage("");
      // Reset height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        if (onResize) onResize(40);
      }
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize the textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(100, textareaRef.current.scrollHeight);
      textareaRef.current.style.height = `${newHeight}px`;
      if (onResize) onResize(newHeight);
    }
  };

  useEffect(() => {
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextAreaChange}
          placeholder={isEmergencyMode 
            ? "A human counselor is being connected. Please share how you're feeling..."
            : "Type your message to Henry..."
          }
          className={`min-h-[40px] max-h-[100px] resize-none border text-white text-sm transition-colors duration-300 pr-9 ${
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
        <div className="absolute right-2 bottom-2">
          <Button 
            type="button" 
            size="icon"
            variant="ghost"
            className="h-5 w-5 text-gray-400 hover:text-gray-300 hover:bg-transparent"
            disabled={isProcessing}
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>
      </div>
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
