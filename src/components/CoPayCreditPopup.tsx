
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BadgePercent, Wallet, GiftIcon, ShoppingBag, Award } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

interface CoPayCreditPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CoPayCreditPopup = ({ open, onOpenChange }: CoPayCreditPopupProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleExplore = () => {
    onOpenChange(false);
    navigate("/wellness-challenges");
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="bg-gradient-to-b from-white to-amber-50 border border-[#B87333]/30 shadow-xl max-w-md max-h-[85vh] overflow-hidden"
        size={isMobile ? "small" : "default"}
      >
        <DialogHeader className="mb-1 pb-1">
          <DialogTitle className="text-base md:text-lg font-bold text-[#B87333] flex items-center gap-1">
            <BadgePercent className="h-3 w-3 md:h-4 md:w-4" />
            New to Thrive MT
          </DialogTitle>
          <DialogDescription>
            <p className="text-2xs md:text-xs text-gray-700">Discover our rewards system designed to support your journey</p>
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="pr-3 max-h-[50vh] overflow-y-auto">
          <div className="space-y-2">
            <div className="flex items-start gap-2 bg-amber-50/80 p-2 rounded-lg border border-amber-100">
              <div className="bg-[#B87333] p-1.5 rounded-full flex-shrink-0">
                <Wallet className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-2xs md:text-xs">Co-pay Credits</h3>
                <p className="text-gray-600 text-[10px] md:text-2xs mt-0.5">
                  10% of every co-pay comes back as credits to use for future appointments
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 bg-amber-50/80 p-2 rounded-lg border border-amber-100">
              <div className="bg-[#B87333] p-1.5 rounded-full flex-shrink-0">
                <Award className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-2xs md:text-xs">Challenge Rewards</h3>
                <p className="text-gray-600 text-[10px] md:text-2xs mt-0.5">
                  Complete daily wellness challenges to earn points: 5,000 points = $5 credit
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 bg-amber-50/80 p-2 rounded-lg border border-amber-100">
              <div className="bg-[#B87333] p-1.5 rounded-full flex-shrink-0">
                <GiftIcon className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-2xs md:text-xs">Meet Henry</h3>
                <p className="text-gray-600 text-[10px] md:text-2xs mt-0.5">
                  Introducing Henry, our AI sponsor for N.A. or A.A. recovery support
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 bg-amber-50/80 p-2 rounded-lg border border-amber-100">
              <div className="bg-[#B87333] p-1.5 rounded-full flex-shrink-0">
                <ShoppingBag className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-2xs md:text-xs">Thrive Apparel</h3>
                <p className="text-gray-600 text-[10px] md:text-2xs mt-0.5">
                  Use your earned co-pay credits at thrive-apparel.com
                </p>
                <a href="https://thrive-apparel.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="gold-outline" size="sm" className="mt-1 text-[10px] md:text-2xs py-0.5 h-5 md:h-6">
                    Shop Now
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-2 bg-amber-50/80 p-2 rounded-lg border border-amber-100">
              <div className="bg-[#B87333] p-1.5 rounded-full flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white md:w-3 md:h-3">
                  <path d="M12 6v12"></path>
                  <path d="M6 12h12"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-2xs md:text-xs">Barter System</h3>
                <p className="text-gray-600 text-[10px] md:text-2xs mt-0.5">
                  Pay what you can and balance the rest through community service
                </p>
              </div>
            </div>
            
            {/* Updated point conversion details */}
            <div className="flex items-start gap-2 bg-amber-50/80 p-2 rounded-lg border border-amber-100">
              <div className="bg-amber-600 p-1.5 rounded-full flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white md:w-3 md:h-3">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m16 12-4 4-4-4"></path>
                  <path d="M12 8v8"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-2xs md:text-xs">Point Conversion</h3>
                <p className="text-gray-600 text-[10px] md:text-2xs mt-0.5">
                  • 5,000 points = $5 credit<br />
                  • 10,000 points = $10 credit<br />
                  • 25,000 points = $25 credit
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-between mt-1">
          <Button 
            onClick={() => onOpenChange(false)}
            variant="outline"
            size={isMobile ? "sm" : "default"}
            className="font-medium border-amber-300 text-amber-800 text-[10px] md:text-2xs h-6 md:h-7"
          >
            Got It
          </Button>
          
          <Button 
            onClick={handleExplore}
            variant="gold"
            size={isMobile ? "sm" : "default"}
            className="font-medium px-2 py-0.5 text-black text-[10px] md:text-2xs md:px-3 md:py-1 h-6 md:h-7"
          >
            Explore Challenges
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoPayCreditPopup;
