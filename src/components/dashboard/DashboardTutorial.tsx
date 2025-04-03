
import React from "react";
import FeatureTutorial from "@/components/tutorials/FeatureTutorial";

interface DashboardTutorialProps {
  showTutorial: boolean;
  userName: string;
  onClose: () => void;
}

const DashboardTutorial: React.FC<DashboardTutorialProps> = ({ 
  showTutorial,
  userName,
  onClose
}) => {
  if (!showTutorial) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="w-full max-w-lg mx-4">
        <FeatureTutorial 
          featureId="dashboard" 
          onClose={onClose}
          userName={userName}
        />
      </div>
    </div>
  );
};

export default DashboardTutorial;
