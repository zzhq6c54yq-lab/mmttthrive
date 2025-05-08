
/**
 * Utility functions for handling images throughout the application
 */

// Track failed images to avoid repeated console logs
const failedImageUrls = new Set<string>();

// Create an in-memory cache of processed image URLs
const processedImageCache = new Map<string, string>();

// List of specialized program IDs for special handling
const specializedProgramIds = [
  "dod", "military", "golden-years", "adolescent", "first-responders", 
  "law-enforcement", "small-business", "chronic-illness", "colleges"
];

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
  if (!imagePath || imagePath === "undefined" || imagePath === "null") {
    if (!failedImageUrls.has(imagePath)) {
      console.warn(`[${componentId}] Invalid image path detected, using fallback:`, imagePath);
      failedImageUrls.add(imagePath);
    }
    return fallbackImage;
  }
  
  // Check if this is a specialized program image that needs special handling
  const isSpecializedProgram = specializedProgramIds.some(id => 
    componentId.includes(id) || imagePath.includes(id)
  );
  
  // Force strong cache busting for specialized program images or Unsplash images
  // These are critical UI elements that must load properly
  if (componentId.includes("base-card") || 
      isSpecializedProgram || 
      imagePath.includes("unsplash")) {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000);
    
    // If URL already has parameters, append to them; otherwise, add new parameters
    const separator = imagePath.includes('?') ? '&' : '?';
    const forcedUrl = `${imagePath}${separator}t=${timestamp}&r=${randomSuffix}&nocache=true`;
    
    console.log(`[${componentId}] Using strong cache busting for image: ${forcedUrl.substring(0, 100)}...`);
    return forcedUrl;
  }
  
  // Check if we already processed this URL
  if (processedImageCache.has(imagePath)) {
    return processedImageCache.get(imagePath)!;
  }
  
  // Add cache-busting parameter if needed
  let processedUrl = imagePath;
  if (!imagePath.includes('bust=')) {
    const separator = imagePath.includes('?') ? '&' : '?';
    processedUrl = `${imagePath}${separator}bust=${Date.now()}`;
  }
  
  // Store in cache and return
  processedImageCache.set(imagePath, processedUrl);
  return processedUrl;
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
  }
  
  // General fallback - always include timestamp to prevent caching
  return `https://images.unsplash.com/photo-1506057527569-d23d4eb7c5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
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
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000);
    const newBustedUrl = `${originalUrlWithoutParams}?t=${timestamp}&r=${randomSuffix}&nocache=true`;
    
    console.log(`[${componentId}] Attempting to reload with new URL:`, newBustedUrl);
    return newBustedUrl;
  }
  
  // If we've already tried reloading, use the fallback
  return finalFallback;
};
