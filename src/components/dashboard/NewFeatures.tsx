
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
  new: boolean;
}

interface NewFeaturesProps {
  features: Feature[];
  onFeatureSelect: (path: string) => void;
}

const NewFeatures: React.FC<NewFeaturesProps> = ({ features, onFeatureSelect }) => {
  return (
    <div className="mb-12 relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Sparkles className="h-7 w-7 mr-2 text-[#E5C5A1]" />
          <h2 className="text-2xl font-bold">New Features</h2>
        </div>
        <Button 
          variant="link" 
          className="text-[#E5C5A1] flex items-center"
          onClick={() => onFeatureSelect("/personalized-content")}
        >
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card 
              key={feature.id} 
              className="bg-[#252535] border-[#3d3d5c] hover:translate-y-[-5px] transition-all duration-300 group"
            >
              <CardHeader className="pb-2 pt-5">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  {feature.new && (
                    <span className="py-1 px-2 text-xs rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-white font-medium">
                      NEW
                    </span>
                  )}
                </div>
                <CardTitle className="mt-3 text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-gray-400">{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Button 
                  variant="ghost" 
                  className="bg-[#2a2a40]/50 hover:bg-[#3a3a50]/50 w-full mt-2 group-hover:bg-gradient-to-r group-hover:from-[#B87333]/70 group-hover:to-[#E5C5A1]/70"
                  onClick={() => onFeatureSelect(feature.path)}
                >
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default NewFeatures;
