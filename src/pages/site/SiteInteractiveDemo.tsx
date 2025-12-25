import { useState } from 'react';
import DemoHIPAANotice from '@/components/demo/DemoHIPAANotice';
import EpicDashboard from '@/components/dashboard/epic/EpicDashboard';

const SiteInteractiveDemo = () => {
  const [hasAcceptedNotice, setHasAcceptedNotice] = useState(false);

  if (!hasAcceptedNotice) {
    return <DemoHIPAANotice onContinue={() => setHasAcceptedNotice(true)} />;
  }

  return <EpicDashboard demoMode={true} />;
};

export default SiteInteractiveDemo;
