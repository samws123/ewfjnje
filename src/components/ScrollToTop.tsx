'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
    }`}>
      <Button
        onClick={scrollToTop}
        className="w-14 h-14 rounded-full glass-effect backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 shadow-2xl hover-lift animate-float group"
        aria-label="Scroll to top"
      >
        <svg 
          className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 animate-pulse-glow" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </Button>
    </div>
  );
};

export default ScrollToTop;