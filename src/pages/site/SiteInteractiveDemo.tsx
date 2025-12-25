import { useState, useEffect } from 'react';
import DemoHIPAANotice from '@/components/demo/DemoHIPAANotice';
import EpicDashboard from '@/components/dashboard/epic/EpicDashboard';
import DemoGuidedTour from '@/components/demo/DemoGuidedTour';
import DemoOverlay from '@/components/demo/DemoOverlay';
import { UserProvider } from '@/contexts/UserContext';

const DEMO_TOUR_SEEN_KEY = 'demoTourSeen';

const SiteInteractiveDemo = () => {
  const [hasAcceptedNotice, setHasAcceptedNotice] = useState(false);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Show tour automatically after HIPAA notice is accepted (only once per session)
    if (hasAcceptedNotice && !sessionStorage.getItem(DEMO_TOUR_SEEN_KEY)) {
      setShowTour(true);
      sessionStorage.setItem(DEMO_TOUR_SEEN_KEY, 'true');
    }
  }, [hasAcceptedNotice]);

  if (!hasAcceptedNotice) {
    return <DemoHIPAANotice onContinue={() => setHasAcceptedNotice(true)} />;
  }

  return (
    <UserProvider>
      <EpicDashboard demoMode={true} />
      <DemoOverlay onShowTour={() => setShowTour(true)} />
      <DemoGuidedTour isOpen={showTour} onClose={() => setShowTour(false)} />
    </UserProvider>
  );
};

export default SiteInteractiveDemo;
