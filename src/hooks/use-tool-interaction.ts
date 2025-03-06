
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useToolInteraction(toolName: string) {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  
  const startTool = () => {
    setIsActive(true);
    toast({
      title: `${toolName} Activated`,
      description: "Your session has started. Take your time and proceed at your own pace.",
    });
  };
  
  const completeTool = () => {
    setIsActive(false);
    toast({
      title: "Great job!",
      description: `You've completed this ${toolName} session. Remember to practice regularly for best results.`,
    });
  };
  
  const saveTool = (data: any) => {
    // In a real app, this would save data to a database
    localStorage.setItem(`tool_${toolName.toLowerCase().replace(/\s+/g, '_')}`, JSON.stringify(data));
    toast({
      title: "Progress Saved",
      description: "Your information has been saved successfully.",
    });
  };
  
  return {
    isActive,
    startTool,
    completeTool,
    saveTool
  };
}
