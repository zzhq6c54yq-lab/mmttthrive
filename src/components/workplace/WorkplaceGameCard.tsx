
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { LucideIcon } from 'lucide-react';

export interface WorkplaceGameCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  color: string;
  colorText: string;
  icon: LucideIcon;
}

const WorkplaceGameCard: React.FC<WorkplaceGameCardProps> = ({
  id,
  title,
  description,
  duration,
  difficulty,
  color,
  colorText,
  icon: Icon
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePlayGame = () => {
    toast({
      title: "Starting Activity",
      description: `Loading ${title}...`,
    });
    // In a real app, this would navigate to a specific game page
    navigate(`/games-and-quizzes`);
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 border-${color.replace('bg-', 'border-')} h-full flex flex-col`}>
      <div className={`p-6 ${color} flex items-center justify-center`}>
        <Icon className={`h-10 w-10 ${colorText}`} />
      </div>
      
      <CardContent className="flex-grow p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <span>{duration}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <BarChart className="h-4 w-4 mr-2 text-gray-400" />
            <span>Difficulty: {difficulty}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Button 
          className="w-full"
          variant="outline"
          onClick={handlePlayGame}
        >
          Start Activity
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkplaceGameCard;
