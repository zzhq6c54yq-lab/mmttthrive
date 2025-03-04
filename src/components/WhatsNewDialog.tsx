
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WhatsNewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WhatsNewDialog: React.FC<WhatsNewDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-[#B87333]/30 bg-gradient-to-b from-[#1a1a1f] to-[#2a2a3f] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center gradient-heading">
            What's New with Thrive MT?
          </DialogTitle>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 -translate-y-12 w-24 h-24 overflow-visible">
            <img 
              src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
              alt="Thrive MT Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
            <h3 className="text-lg font-bold text-[#B87333]">THRIVE MT BARTER SYSTEM</h3>
            <p className="text-gray-300 mb-2">(Pay what you can and work the balance off)</p>
            <Button 
              variant="outline" 
              className="w-full justify-between border-[#B87333]/40 text-[#B87333] hover:bg-[#B87333]/10"
            >
              Click for more information
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
            <h3 className="text-lg font-bold text-white">Now introducing Henry</h3>
            <p className="text-gray-300 mb-2">Your AI sponsor for any and all of your AA or NA needs</p>
            <Button 
              variant="outline" 
              className="w-full justify-between border-[#B87333]/40 text-[#B87333] hover:bg-[#B87333]/10"
            >
              Click for more information
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
            <h3 className="text-lg font-bold text-white">Introducing Co-Pay Credits</h3>
            <p className="text-gray-300 mb-2">(Redeemable for future therapy sessions, upgrade your monthly subscription plan, or at thrive-apparel.com)</p>
            <Button 
              variant="outline" 
              className="w-full justify-between border-[#B87333]/40 text-[#B87333] hover:bg-[#B87333]/10"
            >
              Click for more information
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="relative pt-6 pb-2 text-center border-t border-white/10 mt-6">
          <p className="text-sm italic text-gray-400">Because life should be more than just surviving</p>
        </div>
        
        <DialogFooter>
          <Button 
            className="w-full bg-[#B87333] hover:bg-[#B87333]/80 hero-button"
            onClick={() => onOpenChange(false)}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsNewDialog;
