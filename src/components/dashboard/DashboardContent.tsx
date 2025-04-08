
import React, { useState } from "react";
import DailyWellnessChallenges from "@/components/dashboard/DailyWellnessChallenges";
import SpecializedPrograms, { SpecializedProgramsProps } from "@/components/dashboard/SpecializedPrograms";
import GratitudeVisualizer from "@/components/dashboard/GratitudeVisualizer";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import KeyFeatures from "@/components/dashboard/KeyFeatures";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import { NavigateFunction } from "react-router-dom";
import QuizzesSection from "@/components/dashboard/QuizzesSection";
import { Brain, Sparkles, Calendar, HeartPulse, ChevronDown, ChevronUp, Gamepad2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  // State for collapsible sections
  const [sectionsCollapsed, setSectionsCollapsed] = useState({
    workshops: false,
    programs: false,
    appointments: false,
    wellness: false,
    brainGames: false
  });

  const toggleSection = (section: keyof typeof sectionsCollapsed) => {
    setSectionsCollapsed(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="container mx-auto px-4 pb-24">
      <div className="space-y-8">
        {/* Specialized Programs - Now using its own collapsible wrapper */}
        <div className="mt-8">
          <SpecializedPrograms navigateToFeature={navigateToFeature} />
        </div>
        
        {/* Two column layout for appointments and wellness/gratitude */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Upcoming Appointments */}
          <div className="lg:col-span-1">
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400 font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-600" /> 
                    Schedule Center
                  </span>
                </AccordionTrigger>
                <AccordionContent className="animate-accordion-down">
                  <UpcomingAppointments />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* Column 2-3: Wellness and Gratitude */}
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400 font-semibold flex items-center gap-2">
                    <HeartPulse className="h-5 w-5 text-emerald-600" /> 
                    Wellness Center
                  </span>
                </AccordionTrigger>
                <AccordionContent className="animate-accordion-down">
                  <div className="space-y-6">
                    {/* Gratitude Visualizer */}
                    <GratitudeVisualizer />
                      
                    {/* Daily Wellness Challenges */}
                    <DailyWellnessChallenges />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* Featured Workshops - with collapsible functionality */}
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#3d3d5c] to-gray-300 font-semibold flex items-center gap-2">
                Monthly Featured Workshops
              </span>
            </AccordionTrigger>
            <AccordionContent className="animate-accordion-down">
              <FeaturedWorkshops 
                navigate={navigate}
                onWorkshopClick={onWorkshopClick}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Brain Games & Quizzes - using QuizzesSection with its own collapsible wrapper */}
        <QuizzesSection />
        
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
