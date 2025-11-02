
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThriveHeader from "@/components/dashboard/ThriveHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";
import Sidebar from "@/components/dashboard/Sidebar";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

interface MainDashboardProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
  selectedQualities: string[];
  selectedGoals: string[];
  navigateToFeature: (path: string) => void;
  markTutorialCompleted?: () => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  userName,
  showHenry,
  onHenryToggle,
  selectedQualities,
  selectedGoals,
  navigateToFeature,
  markTutorialCompleted
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleWorkshopClick = (workshopId: string, workshopTitle: string) => {
    toast({
      title: isSpanish ? "Navegando al taller..." : "Navigating to workshop...",
      description: workshopTitle,
      duration: 1500,
    });
    navigate(`/workshop/${workshopId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <ThriveHeader 
        userName={userName}
        showHenry={showHenry}
        onHenryToggle={onHenryToggle}
        onMenuClick={() => setSidebarOpen(true)}
      />
      
      <DashboardContent
        userName={userName}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
        navigateToFeature={navigateToFeature}
        navigate={navigate}
        onWorkshopClick={handleWorkshopClick}
      />
    </div>
  );
};

export default MainDashboard;
