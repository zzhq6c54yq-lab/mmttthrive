
import React from "react";
import NewFeatures from "@/components/dashboard/NewFeatures";
import DailyWellnessChallenges from "@/components/dashboard/DailyWellnessChallenges";
import SpecializedPrograms from "@/components/dashboard/SpecializedPrograms";
import GratitudeVisualizer from "@/components/dashboard/GratitudeVisualizer";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import InsightsSection from "@/components/dashboard/InsightsSection";
import QuizzesSection from "@/components/dashboard/QuizzesSection";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import KeyFeatures from "@/components/dashboard/KeyFeatures";
import { NavigateFunction } from "react-router-dom";

interface DashboardContentProps {
  navigate: NavigateFunction;
  onWorkshopClick: (workshopId: string, workshopTitle: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ 
  navigate, 
  onWorkshopClick 
}) => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-6 relative z-10">
      <div className="mb-12">
        <DailyWellnessChallenges />
      </div>
      
      <SpecializedPrograms />
      
      <GratitudeVisualizer />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <UpcomingAppointments />
        <InsightsSection />
        <QuizzesSection />
      </div>
      
      <FeaturedWorkshops 
        navigate={navigate} 
        onWorkshopClick={onWorkshopClick}
      />

      <KeyFeatures />
    </div>
  );
};

export default DashboardContent;
