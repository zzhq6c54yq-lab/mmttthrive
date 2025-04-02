
import React from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkip: () => void;
  onStartTutorial: () => void;
  translatedText: (key: string) => string;
}

const WelcomeDialog: React.FC<WelcomeDialogProps> = ({
  open,
  onOpenChange,
  onSkip,
  onStartTutorial,
  translatedText
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a1a2a] border-none text-white p-0 max-w-md overflow-hidden rounded-xl">
        <div className="relative">
          {/* Close button */}
          <button 
            onClick={onSkip}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
          >
            <X size={24} />
          </button>
          
          {/* Title */}
          <div className="pt-6 pb-3 px-6 flex items-center gap-3">
            <div className="w-12 h-12 bg-[#2a2a3c] rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  fill="#B87333" stroke="#E5C5A1" strokeWidth="1.5"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Welcome to Thrive MT</h2>
          </div>
          
          <div className="h-px bg-gray-700/50 w-full" />
          
          {/* Tutorial content */}
          <div className="p-4 flex flex-col items-center justify-center">
            <div className="w-full aspect-square max-w-xs relative rounded-full border-4 border-[#B87333]/40 flex items-center justify-center overflow-hidden mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B87333]/20 to-[#1a1a2a]/90 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 relative">
                  <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 25C50 30.5228 45.5228 35 40 35C34.4772 35 30 30.5228 30 25" stroke="#B87333" strokeWidth="2"/>
                    <path d="M40 65C53.8071 65 65 53.8071 65 40C65 26.1929 53.8071 15 40 15C26.1929 15 15 26.1929 15 40C15 53.8071 26.1929 65 40 65Z" stroke="#B87333" strokeWidth="2"/>
                    <path d="M50 55C45.5817 58.5 40.7766 60 40 60C39.2234 60 34.4183 58.5 30 55" stroke="#B87333" strokeWidth="2"/>
                    <path d="M45 68C45 68 48 75 40 75C32 75 35 68 35 68" stroke="#B87333" strokeWidth="2"/>
                    <path d="M60 40H65" stroke="#B87333" strokeWidth="2"/>
                    <path d="M15 40H20" stroke="#B87333" strokeWidth="2"/>
                    <path d="M40 20V15" stroke="#B87333" strokeWidth="2"/>
                    <path d="M40 65V60" stroke="#B87333" strokeWidth="2"/>
                  </svg>
                  <div className="absolute left-0 top-1/2 w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: "0.2s"}}></div>
                </div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <h3 className="text-[#B87333] text-3xl font-bold">Welcome to</h3>
                <h3 className="text-[#B87333] text-4xl font-bold">Thrive MT</h3>
              </div>
            </div>
            
            <p className="text-center text-xl mt-4 mb-8 px-6">
              Let's explore the main features of Thrive MT together to help you start your mental
            </p>
          </div>
          
          <div className="h-px bg-gray-700/50 w-full" />
          
          {/* Progress indicators and Next button */}
          <div className="p-4 flex flex-col items-center">
            <div className="flex gap-2 mb-6">
              {[...Array(11)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-[#B87333]' : 'bg-gray-600'}`}
                ></div>
              ))}
            </div>
            
            <DialogFooter className="w-full flex justify-center">
              <Button 
                onClick={onStartTutorial}
                className="bg-[#B87333] hover:bg-[#9e632c] text-white font-medium px-10 py-6 rounded-lg text-xl h-auto"
              >
                Next <span className="ml-2">›</span>
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
