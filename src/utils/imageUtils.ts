
/**
 * Utility functions for handling images throughout the application
 */

// Track failed images to avoid repeated console logs
const failedImageUrls = new Set<string>();

// Create an in-memory cache of processed image URLs with a longer expiration
const processedImageCache = new Map<string, { url: string, timestamp: number }>();
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// List of specialized program IDs for special handling
const specializedProgramIds = [
  "dod", "military", "golden-years", "adolescent", "first-responders", 
  "law-enforcement", "small-business", "chronic-illness", "colleges", 
  "cancer-support" 
];

// Preload critical images for smoother experience
const preloadCriticalImages = () => {
  const criticalImagePaths = [
    ...specializedProgramIds.map(id => `/assets/${id}-cover.jpg`),
    // Add specific cancer support images to preload
    "/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png", // Lavender ribbon image
    "/lovable-uploads/54e4d3e9-8aa5-46b2-a8e6-42fb0ba8128b.png"  // Original cancer support image
  ];
  
  criticalImagePaths.forEach(path => {
    try {
      const img = new Image();
      img.src = path;
    } catch (error) {
      // Silently fail - preloading is just an optimization
    }
  });
};

// Try to preload on module initialization
try {
  if (typeof window !== 'undefined') {
    preloadCriticalImages();
  }
} catch (e) {
  console.log("Image preloading skipped");
}

/**
 * Helper function to get the correct image URL, with proper fallback handling
 * @param imagePath The original image path
 * @param componentId Identifier for the component using the image (for better error tracking)
 * @param fallbackImage Optional custom fallback image URL
 * @returns The processed image URL
 */
export const getImageUrl = (
  imagePath: string, 
  componentId: string = 'unknown',
  fallbackImage: string = "https://images.unsplash.com/photo-1506057527569-d23d4eb7c5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
): string => {
  // Only use fallback if the path is truly invalid or empty
  if (!imagePath || imagePath === "undefined" || imagePath === "null" || imagePath === "") {
    if (!failedImageUrls.has(`empty-${componentId}`)) {
      console.warn(`[${componentId}] Invalid image path detected, using fallback:`, imagePath);
      failedImageUrls.add(`empty-${componentId}`);
    }
    return addCacheBusting(fallbackImage);
  }
  
  // Special handling for cancer support components to ensure the lavender ribbon displays correctly
  const isCancerSupport = componentId.includes("cancer") || 
                          imagePath.includes("cancer") || 
                          componentId.includes("lavender");
  
  // Check if this is a specialized program image that needs special handling
  const isSpecializedProgram = specializedProgramIds.some(id => 
    componentId.includes(id) || imagePath.includes(id)
  );

  // First check our cache
  const isCriticalUI = componentId.includes("base-card") || 
                      componentId.includes("card") ||
                      componentId.includes("cover") ||
                      componentId.includes("portal") ||
                      isSpecializedProgram;

  // For cancer support components, use stable caching
  if (isCancerSupport) {
    // Use a very stable cache for cancer support images to prevent flashing
    const hour = Math.floor(Date.now() / 3600000); // Changes hourly
    
    // If URL already has parameters, append to them; otherwise, add new parameters
    const separator = imagePath.includes('?') ? '&' : '?';
    const stableUrl = `${imagePath}${separator}h=${hour}`;
    
    // Store in cache with long expiration
    processedImageCache.set(imagePath, { 
      url: stableUrl, 
      timestamp: Date.now() + 30 * 60 * 1000 // 30 minutes for cancer support images
    });
    return stableUrl;
  }

  // Less aggressive cache busting for most images
  if (!isCriticalUI && processedImageCache.has(imagePath)) {
    const cached = processedImageCache.get(imagePath)!;
    // Use cached URL if it hasn't expired
    if (Date.now() - cached.timestamp < CACHE_EXPIRATION) {
      return cached.url;
    }
  }

  // Force strong cache busting only for critical UI elements
  if (isCriticalUI) {
    // For specialized program images, be more moderate with cache busting
    // to prevent excessive flashing while maintaining freshness
    if (isSpecializedProgram || imagePath.includes("unsplash")) {
      // Use a stable cache-busting parameter for the session to prevent flashing
      // but still avoid browser cache between sessions
      const sessionId = Math.floor(Date.now() / 3600000); // Changes hourly
      
      // If URL already has parameters, append to them; otherwise, add new parameters
      const separator = imagePath.includes('?') ? '&' : '?';
      const stableUrl = `${imagePath}${separator}s=${sessionId}`;
      
      // Store in cache to ensure consistency within the session
      processedImageCache.set(imagePath, { url: stableUrl, timestamp: Date.now() });
      return stableUrl;
    }
  }
  
  // Add cache-busting parameter for other images
  const processedUrl = addCacheBusting(imagePath);
  
  // Store in cache and return
  processedImageCache.set(imagePath, { url: processedUrl, timestamp: Date.now() });
  return processedUrl;
};

/**
 * Add cache busting to URL
 */
const addCacheBusting = (url: string): string => {
  if (!url.includes('bust=')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}bust=${Date.now()}`;
  }
  return url;
};

/**
 * Clear the image cache to force fresh loading of images
 */
export const clearImageCache = () => {
  console.log("Clearing image cache");
  processedImageCache.clear();
  failedImageUrls.clear();
};

/**
 * Get program-specific fallback image based on program ID
 * @param id The program ID or component ID
 * @returns An appropriate fallback image URL
 */
export const getProgramFallbackImage = (id: string): string => {
  const timestamp = Date.now();
  
  if (id.includes("military") || id.includes("dod")) {
    return `https://images.unsplash.com/photo-1551702600-493e4d0ea256?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
  } else if (id.includes("golden") || id.includes("senior")) {
    return `https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
  } else if (id.includes("adolescent") || id.includes("teen")) {
    return `https://images.unsplash.com/photo-1518101645466-7795885ff8b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
  } else if (id.includes("responder") || id.includes("emergency")) {
    return `https://images.unsplash.com/photo-1633270216455-4fe3ee093bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
  } else if (id.includes("law") || id.includes("enforcement")) {
    return `https://images.unsplash.com/photo-1551732998-9573f695fdbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
  } else if (id.includes("small-business")) {
    return `https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
  } else if (id.includes("college")) {
    return `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
  } else if (id.includes("chronic") || id.includes("illness")) {
    return `https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
  } else if (id.includes("cancer")) {
    // Specific fallback for cancer support - use lavender ribbon image
    return `/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png?t=${timestamp}`;
  }
  
  // General fallback - use a stable timestamp to prevent flashing
  const hour = Math.floor(Date.now() / 3600000);
  return `https://images.unsplash.com/photo-1506057527569-d23d4eb7c5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${hour}`;
};

/**
 * Handle image loading errors
 * @param event The error event
 * @param componentId Identifier for the component
 * @param fallbackImage The fallback image to use
 * @returns The fallback image URL
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>, 
  componentId: string, 
  fallbackImage?: string
): string => {
  const target = event.target as HTMLImageElement;
  const originalSrc = target.src;
  
  if (!failedImageUrls.has(originalSrc)) {
    console.error(`[${componentId}] Image failed to load:`, originalSrc);
    failedImageUrls.add(originalSrc);
  }
  
  // Special case for cancer support images
  if (componentId.includes("cancer") || originalSrc.includes("cancer") || componentId.includes("addon-card-cancer")) {
    const cancerFallback = `/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png?t=${Date.now()}`;
    console.log(`[${componentId}] Using cancer support fallback image:`, cancerFallback);
    return cancerFallback;
  }
  
  // Use program-specific fallback images
  const programSpecificFallback = getProgramFallbackImage(componentId);
  const finalFallback = fallbackImage || programSpecificFallback;
  
  // If the source already came from our getImageUrl function and still failed,
  // go straight to the fallback image
  if (originalSrc.includes('bust=') || originalSrc.includes('nocache=true')) {
    console.log(`[${componentId}] Using fallback image:`, finalFallback);
    return finalFallback;
  }
  
  // Try to generate a new cache-busting URL for the original source
  const originalUrlWithoutParams = originalSrc.split('?')[0];
  
  if (!failedImageUrls.has(originalUrlWithoutParams)) {
    // This is the first failure for this base URL, try again with a new timestamp
    failedImageUrls.add(originalUrlWithoutParams);
    const sessionId = Math.floor(Date.now() / 3600000); // Changes hourly for stability
    const newBustedUrl = `${originalUrlWithoutParams}?s=${sessionId}`;
    
    console.log(`[${componentId}] Attempting to reload with new URL:`, newBustedUrl);
    return newBustedUrl;
  }
  
  // If we've already tried reloading, use the fallback
  return finalFallback;
};
