
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, FileText, Users, Brain, AlertCircle, Calendar, Star, ChevronRight, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ThriveButton from "@/components/navigation/ThriveButton";

const PoliceOfficersPortal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleButtonClick = (path: string, title: string) => {
    toast({
      title: `Navigating to ${title}`,
      description: "Loading your requested resource...",
      duration: 1500,
    });
    
    navigate(path, {
      state: {
        preventTutorial: true,
        returnToMain: false,
        returnToPortal: "/police-officers-portal",
        stayInPortal: true,
        portalType: "police-officers"
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end mb-4">
        <ThriveButton className="shadow-lg" />
      </div>

      <div className="relative overflow-hidden rounded-lg border border-blue-900/30 bg-gradient-to-r from-blue-950 to-blue-900 p-6">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome, Law Enforcement Professional</h2>
          <p className="text-blue-200 mb-6 max-w-3xl">
            Access specialized mental health resources and support designed for police officers and law enforcement professionals.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white" 
              onClick={() => handleButtonClick("/police-officers-resources", "Police Officer Resources")}
            >
              Explore Resources
            </Button>
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-300 hover:bg-blue-900/50" 
              onClick={() => handleButtonClick("/crisis-support", "Crisis Support")}
            >
              Get Immediate Help
            </Button>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Featured Programs</h2>
          <Button 
            variant="link" 
            className="text-blue-400" 
            onClick={() => handleButtonClick("/police-officers-resources", "Support Programs")}
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-400">
                <Brain className="h-5 w-5" />
                <CardTitle>Stress Management</CardTitle>
              </div>
              <CardDescription>Tools for managing high-stress situations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Learn effective techniques for managing stress during and after critical incidents.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleButtonClick("/police-officers/stress-management", "Stress Management")}
              >
                Learn More
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-400">
                <Users className="h-5 w-5" />
                <CardTitle>Peer Support</CardTitle>
              </div>
              <CardDescription>Connect with fellow officers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Join our peer support network to share experiences and find understanding among colleagues.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleButtonClick("/police-officers/peer-support", "Peer Support")}
              >
                Connect Now
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-400">
                <Shield className="h-5 w-5" />
                <CardTitle>Critical Incident Support</CardTitle>
              </div>
              <CardDescription>Post-incident mental health resources</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Access specialized support and resources for processing critical incidents.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleButtonClick("/police-officers/critical-support", "Critical Incident Support")}
              >
                Access Support
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Quick Access Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#141921] border-blue-900/30 flex items-center p-4">
            <div className="p-2 rounded-full bg-blue-900/30 mr-4">
              <AlertCircle className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-white">Crisis Hotline</h3>
              <p className="text-sm text-white/70">24/7 support for law enforcement</p>
            </div>
            <Button 
              size="sm" 
              className="bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => handleButtonClick("/crisis-support", "Crisis Support")}
            >
              Call Now
            </Button>
          </Card>
          
          <Card className="bg-[#141921] border-blue-900/30 flex items-center p-4">
            <div className="p-2 rounded-full bg-blue-900/30 mr-4">
              <FileText className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-white">Department Resources</h3>
              <p className="text-sm text-white/70">Access department-specific resources</p>
            </div>
            <Button 
              size="sm" 
              className="bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => handleButtonClick("/police-officers-resources", "Resources")}
            >
              View
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PoliceOfficersPortal;
