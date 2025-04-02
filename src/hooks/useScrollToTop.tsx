
import { useEffect } from 'react';

/**
 * A hook that scrolls the window to the top
 * This version doesn't depend on react-router to avoid context issues
 */
export const useScrollToTop = (dependency?: any) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [dependency]);
};

export default useScrollToTop;
