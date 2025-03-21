
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateResponse } from "@/components/help/utils/responseGenerator";
import { checkForEmergency } from "@/components/help/utils/messageHelpers";

interface HenryChatOptions {
  userName?: string;
  onOpenChange?: (open: boolean) => void;
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const useHenryChat = ({ userName = "", onOpenChange }: HenryChatOptions) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [processing, setProcessing] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const { toast } = useToast();
  
  // Initialize with greeting
  useEffect(() => {
    const greeting = userName 
      ? `Hi ${userName}! I'm Henry, your mental health companion. How can I assist you today?` 
      : "Hi there! I'm Henry, your mental health companion. How can I assist you today?";
    
    setMessages([{
      text: greeting,
      isUser: false,
      timestamp: new Date()
    }]);
  }, [userName]);
  
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setProcessing(true);
    
    // Check for emergency
    const emergency = checkForEmergency(text);
    if (emergency && !emergencyMode) {
      setEmergencyMode(true);
      
      // Emergency response with crisis protocol
      setTimeout(() => {
        const emergencyResponse: Message = {
          text: "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 right away. Would you like me to connect you with our Crisis Support resources?",
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, emergencyResponse]);
        setProcessing(false);
        
        toast({
          title: "Crisis Resources Available",
          description: "Henry has detected concerning content and is ready to provide crisis resources.",
          variant: "destructive",
          duration: 10000,
        });
      }, 1000);
      
      return;
    }
    
    // Generate response after a small delay to feel more natural
    setTimeout(() => {
      const response = generateResponse(text, userName);
      
      const henryMessage: Message = {
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, henryMessage]);
      setProcessing(false);
    }, 1500);
  };
  
  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };
  
  const handleGotIt = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };
  
  return {
    messages,
    processing,
    emergencyMode,
    handleSendMessage,
    handleQuickAction,
    handleGotIt
  };
};

export default useHenryChat;
