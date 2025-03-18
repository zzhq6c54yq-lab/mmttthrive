
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface HelpDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onOpenChange }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi there! I'm Henry, your digital counselor. How can I assist you today?", isUser: false }
  ]);
  const [userInput, setUserInput] = useState("");
  const { toast } = useToast();
  
  // Mental health knowledge base
  const knowledgeBase = {
    "anxiety": "Anxiety is a normal response to stress, but when it becomes excessive, it may be an anxiety disorder. Deep breathing, mindfulness, and seeking professional help are effective approaches.",
    "depression": "Depression is more than just feeling sad. It's a persistent feeling of sadness or loss of interest that can interfere with daily activities. Professional support is important.",
    "stress": "Stress is your body's reaction to pressure from a situation or event. Managing stress through exercise, meditation, and social connections can improve your wellbeing.",
    "therapy": "Therapy provides a safe space to explore feelings, beliefs, and behaviors with a trained professional. There are many types available based on your specific needs.",
    "meditation": "Meditation is a mindfulness practice that can help reduce stress, improve focus, and promote emotional wellbeing. Even a few minutes daily can make a difference.",
    "suicide": "If you're having thoughts of suicide, please call the National Suicide Prevention Lifeline at 988 or text HOME to 741741 to reach the Crisis Text Line. Help is available 24/7.",
    "crisis": "If you're experiencing a mental health crisis, please call 988 for immediate support, or text HOME to 741741. You can also visit our Crisis Support page for resources.",
    "feeling sad": "I'm sorry to hear you're feeling sad. That's a natural emotion, and it's okay to feel this way. Would you like to explore some activities that might help improve your mood?",
    "feeling depressed": "I understand you're feeling depressed, and I want you to know you're not alone. Depression is treatable, and there are resources available to help. Would you like me to suggest some coping strategies or professional resources?",
    "feeling anxious": "Anxiety can be challenging to deal with. Let's take a deep breath together. Would you like me to share some techniques that might help reduce anxiety in the moment?",
    "feeling overwhelmed": "When everything feels overwhelming, it can help to focus on just one thing at a time. Would you like to try a simple grounding exercise to help center yourself?",
    "greeting": "Hello! I'm Henry, your digital mental health counselor. How are you feeling today?",
    "how are you": "I'm here and ready to support you in your mental wellness journey. How can I assist you today?",
    "who are you": "I'm Henry, your digital mental health counselor. I'm here to provide support, information, and resources for your mental wellness journey.",
    "thank you": "You're welcome! I'm glad I could help. Remember, I'm here for you whenever you need support.",
    "help": "I'm here to help. Whether you need information, resources, or just someone to talk to, I'm available. What are you looking for today?"
  };
  
  useEffect(() => {
    // Reset messages when dialog opens
    if (isOpen) {
      setMessages([{ text: "Hi there! I'm Henry, your digital counselor. How can I assist you today?", isUser: false }]);
    }
  }, [isOpen]);
  
  const checkForEmergency = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("kill myself") || 
        lowerMessage.includes("suicide") || 
        lowerMessage.includes("end my life") ||
        lowerMessage.includes("don't want to live")) {
      return true;
    }
    
    return false;
  };

  const checkEmotionalState = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("sad") || lowerMessage.includes("unhappy") || lowerMessage.includes("down")) {
      return "feeling sad";
    }
    
    if (lowerMessage.includes("depress")) {
      return "feeling depressed";
    }
    
    if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") || lowerMessage.includes("nervous") || lowerMessage.includes("worry")) {
      return "feeling anxious";
    }
    
    if (lowerMessage.includes("overwhelm") || lowerMessage.includes("too much") || lowerMessage.includes("can't handle")) {
      return "feeling overwhelmed";
    }
    
    return null;
  };

  const checkBasicQuestion = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi ") || lowerMessage === "hi" || lowerMessage.includes("hey")) {
      return "greeting";
    }
    
    if (lowerMessage.includes("how are you")) {
      return "how are you";
    }
    
    if (lowerMessage.includes("who are you") || lowerMessage.includes("what are you")) {
      return "who are you";
    }
    
    if (lowerMessage.includes("thank you") || lowerMessage.includes("thanks")) {
      return "thank you";
    }
    
    if (lowerMessage === "help" || lowerMessage.includes("need help") || lowerMessage.includes("can you help")) {
      return "help";
    }
    
    return null;
  };
  
  const generateResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for emergency
    if (checkForEmergency(message)) {
      return "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 right away. Would you like me to navigate you to our Crisis Support page?";
    }
    
    // Check for emotional states
    const emotionalState = checkEmotionalState(message);
    if (emotionalState) {
      return knowledgeBase[emotionalState];
    }
    
    // Check for basic questions
    const basicQuestion = checkBasicQuestion(message);
    if (basicQuestion) {
      return knowledgeBase[basicQuestion];
    }
    
    // Check knowledge base for mental health topics
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }
    
    // Navigation requests
    if (lowerMessage.includes("workshops") || lowerMessage.includes("workshop")) {
      return "I can help you explore our workshops! Would you like me to navigate you to the Workshops page?";
    }
    
    if (lowerMessage.includes("community") || lowerMessage.includes("support")) {
      return "Our Community Support section is a great place to connect with others. Would you like me to take you there?";
    }
    
    // Default responses if no matches
    const defaultResponses = [
      "I'm here to support your mental wellness journey. Could you tell me more about what you're looking for?",
      "I'd be happy to help with that. Is there a specific area of mental wellness you'd like to explore?",
      "Thank you for sharing that with me. How can I best support you right now?",
      "I'm here to help you navigate through our resources. What specific information would be most helpful?",
      "That's a great question. Let me help guide you to the resources that might be most beneficial for you."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

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
