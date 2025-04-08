
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Shield, 
  GraduationCap, 
  Briefcase,
  Medal,
  Users,
  Flag,
  Award,
  Anchor,
  BookOpen,
  Laptop,
  Building
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface SpecializedProgramsProps {
  navigateToFeature: (path: string) => void;
}

const SpecializedPrograms: React.FC<SpecializedProgramsProps> = ({ navigateToFeature }) => {
  const programs = [
    {
      id: "veterans",
      title: "Veterans Program",
      path: "/dod-welcome",
      coverImage: "https://images.unsplash.com/photo-1476370648495-3533f64427a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      description: "Resources for current and former service members and their families",
      features: ["Mental health resources", "Transition support", "Family assistance"],
      primaryIcon: <Shield className="h-6 w-6 text-white" />,
      secondaryIcon: <Medal className="h-6 w-6" />,
      tertiaryIcon: <Flag className="h-6 w-6" />,
      gradientFrom: "from-blue-900",
      gradientTo: "to-indigo-800",
      accentColor: "border-red-500",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: "college",
      title: "College Students",
      path: "/college-welcome",
      coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      description: "Support for students navigating academic challenges",
      features: ["Stress management", "Study resources", "Peer support"],
      primaryIcon: <GraduationCap className="h-6 w-6 text-white" />,
      secondaryIcon: <BookOpen className="h-6 w-6" />,
      tertiaryIcon: <Laptop className="h-6 w-6" />,
      gradientFrom: "from-purple-900",
      gradientTo: "to-violet-800",
      accentColor: "border-yellow-400",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    },
    {
      id: "business",
      title: "Small Business",
      path: "/small-business-welcome",
      coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      description: "Tools for entrepreneurs and small business owners",
      features: ["Leadership wellness", "Employee resources", "Work-life balance"],
      primaryIcon: <Briefcase className="h-6 w-6 text-white" />,
      secondaryIcon: <Building className="h-6 w-6" />,
      tertiaryIcon: <Users className="h-6 w-6" />,
      gradientFrom: "from-emerald-900",
      gradientTo: "to-green-800",
      accentColor: "border-amber-400",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700"
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="py-2 hover:no-underline">
          <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#9b87f5] to-purple-600 font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#9b87f5]" /> 
            Specialized Programs
          </span>
        </AccordionTrigger>
        <AccordionContent className="animate-accordion-down">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map(program => (
              <Card 
                key={program.id} 
                className={`overflow-hidden border-0 hover:shadow-xl transition-all duration-500 group cursor-pointer rounded-xl h-auto transform hover:scale-[1.02] ${program.accentColor} border-l-4`}
                onClick={() => navigateToFeature(program.path)}
              >
                {/* Main content area */}
                <div className="relative h-64">
                  {/* Background image with overlay */}
                  <div className="absolute inset-0">
                    <img 
                      src={program.coverImage} 
                      alt={program.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${program.gradientFrom} ${program.gradientTo} opacity-90`}></div>
                  </div>
                  
                  {/* Content overlay */}
                  <CardContent className="relative z-10 h-full p-6 flex flex-col justify-between">
                    <div>
                      {/* Header section with icon and title */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm shadow-inner border border-white/20">
                          {program.primaryIcon}
                        </div>
                        <div>
                          <h3 className="font-bold text-2xl text-white drop-shadow-md mb-1">
                            {program.title}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {program.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Features list */}
                      <div className="space-y-2 mb-4">
                        {program.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-1 h-1 bg-white/70 rounded-full mr-2"></div>
                            <span className="text-white/80 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Floating decorative icons */}
                    <div className="absolute right-6 bottom-16 opacity-10">
                      {program.secondaryIcon &&
                        <div className="absolute right-0 bottom-0">
                          {React.cloneElement(program.secondaryIcon, { className: "h-20 w-20 text-white" })}
                        </div>
                      }
                      {program.tertiaryIcon &&
                        <div className="absolute right-20 bottom-0">
                          {React.cloneElement(program.tertiaryIcon, { className: "h-16 w-16 text-white/40" })}
                        </div>
                      }
                    </div>
                    
                    {/* Button area */}
                    <div className="relative z-10">
                      <Button 
                        className={`w-full text-white ${program.buttonColor} shadow-lg`}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToFeature(program.path);
                        }}
                      >
                        <span>Explore Program</span>
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">&rarr;</span>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SpecializedPrograms;
