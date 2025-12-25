import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { transitionImagePrompts, IMAGE_CACHE_EXPIRY_DAYS, getAllProgramSlugs } from '@/data/transitionImagePrompts';
import { toast } from 'sonner';

interface CachedImage {
  imageUrl: string;
  timestamp: number;
}

interface GenerationProgress {
  current: number;
  total: number;
  currentSlug: string;
}

interface UseProgramImageGenerationReturn {
  generatedImages: Record<string, string>;
  isGenerating: boolean;
  progress: GenerationProgress | null;
  generateAllImages: () => Promise<void>;
  generateSingleImage: (slug: string) => Promise<void>;
  clearCache: () => void;
}

const RATE_LIMIT_DELAY = 1500; // 1.5 seconds between API calls

const getCacheKey = (slug: string) => `ai-program-image-${slug}`;

const getCachedImage = (slug: string): string | null => {
  try {
    const cached = localStorage.getItem(getCacheKey(slug));
    if (!cached) return null;

    const parsed: CachedImage = JSON.parse(cached);
    const expiryTime = IMAGE_CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    
    if (Date.now() - parsed.timestamp > expiryTime) {
      localStorage.removeItem(getCacheKey(slug));
      return null;
    }

    return parsed.imageUrl;
  } catch {
    return null;
  }
};

const setCachedImage = (slug: string, imageUrl: string) => {
  try {
    const cacheData: CachedImage = {
      imageUrl,
      timestamp: Date.now()
    };
    localStorage.setItem(getCacheKey(slug), JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Failed to cache image:', error);
  }
};

export const useProgramImageGeneration = (): UseProgramImageGenerationReturn => {
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);

  // Load cached images on mount
  useEffect(() => {
    const slugs = getAllProgramSlugs();
    const cached: Record<string, string> = {};
    
    slugs.forEach(slug => {
      const cachedUrl = getCachedImage(slug);
      if (cachedUrl) {
        cached[slug] = cachedUrl;
      }
    });

    if (Object.keys(cached).length > 0) {
      setGeneratedImages(cached);
    }
  }, []);

  const generateSingleImage = useCallback(async (slug: string) => {
    const promptData = transitionImagePrompts[slug];
    if (!promptData) {
      toast.error(`No prompt found for program: ${slug}`);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: promptData.prompt }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.imageUrl) {
        setCachedImage(slug, data.imageUrl);
        setGeneratedImages(prev => ({
          ...prev,
          [slug]: data.imageUrl
        }));
      }
    } catch (error) {
      console.error(`Failed to generate image for ${slug}:`, error);
      throw error;
    }
  }, []);

  const generateAllImages = useCallback(async () => {
    const slugs = getAllProgramSlugs();
    setIsGenerating(true);
    setProgress({ current: 0, total: slugs.length, currentSlug: '' });

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < slugs.length; i++) {
      const slug = slugs[i];
      
      // Skip if already cached
      const cached = getCachedImage(slug);
      if (cached) {
        setGeneratedImages(prev => ({ ...prev, [slug]: cached }));
        setProgress({ current: i + 1, total: slugs.length, currentSlug: slug });
        successCount++;
        continue;
      }

      setProgress({ current: i + 1, total: slugs.length, currentSlug: slug });

      try {
        await generateSingleImage(slug);
        successCount++;
      } catch (error) {
        errorCount++;
        console.error(`Failed to generate image for ${slug}:`, error);
      }

      // Rate limit delay between calls (skip for last item)
      if (i < slugs.length - 1) {
        await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));
      }
    }

    setIsGenerating(false);
    setProgress(null);

    if (errorCount === 0) {
      toast.success(`Generated ${successCount} AI images successfully!`);
    } else if (successCount > 0) {
      toast.warning(`Generated ${successCount} images, ${errorCount} failed`);
    } else {
      toast.error('Failed to generate images. Please try again.');
    }
  }, [generateSingleImage]);

  const clearCache = useCallback(() => {
    const slugs = getAllProgramSlugs();
    slugs.forEach(slug => {
      localStorage.removeItem(getCacheKey(slug));
    });
    setGeneratedImages({});
    toast.success('Image cache cleared');
  }, []);

  return {
    generatedImages,
    isGenerating,
    progress,
    generateAllImages,
    generateSingleImage,
    clearCache
  };
};
