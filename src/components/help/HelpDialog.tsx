
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useToast } from "@/hooks/use-toast";
import { useHenryMessageProcessor } from "./HenryMessageProcessor";
import { Brain, Heart } from "lucide-react";

interface HelpDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onOpenChange }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi there! I'm Henry, your digital mental health companion. How can I support you today?", isUser: false }
  ]);
  
  useEffect(() => {
    // Reset messages when dialog opens
    if (isOpen) {
      setMessages([{ text: "Hi there! I'm Henry, your digital mental health companion. How can I support you today?", isUser: false }]);
    }
  }, [isOpen]);
  
  const addNewMessage = (message: { text: string; isUser: boolean }) => {
    setMessages(prev => [...prev, message]);
  };
  
  const { handleSendMessage, processing, emergencyMode } = useHenryMessageProcessor(addNewMessage);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md w-[350px] md:w-[400px] bg-black/85 backdrop-blur-md border border-[#B87333]/50 p-3 max-h-[80vh] overflow-hidden"
      >
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="relative h-16 w-16 rounded-full flex items-center justify-center bg-gradient-to-br from-black to-gray-700 border border-[#B87333]/50">
              <img 
                src="/lovable-uploads/54e4d3e9-8aa5-46b2-a8e6-42fb0ba8128b.png" 
                alt="Henry" 
                className="h-16 w-16 object-contain"
              />
              {emergencyMode && (
                <div className="absolute inset-0 rounded-full border-2 border-red-600 animate-pulse"></div>
              )}
            </div>
          </div>
          <DialogTitle className={`text-lg ${emergencyMode ? "text-red-400" : "text-white"}`}>
            {emergencyMode ? "Emergency Support Mode" : "Need Help?"}
          </DialogTitle>
          <DialogDescription className={emergencyMode ? "text-red-300" : "text-gray-300"}>
            {emergencyMode 
              ? "Connecting you with a human counselor..." 
              : "Chat with Henry, your mental health companion"
            }
          </DialogDescription>
        </DialogHeader>
        
        <MessageList messages={messages} />
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isProcessing={processing} 
          isEmergencyMode={emergencyMode}
        />
        
        <div className="mt-4 flex justify-center">
          <Button
            className={`${
              emergencyMode 
                ? "bg-gradient-to-br from-red-700 to-red-500 hover:from-red-800 hover:to-red-600" 
                : "bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F]"
            } text-white w-1/2`}
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
