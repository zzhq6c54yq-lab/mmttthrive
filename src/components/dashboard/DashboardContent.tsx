import React from "react";
import HeroSanctuary from "@/components/dashboard/HeroSanctuary";
import WellnessRibbon from "@/components/dashboard/WellnessRibbon";
import MasonryGrid, { MasonryLeft, MasonryRight } from "@/components/dashboard/MasonryGrid";
import ForYouSection from "@/components/dashboard/ForYouSection";
import CompactGratitude from "@/components/dashboard/CompactGratitude";
import CompactAssessments from "@/components/dashboard/CompactAssessments";
import TimelineAppointments from "@/components/dashboard/TimelineAppointments";
import HeroWorkshop from "@/components/dashboard/HeroWorkshop";
import SpecializedPrograms from "@/components/dashboard/SpecializedPrograms";
import FloatingHenryChat from "@/components/dashboard/FloatingHenryChat";
import { NavigateFunction } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DashboardContentProps {
  userName: string;
  navigate: NavigateFunction;
  onWorkshopClick: (workshopId: string, workshopTitle: string) => void;
  navigateToFeature?: (path: string) => void;
  selectedQualities?: string[];
  selectedGoals?: string[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  userName,
  navigate,
  onWorkshopClick,
  navigateToFeature,
  selectedQualities = [],
  selectedGoals = []
}) => {
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  const { toast } = useToast();

  // always send selected qualities and goals for specialized portals
  const handleFeatureClick = (path: string) => {
    const isSpecializedPortal = [
      "/cancer-support-portal",
      "/law-enforcement-portal",
      "/golden-years-portal",
      "/small-business-portal",
      "/military-dod-portal"
    ].some(p => path.toLowerCase().includes(p.replace("/", "")));
  
    if (navigateToFeature) {
      navigateToFeature(path);
    } else {
      toast({
        title: isSpanish ? "Navegando..." : "Navigating...",
        description: isSpecializedPortal
          ? (isSpanish
            ? "Accediendo al portal especializado seleccionado..."
            : "Accessing selected specialized portal...")
          : (isSpanish
            ? "Cargando recurso solicitado"
            : "Loading requested resource"),
        duration: 1500,
      });
      
      navigate(path, { 
        state: { 
          fromMainMenu: true,
          preventTutorial: true,
          directToAssessment: path.includes('/mental-wellness') || path.includes('/games-and-quizzes'),
          qualities: isSpecializedPortal ? selectedQualities : undefined,
          goals: isSpecializedPortal ? selectedGoals : undefined
        } 
      });
    }
  };

  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 relative z-10">
      {/* Hero Sanctuary Section */}
      <HeroSanctuary 
        userName={userName}
        onQuickCheckin={() => navigate('/daily-wellness')}
        onTodaysGoals={() => navigate('/goals')}
      />

      {/* Wellness Ribbon - Horizontal Story Circles */}
      <WellnessRibbon />

      {/* Masonry Grid Layout */}
      <MasonryGrid>
        {/* Left Column - Large Cards */}
        <MasonryLeft>
          {/* Hero Workshop Card */}
          <HeroWorkshop />
          
          {/* Compact Gratitude Card */}
          <CompactGratitude />
          
          {/* Specialized Programs */}
          <div className="bg-card rounded-3xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {isSpanish ? '✨ Programas Especializados' : '✨ Specialized Programs'}
            </h3>
            <SpecializedPrograms />
          </div>
        </MasonryLeft>

        {/* Right Column - Compact Cards */}
        <MasonryRight>
          {/* Timeline Appointments */}
          <TimelineAppointments />
          
          {/* Compact Assessments Grid */}
          <CompactAssessments />
        </MasonryRight>
      </MasonryGrid>

      {/* For You Recommendations - Horizontal Scroll */}
      <ForYouSection 
        navigateToFeature={handleFeatureClick}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
      />

      {/* Floating Henry Chat */}
      <FloatingHenryChat />
    </main>
  );
};

export default DashboardContent;
