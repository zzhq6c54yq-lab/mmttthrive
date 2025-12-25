import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GenerateImageResult {
  imageUrl: string | null;
  textContent?: string;
}

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateImage = async (prompt: string): Promise<GenerateImageResult> => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      return {
        imageUrl: data.imageUrl,
        textContent: data.textContent
      };
    } catch (error) {
      console.error('Image generation error:', error);
      
      const message = error instanceof Error ? error.message : 'Failed to generate image';
      
      toast({
        title: "Image Generation Failed",
        description: message,
        variant: "destructive",
      });
      
      return { imageUrl: null };
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateImage,
    isGenerating
  };
};
