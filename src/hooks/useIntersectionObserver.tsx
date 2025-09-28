'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  // Ensure we're on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const observerCallback = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (triggerOnce && elementRef.current) {
          // We'll clean up in the effect cleanup
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    // Only run on client side
    if (!isMounted || typeof window === 'undefined') {
      return;
    }

    // Check if IntersectionObserver is available
    if (!window.IntersectionObserver) {
      // Fallback: assume visible if IntersectionObserver is not supported
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      observerCallback,
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
      
      // Handle triggerOnce cleanup
      if (triggerOnce) {
        const checkAndCleanup = () => {
          if (isVisible && currentElement) {
            observer.unobserve(currentElement);
          }
        };
        // Small delay to allow state update
        const timeoutId = setTimeout(checkAndCleanup, 100);
        return () => {
          clearTimeout(timeoutId);
          if (currentElement) {
            observer.unobserve(currentElement);
          }
        };
      }
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [isMounted, threshold, rootMargin, triggerOnce, observerCallback, isVisible]);

  return { elementRef, isVisible };
};