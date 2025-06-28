
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Page from "@/components/Page";
import useTranslation from "@/hooks/useTranslation";
import TabNavigation from "@/components/cancer-support/TabNavigation";
import PortalHeader from "@/components/cancer-support/PortalHeader";
import PatientsTab from "@/components/cancer-support/PatientsTab";
import CaregiversTab from "@/components/cancer-support/CaregiversTab";
import ResourcesTab from "@/components/cancer-support/ResourcesTab";
import CommunitiesTab from "@/components/cancer-support/CommunitiesTab";
import RemembranceTab from "@/components/cancer-support/RemembranceTab";
import ChildrenTab from "@/components/cancer-support/ChildrenTab";

const CancerSupportPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'patients' | 'caregivers' | 'resources' | 'communities' | 'remembrance' | 'children'>('patients');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  // Set active tab based on URL params if they exist
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'caregivers' || tab === 'resources' || tab === 'communities' || 
        tab === 'remembrance' || tab === 'children') {
      setActiveTab(tab as any);
    }
  }, [location.search]);

  const handleTabChange = (tab: 'patients' | 'caregivers' | 'resources' | 'communities' | 'remembrance' | 'children') => {
    setActiveTab(tab);
  };

  const handleFeatureClick = (path: string) => {
    console.log("[CancerSupportPortal] Navigating to:", path);
    
    toast({
      title: isSpanish ? "Accediendo a Recursos Especializados" : "Accessing Specialized Resources",
      description: isSpanish ? "Cargando contenido específico de apoyo contra el cáncer" : "Loading specific cancer support content",
      duration: 2000
    });
    
    // Enhanced path handling for cancer support
    let finalPath = path;
    
    // Handle both absolute and relative paths
    if (!path.startsWith('/')) {
      finalPath = `/cancer-support/${path}`;
    }
    
    // Special handling for remembrance resources
    if (path.includes('memorial') || path.includes('grief') || path.includes('legacy') || path.includes('bereavement')) {
      // These are already properly mapped in App.tsx
      finalPath = path.startsWith('/') ? path : `/${path}`;
    }
    
    console.log("[CancerSupportPortal] Final navigation path:", finalPath);
    
    navigate(finalPath, { 
      state: { 
        fromCancerSupport: true, 
        preventTutorial: true,
        returnToPortal: "/cancer-support-portal",
        cancerSupportContext: true,
        specializedContent: true,
        portalTab: activeTab
      }
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'patients':
        return <PatientsTab onFeatureClick={handleFeatureClick} />;
      case 'caregivers':
        return <CaregiversTab onFeatureClick={handleFeatureClick} />;
      case 'resources':
        return <ResourcesTab onFeatureClick={handleFeatureClick} />;
      case 'communities':
        return <CommunitiesTab onFeatureClick={handleFeatureClick} />;
      case 'remembrance':
        return <RemembranceTab onFeatureClick={handleFeatureClick} />;
      case 'children':
        return <ChildrenTab onFeatureClick={handleFeatureClick} />;
      default:
        return <PatientsTab onFeatureClick={handleFeatureClick} />;
    }
  };

  return (
    <Page title={isSpanish ? "Portal de Apoyo para el Cáncer" : "Cancer Support Portal"} returnToMain>
      <div className="space-y-6">
        <PortalHeader />

        <div className="bg-[#FDF2F2] dark:bg-[#1F1A1A] border-2 border-rose-300/50 dark:border-rose-500/30 rounded-xl overflow-hidden shadow-xl">
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CancerSupportPortal;
