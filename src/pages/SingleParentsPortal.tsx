import React, { useState } from 'react';
import PortalHeader from '@/components/single-parents/PortalHeader';
import TabNavigation from '@/components/single-parents/TabNavigation';
import ParentWellnessTab from '@/components/single-parents/ParentWellnessTab';
import ParentingToolsTab from '@/components/single-parents/ParentingToolsTab';
import ResourcesTab from '@/components/single-parents/ResourcesTab';
import WorkshopsTab from '@/components/single-parents/WorkshopsTab';
import HomeButton from '@/components/HomeButton';

const SingleParentsPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('wellness');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-rose-500/5 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="absolute top-4 right-4">
          <HomeButton />
        </div>
        
        <PortalHeader />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="mt-6">
          {activeTab === 'wellness' && <ParentWellnessTab />}
          {activeTab === 'parenting' && <ParentingToolsTab />}
          {activeTab === 'resources' && <ResourcesTab />}
          {activeTab === 'workshops' && <WorkshopsTab />}
        </div>
      </div>
    </div>
  );
};

export default SingleParentsPortal;
