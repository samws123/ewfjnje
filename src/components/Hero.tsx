'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AnimatedCompanies } from "./AnimatedCompanies";
import { useEntranceAnimation } from "@/hooks/useEntranceAnimation";
import { motion, AnimationDefinition, Variants } from "framer-motion";

export const Hero: React.FC = () => {
  const isVisible = useEntranceAnimation();

  const images = [
    {
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/b155b43a7569a17b97cd1de4dfc0891693164460?placeholderIfAbsent=true",
    },
    {
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/92762232d271445717f7e2a40eb913ca5b4917b5?placeholderIfAbsent=true",
    },
    {
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/5fb8b04e0e203cab86c7825848555eda0ca32cfc?placeholderIfAbsent=true",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Framer Motion variant for fade-in from bottom with blur removal
  const fadeInUpWithBlur: Variants = {
    hidden: {
      opacity: 0,
      y: 65,
      filter: "blur(12px)",
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="pt-[150px] pb-16 w-full">
      <motion.div
        className="w-full text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUpWithBlur}
      >
        <h1
          className={`font-perfectly-nineties font-[550]  text-balance text-center mx-auto leading-[39px] sm:leading-[46px] md:leading-[58px] lg:leading-[68px] xl:leading-[76px] text-[36px] sm:text-[42px] md:text-[56px] lg:text-[64px] xl:text-[72px] max-w-[820px]  ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-95"
          }`}
        >
          AI workspace for students
          <br />
          who use Canvas
        </h1>

        {/* <p
          className={`font-inter text-secondary-foreground text-base font-medium tracking-[-0.4px] mt-7 max-w-[750px] mx-auto text-center leading-6 font-[500] transition-all duration-600 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Search for papers, extract key passages, organize research
          <br />
          and create flashcards — all without sacrificing academic rigor
        </p> */}
        <p
          className="text-secondary-foreground leading-6 max-w-[750px] mt-7 mx-auto text-center text-balance"
          style={{ opacity: 1, filter: "blur(0px)", transform: "none" }}
        >
          The moment you sign up, we extract all your courses, readings, and
          assignments — and do them with you to save hours each week.
        </p>

        {/* <div
          className={`flex justify-center gap-3.5 mt-9 max-md:flex-col max-md:items-center transition-all duration-700 ease-out delay-300 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-90"
          }`}
        >
          <Button variant="primary" className="w-[143px]">
            Get Anara free
          </Button>
          <Button variant="secondary" className="w-[142px]">
            Request demo
          </Button>
        </div> */}

        <div
          className="flex flex-row items-center justify-center gap-[14px] mt-12 mx-auto"
          style={{ opacity: 1, filter: "blur(0px)", transform: "none" }}
        >
          <button
            aria-busy="false"
            className="inline-flex items-center select-none relative justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-background-inverse text-text-inverse rounded-7 gap-5 tracking-normal text-base leading-4 font-medium hover:scale-[1.02] transition-all duration-200 ease-in-out !rounded-full px-7 py-6 h-[40px]"
          >
            <span className="truncate">Try for free</span>
          </button>
          <button
            aria-busy="false"
            className="inline-flex items-center select-none relative justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary hover:bg-secondary-hover rounded-7 gap-5 tracking-normal text-text-primary text-base leading-4 font-medium hover:scale-[1.02] transition-all duration-200 ease-in-out !rounded-full px-7 py-6 h-[40px]"
          >
            <span className="truncate">Request demo</span>
          </button>
        </div>

        <p
          className={`text-gray-400 text-sm font-light leading-relaxed tracking-wide mt-[55px] max-md:mt-10 transition-all duration-600 ease-out delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Trusted by 2,000,000+ students
        </p>

        <div
          className={`transition-all duration-600 ease-out delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <AnimatedCompanies />
        </div>

        <div
          className={`bg-gradient-to-br bg-[#F7F7F7] from-gray-100 to-gray-200 rounded-2xl p-14 max-md:p-5 transition-all duration-600 ease-out delay-300 overflow-hidden group glass-effect border border-white/30 mt-6 pb-0 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="relative overflow-hidden rounded-[0px]">
            {/* Original blurred background image */}
            <motion.img
              key={images[currentImageIndex].image}
              src={images[currentImageIndex].image}
              alt={"background demo"}
              className="w-full transition-all duration-700 relative z-0 opacity-30"
              style={{
                filter: "blur(15px)",
              }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: 0.3,
                scale: 1,
                transition: { duration: 0.2 },
              }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            {/* Video overlay */}
            <video
              src="/demo-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute w-[75%] h-auto transition-all duration-700 z-10"
              style={{
                filter: "grayscale(100%)",
                top: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                maxHeight: "80%",
                objectFit: "contain",
              }}
              onLoadedData={(e) => {
                const video = e.target as HTMLVideoElement;
                video.playbackRate = 1.5;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0  transition-opacity duration-500"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
