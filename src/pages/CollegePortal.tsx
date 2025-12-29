
import React, { useState } from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Phone, BookOpen, Brain, HeartPulse, Users, Coffee, Calendar, Clock, Activity, FileText, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import PortalHenrySection from "@/components/henry/PortalHenrySection";

const CollegePortal: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops'>('dashboard');
  
  const handleFeatureClick = (feature: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating", 
      description: isSpanish ? "Accediendo a recursos específicos para estudiantes universitarios" : "Accessing specific resources for college students",
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
          returnToPortal: "/app/college-portal"
        }
      });
    }
  };

  const handleTabChange = (tab: 'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops') => {
    setActiveTab(tab);
  };

  const henryQuickActions = [
    { label: "Stress Check", onClick: () => setActiveTab("assessments") },
    { label: "Study Groups", onClick: () => setActiveTab("community") }
  ];

  return (
    <Page title={isSpanish ? "La Experiencia Universitaria" : "The College Experience"} returnToMain>
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#1a1f2c] via-[#1e2536] to-[#232840] p-6 rounded-xl backdrop-blur-md border border-indigo-500/30 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zm-16 4h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5z%22 fill=%22%238B5CF6%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-indigo-900/30 rounded-full">
              <GraduationCap className="h-10 w-10 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSpanish ? "Recursos para Estudiantes Universitarios" : "Resources for College Students"}
              </h2>
              <p className="text-white/80">
                {isSpanish 
                  ? "Recursos especializados de bienestar mental diseñados específicamente para estudiantes universitarios navegando la vida académica y personal."
                  : "Specialized mental wellness resources designed specifically for college students navigating academic and personal life."}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#1a1f2c] border border-indigo-900/30 rounded-lg overflow-hidden shadow-lg">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'dashboard' 
                  ? 'border-indigo-500 text-indigo-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'resources' 
                  ? 'border-indigo-500 text-indigo-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('resources')}
            >
              Resources
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'community' 
                  ? 'border-indigo-500 text-indigo-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('community')}
            >
              Community
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'assessments' 
                  ? 'border-indigo-500 text-indigo-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('assessments')}
            >
              Assessments
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'workshops' 
                  ? 'border-indigo-500 text-indigo-400' 
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
                  portalName="College Students"
                  portalMessage="Navigating college life can be overwhelming - from academic pressure to social challenges. Whether you're stressed about exams, feeling lonely, or figuring out who you are, I'm here to listen without judgment."
                  quickActions={henryQuickActions}
                  accentColor="#8B5CF6"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-[#1a1f2c] border-indigo-900/30 hover:border-indigo-700/50 transition-colors cursor-pointer" onClick={() => handleFeatureClick("workshops")}>
                    <CardContent className="p-6">
                      <div className="p-2 rounded-full bg-purple-600/20 w-fit mb-4"><BookOpen className="h-5 w-5 text-purple-400" /></div>
                      <h3 className="text-lg font-semibold text-white mb-2">Academic Stress Management</h3>
                      <p className="text-white/70 text-sm">Tools and techniques for managing exam pressure and workload</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#1a1f2c] border-indigo-900/30 hover:border-indigo-700/50 transition-colors cursor-pointer" onClick={() => handleFeatureClick("mental-wellness")}>
                    <CardContent className="p-6">
                      <div className="p-2 rounded-full bg-pink-600/20 w-fit mb-4"><Brain className="h-5 w-5 text-pink-400" /></div>
                      <h3 className="text-lg font-semibold text-white mb-2">Mental Wellbeing</h3>
                      <p className="text-white/70 text-sm">Resources for anxiety, depression, and common mental health challenges</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#1a1f2c] border-indigo-900/30 hover:border-indigo-700/50 transition-colors cursor-pointer" onClick={() => handleFeatureClick("holistic-wellness")}>
                    <CardContent className="p-6">
                      <div className="p-2 rounded-full bg-emerald-600/20 w-fit mb-4"><HeartPulse className="h-5 w-5 text-emerald-400" /></div>
                      <h3 className="text-lg font-semibold text-white mb-2">Healthy Habits</h3>
                      <p className="text-white/70 text-sm">Sleep, nutrition, and exercise tips for college life</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            {activeTab === 'resources' && (
              <div className="text-center py-8 text-white/60">Resources content - explore academic stress management, life balance strategies, and more.</div>
            )}
            {activeTab === 'community' && (
              <div className="text-center py-8 text-white/60">Connect with peer support networks and study groups.</div>
            )}
            {activeTab === 'assessments' && (
              <div className="text-center py-8 text-white/60">Take assessments for academic stress and work-life balance.</div>
            )}
            {activeTab === 'workshops' && (
              <div className="text-center py-8 text-white/60">Browse workshops for exam prep, mindfulness, and student life balance.</div>
            )}
          </div>
        </div>

        {/* Crisis Support Banner */}
        <Card className="bg-gradient-to-r from-indigo-900/40 to-indigo-800/40 border-indigo-500/30">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-900/50 rounded-full">
                <Phone className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">988 Suicide & Crisis Lifeline</h3>
                <p className="text-indigo-200/80">24/7 free and confidential support for students</p>
              </div>
            </div>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
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

export default CollegePortal;
