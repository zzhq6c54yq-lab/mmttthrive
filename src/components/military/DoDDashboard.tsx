
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, Award, Calendar, Star, ChevronRight, Zap, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoDDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get state from location to maintain context between navigations
  const returnToPortal = location.state?.returnToPortal || "/dod-portal";
  const preventTutorial = location.state?.preventTutorial || false;
  
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
        returnToPortal: "/dod-portal"
      }
    });
  };
  
  const handleAssessmentClick = (assessmentType: string, title: string) => {
    toast({
      title: `Starting ${title} Assessment`,
      description: "Loading assessment questions...",
      duration: 1500,
    });
    
    // Navigate to the mental wellness tools page with assessment parameter
    navigate("/mental-wellness/assessments", {
      state: {
        preventTutorial: true,
        returnToPortal: "/dod-portal",
        assessmentType,
        openAssessment: true,
        assessmentTitle: title
      }
    });
  };
  
  const handleEventRegistration = (eventName: string, date: string, path: string) => {
    toast({
      title: `Registered for ${eventName}`,
      description: `You are now registered for ${eventName} on ${date}. A confirmation has been sent to your email.`,
      duration: 3000,
    });
    navigate(path, {
      state: {
        preventTutorial: true,
        returnToMain: false,
        returnToPortal: "/dod-portal",
        highlightWorkshop: eventName
      }
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Welcome Banner - Full width with improved spacing */}
      <div className="relative overflow-hidden rounded-lg border border-blue-900/30 bg-gradient-to-r from-blue-950 to-blue-900 p-6">
        {/* Patriotic flag background element */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-10">
            {/* Red and white stripes */}
            <div className="absolute bottom-0 left-0 right-0 h-full">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-[14.28%] w-full ${i % 2 === 0 ? 'bg-red-700' : 'bg-white'}`}
                />
              ))}
            </div>
            
            {/* Blue field with stars */}
            <div className="absolute top-0 left-0 w-1/4 h-1/2 bg-blue-900">
              <div className="grid grid-cols-3 gap-2 p-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <Star className="h-1 w-1 text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400 mb-2">Welcome, Service Member</h2>
          <p className="text-blue-200 mb-6 max-w-3xl">
            This dedicated portal provides specialized mental health resources, tools, and support designed for military personnel, veterans, and their families.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white" 
              onClick={() => handleButtonClick("/military-resources", "Military Resources")}
            >
              Explore Resources
            </Button>
            <Button 
              variant="outline" 
              className="border-red-500 text-red-300 hover:bg-red-900/20" 
              onClick={() => handleButtonClick("/crisis-support", "Crisis Support")}
            >
              Get Immediate Help
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content - More fluid responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Column 1: Featured Programs */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            Featured Programs
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-blue-200">Combat Stress Recovery</CardTitle>
                <CardDescription>Post-deployment adjustment program</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                Process combat experiences and build resilience through proven techniques.
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm"
                  onClick={() => handleButtonClick("/military-resources/combat-stress", "Combat Stress Recovery")}
                >
                  Access Program
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-blue-200">Transition Support</CardTitle>
                <CardDescription>Military to civilian life tools</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                Navigate challenges of transitioning from military to civilian life.
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm"
                  onClick={() => handleButtonClick("/military-resources/transition", "Transition Support")}
                >
                  Access Resources
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-blue-200">Family Resilience</CardTitle>
                <CardDescription>Support for military families</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                Tools to strengthen military families through deployments and relocations.
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm"
                  onClick={() => handleButtonClick("/military-resources/family", "Family Resilience")}
                >
                  Support Family
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Column 2: Self-Assessments and Upcoming Events */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-400" />
            Self-Assessments
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-[#141921] border-blue-900/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-900/20 rounded-lg">
                    <Zap className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">PTSD Screening</h3>
                    <p className="text-sm text-white/70 mb-2">Quick assessment based on PCL-5 for service members and veterans</p>
                    <Button 
                      size="sm" 
                      className="bg-blue-700 hover:bg-blue-800 text-white w-full"
                      onClick={() => handleAssessmentClick("ptsd", "PTSD")}
                    >
                      Start Assessment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-900/20 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">Depression Check</h3>
                    <p className="text-sm text-white/70 mb-2">PHQ-9 assessment validated for military populations</p>
                    <Button 
                      size="sm" 
                      className="bg-blue-700 hover:bg-blue-800 text-white w-full"
                      onClick={() => handleAssessmentClick("depression", "Depression")}
                    >
                      Start Assessment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-blue-400 hover:text-blue-300"
                onClick={() => navigate("/dod-portal", { 
                  state: {
                    preventTutorial: true, 
                    activeTab: "assessments"
                  }
                })}
              >
                View All Assessments <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400 pt-2 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            Upcoming Events
          </h2>
          
          <Card className="bg-[#141921] border-blue-900/30">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-900/20 text-blue-400 p-2 rounded-lg mr-3 text-center min-w-[50px]">
                    <span className="block text-xs">APR</span>
                    <span className="block text-lg font-bold">15</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-white text-sm">Combat Stress Management Workshop</h4>
                    <p className="text-xs text-white/60">Virtual | 7:00 PM ET</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-blue-500 text-blue-300 hover:bg-blue-900/30 text-xs"
                    onClick={() => handleEventRegistration("Combat Stress Management", "April 15", "/workshop/stress-management")}
                  >
                    Register
                  </Button>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-900/20 text-blue-400 p-2 rounded-lg mr-3 text-center min-w-[50px]">
                    <span className="block text-xs">APR</span>
                    <span className="block text-lg font-bold">22</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-white text-sm">Transition to Civilian Life</h4>
                    <p className="text-xs text-white/60">Virtual | 2:00 PM ET</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-blue-500 text-blue-300 hover:bg-blue-900/30 text-xs"
                    onClick={() => handleEventRegistration("Transition to Civilian Life", "April 22", "/workshop/emotional-regulation")}
                  >
                    Register
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-400 hover:text-blue-300 p-0"
                  onClick={() => navigate("/dod-portal", { 
                    state: {
                      preventTutorial: true, 
                      activeTab: "workshops"
                    }
                  })}
                >
                  View Calendar <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Column 3: Quick Access and Recognition */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400 flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-400" />
            Quick Resources
          </h2>
          
          <Card className="bg-[#141921] border-blue-900/30">
            <CardContent className="p-0">
              <ul className="divide-y divide-blue-900/30">
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start px-4 py-3 text-white hover:bg-blue-900/20 rounded-none"
                    onClick={() => handleButtonClick("/military-resources/combat-stress", "Combat Stress Resources")}
                  >
                    <Shield className="h-4 w-4 mr-3 text-blue-400" />
                    Combat Stress Resources
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start px-4 py-3 text-white hover:bg-blue-900/20 rounded-none"
                    onClick={() => handleButtonClick("/mindfulness-sleep", "Sleep Improvement")}
                  >
                    <Shield className="h-4 w-4 mr-3 text-blue-400" />
                    Sleep Improvement Techniques
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start px-4 py-3 text-white hover:bg-blue-900/20 rounded-none"
                    onClick={() => handleButtonClick("/military-resources/family", "Family Support")}
                  >
                    <Shield className="h-4 w-4 mr-3 text-blue-400" />
                    Family Support Services
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start px-4 py-3 text-white hover:bg-blue-900/20 rounded-none"
                    onClick={() => handleButtonClick("/resource-library", "Educational Materials")}
                  >
                    <Shield className="h-4 w-4 mr-3 text-blue-400" />
                    Educational Materials
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start px-4 py-3 text-white hover:bg-blue-900/20 rounded-none"
                    onClick={() => navigate("/dod-portal", { 
                      state: {
                        preventTutorial: true, 
                        activeTab: "resources"
                      }
                    })}
                  >
                    <Shield className="h-4 w-4 mr-3 text-blue-400" />
                    View All Resources
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Crisis Support Card */}
          <Card className="bg-gradient-to-r from-red-900/40 to-red-800/20 border-red-900/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <h3 className="font-medium text-white">Need Immediate Help?</h3>
              </div>
              <p className="text-white/80 mb-3 text-sm">
                If you're experiencing a crisis or having thoughts of suicide, help is available 24/7.
              </p>
              <Button 
                className="w-full bg-red-700 hover:bg-red-800 text-white"
                onClick={() => handleButtonClick("/crisis-support", "Crisis Support")}
              >
                Get Crisis Support Now
              </Button>
            </CardContent>
          </Card>
          
          {/* Community Connection */}
          <Card className="bg-[#141921] border-blue-900/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-400">Connect with Others</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                className="w-full mb-2 bg-blue-700 hover:bg-blue-800 text-white text-sm"
                onClick={() => navigate("/dod-portal", { 
                  state: {
                    preventTutorial: true, 
                    activeTab: "community"
                  }
                })}
              >
                Join Military Community
              </Button>
              <Button 
                variant="outline"
                className="w-full border-blue-500/50 text-blue-300 hover:bg-blue-900/20 text-sm"
                onClick={() => handleButtonClick("/community-support", "Peer Support Groups")}
              >
                Find Local Support Groups
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoDDashboard;
