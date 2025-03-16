
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Calendar, MessageSquare, Trophy, FileText } from "lucide-react";

interface GenericTabContentProps {
  title: string;
  description: string;
  content?: string;
  type?: "resources" | "education" | "assessments" | "programs" | "profile" | string;
}

const GenericTabContent = ({ 
  title, 
  description, 
  content = "Content will appear here.",
  type = "default"
}: GenericTabContentProps) => {
  
  const renderContentByType = () => {
    switch(type) {
      case "resources":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResourceCard 
                title="PTSD Resources" 
                description="Access specialized materials for PTSD management"
                icon={<BookOpen className="h-5 w-5 text-[#B87333]" />}
              />
              <ResourceCard 
                title="Transition Support" 
                description="Resources for military to civilian transition"
                icon={<Users className="h-5 w-5 text-[#B87333]" />}
              />
              <ResourceCard 
                title="Family Support" 
                description="Resources for military families and dependents"
                icon={<Users className="h-5 w-5 text-[#B87333]" />}
              />
              <ResourceCard 
                title="VA Benefits Navigator" 
                description="Guide to understanding your VA benefits"
                icon={<FileText className="h-5 w-5 text-[#B87333]" />}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="gold" className="gap-2">
                View All Resources <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      
      case "education":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResourceCard 
                title="Combat Stress Management" 
                description="Educational materials on managing combat-related stress"
                icon={<BookOpen className="h-5 w-5 text-[#B87333]" />}
              />
              <ResourceCard 
                title="Leadership Training" 
                description="Resources for mental health leadership in units"
                icon={<Trophy className="h-5 w-5 text-[#B87333]" />}
              />
              <ResourceCard 
                title="Resilience Building" 
                description="Courses on building mental resilience"
                icon={<Users className="h-5 w-5 text-[#B87333]" />}
              />
              <ResourceCard 
                title="Sleep Improvement" 
                description="Educational resources for better sleep habits"
                icon={<FileText className="h-5 w-5 text-[#B87333]" />}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="gold" className="gap-2">
                Browse All Courses <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case "assessments":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResourceCard 
                title="PTSD Screening" 
                description="Professional screening for post-traumatic stress"
                icon={<FileText className="h-5 w-5 text-[#B87333]" />}
              />
              <ResourceCard 
                title="Depression Assessment" 
                description="Evidence-based depression screening tools"
                icon={<FileText className="h-5 w-5 text-[#B87333]" />}
              />
              <ResourceCard 
                title="Anxiety Evaluation" 
                description="Assessment for anxiety disorders"
                icon={<FileText className="h-5 w-5 text-[#B87333]" />}
              />
              <ResourceCard 
                title="Combat Readiness" 
                description="Mental readiness assessment for deployment"
                icon={<Trophy className="h-5 w-5 text-[#B87333]" />}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="gold" className="gap-2">
                Take An Assessment <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case "programs":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResourceCard 
                title="Peer Support Program" 
                description="Connect with fellow service members"
                icon={<Users className="h-5 w-5 text-[#B87333]" />}
              />
              <ResourceCard 
                title="Therapy Sessions" 
                description="One-on-one therapy with military specialists"
                icon={<MessageSquare className="h-5 w-5 text-[#B87333]" />}
              />
              <ResourceCard 
                title="Group Workshops" 
                description="Themed workshops for different challenges"
                icon={<Users className="h-5 w-5 text-[#B87333]" />}
              />
              <ResourceCard 
                title="Family Programs" 
                description="Programs designed for military families"
                icon={<Users className="h-5 w-5 text-[#B87333]" />}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="gold" className="gap-2">
                Enroll In A Program <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case "profile":
        return (
          <div className="space-y-6">
            <div className="bg-[#0A1929]/60 rounded-lg p-6 border border-[#B87333]/30">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#B87333]/20 to-[#B87333]/10 flex items-center justify-center border-2 border-[#B87333]/30">
                    <span className="text-3xl font-bold text-[#B87333]">JD</span>
                  </div>
                  <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-[#B87333] border-2 border-[#0A1929] flex items-center justify-center">
                    <FileText className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-white">John Doe</h3>
                  <p className="text-gray-300">Staff Sergeant, U.S. Army (Ret.)</p>
                  <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-2 py-1 bg-[#B87333]/20 text-[#B87333] text-xs rounded-full">2 Tours</span>
                    <span className="px-2 py-1 bg-[#B87333]/20 text-[#B87333] text-xs rounded-full">Veteran</span>
                    <span className="px-2 py-1 bg-[#B87333]/20 text-[#B87333] text-xs rounded-full">10 Years Service</span>
                  </div>
                </div>
                <div>
                  <Button variant="gold-outline" size="sm">Edit Profile</Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0A1929]/60 rounded-lg p-4 border border-[#B87333]/30">
                <h4 className="font-medium text-[#B87333]">Personal Info</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white">john.doe@example.com</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white">(555) 123-4567</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Location:</span>
                    <span className="text-white">Fort Bragg, NC</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[#0A1929]/60 rounded-lg p-4 border border-[#B87333]/30">
                <h4 className="font-medium text-[#B87333]">Service History</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Branch:</span>
                    <span className="text-white">U.S. Army</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Years:</span>
                    <span className="text-white">2010-2020</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-white">Retired</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[#0A1929]/60 rounded-lg p-4 border border-[#B87333]/30">
                <h4 className="font-medium text-[#B87333]">Program Status</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Active Programs:</span>
                    <span className="text-white">2</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Resources Saved:</span>
                    <span className="text-white">12</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Completed Assessments:</span>
                    <span className="text-white">3</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button variant="gold" className="gap-2">
                View Full Profile <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      default:
        return <p className="text-white">{content}</p>;
    }
  };

  return (
    <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-gray-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderContentByType()}
      </CardContent>
    </Card>
  );
};

// Helper component for resource cards
const ResourceCard = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode 
}) => {
  return (
    <Card className="bg-[#0A1929]/60 border-[#B87333]/20 hover:border-[#B87333]/40 transition-all">
      <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3">
        <div className="bg-[#0A1929] p-2 rounded-full">
          {icon}
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

export default GenericTabContent;

