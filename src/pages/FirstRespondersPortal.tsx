
import React, { useState } from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Shield, HeartPulse, Users, AlertCircle, BookOpen, Calendar, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import FirstRespondersDashboard from "@/components/first-responders/FirstRespondersDashboard";
import FirstRespondersResources from "@/components/first-responders/FirstRespondersResources";
import FirstRespondersCommunity from "@/components/first-responders/FirstRespondersCommunity";
import FirstRespondersAssessments from "@/components/first-responders/FirstRespondersAssessments";
import FirstRespondersWorkshops from "@/components/first-responders/FirstRespondersWorkshops";
import PortalHenrySection from "@/components/henry/PortalHenrySection";

const FirstRespondersPortal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops'>('dashboard');
  
  const handleFeatureClick = (feature: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating", 
      description: isSpanish ? "Accediendo a recursos específicos para primeros respondedores" : "Accessing specific resources for first responders",
      duration: 2000
    });
    
    if (feature === "resources") {
      setActiveTab("resources");
    } else if (feature === "workshops") {
      setActiveTab("workshops");
    } else if (feature === "community-support") {
      setActiveTab("community");
    } else if (feature === "mental-wellness/assessments") {
      setActiveTab("assessments");
    } else {
      navigate(`/app/${feature}`, { 
        state: { 
          fromSpecializedProgram: true,
          preventTutorial: true,
          returnToPortal: "/app/first-responders-portal",
          portalState: {
            activeTab,
            returnToMain: location.state?.returnToMain,
            preventTutorial: location.state?.preventTutorial
          }
        }
      });
    }
  };

  const handleTabChange = (tab: 'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops') => {
    setActiveTab(tab);
  };

  const henryQuickActions = [
    { label: "Stress Check", onClick: () => setActiveTab("assessments") },
    { label: "Peer Support", onClick: () => setActiveTab("community") }
  ];

  return (
    <Page 
      title={isSpanish ? "Portal de Primeros Respondedores" : "First Responders Portal"} 
      returnToMain={location.state?.returnToMain}
    >
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#1f1a18] via-[#2a2220] to-[#2c2420] p-6 rounded-xl backdrop-blur-md border border-red-500/30 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zm-16 4h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5z%22 fill=%22%23EF4444%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-red-900/30 rounded-full">
              <Flame className="h-10 w-10 text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSpanish ? "Recursos para Primeros Respondedores" : "Resources for First Responders"}
              </h2>
              <p className="text-white/80">
                {isSpanish 
                  ? "Recursos especializados de bienestar mental diseñados específicamente para bomberos, paramédicos, EMTs y personal de emergencias."
                  : "Specialized mental wellness resources designed specifically for firefighters, paramedics, EMTs, and emergency personnel."}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#1f1a18] border border-red-900/30 rounded-lg overflow-hidden shadow-lg">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'dashboard' 
                  ? 'border-red-500 text-red-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'resources' 
                  ? 'border-red-500 text-red-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('resources')}
            >
              Resources
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'community' 
                  ? 'border-red-500 text-red-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('community')}
            >
              Community
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'assessments' 
                  ? 'border-red-500 text-red-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('assessments')}
            >
              Assessments
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'workshops' 
                  ? 'border-red-500 text-red-400' 
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
                  portalName="First Responders"
                  portalMessage="I understand the weight you carry every shift. Whether it's processing difficult calls, managing compassion fatigue, or finding balance, I'm here to support you. Your courage protects others - let me help protect your wellbeing."
                  quickActions={henryQuickActions}
                  accentColor="#EF4444"
                />
                <FirstRespondersDashboard onFeatureClick={handleFeatureClick} />
              </div>
            )}
            {activeTab === 'resources' && <FirstRespondersResources />}
            {activeTab === 'community' && <FirstRespondersCommunity />}
            {activeTab === 'assessments' && <FirstRespondersAssessments />}
            {activeTab === 'workshops' && <FirstRespondersWorkshops />}
          </div>
        </div>

        {/* Crisis Support Banner */}
        <Card className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-red-500/30">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-900/50 rounded-full">
                <Phone className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">First Responder Support Line</h3>
                <p className="text-red-200/80">24/7 confidential support for emergency personnel</p>
              </div>
            </div>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
              onClick={() => window.open('tel:1-844-587-4357')}
            >
              <Phone className="h-4 w-4 mr-2" />
              1-844-587-4357
            </Button>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
};

export default FirstRespondersPortal;
