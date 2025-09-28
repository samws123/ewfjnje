'use client';

import { useEffect, useState } from 'react';

export const useEntranceAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return isVisible;
};

export const useStaggeredAnimation = (delay: number = 0) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible;
};