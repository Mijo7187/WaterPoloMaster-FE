'use client';

import { useEffect,useState } from 'react';

// View ends at these pixel sizes
export const WIDTH_BREAKPOINTS = {
  MOBILE: 480,
  MOBILE_LANDSCAPE: 768,
  TABLET: 992,
  SMALL_DESKTOP: 1400,
  LARGE_DESKTOP: 1920,
  TV: 1920,
  FOUR_K: 3840,
};

export function useScreenResize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const getIsBreakpoint = (minBreakpoint: number, maxBreakpoint: number) => {
    return minBreakpoint < windowSize.width && maxBreakpoint > windowSize.width;
  };

  const isMobile = windowSize.width < WIDTH_BREAKPOINTS.MOBILE;
  const isMobileLandscape = getIsBreakpoint(
    WIDTH_BREAKPOINTS.MOBILE,
    WIDTH_BREAKPOINTS.MOBILE_LANDSCAPE,
  );
  const isTablet = getIsBreakpoint(
    WIDTH_BREAKPOINTS.MOBILE_LANDSCAPE,
    WIDTH_BREAKPOINTS.TABLET,
  );
  const isSmallDesktop = getIsBreakpoint(
    WIDTH_BREAKPOINTS.TABLET,
    WIDTH_BREAKPOINTS.SMALL_DESKTOP,
  );
  const isLargeDesktop = getIsBreakpoint(
    WIDTH_BREAKPOINTS.SMALL_DESKTOP,
    WIDTH_BREAKPOINTS.LARGE_DESKTOP,
  );
  const isTV = getIsBreakpoint(
    WIDTH_BREAKPOINTS.LARGE_DESKTOP,
    WIDTH_BREAKPOINTS.TV,
  );
  const is4K = getIsBreakpoint(WIDTH_BREAKPOINTS.TV, WIDTH_BREAKPOINTS.FOUR_K);

  const breakpoints = {
    isMobile,
    isMobileLandscape,
    isTablet,
    isSmallDesktop,
    isLargeDesktop,
    isTV,
    is4K,
  };

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { windowSize, breakpoints };
}
