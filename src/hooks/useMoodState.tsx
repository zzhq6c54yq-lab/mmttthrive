
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useMoodState = () => {
  const [selectedMood, setSelectedMood] = useState<'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null>(null);
  const { toast } = useToast();

  const handleMoodSelect = (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => {
    console.log("[useMoodState] Selected mood:", mood);
    setSelectedMood(mood);
  };

  return {
    selectedMood,
    handleMoodSelect
  };
};

export default useMoodState;
