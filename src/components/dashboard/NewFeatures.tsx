
import React from "react";
import { Button } from "@/components/ui/button";
import { Handshake, Award, WalletCards } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewFeatures: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gradient-to-r from-[#f8f8fa] via-[#f3f3f7] to-[#f8f8fa] border-y border-gray-200/60 py-4 px-4 shadow-sm relative z-10">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><path d=%22M0 20 L40 20%22 stroke=%22%23B87333%22 stroke-opacity=%220.03%22 stroke-width=%221%22/></svg>')] opacity-30"></div>
      <div className="container mx-auto max-w-6xl relative">
        <h3 className="text-base font-semibold text-gray-800 mb-3">New Features</h3>
        <div className="flex flex-wrap justify-center sm:justify-between gap-4">
          <Button 
            variant="bronze"
            className="flex items-center gap-2 px-6 py-2 rounded-md"
            onClick={() => navigate("/barter-system")}
          >
            <Handshake className="h-4 w-4" />
            <span>Barter System</span>
          </Button>
          
          <Button 
            variant="bronze"
            className="flex items-center gap-2 px-6 py-2 rounded-md"
            onClick={() => navigate("/subscription-plans")}
          >
            <Award className="h-4 w-4" />
            <span>Upgrade my plan</span>
          </Button>
          
          <Button 
            variant="bronze"
            className="flex items-center gap-2 px-6 py-2 rounded-md"
            onClick={() => navigate("/copay-credits")}
          >
            <WalletCards className="h-4 w-4" />
            <span>Co-Pay Credits</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewFeatures;
