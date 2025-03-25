
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import HomeButton from "@/components/HomeButton";

const EmployeeWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    toast({
      title: "Employee Portal Access",
      description: "Opening your personalized mental health resources",
      duration: 2000
    });
    navigate("/employee-readiness");
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
        
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#4ADE80]">
            Employee Mental Wellness Portal
          </h1>
          
          <div className="relative rounded-xl overflow-hidden mb-8" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <img 
              src="/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png" 
              alt="Employee Wellness"
              className="w-full rounded-xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
          
          <div className="max-w-2xl">
            <p className="text-xl mb-6 text-white/90 font-medium">
              Welcome to your personal mental wellness space designed specifically for employees like you.
            </p>
            
            <p className="text-lg mb-6 text-white/90">
              Taking care of your mental health is just as important as your physical health. 
              Our portal provides tools, resources, and support to help you thrive both at work and in your personal life.
            </p>
            
            <p className="text-lg mb-8 text-white/90">
              From stress management techniques to work-life balance strategies, 
              we're here to support your journey to better mental wellbeing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-2">Resources</h3>
                <p className="text-white/80">Expert-curated content for workplace wellness</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-2">Workshops</h3>
                <p className="text-white/80">Interactive sessions to boost your wellbeing</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-2">Assessments</h3>
                <p className="text-white/80">Personalized insights for your mental health</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleContinue}
            className="bg-[#22C55E] hover:bg-[#4ADE80] text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
          >
            Enter My Wellness Portal <ArrowRight className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeWelcome;
