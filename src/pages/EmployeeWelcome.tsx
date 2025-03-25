
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Sparkles, BookOpen, Shield, Rocket, Dumbbell, Brain, Target } from "lucide-react";
import HomeButton from "@/components/HomeButton";

const FeatureCard = ({ title, description, icon, onClick, color }) => (
  <div 
    onClick={onClick}
    className={`bg-gradient-to-br ${color} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col items-center text-center h-full`}
  >
    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full mb-4 inline-flex">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-white/90">{description}</p>
  </div>
);

const EmployeeWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigate = (path) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    toast({
      title: "Navigating",
      description: "Opening your personalized wellness resources",
      duration: 2000
    });
    
    setTimeout(() => {
      navigate(path);
      setIsNavigating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%2322C55E%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#22C55E]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#4ADE80]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="absolute top-4 right-4 z-20">
          <HomeButton />
        </div>
        
        <div className="flex flex-col items-center justify-center text-center px-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#4ADE80]">
            Employee Mental Wellness Portal
          </h1>
          
          <div className="max-w-2xl mb-8">
            <p className="text-xl text-white/90 font-medium">
              Welcome to your personal mental wellness space designed specifically for employees like you.
            </p>
            
            <p className="text-lg mb-8 text-white/90">
              Taking care of your mental health is just as important as your physical health. 
              Choose from our variety of wellness resources to support your journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
            <FeatureCard 
              title="Wellness Resources" 
              description="Expert-curated content to help you thrive at work and home"
              icon={<BookOpen className="h-8 w-8 text-white" />}
              onClick={() => handleNavigate("/employee-readiness?tab=resources")}
              color="from-[#22C55E] to-[#4ADE80]"
            />
            
            <FeatureCard 
              title="Interactive Workshops" 
              description="Join live sessions to build skills and boost wellbeing"
              icon={<Brain className="h-8 w-8 text-white" />}
              onClick={() => handleNavigate("/employee-readiness?tab=workshops")}
              color="from-[#8B5CF6] to-[#A78BFA]"
            />
            
            <FeatureCard 
              title="Wellbeing Assessments" 
              description="Get personalized insights to understand your mental health"
              icon={<Target className="h-8 w-8 text-white" />}
              onClick={() => handleNavigate("/employee-readiness?tab=assessments")}
              color="from-[#EC4899] to-[#F472B6]"
            />
          </div>
          
          <Button 
            onClick={() => handleNavigate("/employee-readiness")}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 border border-white/20 rounded-full"
          >
            Explore Full Wellness Portal <Rocket className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeWelcome;
