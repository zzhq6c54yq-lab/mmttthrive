
import React from "react";
import PlaceholderMiniGame from "@/components/dashboard/PlaceholderMiniGame";
import useTranslation from "@/hooks/useTranslation";

/**
 * Grid of upcoming mini-game features for the dashboard & home, using a reusable component.
 */
const MINI_GAME_FEATURES = [
  { title: "Sleep Tracker" },
  { title: "Career Coaching" },
  { title: "Meditation Studio" }
];

const DashboardMiniGamesGrid: React.FC = () => {
  const { isSpanish } = useTranslation();
  const comingSoonLabel = isSpanish ? "¡Próximamente!" : "Coming soon!";

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {MINI_GAME_FEATURES.map((feature) => (
        <PlaceholderMiniGame key={feature.title} title={feature.title} comingSoon={comingSoonLabel} />
      ))}
    </div>
  );
};

export default DashboardMiniGamesGrid;

