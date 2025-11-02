import React from "react";
import { motion } from "framer-motion";
import DailyWellnessChallenges from "@/components/dashboard/DailyWellnessChallenges";
import SpecializedPrograms from "@/components/dashboard/SpecializedPrograms";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import QuizzesSection from "@/components/dashboard/QuizzesSection";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import KeyFeatures from "@/components/dashboard/key-features/KeyFeatures";
import GratitudeVisualizer from "@/components/dashboard/GratitudeVisualizer";
import HeroWelcomeCard from "@/components/dashboard/HeroWelcomeCard";
import QuickActionsBar from "@/components/dashboard/QuickActionsBar";
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
      {/* Hero Welcome Card */}
      <div className="mb-8">
        <HeroWelcomeCard 
          userName={userName}
          onQuickCheckin={() => navigate('/daily-wellness')}
          onTodaysGoals={() => navigate('/goals')}
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="mb-10">
        <QuickActionsBar />
      </div>

      {/* Primary Section - Daily Wellness */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="bg-card rounded-3xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            {isSpanish ? '🌱 Chequeo Diario de Bienestar' : '🌱 Daily Wellness Check-in'}
          </h2>
          <DailyWellnessChallenges />
        </div>
      </motion.div>

      {/* Personalized Programs - Horizontal Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="bg-card rounded-3xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            {isSpanish ? '✨ Programas Personalizados' : '✨ Programs for You'}
          </h2>
          <SpecializedPrograms />
        </div>
      </motion.div>

      {/* Gratitude Moment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            {isSpanish ? '💝 Momento de Gratitud' : '💝 Gratitude Moment'}
          </h2>
          <GratitudeVisualizer />
        </div>
      </motion.div>

      {/* Two Column Grid - Assessments & Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-card rounded-3xl p-6 shadow-md h-full">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              {isSpanish ? '🧠 Evaluaciones Rápidas' : '🧠 Quick Assessments'}
            </h2>
            <QuizzesSection />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-card rounded-3xl p-6 shadow-md h-full">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              {isSpanish ? '📅 Próximas Sesiones' : '📅 Upcoming Sessions'}
            </h2>
            <UpcomingAppointments />
          </div>
        </motion.div>
      </div>

      {/* Featured Workshop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <div className="bg-card rounded-3xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            {isSpanish ? '🎯 Taller Destacado' : '🎯 Featured Workshop'}
          </h2>
          <FeaturedWorkshops 
            navigate={navigate} 
            onWorkshopClick={onWorkshopClick}
          />
        </div>
      </motion.div>

      {/* All Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="bg-card rounded-3xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            {isSpanish ? '🌟 Explorar Más Funciones' : '🌟 Explore More Features'}
          </h2>
          <KeyFeatures 
            navigateToFeature={handleFeatureClick}
            selectedQualities={selectedQualities}
            selectedGoals={selectedGoals}
          />
        </div>
      </motion.div>
    </main>
  );
};

export default DashboardContent;
