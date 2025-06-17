
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useTranslation from "@/hooks/useTranslation";

const InfoButtons: React.FC = () => {
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();

  const handleWaterSystem = () => {
    console.log("Water System clicked");
    navigate("/water-system");
  };

  const handleUpgradePlan = () => {
    console.log("Upgrade Plan clicked");
    navigate("/subscription-plans");
  };

  const handleOmniCredits = () => {
    console.log("Omni Credits clicked");
    navigate("/copay-credits");
  };

  return (
    <div className="flex justify-center gap-4 mt-4 mb-6">
      <Button
        onClick={handleUpgradePlan}
        className="text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-300 rounded-md transition-colors"
        size="sm"
      >
        {isSpanish ? "Actualizar Plan" : "Upgrade Plan"}
      </Button>
      <Button
        onClick={handleWaterSystem}
        className="text-xs px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 border border-green-300 rounded-md transition-colors"
        size="sm"
      >
        {isSpanish ? "Sistema de Agua" : "Water System"}
      </Button>
      <Button
        onClick={handleOmniCredits}
        className="text-xs px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300 rounded-md transition-colors"
        size="sm"
      >
        {isSpanish ? "Créditos Omni" : "Omni Credits"}
      </Button>
    </div>
  );
};

export default InfoButtons;
