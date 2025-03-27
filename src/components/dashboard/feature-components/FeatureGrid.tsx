
import React from "react";
import FeatureItem from "./FeatureItem";
import { FeatureItem as FeatureItemType } from "@/data/featuresData";

interface FeatureGridProps {
  features: FeatureItemType[];
  onFeatureClick: (path: string) => void;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ features, onFeatureClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {features.map((feature, index) => (
        <FeatureItem
          key={index}
          index={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          path={feature.path}
          onClick={onFeatureClick}
        />
      ))}
    </div>
  );
};

export default FeatureGrid;
