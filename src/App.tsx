
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CancerSupportPortal from "./pages/CancerSupportPortal";
import CareerCoaching from "./pages/CareerCoaching";
import MeditationStudio from "./pages/MeditationStudio";
import AASponsor from "./pages/AASponsor";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import OnboardingPage from "./pages/OnboardingPage";
import JournalPage from "./pages/JournalPage";
import CommunitySupport from "./pages/CommunitySupport";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/UserContext";
import CrisisOverlay from "@/components/crisis/CrisisOverlay";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/community-support" element={<CommunitySupport />} />
          <Route path="/cancer-support" element={<CancerSupportPortal />} />
          <Route path="/career-coaching" element={<CareerCoaching />} />
          <Route path="/meditation-studio" element={<MeditationStudio />} />
          <Route path="/aa-sponsor" element={<AASponsor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CrisisOverlay />
        <Toaster />
      </div>
    </UserProvider>
  );
}

export default App;
