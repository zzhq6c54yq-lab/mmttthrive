
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A component that scrolls the window to the top when the route changes
 * To be used in the top level of the application, must be placed inside Router
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);
  
  return null;
};

export default ScrollToTop;
