
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useToast } from "@/hooks/use-toast";
import { generateResponse } from "./utils/responseGenerator";

interface HelpDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onOpenChange }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi there! I'm Henry, your digital counselor. How can I assist you today?", isUser: false }
  ]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Reset messages when dialog opens
    if (isOpen) {
      setMessages([{ text: "Hi there! I'm Henry, your digital counselor. How can I assist you today?", isUser: false }]);
    }
  }, [isOpen]);
  
  const handleSendMessage = (message: string) => {
    // Add user message to chat
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    
    // Generate response after a slight delay
    setTimeout(() => {
      const response = generateResponse(message);
      
      setMessages(prev => [...prev, { 
        text: response, 
        isUser: false 
      }]);
      
      toast({
        title: "New message from Henry",
        description: "Henry has responded to your question.",
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md w-[350px] md:w-[400px] bg-black/85 backdrop-blur-md border border-[#B87333]/50 p-3 max-h-[80vh] overflow-hidden"
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg text-white">Need Help?</DialogTitle>
          <DialogDescription className="text-gray-300">
            Chat with Henry, your digital counselor
          </DialogDescription>
        </DialogHeader>
        
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
        
        <div className="mt-4 flex justify-center">
          <Button
            className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white w-1/2"
            onClick={() => onOpenChange(false)}
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
