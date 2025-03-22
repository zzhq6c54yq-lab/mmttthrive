
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send } from "lucide-react";
import MessageList from "@/components/shared/MessageList";

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose }) => {
  const [helpMessages, setHelpMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "How can I help you with mental wellness tools today?", isUser: false }
  ]);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  if (!isOpen) return null;

  const addHelpMessage = (text: string, isUser: boolean) => {
    setHelpMessages(prev => [...prev, { text, isUser }]);
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    addHelpMessage(currentMessage, true);
    setCurrentMessage("");
    
    // Simulate response based on keywords
    setTimeout(() => {
      let response = "";
      const lowerMsg = currentMessage.toLowerCase();
      
      if (lowerMsg.includes("meditation") || lowerMsg.includes("mindful")) {
        response = "Our meditation tools include guided sessions, breathing exercises, and mindfulness practices. You can access them in the Mindfulness & Meditation category.";
      } else if (lowerMsg.includes("anxiety") || lowerMsg.includes("stress")) {
        response = "For anxiety relief, I recommend checking out our breathing exercises, journaling tools, and guided relaxation sessions in the Anxiety Relief category.";
      } else if (lowerMsg.includes("sleep")) {
        response = "To improve your sleep, explore our sleep sounds, bedtime routines, and relaxation exercises in the Better Sleep category.";
      } else if (lowerMsg.includes("game") || lowerMsg.includes("fun")) {
        response = "You might enjoy our interactive icing game! It's a fun way to practice mindfulness through a creative activity. Click on 'Fun Zone' to try it out.";
      } else {
        response = "I'd be happy to help you find the right mental wellness tools. You can browse by category or tell me more specifically what you're looking for.";
      }
      
      addHelpMessage(response, false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-[#221F26] p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center mr-2 border border-[#B87333]/30">
              <img 
                src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" 
                alt="Henry" 
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-white font-medium">Chat with Henry</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 h-80">
          <MessageList 
            messages={helpMessages.map(m => ({
              text: m.text,
              isUser: m.isUser,
              timestamp: new Date()
            }))}
            className="h-64"
          />
          <div className="flex mt-4">
            <Input
              placeholder="Ask about mental wellness tools..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 mr-2"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!currentMessage.trim()}
              className="bg-[#B87333] hover:bg-[#B87333]/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDialog;
