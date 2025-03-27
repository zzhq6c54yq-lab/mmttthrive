
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useUserJourney = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [selectedMood, setSelectedMood] = useState<'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null>(null);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  // User interaction handlers
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      toast({
        title: "Registration Error",
        description: "Please fill in all fields to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Registration Successful",
      description: "Welcome to Thrive MT! Your journey to better mental health begins now.",
    });
    
    return 'subscription';
  };

  const handleSubscriptionSelect = (planTitle: string) => {
    setSelectedPlan(planTitle);
    toast({
      title: `${planTitle} Plan Selected`,
      description: `You have selected the ${planTitle} subscription plan.`,
    });
  };

  const toggleQuality = (id: string) => {
    setSelectedQualities(prev => 
      prev.includes(id) 
        ? prev.filter(q => q !== id) 
        : [...prev, id]
    );
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) 
        ? prev.filter(g => g !== id) 
        : [...prev, id]
    );
  };

  const handleSubscriptionContinue = (returnToMain: boolean | undefined) => {
    if (!selectedPlan) {
      toast({
        title: "Please Select a Plan",
        description: "Please select a subscription plan to continue.",
        variant: "destructive"
      });
      return null;
    }
    
    toast({
      title: "Plan Confirmed",
      description: `Your ${selectedPlan} plan is now active. Enjoy your benefits!`,
    });
    
    if (returnToMain) {
      return 'main';
    } else {
      return 'visionBoard';
    }
  };

  const handleVisionBoardContinue = () => {
    if (selectedQualities.length < 2 || selectedGoals.length < 2) {
      toast({
        title: "More Selections Needed",
        description: "Please select at least 2 qualities and 2 goals to continue.",
        variant: "destructive"
      });
      return null;
    }
    
    toast({
      title: "Vision Board Created",
      description: "Your personalized mental wellness journey is ready!",
    });
    
    return 'main';
  };

  const navigateToFeature = (path: string) => {
    if (path.startsWith('/')) {
      // Special case for Small Business Portal - include state to trigger teaser
      if (path === '/small-business-portal') {
        navigate(path, { 
          state: { 
            qualities: selectedQualities, 
            goals: selectedGoals,
            fromMainMenu: true  // Flag to show teaser screen
          }
        });
      } else {
        navigate(path, { 
          state: { 
            qualities: selectedQualities, 
            goals: selectedGoals 
          }
        });
      }
    }
  };

  const handleMoodSelect = (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => {
    setSelectedMood(mood);
    return 'moodResponse';
  };

  return {
    userInfo,
    selectedMood,
    selectedPlan,
    selectedQualities,
    selectedGoals,
    handleUserInfoChange,
    handleRegister,
    handleSubscriptionSelect,
    toggleQuality,
    toggleGoal,
    handleSubscriptionContinue,
    handleVisionBoardContinue,
    navigateToFeature,
    handleMoodSelect
  };
};

export default useUserJourney;
