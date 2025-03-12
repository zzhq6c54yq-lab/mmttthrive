
import React, { useState } from "react";
import { LucideIcon, ChevronDown, ChevronUp, Play, Pause, Volume, Volume2, Download, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export interface WorkshopData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  duration: string;
  sections: Array<{
    title: string;
    duration: string;
    content: string;
    exercises: Array<{
      title: string;
      instructions: string;
    }>;
  }>;
}

interface WorkshopProps {
  workshopData: WorkshopData;
}

const Workshop: React.FC<WorkshopProps> = ({ workshopData }) => {
  const [activeVideoSection, setActiveVideoSection] = useState<number | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  const toggleVideo = (sectionIndex: number) => {
    setActiveVideoSection(activeVideoSection === sectionIndex ? null : sectionIndex);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Sound Enabled" : "Sound Muted",
      description: isMuted ? "Workshop audio is now playing" : "Workshop audio is now muted",
      duration: 1500,
    });
  };

  const markExerciseComplete = (sectionIndex: number, exerciseIndex: number) => {
    const exerciseKey = `${sectionIndex}-${exerciseIndex}`;
    const newCompleted = new Set(completedExercises);
    
    if (newCompleted.has(exerciseKey)) {
      newCompleted.delete(exerciseKey);
    } else {
      newCompleted.add(exerciseKey);
      toast({
        title: "Exercise Completed",
        description: "Great job! Your progress has been saved.",
        duration: 2000,
      });
    }
    
    setCompletedExercises(newCompleted);
  };

  const downloadWorksheetPDF = (sectionTitle: string) => {
    toast({
      title: "Downloading Worksheet",
      description: `The worksheet for "${sectionTitle}" is being downloaded`,
      duration: 2000,
    });
    
    // In a real app, this would trigger an actual download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Worksheet has been downloaded successfully",
        duration: 2000,
      });
    }, 1500);
  };

  // Extract color code for styling
  const colorClass = workshopData.color.split(' ')[0];
  const accentColor = colorClass.includes('bg-[#') 
    ? colorClass.replace('bg-[', '').replace(']/10', '') 
    : '#9b87f5';

  const completedExercisesCount = completedExercises.size;
  const totalExercisesCount = workshopData.sections.reduce(
    (count, section) => count + section.exercises.length, 0
  );
  const progressPercentage = totalExercisesCount > 0 
    ? Math.round((completedExercisesCount / totalExercisesCount) * 100) 
    : 0;

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-lg overflow-hidden">
        <div 
          className="h-2 w-full" 
          style={{ backgroundColor: accentColor }}
        ></div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div 
                className="p-3 rounded-full"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <workshopData.icon className="h-6 w-6" style={{ color: accentColor }} />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold" style={{ color: accentColor }}>
                  Workshop Progress
                </CardTitle>
                <CardDescription>
                  {progressPercentage}% Complete ({completedExercisesCount}/{totalExercisesCount} exercises)
                </CardDescription>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className="flex items-center gap-1"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              <workshopData.icon className="h-3 w-3" />
              {workshopData.duration}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div 
              className="h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%`, backgroundColor: accentColor }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Workshop Sections */}
      <div className="space-y-8">
        {workshopData.sections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="overflow-hidden border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    {sectionIndex + 1}. {section.title}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Badge variant="outline" className="mr-2 text-xs">
                      {section.duration}
                    </Badge>
                    {section.exercises.length} exercises
                  </CardDescription>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => toggleVideo(sectionIndex)}
                >
                  {activeVideoSection === sectionIndex ? 
                    <Pause className="h-4 w-4" /> : 
                    <Play className="h-4 w-4" />
                  }
                  {activeVideoSection === sectionIndex ? "Pause" : "Play"} Video
                </Button>
              </div>
            </CardHeader>
            
            {activeVideoSection === sectionIndex && (
              <div className="px-6 pb-4">
                <div className="relative rounded-md overflow-hidden bg-black aspect-video mb-3">
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay
                    controls
                    loop
                    muted={isMuted}
                    poster={`https://picsum.photos/seed/${workshopData.id}-${sectionIndex}/1280/720`}
                  >
                    {/* Using a sample video URL - in production you would use actual workshop videos */}
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                    >
                      {isMuted ? <Volume className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                      {isMuted ? "Unmute" : "Mute"}
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    "{section.title}" Workshop Video
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => downloadWorksheetPDF(section.title)}
                  >
                    <Download className="h-4 w-4" />
                    Download Notes
                  </Button>
                </div>
              </div>
            )}
            
            <CardContent className="px-6 py-4">
              <div className="prose max-w-none">
                <div className="text-gray-700 whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            </CardContent>
            
            <div className="px-6 pb-6">
              <Separator className="my-4" />
              <h3 className="text-lg font-medium mb-4">Exercises</h3>
              
              <Accordion type="multiple" className="space-y-4">
                {section.exercises.map((exercise, exerciseIndex) => {
                  const exerciseKey = `${sectionIndex}-${exerciseIndex}`;
                  const isCompleted = completedExercises.has(exerciseKey);
                  
                  return (
                    <AccordionItem 
                      key={exerciseIndex} 
                      value={`item-${sectionIndex}-${exerciseIndex}`}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="py-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                          <Button
                            variant={isCompleted ? "default" : "outline"}
                            size="icon"
                            className={`h-8 w-8 rounded-full ${isCompleted ? 'bg-green-600 hover:bg-green-700' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              markExerciseComplete(sectionIndex, exerciseIndex);
                            }}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <span className={isCompleted ? "line-through text-gray-500" : ""}>
                            {exercise.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4 px-11">
                        <div className="prose max-w-none">
                          <p className="text-gray-700 text-sm">
                            {exercise.instructions}
                          </p>
                          
                          <div className="mt-4 space-x-2">
                            <Button 
                              variant={isCompleted ? "outline" : "default"}
                              size="sm"
                              className="mr-2"
                              onClick={() => markExerciseComplete(sectionIndex, exerciseIndex)}
                            >
                              {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => downloadWorksheetPDF(`${section.title} - ${exercise.title}`)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download Worksheet
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Workshop;
