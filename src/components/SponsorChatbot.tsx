
import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

interface SponsorChatbotProps {
  selectedMood?: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  selectedQualities?: string[];
  selectedGoals?: string[];
  contextType?: 'general' | 'recovery';
  className?: string;
}

const SponsorChatbot: React.FC<SponsorChatbotProps> = ({ 
  selectedMood = null, 
  selectedQualities = [], 
  selectedGoals = [],
  contextType = 'general',
  className = ""
}) => {
  // Set initial message based on context and user preferences
  const getInitialMessage = () => {
    if (contextType === 'recovery') {
      return "Hi there, I'm Henry, your digital sponsor. I'm here to support you in your recovery journey. How can I help you today?";
    }
    
    let greeting = "Hello! I'm H.E.N.R.Y., your mental health companion. ";
    
    if (selectedMood) {
      switch(selectedMood) {
        case 'happy':
          greeting += "I'm glad you're feeling happy today! How can I help you maintain this positive energy?";
          break;
        case 'ok':
          greeting += "Even on just okay days, I'm here to listen and support you. What's on your mind?";
          break;
        case 'neutral':
          greeting += "I'm here for you, whether your day is going well or you need some extra support. How can I assist you today?";
          break;
        case 'down':
          greeting += "On the days when you're feeling down, remember you're not alone. What's troubling you?";
          break;
        case 'sad':
          greeting += "I see you're having a difficult day. Remember, it's okay to not be okay, and I'm here to support you. Would you like to talk about what's going on?";
          break;
        case 'overwhelmed':
          greeting += "When everything feels like too much, I'm here to help you find your center again. What's overwhelming you right now?";
          break;
        default:
          greeting += "How are you feeling today, and how can I support you?";
      }
    } else {
      greeting += "How are you feeling today, and how can I support you?";
    }
    
    return greeting;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: getInitialMessage(),
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handleHenryResponse = async (userMessage: string) => {
    // Simulate a thinking delay
    setIsLoading(true);
    
    // This would typically be an API call to a language model
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    let response: string;
    
    // Check if user is mentioning any emotions or mental health concerns
    if (userMessage.toLowerCase().includes("anxious") || userMessage.toLowerCase().includes("anxiety") || userMessage.toLowerCase().includes("stressed")) {
      response = "Anxiety and stress are common experiences. Have you tried any breathing exercises or grounding techniques? The 5-4-3-2-1 technique can be helpful: acknowledge 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.";
    } 
    // Handle recovery-specific topics if in recovery context
    else if (contextType === 'recovery' && (userMessage.toLowerCase().includes("craving") || userMessage.toLowerCase().includes("urge") || userMessage.toLowerCase().includes("relapse"))) {
      response = "Cravings and urges are temporary, even though they may not feel like it. Try using the HALT method - ask yourself if you're Hungry, Angry, Lonely, or Tired. Remember your reasons for recovery and reach out to your support network. What specific triggers are you experiencing right now?";
    }
    // Check if talking about mood or emotions 
    else if (userMessage.toLowerCase().includes("sad") || userMessage.toLowerCase().includes("depressed") || userMessage.toLowerCase().includes("down")) {
      response = "I'm sorry to hear you're feeling this way. Depression and sadness can be incredibly difficult. Have you been able to talk to anyone else about these feelings? Sometimes simply expressing ourselves can help lighten the burden. Would you like to explore some self-care activities that might help?";
    }
    // Check if asking about help resources
    else if (userMessage.toLowerCase().includes("help") || userMessage.toLowerCase().includes("resource") || userMessage.toLowerCase().includes("therapy")) {
      response = "There are many resources available to support mental health. Would you like to explore therapy options through ThriveMT? You can also access our mental wellness tools which include guided meditations, mood tracking, and cognitive behavioral therapy exercises.";
    }
    // Check if mentioning sleep issues
    else if (userMessage.toLowerCase().includes("sleep") || userMessage.toLowerCase().includes("insomnia") || userMessage.toLowerCase().includes("tired")) {
      response = "Sleep is crucial for mental health. Some helpful sleep hygiene tips include maintaining a consistent sleep schedule, creating a restful environment, limiting screen time before bed, and avoiding caffeine late in the day. Would you like more specific strategies for improving your sleep?";
    }
    // Check if discussing relationships
    else if (userMessage.toLowerCase().includes("relationship") || userMessage.toLowerCase().includes("friend") || userMessage.toLowerCase().includes("family")) {
      response = "Relationships can significantly impact our mental health. Whether it's setting boundaries, improving communication, or processing difficult interactions, there are strategies that can help. Would you like to discuss a specific relationship challenge?";
    }
    // Check if talking about the HENRY acronym
    else if (userMessage.toLowerCase().includes("henry") && userMessage.toLowerCase().includes("acronym") || userMessage.toLowerCase().includes("what does henry stand for")) {
      response = "My name HENRY stands for:\n\nHope: Cultivating a sense of hope for recovery and resilience\nEmotional Awareness: Understanding and recognizing your emotions\nNurturing Relationships: Building supportive connections\nResilience: Developing the ability to bounce back from challenges\nYou Matter: Remembering that you are valuable and deserving of care\n\nHow can I help you with any of these aspects today?";
    }
    // Default supportive response
    else {
      response = "Thank you for sharing that with me. Your mental health journey matters, and I'm here to support you every step of the way. Is there something specific about what you've mentioned that you'd like to explore further?";
    }
    
    setIsLoading(false);
    
    // Add Henry's response to the messages
    setMessages((prev) => [
      ...prev,
      {
        id: `henry-${Date.now()}`,
        content: response,
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === "") return;
    
    // Add the user's message
    const userMessage = {
      id: `user-${Date.now()}`,
      content: input.trim(),
      role: "user" as const,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Generate Henry's response
    await handleHenryResponse(userMessage.content);
  };

  return (
    <Card className={`w-full h-[600px] flex flex-col border border-[#B87333]/20 bg-white/5 backdrop-blur-md ${className}`}>
      <div className="p-4 border-b border-[#B87333]/20 bg-[#B87333]/10">
        <h3 className="text-lg font-medium text-white">H.E.N.R.Y. - Your Mental Health Companion</h3>
        <p className="text-sm text-gray-300">Available 24/7 to support your wellbeing journey</p>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-[#B87333] text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center mb-1">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src="/photo-1485827404703-89b55fcc595e.jpg" alt="Henry" />
                      <AvatarFallback className="bg-[#B87333]/20 h-full w-full flex items-center justify-center text-[#B87333] text-xs">
                        H
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-300">Henry</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block text-right">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-700 text-white">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/photo-1485827404703-89b55fcc595e.jpg" alt="Henry" />
                    <AvatarFallback className="bg-[#B87333]/20 h-full w-full flex items-center justify-center text-[#B87333] text-xs">
                      H
                    </AvatarFallback>
                  </Avatar>
                  <Loader2 className="h-4 w-4 animate-spin text-[#B87333]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-[#B87333]/20">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 h-10 min-h-10 bg-white/5 border-[#B87333]/20 focus-visible:ring-[#B87333] text-white"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || input.trim() === ""}
            className="h-10 w-10 bg-[#B87333] hover:bg-[#B87333]/80"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default SponsorChatbot;
