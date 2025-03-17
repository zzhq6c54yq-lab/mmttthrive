
import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, GraduationCap, Briefcase, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SpecializedPrograms: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const specializedPrograms = [
    {
      title: "Department of Defense",
      description: "Resources and support for military personnel and veterans",
      icon: Shield,
      path: "/department-of-defense",
      gradient: "from-[#0EA5E9]/80 to-[#2563EB]/80",
      borderColor: "#0EA5E9"
    },
    {
      title: "The College Experience",
      description: "Mental health support for students navigating campus life",
      icon: GraduationCap,
      path: "/college-portal",
      gradient: "from-[#8B5CF6]/80 to-[#6366F1]/80",
      borderColor: "#8B5CF6"
    },
    {
      title: "Small Business",
      description: "Mental health resources for entrepreneurs and small business owners",
      icon: Briefcase,
      path: "/small-business",
      gradient: "from-[#F97316]/80 to-[#FB923C]/80",
      borderColor: "#F97316"
    }
  ];
  
  const handleFeatureClick = (path: string) => {
    toast({
      title: "Navigating...",
      description: "Taking you to your selected feature",
      duration: 1500,
    });
    
    navigate(path);
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Star className="h-5 w-5 text-[#D946EF] mr-2" />
        <span>Specialized Programs</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {specializedPrograms.map((program, index) => (
          <div 
            key={index}
            onClick={() => handleFeatureClick(program.path)}
            className="relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-90`}></div>
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <div className="relative z-10 p-5 flex flex-col h-full min-h-[180px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm">
                  <program.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{program.title}</h3>
              </div>
              
              <p className="text-white/90 mb-4 flex-grow">{program.description}</p>
              
              <Button 
                className="mt-auto self-start bg-white/20 backdrop-blur-sm text-white border border-white/40 hover:bg-white/30 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeatureClick(program.path);
                }}
              >
                Explore Program
              </Button>
            </div>
            
            <div 
              className="absolute inset-0 border-2 opacity-50 group-hover:opacity-100 transition-opacity"
              style={{ borderColor: program.borderColor }}  
            ></div>
            
            <div className="absolute top-0 right-0 h-20 w-20 bg-white/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecializedPrograms;
