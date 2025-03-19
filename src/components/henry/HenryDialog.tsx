import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MessageList from "../help/MessageList";
import MessageInput from "../help/MessageInput";
import HenryHeader from "./components/HenryHeader";
import QuickActions from "./components/QuickActions";
import { useHenryChat } from "./hooks/useHenryChat";

interface HenryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
}

const HenryDialog: React.FC<HenryDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  userName 
}) => {
  const {
    messages,
    processing,
    handleSendMessage,
    handleQuickAction,
    handleGotIt
  } = useHenryChat({ 
    userName, 
    onOpenChange 
  });

  // Reset messages when dialog opens
  useEffect(() => {
    // The hook already handles the message initialization
  }, [isOpen, userName]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md w-[350px] md:w-[400px] bg-black/85 backdrop-blur-md border border-[#B87333]/50 p-3 max-h-[80vh] overflow-hidden"
        size="small"
      >
        <HenryHeader 
          onClose={() => onOpenChange(false)} 
        />
        
        <MessageList messages={messages} />
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isProcessing={processing} 
        />
        
        <QuickActions onQuickAction={handleQuickAction} />
        
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
