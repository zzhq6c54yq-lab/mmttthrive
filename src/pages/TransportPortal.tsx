
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TransportDashboard from "@/components/transport/TransportDashboard";
import TransportAssessments from "@/components/transport/TransportAssessments";
import TransportResources from "@/components/transport/TransportResources";
import TransportCommunity from "@/components/transport/TransportCommunity";
import TransportWorkshops from "@/components/transport/TransportWorkshops";
import PortalHenrySection from "@/components/henry/PortalHenrySection";

const TransportPortal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops'>(() => {
    if (location.state?.tab) {
      return location.state.tab;
    }
    return "dashboard";
  });

  const handleTabChange = (tab: 'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops') => {
    setActiveTab(tab);
  };

  const henryQuickActions = [
    { label: "Wellbeing Check", onClick: () => setActiveTab("assessments") },
    { label: "Driver Community", onClick: () => setActiveTab("community") }
  ];

  return (
    <Page title="Transport Industry Portal" showBackButton={true}>
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#1a1e24] via-[#1e2530] to-[#202838] p-6 rounded-xl backdrop-blur-md border border-blue-500/30 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zm-16 4h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5z%22 fill=%22%233B82F6%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-blue-900/30 rounded-full">
              <Truck className="h-10 w-10 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Transport Wellness Portal
              </h2>
              <p className="text-white/80">
                Mental health resources tailored for truck drivers and transportation workers dealing with life on the road.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#1a1e24] border border-blue-900/30 rounded-lg overflow-hidden shadow-lg">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'dashboard' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'resources' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('resources')}
            >
              Resources
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'community' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('community')}
            >
              Community
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'assessments' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('assessments')}
            >
              Assessments
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'workshops' 
                  ? 'border-blue-500 text-blue-400' 
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
                  portalName="Transport Workers"
                  portalMessage="Life on the road comes with unique mental health challenges. Whether it's loneliness, sleep disruption, or time away from family, I understand what you're going through. Let's talk about what's on your mind."
                  quickActions={henryQuickActions}
                  accentColor="#3B82F6"
                />
                <TransportDashboard />
              </div>
            )}
            {activeTab === 'resources' && <TransportResources />}
            {activeTab === 'community' && <TransportCommunity />}
            {activeTab === 'assessments' && <TransportAssessments />}
            {activeTab === 'workshops' && <TransportWorkshops />}
          </div>
        </div>

        {/* Crisis Support Banner */}
        <Card className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 border-blue-500/30">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-900/50 rounded-full">
                <Phone className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">988 Suicide & Crisis Lifeline</h3>
                <p className="text-blue-200/80">24/7 free and confidential support</p>
              </div>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
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

export default TransportPortal;
