
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Phone } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import PortalHenrySection from "@/components/henry/PortalHenrySection";
import ErrorBoundary from "@/components/ErrorBoundary";

const ParentWellnessTab = React.lazy(() => import("@/components/single-parents/ParentWellnessTab"));
const ParentingToolsTab = React.lazy(() => import("@/components/single-parents/ParentingToolsTab"));
const ParentNetworkTab = React.lazy(() => import("@/components/single-parents/ParentNetworkTab"));
const ResourcesTab = React.lazy(() => import("@/components/single-parents/ResourcesTab"));
const WorkshopsTab = React.lazy(() => import("@/components/single-parents/WorkshopsTab"));

type TabType = 'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops';

const SingleParentsPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const handleFeatureClick = (path: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating",
      description: isSpanish ? "Accediendo a recursos específicos" : "Accessing specific resources",
      duration: 2000
    });
    
    navigate(`/app/${path}`, { 
      state: { 
        fromSpecializedProgram: true, 
        preventTutorial: true,
        returnToPortal: "/app/single-parents-portal"
      }
    });
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const henryQuickActions = [
    { label: "Self-Care Tips", onClick: () => handleFeatureClick("guided-practice/self-care") },
    { label: "Parent Network", onClick: () => setActiveTab("community") }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ParentWellnessTab onFeatureClick={handleFeatureClick} />;
      case 'resources':
        return <ResourcesTab onFeatureClick={handleFeatureClick} />;
      case 'community':
        return <ParentNetworkTab onFeatureClick={handleFeatureClick} />;
      case 'assessments':
        return <ParentingToolsTab onFeatureClick={handleFeatureClick} />;
      case 'workshops':
        return <WorkshopsTab onFeatureClick={handleFeatureClick} />;
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <Page title={isSpanish ? "Portal de Padres Solteros" : "Single Parents Portal"} returnToMain>
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#1a1a1f] via-[#2a2820] to-[#262520] p-6 rounded-xl backdrop-blur-md border border-amber-500/30 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zm-16 4h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5z%22 fill=%22%23F59E0B%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 bg-amber-900/30 rounded-full">
                <Users className="h-10 w-10 text-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isSpanish ? "Recursos para Padres Solteros" : "Resources for Single Parents"}
                </h2>
                <p className="text-white/80">
                  {isSpanish 
                    ? "Recursos especializados de bienestar mental diseñados específicamente para padres solteros navegando la crianza y el autocuidado."
                    : "Specialized mental wellness resources designed specifically for single parents navigating parenting and self-care."}
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-[#1a1a1f] border border-amber-900/30 rounded-lg overflow-hidden shadow-lg">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                  activeTab === 'dashboard' 
                    ? 'border-amber-500 text-amber-400' 
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
                onClick={() => handleTabChange('dashboard')}
              >
                Dashboard
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                  activeTab === 'resources' 
                    ? 'border-amber-500 text-amber-400' 
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
                onClick={() => handleTabChange('resources')}
              >
                Resources
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                  activeTab === 'community' 
                    ? 'border-amber-500 text-amber-400' 
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
                onClick={() => handleTabChange('community')}
              >
                Community
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                  activeTab === 'assessments' 
                    ? 'border-amber-500 text-amber-400' 
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
                onClick={() => handleTabChange('assessments')}
              >
                Assessments
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                  activeTab === 'workshops' 
                    ? 'border-amber-500 text-amber-400' 
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
                    portalName="Single Parents"
                    portalMessage="Being a single parent takes incredible strength. Whether you're juggling work and childcare, dealing with loneliness, or just need someone to talk to, I'm here to support you on your journey."
                    quickActions={henryQuickActions}
                    accentColor="#F59E0B"
                  />
                  <React.Suspense fallback={<div className="text-center text-muted-foreground">Loading...</div>}>
                    {renderTabContent()}
                  </React.Suspense>
                </div>
              )}
              {activeTab !== 'dashboard' && (
                <React.Suspense fallback={<div className="text-center text-muted-foreground">Loading...</div>}>
                  {renderTabContent()}
                </React.Suspense>
              )}
            </div>
          </div>

          {/* Crisis Support Banner */}
          <Card className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-amber-500/30">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-900/50 rounded-full">
                  <Phone className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Parents Helpline</h3>
                  <p className="text-amber-200/80">24/7 emotional support for parents</p>
                </div>
              </div>
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                onClick={() => window.open('tel:1-855-427-2736')}
              >
                <Phone className="h-4 w-4 mr-2" />
                1-855-427-2736
              </Button>
            </CardContent>
          </Card>
        </div>
      </Page>
    </ErrorBoundary>
  );
};

export default SingleParentsPortal;
