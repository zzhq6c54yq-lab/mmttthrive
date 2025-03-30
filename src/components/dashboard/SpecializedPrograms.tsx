
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, GraduationCap, Building2, Briefcase } from "lucide-react";

interface SpecializedProgramsProps {
  navigateToFeature: (path: string) => void;
}

const SpecializedPrograms: React.FC<SpecializedProgramsProps> = ({ navigateToFeature }) => {
  const programs = [
    {
      id: "military",
      title: "Military Support",
      description: "Specialized resources, counseling, and community support for military personnel and veterans.",
      icon: Shield,
      color: "from-blue-700 to-blue-900",
      path: "/military-support"
    },
    {
      id: "college",
      title: "College Experience",
      description: "Mental health resources tailored for college students managing academic pressures and life transitions.",
      icon: GraduationCap,
      color: "from-purple-700 to-purple-900",
      path: "/college-portal"
    },
    {
      id: "small-business",
      title: "Small Business Owner",
      description: "Support for entrepreneurs and small business owners balancing professional and mental wellness.",
      icon: Building2,
      color: "from-emerald-700 to-emerald-900",
      path: "/small-business-portal"
    },
    {
      id: "corporate",
      title: "Corporate Wellness",
      description: "Corporate mental health programs designed to support employee wellbeing and productivity.",
      icon: Briefcase,
      color: "from-amber-700 to-amber-900",
      path: "/employee-welcome"
    }
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Specialized Programs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {programs.map((program) => {
          const Icon = program.icon;
          
          return (
            <Card 
              key={program.id}
              className="bg-[#252535] border-[#3d3d5c] overflow-hidden group"
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${program.color}`}></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${program.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <CardTitle className="mt-3 text-lg">{program.title}</CardTitle>
                <CardDescription className="text-gray-400 text-sm">{program.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant="ghost" 
                  className="flex justify-between items-center w-full text-[#E5C5A1] hover:text-[#E5C5A1] group-hover:bg-black/20 hover:bg-black/20"
                  onClick={() => navigateToFeature(program.path)}
                >
                  <span>Learn More</span>
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SpecializedPrograms;
