
import React from "react";
import { 
  Wrench, FileText, BookOpen, Users, Shield, Phone, 
  Bookmark, CheckSquare, ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Resource Card Component
interface ResourceCardProps {
  title: string;
  description: string;
  type: string;
  category: string;
  url: string;
  featured: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  title, 
  description, 
  type, 
  category, 
  url,
  featured
}) => {
  // Determine icon based on resource type
  const getIcon = () => {
    switch (type) {
      case "Tool":
        return <Wrench className="h-4 w-4 text-[#B87333]" />;
      case "Guide":
      case "Workbook":
        return <FileText className="h-4 w-4 text-[#B87333]" />;
      case "Article":
        return <BookOpen className="h-4 w-4 text-[#B87333]" />;
      case "Directory":
        return <Users className="h-4 w-4 text-[#B87333]" />;
      case "Service":
        return <Shield className="h-4 w-4 text-[#B87333]" />;
      case "Crisis Support":
        return <Phone className="h-4 w-4 text-[#B87333]" />;
      case "Assessment":
      case "Toolkit":
        return <CheckSquare className="h-4 w-4 text-[#B87333]" />;
      default:
        return <Bookmark className="h-4 w-4 text-[#B87333]" />;
    }
  };

  return (
    <Card className={`
      bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] 
      border ${featured ? 'border-[#B87333]/30' : 'border-white/10'} 
      text-white transition-all duration-300 
      hover:shadow-lg hover:translate-y-[-5px]
      ${featured ? 'shadow-[0_0_10px_rgba(184,115,51,0.2)]' : ''}
    `}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div className="bg-[#B87333]/10 text-[#B87333] text-xs font-medium py-1 px-2 rounded-full">
            {category}
          </div>
          <div className="bg-[#1c2e4a] text-white text-xs py-1 px-2 rounded-full flex items-center">
            {getIcon()}
            <span className="ml-1">{type}</span>
          </div>
        </div>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-gray-300 mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-2">
        <Button 
          variant={featured ? "gold" : "bronze"} 
          className="w-full"
          asChild
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Access Resource
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
