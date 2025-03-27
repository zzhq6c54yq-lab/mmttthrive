
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PortalOptionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  gradient: string;
  borderColor: string;
}

const PortalOption: React.FC<PortalOptionProps> = ({ 
  title, 
  description, 
  icon, 
  onClick, 
  gradient, 
  borderColor 
}) => (
  <Card 
    className="relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-md border-0 h-full flex flex-col"
    onClick={onClick}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}></div>
    <div className="absolute inset-0 bg-black/30"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
    
    <CardHeader className="relative z-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm">
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
      </div>
    </CardHeader>
    
    <CardContent className="relative z-10 flex-grow">
      <CardDescription className="text-white/90 text-lg">{description}</CardDescription>
    </CardContent>
    
    <CardFooter className="relative z-10">
      <Button 
        className="mt-auto bg-white/20 backdrop-blur-sm text-white border border-white/40 hover:bg-white/30 transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        Explore Program <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardFooter>
    
    <div 
      className="absolute inset-0 border-2 opacity-50 group-hover:opacity-100 transition-opacity"
      style={{ borderColor }}  
    ></div>
  </Card>
);

export default PortalOption;
