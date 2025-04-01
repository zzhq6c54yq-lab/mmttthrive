
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Shield, Award, Target, Book, Users, Heart, BrainCircuit, 
  GraduationCap, Briefcase, FileText, CalendarDays, Clock, 
  MessageSquare, VideoIcon, MapPin, Phone, LifeBuoy, Clipboard
} from "lucide-react";
import HomeButton from "@/components/HomeButton";
import { useToast } from "@/hooks/use-toast";

interface MenuItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  title, 
  description, 
  icon, 
  path, 
  isNew, 
  isFeatured, 
  onClick 
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };
  
  return (
    <Card 
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-[#0EA5E9]/20 hover:border-[#0EA5E9]"
      onClick={handleClick}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center text-[#0EA5E9] group-hover:bg-[#0EA5E9]/20 transition-colors">
            {icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-lg">{title}</h3>
              {isNew && (
                <Badge className="bg-green-500 text-white">New</Badge>
              )}
              {isFeatured && (
                <Badge className="bg-amber-500 text-white">Featured</Badge>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const DoDMainMenu: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleNavigate = (path: string, title: string) => {
    toast({
      title: "Navigating...",
      description: `Taking you to ${title}`,
    });
    navigate(path);
  };
  
  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `The ${feature} feature will be available soon!`,
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-[#0EA5E9]" />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#2563EB]">
              DoD Mental Health Hub
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 ml-9">
            Specialized resources and support for military personnel and their families
          </p>
        </div>
        
        <HomeButton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MenuItem
          title="PTSD & Trauma Support"
          description="Evidence-based resources for managing post-traumatic stress and trauma recovery"
          icon={<Target className="h-6 w-6" />}
          isFeatured={true}
          path="/military-resources"
        />
        
        <MenuItem
          title="Military Wellness Workshops"
          description="Virtual and in-person workshops addressing the unique mental health needs of service members"
          icon={<Users className="h-6 w-6" />}
          path="/military-workshops"
          isNew={true}
        />
        
        <MenuItem
          title="Transition Support"
          description="Resources for transitioning from military to civilian life"
          icon={<Award className="h-6 w-6" />}
          path="/lifestyle-integration"
        />
        
        <MenuItem
          title="Family & Relationship Resources"
          description="Support for military families and maintaining healthy relationships during deployment"
          icon={<Heart className="h-6 w-6" />}
          path="/family-support"
        />
        
        <MenuItem
          title="TBI & Combat Stress Resources"
          description="Specialized resources for traumatic brain injury and combat stress"
          icon={<BrainCircuit className="h-6 w-6" />}
          onClick={() => handleComingSoon("TBI & Combat Stress Resources")}
        />
        
        <MenuItem
          title="Educational Materials"
          description="Learn about mental health conditions and treatment options relevant to military personnel"
          icon={<Book className="h-6 w-6" />}
          path="/resource-library"
        />
        
        <MenuItem
          title="Secure Telehealth Services"
          description="Connect with military-experienced mental health providers via secure video"
          icon={<VideoIcon className="h-6 w-6" />}
          path="/real-time-therapy"
        />
        
        <MenuItem
          title="Peer Support Network"
          description="Connect with fellow service members who understand your experiences"
          icon={<Users className="h-6 w-6" />}
          path="/community-support"
        />
        
        <MenuItem
          title="Crisis Resources"
          description="Immediate support for crisis situations, including the Veterans Crisis Line"
          icon={<LifeBuoy className="h-6 w-6" />}
          path="/crisis-support"
          isFeatured={true}
        />
        
        <MenuItem
          title="Duty Station Resources"
          description="Find mental health resources near your current duty station"
          icon={<MapPin className="h-6 w-6" />}
          onClick={() => handleComingSoon("Duty Station Resources")}
        />
        
        <MenuItem
          title="Confidential Self-Assessment"
          description="Evaluate your mental wellbeing with anonymous, military-specific assessments"
          icon={<Clipboard className="h-6 w-6" />}
          isNew={true}
          onClick={() => handleComingSoon("Confidential Self-Assessment")}
        />
        
        <MenuItem
          title="VA Benefits Navigation"
          description="Guidance on accessing your VA mental health benefits and services"
          icon={<FileText className="h-6 w-6" />}
          onClick={() => handleComingSoon("VA Benefits Navigation")}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <Card className="overflow-hidden border-[#0EA5E9]/20">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CalendarDays className="h-5 w-5 text-[#0EA5E9]" />
              <h3 className="font-medium">Upcoming Events</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start pb-3 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h4 className="font-medium text-sm">PTSD Awareness Workshop</h4>
                  <p className="text-xs text-gray-500">May 15, 2023 • 2:00 PM EST</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer">
                  Virtual
                </Badge>
              </div>
              
              <div className="flex justify-between items-start pb-3 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h4 className="font-medium text-sm">Transition Readiness Summit</h4>
                  <p className="text-xs text-gray-500">June 3-5, 2023 • Washington, DC</p>
                </div>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer">
                  In-Person
                </Badge>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-sm">Family Resilience Webinar</h4>
                  <p className="text-xs text-gray-500">May 23, 2023 • 7:00 PM EST</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer">
                  Virtual
                </Badge>
              </div>
            </div>
            
            <Button 
              variant="outline"
              className="w-full mt-4 border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#0EA5E9]/10"
              onClick={() => handleNavigate("/workshops", "Military Workshops")}
            >
              View All Events
            </Button>
          </div>
        </Card>
        
        <Card className="overflow-hidden border-[#0EA5E9]/20">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="h-5 w-5 text-[#0EA5E9]" />
              <h3 className="font-medium">Quick Contact</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Veterans Crisis Line</h4>
                  <p className="text-sm">988, then press 1</p>
                  <p className="text-xs text-gray-500">24/7 confidential crisis support</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Text Support</h4>
                  <p className="text-sm">Text HOME to 741741</p>
                  <p className="text-xs text-gray-500">Connect with a Crisis Counselor</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Military OneSource</h4>
                  <p className="text-sm">1-800-342-9647</p>
                  <p className="text-xs text-gray-500">Available 24/7 for service members</p>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4 bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] hover:from-[#0D94D1] hover:to-[#2254CC] text-white"
              onClick={() => handleNavigate("/crisis-support", "Crisis Resources")}
            >
              See All Crisis Resources
            </Button>
          </div>
        </Card>
      </div>
      
      <Card className="overflow-hidden border-[#0EA5E9]/20 bg-gradient-to-r from-[#0c1a2f] via-[#0f2547] to-[#0c1a2f]">
        <div className="p-6 text-white">
          <h3 className="text-xl font-medium mb-2">About DoD Mental Health Resources</h3>
          <p className="text-white/80 mb-4">
            The Department of Defense is committed to supporting the mental health and well-being of all service members, 
            veterans, and their families. These resources are designed to address the unique challenges faced by military 
            personnel and provide confidential, effective support.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex justify-center mb-2">
                <Shield className="h-8 w-8 text-[#0EA5E9]" />
              </div>
              <h4 className="font-medium text-center mb-1">Confidential Support</h4>
              <p className="text-sm text-center text-white/70">Access mental health resources with privacy and confidentiality</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex justify-center mb-2">
                <Award className="h-8 w-8 text-[#0EA5E9]" />
              </div>
              <h4 className="font-medium text-center mb-1">Military Specific</h4>
              <p className="text-sm text-center text-white/70">Resources tailored to the unique experiences of service members</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex justify-center mb-2">
                <Heart className="h-8 w-8 text-[#0EA5E9]" />
              </div>
              <h4 className="font-medium text-center mb-1">Family Inclusive</h4>
              <p className="text-sm text-center text-white/70">Support for family members and loved ones of service members</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => handleNavigate("/military-resources", "Military Resources")}
            >
              Learn More About Our Commitment
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-center mt-8">
        <p className="text-sm text-gray-500">
          If you're experiencing a mental health emergency, call 988 then press 1, or visit your nearest emergency room.
        </p>
      </div>
    </div>
  );
};

export default DoDMainMenu;
