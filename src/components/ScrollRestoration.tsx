import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that saves scroll position before navigating to project pages
 * and restores it when navigating back
 */
export function ScrollRestoration() {
  const location = useLocation();
  const previousPathRef = useRef<string>('');

  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = previousPathRef.current;

    // Save scroll position when leaving home/work pages to go to project page
    if ((previousPath === '/' || previousPath === '/work') && currentPath.startsWith('/project/')) {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      sessionStorage.setItem('scrollPath', previousPath);
    }

    // Restore scroll position when returning to home/work pages from project page
    if ((currentPath === '/' || currentPath === '/work') && previousPath.startsWith('/project/')) {
      const savedScrollPosition = sessionStorage.getItem('scrollPosition');
      const savedPath = sessionStorage.getItem('scrollPath');
      
      if (savedScrollPosition && savedPath === currentPath) {
        // Use setTimeout to ensure DOM is ready after navigation
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition, 10));
          sessionStorage.removeItem('scrollPosition');
          sessionStorage.removeItem('scrollPath');
        }, 100);
      }
    }

    // Save scroll position when clicking on project links (before navigation)
    const handleProjectLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/project/"]') as HTMLAnchorElement;
      if (link && (currentPath === '/' || currentPath === '/work')) {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        sessionStorage.setItem('scrollPath', currentPath);
      }
    };

    // Add click listener for project links
    document.addEventListener('click', handleProjectLinkClick, true);

    // Update previous path
    previousPathRef.current = currentPath;

    return () => {
      document.removeEventListener('click', handleProjectLinkClick, true);
    };
  }, [location.pathname]);

  return null;
}

