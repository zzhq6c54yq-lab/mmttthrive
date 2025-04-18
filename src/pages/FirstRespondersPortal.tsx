
import React from "react";
import FirstRespondersDashboard from "@/components/first-responders/FirstRespondersDashboard";

const FirstRespondersPortal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FirstRespondersDashboard />
      </div>
    </div>
  );
};

export default FirstRespondersPortal;
