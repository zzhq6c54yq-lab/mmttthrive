
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, UserCheck, Calendar, BookOpen, BarChart3, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

interface KeyFeaturesProps {
  onFeatureSelect: (path: string) => void;
}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ onFeatureSelect }) => {
  const features = [
    {
      id: 1,
      title: "Mental Wellness Tools",
      description: "Access a variety of tools and resources designed to support your mental well-being.",
      icon: Brain,
      color: "from-blue-500 to-blue-700",
      path: "/mental-wellness-tools"
    },
    {
      id: 2,
      title: "Real-Time Therapy",
      description: "Connect with licensed therapists and counselors in real-time for immediate support.",
      icon: UserCheck,
      color: "from-purple-500 to-purple-700",
      path: "/real-time-therapy"
    },
    {
      id: 3,
      title: "Appointment Scheduling",
      description: "Book and manage appointments with mental health professionals on your schedule.",
      icon: Calendar,
      color: "from-green-500 to-green-700",
      path: "/scheduling"
    },
    {
      id: 4,
      title: "Resource Library",
      description: "Explore our extensive library of articles, guides, and educational material.",
      icon: BookOpen,
      color: "from-rose-500 to-rose-700",
      path: "/resource-library"
    },
    {
      id: 5,
      title: "Progress Reports",
      description: "Track your mental wellness journey with detailed reports and insights.",
      icon: BarChart3,
      color: "from-yellow-500 to-yellow-700",
      path: "/progress-reports"
    },
    {
      id: 6,
      title: "Mental Health Games",
      description: "Engage in fun, therapeutic games designed to enhance cognitive abilities and reduce stress.",
      icon: Gamepad2,
      color: "from-indigo-500 to-indigo-700",
      path: "/mental-health-games"
    }
  ];

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Key Features</h2>
        <Button 
          variant="link" 
          className="text-[#E5C5A1] px-0 flex items-center"
          onClick={() => onFeatureSelect("/mental-wellness-tools")}
        >
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          
          return (
            <Card 
              key={feature.id}
              className="bg-[#252535] border-[#3d3d5c] hover:bg-[#2a2a40] transition-colors cursor-pointer overflow-hidden"
              onClick={() => onFeatureSelect(feature.path)}
            >
              <CardContent className="p-6 flex gap-4 items-start">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} shrink-0`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default KeyFeatures;
