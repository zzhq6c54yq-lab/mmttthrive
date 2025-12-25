// Curated AI image prompts for each life transition program
// Using therapeutic, hopeful imagery that aligns with mental health and wellness themes

export interface TransitionPrompt {
  slug: string;
  prompt: string;
  cacheKey: string;
}

export const transitionImagePrompts: Record<string, TransitionPrompt> = {
  "navigating-divorce": {
    slug: "navigating-divorce",
    prompt: "Soft watercolor illustration of a single butterfly emerging from a cocoon, transforming into a beautiful new form. Warm golden and amber tones, peaceful sunrise colors, symbolizing new beginnings after difficult change. Therapeutic, hopeful art style. No text.",
    cacheKey: "ai-image-divorce"
  },
  "job-loss-recovery": {
    slug: "job-loss-recovery",
    prompt: "Serene illustration of an open door leading to a sunlit path through a peaceful garden. Bronze and gold gradients, warm encouraging light. Symbolizing new career opportunities and professional rebirth. Calming, minimalist style. No text.",
    cacheKey: "ai-image-job-loss"
  },
  "new-parent-journey": {
    slug: "new-parent-journey",
    prompt: "Gentle illustration of nurturing hands cradling a small glowing light, surrounded by soft blooming flowers. Warm peach, gold and cream tones. Symbolizing love, protection and new life. Tender, therapeutic art style. No text.",
    cacheKey: "ai-image-new-parent"
  },
  "empty-nest-transition": {
    slug: "empty-nest-transition",
    prompt: "Peaceful illustration of a cozy nest on a branch with an open sky beyond, birds flying freely toward a golden sunset. Warm bronze and amber tones. Symbolizing letting go with love and embracing new freedom. Calm, reflective style. No text.",
    cacheKey: "ai-image-empty-nest"
  },
  "grief-and-loss": {
    slug: "grief-and-loss",
    prompt: "Gentle illustration of a single candle flame glowing warmly in a peaceful twilight setting, with soft stars beginning to appear. Muted gold and deep blue tones. Symbolizing remembrance, hope and healing. Compassionate, serene style. No text.",
    cacheKey: "ai-image-grief"
  },
  "retirement-preparation": {
    slug: "retirement-preparation",
    prompt: "Joyful illustration of an open road leading toward mountains at golden hour, with a comfortable bench overlooking the scenic view. Warm copper and gold sunset colors. Symbolizing well-earned rest and new adventures. Peaceful, optimistic style. No text.",
    cacheKey: "ai-image-retirement"
  },
  "major-relocation": {
    slug: "major-relocation",
    prompt: "Hopeful illustration of a compass rose with gentle roots growing from it, pointing toward a warm sunrise over rolling hills. Golden and bronze earth tones. Symbolizing finding your direction and planting new roots. Grounded, encouraging style. No text.",
    cacheKey: "ai-image-relocation"
  },
  "health-diagnosis": {
    slug: "health-diagnosis",
    prompt: "Calming illustration of a resilient tree with healing light glowing from within its trunk, strong roots visible underground. Warm amber and soft green tones. Symbolizing inner strength, healing and growth. Supportive, therapeutic style. No text.",
    cacheKey: "ai-image-health"
  }
};

// Cache expiry in days
export const IMAGE_CACHE_EXPIRY_DAYS = 7;

// Get all program slugs
export const getAllProgramSlugs = (): string[] => {
  return Object.keys(transitionImagePrompts);
};

// Get prompt by slug
export const getPromptBySlug = (slug: string): TransitionPrompt | undefined => {
  return transitionImagePrompts[slug];
};
