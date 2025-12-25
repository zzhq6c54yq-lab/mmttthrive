import { useState, useEffect } from "react";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { Loader2, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const LIFE_TRANSITION_PROMPT = `A serene, hopeful illustration of a person standing at a crossroads path in a beautiful landscape, with one path leading through autumn leaves and another through blooming spring flowers. Warm golden and bronze tones with soft amber lighting, symbolizing positive life transitions and personal growth. Minimalist, calming, therapeutic art style. Gentle gradients, peaceful atmosphere. No text, no words.`;

// Cache key for localStorage
const CACHE_KEY = "life-transition-hero-image";
const CACHE_EXPIRY_HOURS = 24;

interface CachedImage {
  url: string;
  timestamp: number;
}

export const TransitionHeroImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { generateImage, isGenerating } = useImageGeneration();

  useEffect(() => {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { url, timestamp }: CachedImage = JSON.parse(cached);
        const hoursElapsed = (Date.now() - timestamp) / (1000 * 60 * 60);
        
        if (hoursElapsed < CACHE_EXPIRY_HOURS) {
          setImageUrl(url);
          return;
        }
      } catch {
        localStorage.removeItem(CACHE_KEY);
      }
    }

    // Generate new image
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    const result = await generateImage(LIFE_TRANSITION_PROMPT);
    
    if (result.imageUrl) {
      setImageUrl(result.imageUrl);
      // Cache the image
      const cacheData: CachedImage = {
        url: result.imageUrl,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    }
  };

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt="Life transitions - A serene path representing personal growth and change"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          
          {/* Regenerate button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm hover:bg-background/70"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
          
          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">AI-Generated Imagery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Life Transition Guides
            </h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
              Structured multi-week programs for major life changes. Week-by-week support when you need it most.
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          {isGenerating ? (
            <>
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-muted-foreground">Generating therapeutic imagery...</p>
            </>
          ) : (
            <>
              <Sparkles className="w-10 h-10 text-primary/50" />
              <p className="text-muted-foreground">Preparing your journey...</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
