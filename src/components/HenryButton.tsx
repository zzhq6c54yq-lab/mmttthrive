
import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface HenryButtonProps {
  className?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
}

const HenryButton: React.FC<HenryButtonProps> = ({ 
  className = "", 
  isOpen,
  onOpenChange,
  userName
}) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    let timeOfDay = "";
    
    if (hour < 12) timeOfDay = "morning";
    else if (hour < 17) timeOfDay = "afternoon";
    else timeOfDay = "evening";
    
    const greeting = userName 
      ? `Good ${timeOfDay}, ${userName}! How can I help you on your journey today?`
      : `Good ${timeOfDay}! How can I help you on your journey today?`;
      
    return greeting;
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([{ text: getGreeting(), isUser: false }]);
    }
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    
    // Simulate Henry's response (this would be replaced with actual AI response logic)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I'm here to help you. Let me know what's on your mind.", 
        isUser: false 
      }]);
    }, 1000);
    
    setInput("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-black/85 backdrop-blur-md border border-[#B87333]/50">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="h-24 w-24 rounded-full flex items-center justify-center border-4 border-[#B87333]/50 bg-[#B87333] text-white">
              <span className="text-3xl font-bold">H</span>
            </div>
          </div>
          <DialogTitle className="text-2xl gradient-heading">Chat with Henry</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] overflow-auto pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? "bg-[#B87333] text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <form onSubmit={handleSendMessage} className="flex gap-2 mt-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 min-h-[40px] bg-white/5 border-[#B87333]/20 focus-visible:ring-[#B87333] text-white"
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
            className="h-10 w-10 bg-[#B87333] hover:bg-[#B87333]/80"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HenryButton;
