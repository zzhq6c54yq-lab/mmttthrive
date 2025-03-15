
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trophy, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export interface WorkplaceWorkshopCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  level: string;
  tags: string[];
  image?: string;
}

const WorkplaceWorkshopCard: React.FC<WorkplaceWorkshopCardProps> = ({
  id,
  title,
  description,
  date,
  duration,
  level,
  tags,
  image
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleJoinWorkshop = () => {
    toast({
      title: "Workshop Registration",
      description: `You have been registered for: ${title}`,
    });
    // In a real app, this would navigate to a specific workshop page
    navigate(`/workshop/${id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-100 h-full flex flex-col">
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 bg-purple-600 text-white text-xs px-2 py-1 rounded-tr-md">
            Workplace Workshop
          </div>
        </div>
      )}
      
      <CardContent className="flex-grow p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-purple-500" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-purple-500" />
            <span>{duration}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Trophy className="h-4 w-4 mr-2 text-purple-500" />
            <span>{level}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex flex-col items-start">
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700"
          onClick={handleJoinWorkshop}
        >
          Register for Workshop
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkplaceWorkshopCard;
