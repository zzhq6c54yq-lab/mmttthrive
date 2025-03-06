
import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
}

interface ToolsFeaturesProps {
  features: FeatureItem[];
}

const ToolsFeatures: React.FC<ToolsFeaturesProps> = ({ features }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Tools & Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="bg-[#2a2a30] border-[#3a3a40] hover:border-[#B87333] transition-colors cursor-pointer"
            onClick={() => navigate(feature.path)}
          >
            <div className="p-6">
              <div className="mb-4 bg-[#3a3a40] h-12 w-12 rounded-lg flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-[#B87333]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <div className="flex items-center text-[#B87333]">
                <span className="mr-2">Explore</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ToolsFeatures;
