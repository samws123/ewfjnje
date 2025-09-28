'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CompanySet {
  name: string;
  logo: string;
}

const CARD_COUNT = 7;
const ANIMATION_DURATION = 0.2; // seconds (make a bit longer for smoothness)
const STAGGER_PER_CARD = 0.15; // seconds, adjust as desired
const SHOW_DURATION = 3.5; // seconds for each image

// Card component for a single logo card with Framer Motion animation
const AnimatedLogoCard: React.FC<{
  current: CompanySet;
  next: CompanySet;
  isShowingNext: boolean;
  index: number;
}> = ({ current, next, isShowingNext, index }) => {
  // Helper for fallback text on image error
  const handleImgError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    name: string
  ) => {
    const target = e.target as HTMLImageElement;
    target.style.display = "none";
    const parent = target.parentElement;
    if (parent) {
      const textElement = document.createElement("div");
      textElement.className = "text-gray-600 text-sm font-medium text-center";
      textElement.textContent = name;
      parent.appendChild(textElement);
    }
  };

  // Animation variants for Framer Motion
  const variants = {
    enter: (direction: "up" | "down") => ({
      opacity: 0,
      y: direction === "up" ? 10 : -10,
      zIndex: 1,
    }),
    center: {
      opacity: 1,
      y: 0,
      zIndex: 2,
      transition: {
        opacity: { duration: ANIMATION_DURATION },
        y: { duration: ANIMATION_DURATION },
      },
    },
    exit: (direction: "up" | "down") => ({
      opacity: 0,
      y: direction === "up" ? -10 : 10,
      zIndex: 1,
      transition: {
        opacity: { duration: ANIMATION_DURATION },
        y: { duration: ANIMATION_DURATION },
      },
    }),
  };

  // Stagger delay for each card (reverse: last card animates first)
  const delay = (CARD_COUNT - 1 - index) * STAGGER_PER_CARD;

  // Use a unique key for each logo to ensure seamless looping
  // The key must change every time the logo changes, so use the logo name and isShowingNext
  return (
    <div className="w-36 h-20 sm:w-40 sm:h-24   from-gray-50 to-gray-100 rounded-xl flex items-center justify-center p-4 relative border border-white/20 group overflow-hidden animated-logo-card">
      <AnimatePresence initial={false} custom={isShowingNext ? "up" : "down"}>
        <motion.div
          key={isShowingNext ? next.name : current.name}
          className="absolute inset-4 flex items-center justify-center transition-all duration-500 transform group-hover:scale-110"
          style={{ zIndex: 2 }}
          custom={isShowingNext ? "up" : "down"}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{
            delay,
            opacity: { duration: ANIMATION_DURATION },
            y: { duration: ANIMATION_DURATION },
          }}
        >
          <img
            src={isShowingNext ? next.logo : current.logo}
            alt={`${isShowingNext ? next.name : current.name} logo`}
            className={
              (isShowingNext ? next.name : current.name) === "UMass Amherst"
                ? "max-w-[48%] max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                : (isShowingNext ? next.name : current.name) === "UCLA"
                ? "max-w-[57%] max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                : (isShowingNext ? next.name : current.name) === "UC Berkeley"
                ? "max-w-[75%] max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                : (isShowingNext ? next.name : current.name) === "MIT"
                ? "max-w-[102%] max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                : (isShowingNext ? next.name : current.name) === "University of Cambridge"
                ? "max-w-[102%] max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                : (isShowingNext ? next.name : current.name) === "Harvard University"
                ? "max-w-[98%] max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                : "max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
              // + (isShowingNext ? "" : " animate-float")
            }
            onError={(e) =>
              handleImgError(e, isShowingNext ? next.name : current.name)
            }
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const AnimatedCompanies: React.FC = () => {
  const companySets: CompanySet[][] = [
    [
      { name: "UCLA", logo: "/logos/University_of_California,_Los_Angeles_logo.svg" },
      { name: "Caltech", logo: "/logos/caltech.png" },
      { name: "Northwestern University", logo: "/logos/Northwestern_University_wordmark.svg" },
      { name: "Stanford", logo: "/logos/stanford.png" },
      { name: "MIT", logo: "/logos/mit.png" },
      { name: "UC Berkeley", logo: "/logos/University_of_California,_Berkeley_logo.svg" },
    ],
    [
      { name: "Northeastern University", logo: "/logos/Northeastern_University_wordmark.svg" },
      { name: "UMass Amherst", logo: "/logos/UMass_Amherst_Shortform_Wordmark.svg" },
      { name: "Harvard University", logo: "/logos/Harvard_University_logo.svg" },
      { name: "University of Cambridge", logo: "/logos/cambridge.png" },
      { name: "Georgia Tech", logo: "/logos/Georgia_Tech_logo_2021.svg" },
      { name: "San Diego State University", logo: "/logos/San_Diego_State_University_primary_logo.svg" },
    ],
  ];

  const [currentSet, setCurrentSet] = useState(0);
  // Each card will have its own isShowingNext state for staggered transitions
  const [isShowingNextArr, setIsShowingNextArr] = useState<boolean[]>(
    Array(CARD_COUNT).fill(false)
  );
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Helper to clear all timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    // Staggered show/hide for each card
    clearAllTimeouts();

    // Show current logos for SHOW_DURATION, then show next logos for SHOW_DURATION, then swap set
    // 1. Show current (isShowingNextArr = [false, ...])
    setIsShowingNextArr(Array(CARD_COUNT).fill(false));

    // 2. After SHOW_DURATION, start staggered transition to next (isShowingNextArr = [true, ...])
    // REVERSE: last card animates first
    for (let i = CARD_COUNT - 1; i >= 0; i--) {
      const timeout = setTimeout(() => {
        setIsShowingNextArr((prev) => {
          const arr = [...prev];
          arr[i] = true;
          return arr;
        });
      }, SHOW_DURATION * 1000 + (CARD_COUNT - 1 - i) * STAGGER_PER_CARD * 1000);
      timeoutsRef.current.push(timeout);
    }

    // 3. After SHOW_DURATION for next + stagger, reset to current set+1 and all isShowingNextArr = false
    const totalStagger = (CARD_COUNT - 1) * STAGGER_PER_CARD;
    const resetTimeout = setTimeout(() => {
      setCurrentSet((prev) => (prev + 1) % companySets.length);
      setIsShowingNextArr(Array(CARD_COUNT).fill(false));
    }, (SHOW_DURATION + totalStagger + SHOW_DURATION) * 1000);

    timeoutsRef.current.push(resetTimeout);

    return () => {
      clearAllTimeouts();
    };
    // eslint-disable-next-line
  }, [currentSet, companySets.length]);

  // For each card, determine which set is current and which is next
  const currentLogos = companySets[currentSet];
  const nextLogos = companySets[(currentSet + 1) % companySets.length];

  return (
    <div className="flex justify-center gap-[27px] mt-8 max-md:grid max-md:grid-cols-2 max-md:gap-4">
      {currentLogos.map((company, index) => (
        <AnimatedLogoCard
          key={index}
          current={company}
          next={nextLogos[index]}
          isShowingNext={isShowingNextArr[index]}
          index={index}
        />
      ))}
    </div>
  );
};
