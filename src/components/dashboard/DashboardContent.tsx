
import React from "react";
import DailyWellnessChallenges from "@/components/dashboard/DailyWellnessChallenges";
import SpecializedPrograms, { SpecializedProgramsProps } from "@/components/dashboard/SpecializedPrograms";
import GratitudeVisualizer from "@/components/dashboard/GratitudeVisualizer";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import KeyFeatures from "@/components/dashboard/KeyFeatures";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import { NavigateFunction } from "react-router-dom";
import QuizzesSection from "@/components/dashboard/QuizzesSection";
import { Brain, Sparkles } from "lucide-react";
import NewFeatures from "@/components/dashboard/NewFeatures";

interface DashboardContentProps {
  navigate: NavigateFunction;
  onWorkshopClick: (workshopId: string, workshopTitle: string) => void;
  navigateToFeature: (path: string) => void;
  selectedQualities: string[];
  selectedGoals: string[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  navigate,
  onWorkshopClick,
  navigateToFeature,
  selectedQualities,
  selectedGoals
}) => {
  return (
    <div className="container mx-auto px-4 pb-24">
      {/* New Features Banner with brighter colors */}
      <div className="mb-6">
        <NewFeatures />
      </div>

      <div className="space-y-6">
        {/* Specialized Programs - Now with brighter styling */}
        <div className="mt-2">
          <h2 className="text-xl md:text-2xl font-semibold mb-5 flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-gradient-to-r from-indigo-400/30 to-purple-500/30">
              <Sparkles className="h-5 w-5 text-indigo-500" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 pb-1">
              Specialized Programs
            </span>
          </h2>
          <SpecializedPrograms navigateToFeature={navigateToFeature} />
        </div>
        
        {/* Gratitude Visualizer */}
        <GratitudeVisualizer />
        
        {/* Upcoming Appointments */}
        <UpcomingAppointments />
        
        {/* Daily Wellness Challenges */}
        <DailyWellnessChallenges />
        
        {/* Featured Workshops */}
        <FeaturedWorkshops 
          navigate={navigate}
          onWorkshopClick={onWorkshopClick}
        />
        
        {/* Brain Games & Quizzes */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-gradient-to-r from-indigo-400/30 to-purple-500/30">
              <Brain className="h-5 w-5 text-indigo-500" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500">
              Brain Games & Assessments
            </span>
          </h2>
          <QuizzesSection />
        </div>
        
        {/* Key Features - moved to the last section */}
        <KeyFeatures 
          navigateToFeature={navigateToFeature}
          selectedQualities={selectedQualities}
          selectedGoals={selectedGoals}
        />
      </div>
    </div>
  );
};

export default DashboardContent;
