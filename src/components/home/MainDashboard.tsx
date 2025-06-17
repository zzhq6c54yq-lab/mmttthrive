
import React, { useState } from "react";
import ThriveHeader from "@/components/dashboard/ThriveHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";
import InfoButtons from "@/components/dashboard/InfoButtons";
import HenryFloatingElement from "@/components/home/HenryFloatingElement";

interface MainDashboardProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
  selectedQualities: string[];
  selectedGoals: string[];
  navigateToFeature: (path: string) => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  userName,
  showHenry,
  onHenryToggle,
  selectedQualities,
  selectedGoals,
  navigateToFeature
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <ThriveHeader 
        userName={userName}
        showHenry={showHenry}
        onHenryToggle={onHenryToggle}
      />
      
      <InfoButtons />
      
      <DashboardContent 
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
        navigateToFeature={navigateToFeature}
      />
      
      <HenryFloatingElement 
        showHenry={showHenry}
        onToggle={onHenryToggle}
      />
    </div>
  );
};

export default MainDashboard;
