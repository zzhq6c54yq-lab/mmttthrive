
/**
 * Utility functions for handling images throughout the application
 */

// Track failed images to avoid repeated console logs
const failedImageUrls = new Set<string>();

// Create an in-memory cache of processed image URLs
const processedImageCache = new Map<string, string>();

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
  
  // Always create a fresh URL with timestamp for specialized program images
  // to completely avoid browser caching
  if (componentId.includes("specialized") || imagePath.includes("unsplash")) {
    const timestamp = Date.now();
    const separator = imagePath.includes('?') ? '&' : '?';
    const forcedUrl = `${imagePath}${separator}bust=${timestamp}&t=${timestamp}`;
    console.log(`[${componentId}] Adding cache busting to image: ${forcedUrl}`);
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
 * Handle image loading errors
 * @param event The error event
 * @param componentId Identifier for the component
 * @param fallbackImage The fallback image to use
 * @returns The fallback image URL
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>, 
  componentId: string, 
  fallbackImage: string = "https://images.unsplash.com/photo-1506057527569-d23d4eb7c5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
): string => {
  const target = event.target as HTMLImageElement;
  const originalSrc = target.src;
  
  if (!failedImageUrls.has(originalSrc)) {
    console.error(`[${componentId}] Image failed to load:`, originalSrc);
    failedImageUrls.add(originalSrc);
  }
  
  // If the source already came from our getImageUrl function and still failed,
  // go straight to the fallback image
  if (originalSrc.includes('bust=')) {
    console.log(`[${componentId}] Using fallback image:`, fallbackImage);
    return fallbackImage;
  }
  
  // Try to generate a new cache-busting URL for the original source
  const originalUrlWithoutParams = originalSrc.split('?')[0];
  
  if (!failedImageUrls.has(originalUrlWithoutParams)) {
    // This is the first failure for this base URL, try again with a new timestamp
    failedImageUrls.add(originalUrlWithoutParams);
    const timestamp = Date.now();
    const newBustedUrl = `${originalUrlWithoutParams}?bust=${timestamp}&t=${timestamp}`;
    
    console.log(`[${componentId}] Attempting to reload with new URL:`, newBustedUrl);
    return newBustedUrl;
  }
  
  // If we've already tried reloading, use the fallback
  return fallbackImage;
};
