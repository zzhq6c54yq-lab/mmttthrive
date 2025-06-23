
import React from "react";
import { UserProvider } from "@/contexts/UserContext";
import IndexScreenManager from "@/components/home/IndexScreenManager";
import CrisisOverlay from "@/components/crisis/CrisisOverlay";
import useTranslation from "@/hooks/useTranslation";

const Index = () => {
  const { preferredLanguage, setPreferredLanguage } = useTranslation();

  return (
    <UserProvider>
      <div className="min-h-screen">
        <IndexScreenManager />
        <CrisisOverlay />
        
        {/* Language selector */}
        <div className="fixed top-4 right-4 z-50">
          <select
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value as any)}
            className="bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm"
          >
            <option value="English">English</option>
            <option value="Español">Español</option>
            <option value="Português">Português</option>
            <option value="Filipino">Filipino</option>
          </select>
        </div>
      </div>
    </UserProvider>
  );
};

export default Index;
