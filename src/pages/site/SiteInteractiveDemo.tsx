import { useState } from 'react';
import DemoHIPAANotice from '@/components/demo/DemoHIPAANotice';
import EpicDashboard from '@/components/dashboard/epic/EpicDashboard';
import { UserProvider } from '@/contexts/UserContext';

const SiteInteractiveDemo = () => {
  const [hasAcceptedNotice, setHasAcceptedNotice] = useState(false);

  if (!hasAcceptedNotice) {
    return <DemoHIPAANotice onContinue={() => setHasAcceptedNotice(true)} />;
  }

  return (
    <UserProvider>
      <EpicDashboard demoMode={true} />
    </UserProvider>
  );
};

export default SiteInteractiveDemo;
