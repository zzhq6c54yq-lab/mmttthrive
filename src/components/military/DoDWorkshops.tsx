
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Calendar, ChevronDown, ChevronUp, Brain, Heart, Users, BookOpen, Activity, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DoDWorkshops = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expandedSection, setExpandedSection] = useState<string | null>("upcoming");
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  const handleRegisterWorkshop = (workshopId: string, workshopTitle: string) => {
    toast({
      title: "Workshop Registration",
      description: `You've successfully registered for "${workshopTitle}"`,
      duration: 2000,
    });
    
    navigate(`/workshop/${workshopId}`, {
      state: {
        preventTutorial: true,
        returnToPortal: "/dod-portal",
        registered: true,
        workshopTitle
      }
    });
  };
  
  const handleJoinNow = (workshopId: string, workshopTitle: string) => {
    toast({
      title: "Joining Workshop",
      description: "Loading workshop content...",
      duration: 1500,
    });
    
    navigate(`/workshop/${workshopId}`, {
      state: {
        preventTutorial: true,
        returnToPortal: "/dod-portal",
        activeTab: "workshop",
        workshopTitle
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header with patriotic styling */}
      <div className="relative overflow-hidden rounded-lg border border-blue-800/50 bg-gradient-to-r from-blue-950 to-blue-900 p-6">
        {/* Subtle flag background */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-0 left-0 w-1/4 h-1/3 bg-blue-700">
            <div className="grid grid-cols-4 gap-1 p-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex items-center justify-center text-white">
                  ★
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2/3">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i} 
                className={`h-[14.28%] w-full ${i % 2 === 0 ? 'bg-red-700' : 'bg-white'}`}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400 mb-2">
            Military Mental Health Workshops
          </h2>
          <p className="text-blue-200/80 mb-6 max-w-3xl">
            Specialized workshops designed for service members, veterans, and military families to build resilience, manage stress, and support mental wellbeing.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => {
                navigate("/workshops", {
                  state: {
                    preventTutorial: true,
                    returnToPortal: "/dod-portal",
                    filterBy: "military"
                  }
                });
              }}
            >
              Browse All Workshops
            </Button>
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-300 hover:bg-blue-900/30"
              onClick={() => {
                const element = document.getElementById("upcoming-workshops");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
                setExpandedSection("upcoming");
              }}
            >
              See Upcoming Schedule
            </Button>
          </div>
        </div>
      </div>
      
      {/* Live Now Workshop */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-500/30 overflow-hidden">
        <div className="absolute top-0 left-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium">
          LIVE NOW
        </div>
        <CardContent className="p-6 pt-10">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-bold text-white mb-2">Combat Stress Management</h3>
              <p className="text-blue-200 mb-4">
                Learn effective techniques to manage stress responses related to combat experiences and build resilience.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center text-sm text-blue-300">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>45 minutes</span>
                </div>
                <div className="flex items-center text-sm text-blue-300">
                  <Users className="h-4 w-4 mr-1" />
                  <span>24 participants</span>
                </div>
                <div className="flex items-center text-sm text-blue-300">
                  <Brain className="h-4 w-4 mr-1" />
                  <span>Led by Dr. James Carter, Combat Veteran</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center md:justify-end">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white w-full md:w-auto"
                onClick={() => handleJoinNow("stress-management", "Combat Stress Management")}
              >
                Join Live Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Upcoming Workshops Section */}
      <div id="upcoming-workshops" className="scroll-mt-4">
        <div 
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("upcoming")}
        >
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            Upcoming Workshops
          </h3>
          <Button variant="ghost" size="sm" className="p-1">
            {expandedSection === "upcoming" ? (
              <ChevronUp className="h-5 w-5 text-blue-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-blue-400" />
            )}
          </Button>
        </div>
        
        {expandedSection === "upcoming" && (
          <div className="space-y-4">
            <Card className="bg-[#141921] border-blue-900/30">
              <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg text-center min-w-[80px] md:h-20 flex flex-col justify-center">
                  <span className="block text-sm">APR</span>
                  <span className="block text-xl font-bold">15</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-white text-lg">Mindful Communication for Military Families</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 my-2 text-sm text-blue-200/70">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>11:00 AM ET</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      <span>Virtual</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      <span>Family Focus</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-3">
                    Improve communication between military service members and their families during deployment and reunion.
                  </p>
                  <Button 
                    size="sm" 
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                    onClick={() => handleRegisterWorkshop("mindful-communication", "Mindful Communication for Military Families")}
                  >
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30">
              <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg text-center min-w-[80px] md:h-20 flex flex-col justify-center">
                  <span className="block text-sm">APR</span>
                  <span className="block text-xl font-bold">22</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-white text-lg">Transition to Civilian Life</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 my-2 text-sm text-blue-200/70">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>2:00 PM ET</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      <span>Virtual</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-3 w-3 mr-1" />
                      <span>Career Transition</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-3">
                    Navigate the emotional and practical challenges of transitioning from military to civilian life.
                  </p>
                  <Button 
                    size="sm" 
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                    onClick={() => handleRegisterWorkshop("emotional-regulation", "Transition to Civilian Life")}
                  >
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30">
              <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg text-center min-w-[80px] md:h-20 flex flex-col justify-center">
                  <span className="block text-sm">APR</span>
                  <span className="block text-xl font-bold">29</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-white text-lg">Sleep Improvement for Service Members</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 my-2 text-sm text-blue-200/70">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>7:00 PM ET</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      <span>Virtual</span>
                    </div>
                    <div className="flex items-center">
                      <Activity className="h-3 w-3 mr-1" />
                      <span>Wellness</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-3">
                    Practical techniques for improving sleep quality despite challenges like PTSD, night shifts, and deployments.
                  </p>
                  <Button 
                    size="sm" 
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                    onClick={() => handleRegisterWorkshop("better-sleep", "Sleep Improvement for Service Members")}
                  >
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30">
              <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg text-center min-w-[80px] md:h-20 flex flex-col justify-center">
                  <span className="block text-sm">MAY</span>
                  <span className="block text-xl font-bold">6</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-white text-lg">Deployment Resilience</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 my-2 text-sm text-blue-200/70">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>11:00 AM ET</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>In-Person & Virtual</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      <span>Pre-Deployment</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-3">
                    Building mental resilience skills before, during, and after deployment for service members.
                  </p>
                  <Button 
                    size="sm" 
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                    onClick={() => handleRegisterWorkshop("values-alignment", "Deployment Resilience")}
                  >
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-blue-400 hover:text-blue-300"
                onClick={() => {
                  navigate("/workshops", {
                    state: {
                      preventTutorial: true,
                      returnToPortal: "/dod-portal",
                      filterBy: "military"
                    }
                  });
                }}
              >
                View All Workshops <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Recorded Workshops Section */}
      <div>
        <div 
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("recorded")}
        >
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            Recorded Workshops Library
          </h3>
          <Button variant="ghost" size="sm" className="p-1">
            {expandedSection === "recorded" ? (
              <ChevronUp className="h-5 w-5 text-blue-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-blue-400" />
            )}
          </Button>
        </div>
        
        {expandedSection === "recorded" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-[#141921] border-blue-900/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-900/20 rounded-lg">
                    <Brain className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Managing Combat-Related Trauma</h4>
                    <p className="text-sm text-white/60 mb-3">
                      Techniques for processing traumatic experiences from deployment.
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={() => handleJoinNow("stress-management", "Managing Combat-Related Trauma")}
                    >
                      Watch Recording
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-900/20 rounded-lg">
                    <Heart className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Building Military Family Connections</h4>
                    <p className="text-sm text-white/60 mb-3">
                      Strategies for maintaining strong relationships despite separations.
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={() => handleJoinNow("social-connection", "Building Military Family Connections")}
                    >
                      Watch Recording
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-900/20 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Navigating VA Benefits</h4>
                    <p className="text-sm text-white/60 mb-3">
                      Understanding and accessing mental health benefits through the VA.
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={() => handleJoinNow("boundary-setting", "Navigating VA Benefits")}
                    >
                      Watch Recording
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-900/20 rounded-lg">
                    <Activity className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Military Mindfulness Practice</h4>
                    <p className="text-sm text-white/60 mb-3">
                      Adapted mindfulness techniques for active duty and veterans.
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={() => handleJoinNow("gratitude-practice", "Military Mindfulness Practice")}
                    >
                      Watch Recording
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      {/* Request Workshop */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-700/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-bold text-white mb-2">Request a Custom Workshop</h3>
              <p className="text-blue-200/80 mb-4">
                Need a specialized workshop for your unit, base, or military family group? We can create custom content tailored to your specific needs.
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center md:justify-end">
              <Button 
                className="bg-blue-700 hover:bg-blue-800 text-white w-full md:w-auto"
                onClick={() => {
                  navigate("/contact", {
                    state: {
                      preventTutorial: true,
                      returnToPortal: "/dod-portal",
                      requestType: "workshop",
                      subject: "Custom Military Workshop Request"
                    }
                  });
                  toast({
                    title: "Request Form",
                    description: "Opening custom workshop request form",
                    duration: 2000
                  });
                }}
              >
                Request Workshop
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoDWorkshops;
