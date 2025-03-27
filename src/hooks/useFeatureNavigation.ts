
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useFeatureNavigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFeatureClick = (path: string) => {
    if (path === "/binaural-beats") {
      toast({
        title: "Navigating to Binaural Beats",
        description: "Explore therapeutic sound frequencies to improve focus, sleep, and mental wellbeing",
        duration: 2000,
      });
    } else {
      toast({
        title: "Navigating...",
        description: "Taking you to your selected feature",
        duration: 1500,
      });
    }
    
    navigate(path);
  };

  return { handleFeatureClick };
};

export default useFeatureNavigation;
