
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { generateResponse } from './utils/responseGenerator';

interface HenryMessageProcessorProps {
  onNewMessage: (message: { text: string; isUser: boolean }) => void;
}

const HenryMessageProcessor: React.FC<HenryMessageProcessorProps> = ({ onNewMessage }) => {
  const { toast } = useToast();

  const handleSendMessage = (message: string) => {
    // Add user message to chat
    onNewMessage({ text: message, isUser: true });
    
    // Generate response after a slight delay
    setTimeout(() => {
      const response = generateResponse(message);
      
      onNewMessage({ 
        text: response, 
        isUser: false 
      });
      
      toast({
        title: "New message from Henry",
        description: "Henry has responded to your question.",
        duration: 3000,
      });
    }, 1000);
  };

  return { handleSendMessage };
};

export default HenryMessageProcessor;
