
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, ArrowRight } from "lucide-react";

interface EmergencyResource {
  name: string;
  contact: string;
  description: string;
}

interface EmergencyResourcesProps {
  resources: EmergencyResource[];
  onVisionBoardClick: () => void;
}

const EmergencyResources: React.FC<EmergencyResourcesProps> = ({
  resources,
  onVisionBoardClick,
}) => {
  return (
    <div className="bg-[#2a2a30] rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Bell className="mr-2 h-6 w-6 text-[#B87333]" />
          Emergency Resources
        </h2>
        <Button 
          variant="copper"
          onClick={onVisionBoardClick}
        >
          My Vision Board <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-gray-400 mb-6">If you're experiencing a crisis, please reach out for immediate help:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <div key={index} className="border border-[#3a3a40] rounded-lg p-4 bg-[#1a1a20]">
            <h3 className="font-semibold mb-1">{resource.name}</h3>
            <p className="text-[#B87333] font-bold">{resource.contact}</p>
            <p className="text-sm text-gray-400">{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyResources;
