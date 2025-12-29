
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Phone } from "lucide-react";
import ChronicIllnessDashboard from "@/components/chronic-illness/ChronicIllnessDashboard";
import ChronicIllnessResources from "@/components/chronic-illness/ChronicIllnessResources";
import ChronicIllnessCommunity from "@/components/chronic-illness/ChronicIllnessCommunity";
import ChronicIllnessAssessments from "@/components/chronic-illness/ChronicIllnessAssessments";
import ChronicIllnessWorkshops from "@/components/chronic-illness/ChronicIllnessWorkshops";
import PortalHenrySection from "@/components/henry/PortalHenrySection";

const ChronicIllnessPortal: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops'>('dashboard');

  const handleTabChange = (tab: 'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops') => {
    setActiveTab(tab);
  };

  const henryQuickActions = [
    { label: "Wellness Check", onClick: () => setActiveTab("assessments") },
    { label: "Support Groups", onClick: () => setActiveTab("community") }
  ];

  return (
    <Page title="Chronic Illness Support" showBackButton={true}>
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#1c1a20] via-[#22202a] to-[#282432] p-6 rounded-xl backdrop-blur-md border border-purple-500/30 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zm-16 4h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5z%22 fill=%22%23A855F7%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-purple-900/30 rounded-full">
              <Stethoscope className="h-10 w-10 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Chronic Illness Support Portal
              </h2>
              <p className="text-white/80">
                Tools and resources to support your mental and emotional wellbeing while managing chronic health conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#1c1a20] border border-purple-900/30 rounded-lg overflow-hidden shadow-lg">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'dashboard' 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'resources' 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('resources')}
            >
              Resources
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'community' 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('community')}
            >
              Community
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'assessments' 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('assessments')}
            >
              Assessments
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'workshops' 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('workshops')}
            >
              Workshops
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <PortalHenrySection 
                  portalName="Chronic Illness"
                  portalMessage="Living with chronic illness affects every aspect of your life. Whether you're navigating diagnosis, managing symptoms, or dealing with the emotional toll, I'm here to listen and support you."
                  quickActions={henryQuickActions}
                  accentColor="#A855F7"
                />
                <ChronicIllnessDashboard />
              </div>
            )}
            {activeTab === 'resources' && <ChronicIllnessResources />}
            {activeTab === 'community' && <ChronicIllnessCommunity />}
            {activeTab === 'assessments' && <ChronicIllnessAssessments />}
            {activeTab === 'workshops' && <ChronicIllnessWorkshops />}
          </div>
        </div>

        {/* Crisis Support Banner */}
        <Card className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 border-purple-500/30">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-900/50 rounded-full">
                <Phone className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">988 Suicide & Crisis Lifeline</h3>
                <p className="text-purple-200/80">24/7 free and confidential support</p>
              </div>
            </div>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              onClick={() => window.open('tel:988')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call 988
            </Button>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
};

export default ChronicIllnessPortal;
