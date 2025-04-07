
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export interface SpecializedProgramsProps {
  navigateToFeature: (path: string) => void;
}

const SpecializedPrograms: React.FC<SpecializedProgramsProps> = ({ navigateToFeature }) => {
  const programs = [
    {
      id: "veterans",
      title: "Veterans Program",
      description: "Specialized mental health support for veterans",
      path: "/military-support",
      coverImage: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "from-blue-700 to-blue-900"
    },
    {
      id: "college",
      title: "College Students",
      description: "Resources tailored for campus mental wellness",
      path: "/college-portal",
      coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "from-purple-700 to-indigo-900"
    },
    {
      id: "business",
      title: "Small Business",
      description: "Support for entrepreneurs and small teams",
      path: "/small-business-portal",
      coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "from-emerald-700 to-green-900"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {programs.map(program => (
        <Card 
          key={program.id} 
          className="overflow-hidden border-purple-500/20 h-full hover:shadow-xl transition-all duration-300"
          onClick={() => navigateToFeature(program.path)}
        >
          <CardContent className="p-0 h-full flex flex-col">
            {/* Cover Image with Overlay */}
            <div className="relative h-40 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-70 mix-blend-multiply z-5`}></div>
              <img 
                src={program.coverImage} 
                alt={program.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback image if the original fails to load
                  e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="font-bold text-lg text-white drop-shadow-md">
                  {program.title}
                </h3>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-transparent flex-grow flex flex-col">
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-4 flex-grow">
                {program.description}
              </p>
              <Button 
                size="sm"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => navigateToFeature(program.path)}
              >
                Explore
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SpecializedPrograms;
