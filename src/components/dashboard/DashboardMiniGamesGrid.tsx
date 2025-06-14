
import React from "react";
import PlaceholderMiniGame from "@/components/dashboard/PlaceholderMiniGame";

/**
 * Grid of upcoming mini-game features for the dashboard, using a reusable component.
 */
const DashboardMiniGamesGrid: React.FC = () => (
  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <PlaceholderMiniGame title="Sleep Tracker" />
    <PlaceholderMiniGame title="Career Coaching" />
    <PlaceholderMiniGame title="Meditation Studio" />
  </div>
);

export default DashboardMiniGamesGrid;
