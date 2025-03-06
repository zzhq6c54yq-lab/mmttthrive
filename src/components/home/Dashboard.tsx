
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Crown, Info } from "lucide-react";
import FeaturedWorkshops from "./FeaturedWorkshops";
import ToolsFeatures from "./ToolsFeatures";
import EmergencyResources from "./EmergencyResources";
import SubscriptionPlansDialog from "./SubscriptionPlansDialog";
import SponsorChatbot from "@/components/SponsorChatbot";
import { VirtualClass } from "@/data/toolCategories";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardProps {
  workshops: VirtualClass[];
  features: any[];
  randomAffirmation: string;
  randomEncouragement: string;
  emergencyResources: any[];
  subscriptionPlans: any[];
  currentMood: string | null;
  onMoodSelect: (mood: string) => void;
  onVisionBoardClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  workshops,
  features,
  randomAffirmation,
  randomEncouragement,
  emergencyResources,
  subscriptionPlans,
  currentMood,
  onMoodSelect,
  onVisionBoardClick,
}) => {
  const [isSubDialogOpen, setIsSubDialogOpen] = useState(false);
  const [showHenryInfo, setShowHenryInfo] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a1a20] text-white">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="copper-text text-3xl md:text-5xl font-bold mb-6 logo-text-persist">
            Thrive MT
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Your Mental Health Journey Starts Here</h2>
          <p className="text-xl md:text-2xl text-[#B87333] mb-8">Evidence-based tools, therapy, and support - all in one place</p>
          
          <SubscriptionPlansDialog 
            plans={subscriptionPlans}
            isOpen={isSubDialogOpen}
            onOpenChange={setIsSubDialogOpen}
          />
          
          <div className="bg-[#2a2a30] p-4 rounded-lg shadow-lg max-w-xl mx-auto mb-8">
            <p className="text-lg font-light italic text-gray-300">{randomAffirmation}</p>
          </div>
        </div>

        <div className="mb-12">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full block text-center">
                <div className="flex items-center justify-center mb-2">
                  <h3 className="text-xl font-semibold text-white">
                    Meet H.E.N.R.Y. - Your Mental Health Navigator
                    <Info className="inline-block ml-2 h-4 w-4 text-[#B87333]" />
                  </h3>
                </div>
                <SponsorChatbot 
                  selectedMood={currentMood as "happy" | "ok" | "neutral" | "down" | "sad" | "overwhelmed" | null} 
                  contextType="mental_health" 
                  className="max-w-3xl mx-auto" 
                />
              </TooltipTrigger>
              <TooltipContent className="max-w-md p-4 bg-[#2a2a30] border-[#B87333]">
                <p>
                  H.E.N.R.Y. is your personal Mental Health Navigator, here to help you explore the app, find resources, and provide support 24/7. Ask about tools, exercises, or any mental health topic!
                </p>
                <p className="mt-2 text-sm text-[#B87333]">
                  H - Hope | E - Emotional Awareness | N - Nurturing Relationships | R - Resilience | Y - You Matter
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <FeaturedWorkshops workshops={workshops} />
        <ToolsFeatures features={features} />

        <EmergencyResources 
          resources={emergencyResources}
          onVisionBoardClick={onVisionBoardClick}
        />
      </section>
    </div>
  );
};

export default Dashboard;
