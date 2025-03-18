
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Brain, Heart, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import MessageList from "../help/MessageList";
import MessageInput from "../help/MessageInput";

interface HenryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
}

const HenryDialog: React.FC<HenryDialogProps> = ({ isOpen, onOpenChange, userName }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mental health knowledge base for Henry
  const knowledgeBase = {
    // Basic mental health information
    "anxiety": "Anxiety is a normal response to stress, but when it becomes excessive, it may be an anxiety disorder. Deep breathing, mindfulness, and seeking professional help are effective approaches.",
    "depression": "Depression is more than just feeling sad. It's a persistent feeling of sadness or loss of interest that can interfere with daily activities. Professional support is important.",
    "stress": "Stress is your body's reaction to pressure from a situation or event. Managing stress through exercise, meditation, and social connections can improve your wellbeing.",
    "therapy": "Therapy provides a safe space to explore feelings, beliefs, and behaviors with a trained professional. There are many types available based on your specific needs.",
    "meditation": "Meditation is a mindfulness practice that can help reduce stress, improve focus, and promote emotional wellbeing. Even a few minutes daily can make a difference.",
    "suicide": "If you're having thoughts of suicide, please call the National Suicide Prevention Lifeline at 988 or text HOME to 741741 to reach the Crisis Text Line. Help is available 24/7.",
    "crisis": "If you're experiencing a mental health crisis, please call 988 for immediate support, or text HOME to 741741. You can also visit our Crisis Support page for resources.",
    "workshops": "Our workshops offer interactive learning experiences on various mental health topics. You can find topics ranging from anxiety management to building resilience.",
    "community": "Connecting with others who understand what you're going through can be healing. Our Community Support section offers forums and group chats.",
    "resources": "We have a variety of self-help resources available, including guides, workbooks, and interactive tools to support your mental wellness journey.",
    "tools": "Our Mental Wellness Tools include mood tracking, journaling prompts, guided meditations, and cognitive behavioral therapy exercises.",
    "sleep": "Quality sleep is essential for mental health. Our Mindfulness & Sleep section has resources to help improve your sleep habits.",
    "exercise": "Physical activity can significantly improve mood and reduce anxiety and depression. Even a short daily walk can be beneficial.",
    
    // Basic conversation responses
    "greeting": "Hello! I'm Henry, your digital mental health counselor. How are you feeling today?",
    "how are you": "I'm here and ready to support you in your mental wellness journey. How can I assist you today?",
    "what can you do": "I can provide mental health information, direct you to resources, offer supportive listening, and help you navigate our app. I'm here to support your mental wellness journey.",
    "who are you": "I'm Henry, your digital mental health counselor. I'm here to support you through your mental wellness journey and help you find the resources you need.",
    "thank you": "You're welcome! I'm glad I could help. Remember, I'm here for you whenever you need support.",
    "help": "I'm here to help. Whether you need information, resources, or just someone to talk to, I'm available. What are you looking for today?",
    "feeling sad": "I'm sorry to hear you're feeling sad. That's a normal emotion, but if it's overwhelming, let's talk about it. Would you like me to suggest some self-care activities or resources?",
    "feeling depressed": "I understand you're feeling depressed, and I want you to know you're not alone. Depression is treatable, and there are resources here to help. Would you like me to connect you with therapeutic resources or schedule a therapy session?",
    "feeling anxious": "Anxiety can be really challenging. Remember to take slow, deep breaths. Would you like me to guide you through a quick grounding exercise or connect you with our anxiety resources?",
    "feeling overwhelmed": "When you're feeling overwhelmed, it's important to take a step back. Let's break things down together. Would you like to try a simple mindfulness exercise or explore tools to help manage overwhelm?",
    "feeling angry": "Anger is a natural emotion that tells us something isn't right. Finding healthy ways to express and manage anger is important. Would you like to explore some techniques that might help?",
    "feeling good": "I'm glad to hear you're feeling good! That's wonderful news. Would you like to build on this positive moment with some wellbeing activities?"
  };

  // Navigation knowledge base
  const navigationHelp = {
    "workshops": "Let me take you to our Workshops section, where you'll find interactive mental health resources.",
    "community": "I'll show you to our Community Support section, where you can connect with others.",
    "tools": "Let me direct you to our Mental Wellness Tools, which offer practical resources for self-help.",
    "crisis": "I'll take you to our Crisis Support resources right away.",
    "therapist": "Let me help you find a therapist through our matching service.",
    "games": "I can show you our Mental Health Games section for fun, interactive ways to build skills.",
    "progress": "Let's check your Progress Reports to see how your journey is going.",
    "profile": "I'll take you to your User Profile where you can update your information.",
    "settings": "Let me show you to the User Settings page where you can customize your experience."
  };

  // Emergency services referral responses
  const emergencyResponses = {
    "suicidal": "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 right away. Would you like me to navigate you to our Crisis Support page?",
    "emergency": "This sounds like an emergency situation. Please call 911 immediately. Would you like me to direct you to our Crisis Support resources as well?",
    "crisis": "I understand you're going through a difficult time. The Crisis Text Line is available 24/7 - text HOME to 741741 to connect with a counselor. Would you like me to take you to our Crisis Support page?",
    "harm": "Your safety is important. If you're thinking about harming yourself or others, please call 988 or go to your nearest emergency room. Would you like me to show you our Crisis Support resources?"
  };

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
    // Reset messages when dialog opens
    if (isOpen) {
      setMessages([{ text: getGreeting(), isUser: false }]);
    }
  }, [isOpen, userName]);

  const checkForEmergency = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("kill myself") || 
        lowerMessage.includes("suicide") || 
        lowerMessage.includes("end my life") ||
        lowerMessage.includes("don't want to live")) {
      return "suicidal";
    }
    
    if (lowerMessage.includes("emergency") || 
        lowerMessage.includes("need help now") ||
        lowerMessage.includes("urgent")) {
      return "emergency";
    }
    
    if (lowerMessage.includes("crisis") || 
        lowerMessage.includes("breakdown") ||
        lowerMessage.includes("panic attack")) {
      return "crisis";
    }
    
    if (lowerMessage.includes("hurt myself") || 
        lowerMessage.includes("harm myself") ||
        lowerMessage.includes("hurt someone")) {
      return "harm";
    }
    
    return null;
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
    
    if (lowerMessage.includes("angry") || lowerMessage.includes("mad") || lowerMessage.includes("frustrat")) {
      return "feeling angry";
    }
    
    if (lowerMessage.includes("good") || lowerMessage.includes("great") || lowerMessage.includes("happy") || lowerMessage.includes("joy")) {
      return "feeling good";
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
    
    if (lowerMessage.includes("what can you do") || lowerMessage.includes("help me with")) {
      return "what can you do";
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

  const generatePersonalizedResponse = (emotionalState: string, userName?: string) => {
    if (emotionalState === "feeling depressed") {
      const name = userName ? `, ${userName}` : "";
      return `I'm really sorry you're feeling depressed${name}. That's a heavy burden to carry, and you don't have to face it alone. Depression is treatable, and reaching out like this is a brave first step. Would you like me to set up a therapy appointment for you? In the meantime, I can show you some exercises that might help lift that cloud of depression. How does that sound?`;
    }
    
    if (emotionalState === "feeling sad") {
      const name = userName ? `, ${userName}` : "";
      return `I'm sorry to hear you're feeling sad${name}. Your emotions are valid, and it's okay to feel this way sometimes. Would you like to explore some simple activities that might help improve your mood, or would you prefer to talk more about what's making you sad?`;
    }
    
    if (emotionalState === "feeling anxious") {
      const name = userName ? `, ${userName}` : "";
      return `I understand anxiety can be really difficult${name}. Let's take a moment together. Could you try taking a slow, deep breath with me? In through your nose for 4 counts, hold for 1, and out through your mouth for 6. Would you like me to guide you through a quick grounding exercise, or would you prefer to explore our anxiety management resources?`;
    }
    
    if (emotionalState === "feeling overwhelmed") {
      const name = userName ? `, ${userName}` : "";
      return `It sounds like things are feeling too much right now${name}. That's understandable. When we're overwhelmed, it helps to break things down into smaller pieces. Would it help to talk about what's contributing to this feeling, or would you prefer some immediate coping strategies?`;
    }
    
    if (emotionalState === "feeling angry") {
      const name = userName ? `, ${userName}` : "";
      return `I hear that you're feeling angry${name}. Anger is often a signal that something important to us has been violated or threatened. Would you like to explore some healthy ways to express this anger, or would it help to talk about the situation that's causing these feelings?`;
    }
    
    if (emotionalState === "feeling good") {
      const name = userName ? `, ${userName}` : "";
      return `That's wonderful to hear${name}! Positive emotions are worth celebrating and savoring. What's contributing to your good mood today? Would you like some suggestions for activities that might help extend these positive feelings?`;
    }
    
    return knowledgeBase[emotionalState];
  };

  const generateResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for emergency first
    const emergencyType = checkForEmergency(message);
    if (emergencyType) {
      return emergencyResponses[emergencyType];
    }
    
    // Check for emotional states
    const emotionalState = checkEmotionalState(message);
    if (emotionalState) {
      return generatePersonalizedResponse(emotionalState, userName);
    }
    
    // Check for basic questions
    const basicQuestion = checkBasicQuestion(message);
    if (basicQuestion) {
      return knowledgeBase[basicQuestion];
    }
    
    // Check for navigation requests
    if (lowerMessage.includes("take me to") || 
        lowerMessage.includes("go to") || 
        lowerMessage.includes("navigate to") ||
        lowerMessage.includes("show me")) {
      
      for (const [key, value] of Object.entries(navigationHelp)) {
        if (lowerMessage.includes(key)) {
          return value;
        }
      }
    }
    
    // Check knowledge base for mental health topics
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }
    
    // Default responses if no matches
    const defaultResponses = [
      "I'm here to support your mental wellness journey. Could you tell me more about what you're looking for?",
      "I'd be happy to help with that. Is there a specific area of mental wellness you'd like to explore?",
      "Thank you for sharing that with me. How can I best support you right now?",
      "I'm here to help you navigate Thrive MT. What specific resources or information would be most helpful?",
      "That's a great question. Let me help guide you to the resources that might be most beneficial for you."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

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
    
    // Check for direct navigation commands
    setTimeout(() => {
      if (message.toLowerCase().includes("take me to") || 
          message.toLowerCase().includes("go to") || 
          message.toLowerCase().includes("navigate to")) {
        
        if (navigateToSection(message)) {
          return;
        }
      }
      
      // Generate standard response
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md w-[350px] md:w-[400px] bg-black/85 backdrop-blur-md border border-[#B87333]/50 p-3 max-h-[80vh] overflow-hidden"
        size="small"
      >
        <div className="absolute right-2 top-2 z-10">
          <Button 
            className="p-1 h-6 w-6 rounded-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <DialogHeader className="text-center relative mb-3">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full flex items-center justify-center border-2 border-[#B87333]/50 bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white">
              <span className="text-xl font-bold">H</span>
            </div>
          </div>
          <DialogTitle className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">Henry, Your Digital Counselor</DialogTitle>
          <DialogDescription className="text-white/70 text-xs">
            Supporting your mental wellness journey
          </DialogDescription>
          <div className="mt-1 text-xs text-white/60 px-2 flex items-center justify-center gap-2">
            <Heart className="h-3 w-3 text-[#B87333]" />
            <Brain className="h-3 w-3 text-[#B87333]" />
            <MessageCircle className="h-3 w-3 text-[#B87333]" />
          </div>
        </DialogHeader>
        
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
        
        <div className="mt-3 flex flex-wrap gap-1 justify-center">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
            onClick={() => handleQuickAction("anxiety")}
          >
            Anxiety <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
            onClick={() => handleQuickAction("depression")}
          >
            Depression <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
            onClick={() => handleQuickAction("stress")}
          >
            Stress <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
            onClick={() => handleQuickAction("workshops")}
          >
            Workshops <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button
            className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white w-1/2"
            onClick={handleGotIt}
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HenryDialog;
