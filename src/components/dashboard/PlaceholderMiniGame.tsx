
import React from "react";

interface PlaceholderMiniGameProps {
  title?: string;
  comingSoon?: string;
}

/**
 * Simple tile/card for displaying a placeholder (coming soon) feature.
 */
const PlaceholderMiniGame: React.FC<PlaceholderMiniGameProps> = ({ title = "Feature", comingSoon = "Coming soon!" }) => (
  <div className="flex flex-col items-center justify-center min-h-[200px] p-8 bg-zinc-100 rounded shadow">
    <h3 className="text-xl font-bold text-zinc-700 mb-2">{title}</h3>
    <p className="text-zinc-500">{comingSoon}</p>
  </div>
);

export default PlaceholderMiniGame;

