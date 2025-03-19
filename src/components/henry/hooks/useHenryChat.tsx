
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UseHenryChatProps {
  userName?: string;
  onOpenChange: (open: boolean) => void;
}

export const useHenryChat = ({ userName, onOpenChange }: UseHenryChatProps) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const getGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = "";
    
    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 17) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";
    
    return userName 
      ? `${timeGreeting}, ${userName}! I'm Henry, your digital mental health counselor. I'm here to help you navigate Thrive MT and support your mental wellness journey. How can I assist you today?`
      : `${timeGreeting}! I'm Henry, your digital mental health counselor. I'm here to help you navigate Thrive MT and support your mental wellness journey. How can I assist you today?`;
  };

  useEffect(() => {
    // Reset messages for a fresh conversation
    setMessages([{ text: getGreeting(), isUser: false }]);
  }, [userName]);

  const navigateToSection = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("workshop")) {
      navigate("/workshops");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("community") || lowerMessage.includes("forum") || lowerMessage.includes("chat")) {
      navigate("/community-support");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("tool")) {
      navigate("/mental-wellness-tools");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("crisis") || lowerMessage.includes("emergency")) {
      navigate("/crisis-support");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("therapist")) {
      navigate("/therapist-questionnaire");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("game")) {
      navigate("/mental-health-games");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("progress")) {
      navigate("/progress-reports");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("profile")) {
      navigate("/user-profile");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("setting")) {
      navigate("/user-settings");
      onOpenChange(false);
      return true;
    }
    
    return false;
  };

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setProcessing(true);
    
    // Check for direct navigation commands
    setTimeout(() => {
      if (message.toLowerCase().includes("take me to") || 
          message.toLowerCase().includes("go to") || 
          message.toLowerCase().includes("navigate to")) {
        
        if (navigateToSection(message)) {
          return;
        }
      }
      
      // Generate standard response from the imported utilities
      import('../utils/responseGenerator').then(({ generateResponse }) => {
        const response = generateResponse(message, userName);
        
        setMessages(prev => [...prev, { 
          text: response, 
          isUser: false 
        }]);
        
        toast({
          title: "New message from Henry",
          description: "Henry has responded to your question.",
          duration: 3000,
        });
        
        setProcessing(false);
      });
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(`Tell me about ${action}`);
  };

  const handleGotIt = () => {
    onOpenChange(false);
    toast({
      title: "Henry will be here when you need him",
      description: "Click the H button anytime for support and guidance",
      duration: 2000,
    });
  };

  return {
    messages,
    processing,
    handleSendMessage,
    handleQuickAction,
    handleGotIt
  };
};
