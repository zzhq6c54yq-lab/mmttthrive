
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { generateResponse } from './utils/responseGenerator';

interface HenryMessageProcessorProps {
  onNewMessage: (message: { text: string; isUser: boolean }) => void;
}

const HenryMessageProcessor: React.FC<HenryMessageProcessorProps> = ({ onNewMessage }) => {
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);

  const handleSendMessage = (message: string) => {
    // Add user message to chat
    onNewMessage({ text: message, isUser: true });
    
    setProcessing(true);
    
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
      
      setProcessing(false);
    }, 1000);
  };

  // Return null since this is a logic component, not a UI component
  return null;
};

// Create a custom hook to use the message processor
export const useHenryMessageProcessor = (
  onNewMessage: (message: { text: string; isUser: boolean }) => void
) => {
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);

  const handleSendMessage = (message: string) => {
    // Add user message to chat
    onNewMessage({ text: message, isUser: true });
    
    setProcessing(true);
    
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
      
      setProcessing(false);
    }, 1000);
  };

  return { handleSendMessage, processing };
};

export default HenryMessageProcessor;
