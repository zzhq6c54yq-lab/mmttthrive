
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NavigationBar from "@/components/navigation/NavigationBar";
import ChronicIllnessDashboard from "@/components/chronic-illness/ChronicIllnessDashboard";

const ChronicIllnessPortal: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ecfdf5] to-[#d1fae5] dark:from-[#064e3b] dark:to-[#065f46] text-black dark:text-white">
      <NavigationBar 
        showBackButton={true}
        showHomeButton={true}
        title="Chronic Illness Support"
        portalMode={true}
        portalPath="/chronic-illness-welcome"
      />
      
      <div className="container mx-auto px-4 pt-16 pb-20">
        <ChronicIllnessDashboard />
      </div>
    </div>
  );
};

export default ChronicIllnessPortal;
