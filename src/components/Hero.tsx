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
          An AI workspace that
          <br />
          connects to Canvas
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
          The moment you sign up, we link up to your Canvas, and do all your readings
          assignments, and studying with you — to save hours each week.
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
            onClick={() => router.push('/signup')}
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
          <AnimatedCompanies key="animated-companies" />
        </div>

        <div
          className={`bg-[#F7F7F7] rounded-2xl p-8 max-md:p-4 transition-all duration-600 ease-out delay-300 overflow-hidden group mt-8 pb-0 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="relative flex items-center justify-center h-[42rem] bg-[#F7F7F7] rounded-2xl overflow-hidden">
            {/* Video A - First video */}
            <video
              id="videoA"
              src="/realdm.mov"
              autoPlay
              muted
              playsInline
              className="absolute w-[75%] h-auto max-h-[80%] block transition-all duration-400 ease-in-out"
              style={{
                backgroundColor: '#F7F7F7',
                filter: 'contrast(1.1) brightness(1.05)',
                borderRadius: '8px',
                boxShadow: 'inset 0 0 0 2px #F7F7F7',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              onLoadedData={(e) => {
                const video = e.target as HTMLVideoElement;
                video.playbackRate = 2.025; // 10% slower
              }}
              onTimeUpdate={(e) => {
                const video = e.target as HTMLVideoElement;
                const duration = video.duration;
                const currentTime = video.currentTime;
                
                // Slow down first second and last second by 50%
                if (currentTime <= 1 || currentTime >= duration - 1) {
                  video.playbackRate = 1.0125; // 50% of 2.025
                } else {
                  video.playbackRate = 2.025; // 10% slower // Normal speed for middle
                }
              }}
              onEnded={() => {
                const videoA = document.getElementById('videoA') as HTMLVideoElement;
                const videoB = document.getElementById('videoB') as HTMLVideoElement;
                
                if (videoA && videoB) {
                  // Make sure Video B is ready for transition
                  videoB.style.display = 'block';
                  videoB.currentTime = 5; // Reset to start position
                  
                  // Smoother fade out Video A with gentle slide
                  videoA.style.transform = 'translate(-50%, -45%)'; // A slides down gently
                  videoA.style.opacity = '0'; // Fade to invisible
                  
                  // Video B slides in more gently from top with gradual fade in
                  videoB.style.transform = 'translate(-50%, -55%)'; // B slides in from top more gently
                  videoB.style.opacity = '0.2'; // Start fading in gradually
                  
                  // Settle B to exact position and full opacity more gradually
                  setTimeout(() => {
                    videoB.style.transform = 'translate(-50%, -55%)'; // Match Video D's exact transform
                    videoB.style.opacity = '1'; // Full opacity
                  }, 200);
                  
                  // Start playing B after smooth transition
                  setTimeout(() => {
                    videoB.play();
                  }, 300);
                  
                  // Completely hide Video A after fade completes
                  setTimeout(() => {
                    videoA.style.display = 'none';
                  }, 400);
                }
              }}
            />
            
            {/* Video B - Second video (initially hidden above) */}
            <video
              id="videoB"
              src="/5 through 7.9.mov"
              muted
              playsInline
              className="absolute w-[75%] h-auto max-h-[80%] block transition-all duration-400 ease-in-out"
              style={{
                backgroundColor: '#F7F7F7',
                filter: 'contrast(1.12) brightness(1.04) saturate(1.05)',
                borderRadius: '8px',
                boxShadow: 'inset 0 0 0 2px #F7F7F7',
                top: '55%',
                left: '50%',
                transform: 'translate(-50%, -150%)',
                opacity: 0
              }}
              onLoadedData={(e) => {
                const video = e.target as HTMLVideoElement;
                video.playbackRate = 2.115; // 10% slower
                video.currentTime = 5; // Start at 5 seconds
              }}
              onTimeUpdate={(e) => {
                const video = e.target as HTMLVideoElement;
                const currentTime = video.currentTime;
                
                // Slow down first second (5-6) and last second (6.6-7.6) by 50%
                if ((currentTime >= 5 && currentTime <= 6) || (currentTime >= 6.6 && currentTime <= 7.6)) {
                  video.playbackRate = 1.0575; // 50% of 2.115
                } else {
                  video.playbackRate = 2.115; // 10% slower
                }
                
                // Pause at 5.7 seconds for flicker effect (only once)
                if (currentTime >= 5.7 && !video.dataset.flickerTriggered) {
                  video.pause();
                  video.currentTime = 5.7;
                  video.dataset.flickerTriggered = 'true';
                  
                  // Hold for 1.0 seconds with minor flicker, then continue to end
                  setTimeout(() => {
                    video.currentTime = 7.6; // Jump to end position
                    
                    // Trigger transition to Video C after flicker
                    const videoB = document.getElementById('videoB') as HTMLVideoElement;
                    const videoC = document.getElementById('videoC') as HTMLVideoElement;
                    
                    if (videoB && videoC) {
                      // Make sure Video C is ready for transition
                      videoC.style.display = 'block';
                      videoC.currentTime = 1.05; // Reset to start position
                      
                      // Smoother fade out Video B with gentle slide
                      videoB.style.transform = 'translate(-50%, -45%)';
                      videoB.style.opacity = '0';
                      
                      // Video C slides in more gently from top with gradual fade in
                      videoC.style.transform = 'translate(-50%, -55%)';
                      videoC.style.opacity = '0.2';
                      
                      // Settle C to exact position and full opacity more gradually
                      setTimeout(() => {
                        videoC.style.transform = 'translate(-50%, -70%)'; // Match Video A's 30% position
                        videoC.style.opacity = '1';
                      }, 200);
                      
                      // Start playing C after smooth transition
                      setTimeout(() => {
                        videoC.play();
                      }, 300);
                      
                      // Completely hide Video B after fade completes
                      setTimeout(() => {
                        videoB.style.display = 'none';
                      }, 400);
                    }
                  }, 1000); // 1.0 second flicker hold
                }
              }}
            />
            
            {/* Video C - Third video (initially hidden above) */}
            <video
              id="videoC"
              src="/response 3.mov"
              muted
              playsInline
              className="absolute w-[75%] h-auto max-h-[80%] block transition-all duration-400 ease-in-out"
              style={{
                backgroundColor: '#F7F7F7',
                filter: 'contrast(1.12) brightness(1.04) saturate(1.05)',
                borderRadius: '8px',
                boxShadow: 'inset 0 0 0 2px #F7F7F7',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -150%)',
                opacity: 0,
                clipPath: 'inset(0 0 1% 0)' // Clip bottom 1% to remove embedding line
              }}
            onLoadedData={(e) => {
              const video = e.target as HTMLVideoElement;
              video.playbackRate = 1.818; // 10% slower
              video.currentTime = 1.05; // Start 0.2 seconds later than 0.85 (0.85 + 0.2 = 1.05)
            }}
              onTimeUpdate={(e) => {
                const video = e.target as HTMLVideoElement;
                const duration = video.duration;
                const currentTime = video.currentTime;
                
                // Slow down first second (1.05-2.05) and last second by 50%
                if ((currentTime >= 1.05 && currentTime <= 2.05) || currentTime >= duration - 1) {
                  video.playbackRate = 0.909; // 50% of 1.818
                } else {
                  video.playbackRate = 1.818; // 10% slower
                }
                
                // Stop 0.1 seconds before the end and hold for 0.2 seconds (only once)
                if (currentTime >= duration - 0.1 && !video.dataset.endTriggered) {
                  video.pause();
                  video.currentTime = duration - 0.1;
                  video.dataset.endTriggered = 'true';
                  
                  // Hold for 0.2 seconds, then transition to Video D
                  setTimeout(() => {
                    // Trigger transition to Video D after hold
                    const videoC = document.getElementById('videoC') as HTMLVideoElement;
                    const videoD = document.getElementById('videoD') as HTMLVideoElement;
                    
                    if (videoC && videoD) {
                      // Make sure Video D is ready for transition
                      videoD.style.display = 'block';
                      videoD.currentTime = 3; // Reset to start position
                      
                      // Smoother fade out Video C with gentle slide
                      videoC.style.transform = 'translate(-50%, -45%)';
                      videoC.style.opacity = '0';
                      
                      // Video D slides in more gently from top with gradual fade in
                      videoD.style.transform = 'translate(-50%, -60%)';
                      videoD.style.opacity = '0.2';
                      
                      // Settle D to exact position and full opacity more gradually
                      setTimeout(() => {
                        videoD.style.transform = 'translate(-50%, -55%)'; // Match the new top: 55% position
                        videoD.style.opacity = '1';
                      }, 200);
                      
                      // Start playing D after smooth transition
                      setTimeout(() => {
                        videoD.play();
                      }, 300);
                      
                      // Completely hide Video C after fade completes
                      setTimeout(() => {
                        videoC.style.display = 'none';
                      }, 400);
                    }
                  }, 200);
                }
              }}
            />
            
            {/* Video D - Fourth video (initially hidden above) */}
            <video
              id="videoD"
              src="/response4.mov"
              muted
              playsInline
              className="absolute w-[75%] h-auto max-h-[80%] block transition-all duration-400 ease-in-out"
              style={{
                backgroundColor: '#F7F7F7',
                filter: 'contrast(1.12) brightness(1.04) saturate(1.05)',
                borderRadius: '12px', // 10% less rounding than 13px
                boxShadow: 'inset 0 0 0 2px #F7F7F7',
                top: '55%', // Shifted down slightly from center
                left: '50%',
                transform: 'translate(-50%, -150%)',
                opacity: 0,
                clipPath: 'inset(0 0 0.5% 0)' // Clip bottom 0.5% to remove embedding line
              }}
            onLoadedData={(e) => {
              const video = e.target as HTMLVideoElement;
              video.playbackRate = 1.818; // 10% slower
              video.currentTime = 3.0; // Start 3 seconds in (cut off first 3 seconds)
            }}
              onTimeUpdate={(e) => {
                const video = e.target as HTMLVideoElement;
                const duration = video.duration;
                const currentTime = video.currentTime;
                
                // Slow down first second (3.0-4.0) and last second by 50%
                if ((currentTime >= 3.0 && currentTime <= 4.0) || currentTime >= duration - 1) {
                  video.playbackRate = 0.909; // 50% of 1.818
                } else {
                  video.playbackRate = 1.818; // 10% slower
                }
                
                // Stop 0.1 seconds before the end and hold for 0.2 seconds (only once)
                if (currentTime >= duration - 0.1 && !video.dataset.endTriggered) {
                  video.pause();
                  video.currentTime = duration - 0.1;
                  video.dataset.endTriggered = 'true';
                  
                  // Hold for 0.2 seconds, then transition to Video E
                  setTimeout(() => {
                    // Trigger transition to Video E after hold
                    const videoD = document.getElementById('videoD') as HTMLVideoElement;
                    const videoE = document.getElementById('videoE') as HTMLVideoElement;
                    
                    if (videoD && videoE) {
                      // Make sure Video E is ready for transition
                      videoE.style.display = 'block';
                      videoE.currentTime = 1.05; // Reset to start position
                      
                      // Smoother fade out Video D with gentle slide
                      videoD.style.transform = 'translate(-50%, -50%)';
                      videoD.style.opacity = '0';
                      
                      // Video E slides in more gently from top with gradual fade in
                      videoE.style.transform = 'translate(-50%, -55%)';
                      videoE.style.opacity = '0.2';
                      
                      // Settle E to exact position and full opacity more gradually
                      setTimeout(() => {
                        videoE.style.transform = 'translate(-50%, -70%)'; // Match Video A's 30% position
                        videoE.style.opacity = '1';
                      }, 200);
                      
                      // Start playing E after smooth transition
                      setTimeout(() => {
                        videoE.play();
                      }, 300);
                      
                      // Completely hide Video D after fade completes
                      setTimeout(() => {
                        videoD.style.display = 'none';
                      }, 400);
                    }
                  }, 200);
                }
              }}
            />
            
            {/* Video E - Fifth video (initially hidden above) */}
            <video
              id="videoE"
              src="/vid5.mov"
              muted
              playsInline
              className="absolute w-[75%] h-auto max-h-[80%] block transition-all duration-400 ease-in-out"
              style={{
                backgroundColor: '#F7F7F7',
                filter: 'contrast(1.12) brightness(1.04) saturate(1.05)',
                borderRadius: '8px',
                boxShadow: 'inset 0 0 0 2px #F7F7F7',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -150%)',
                opacity: 0,
                clipPath: 'inset(0 0 0.5% 0)' // Clip bottom 0.5% to remove embedding line
              }}
            onLoadedData={(e) => {
              const video = e.target as HTMLVideoElement;
              video.playbackRate = 1.818; // 10% slower and D
              video.currentTime = 1.05; // Start 1.05 seconds in like Video C
            }}
              onTimeUpdate={(e) => {
                const video = e.target as HTMLVideoElement;
                const duration = video.duration;
                const currentTime = video.currentTime;
                
                // Slow down first second and last second by 50%, speed up final 2/3 by 12.5%
                if ((currentTime >= 1.05 && currentTime <= 2.05) || currentTime >= duration - 1) {
                  video.playbackRate = 0.909; // 50% slower (1.818 * 0.5), then 10% slower for whole sequence
                } else if (currentTime >= duration / 2) {
                  // Second half: 25% faster, then 10% slower for whole sequence
                  video.playbackRate = 2.2725; // (2.02 * 1.25) * 0.9
                } else {
                  video.playbackRate = 1.818; // Base speed (2.02 * 0.9 for 10% slower sequence)
                }
                
                // Stop 0.1 seconds before the end and hold for 0.2 seconds (only once)
                if (currentTime >= duration - 0.1 && !video.dataset.endTriggered) {
                  video.pause();
                  video.currentTime = duration - 0.1;
                  video.dataset.endTriggered = 'true';
                  
                  // Hold for 0.27 seconds (10% less), then transition to Video F
                  setTimeout(() => {
                    // Trigger transition to Video F after hold
                    const videoE = document.getElementById('videoE') as HTMLVideoElement;
                    const videoF = document.getElementById('videoF') as HTMLVideoElement;
                    
                    if (videoE && videoF) {
                      // Make sure Video F is ready for transition
                      videoF.style.display = 'block';
                      videoF.currentTime = 5; // Reset to start position
                      videoF.dataset.readyToPlay = 'false'; // Reset ready flag
                      
                      // Smoother fade out Video E with gentle slide
                      videoE.style.transform = 'translate(-50%, -45%)';
                      videoE.style.opacity = '0';
                      
                      // Video F slides in more gently from top with gradual fade in
                      videoF.style.transform = 'translate(-50%, -55%)';
                      videoF.style.opacity = '0.2';
                      
                      // Settle F to exact position and full opacity more gradually
                      setTimeout(() => {
                        videoF.style.transform = 'translate(-50%, -55%)'; // Match Video D's exact transform
                        videoF.style.opacity = '1';
                        
                        // Mark as ready to play ONLY after opacity is 100%
                        videoF.dataset.readyToPlay = 'true';
                        
                        // DRASTIC: Force pause and wait extra time before allowing play
                        videoF.pause();
                        videoF.currentTime = 5; // Reset to start position
                        
                        setTimeout(() => {
                          if (videoF.dataset.readyToPlay === 'true') {
                            videoF.play();
                          }
                        }, 800); // Extra 800ms freeze AFTER opacity is 100%
                      }, 200);
                      
                      // Completely hide Video E after fade completes
                      setTimeout(() => {
                        videoE.style.display = 'none';
                      }, 400);
                    }
                  }, 270);
                }
              }}
            />
            
            {/* Video F - Sixth video (initially hidden above) */}
            <video
              id="videoF"
              src="/part6.mov"
              muted
              playsInline
              className="absolute w-[75%] h-auto max-h-[80%] block transition-all duration-400 ease-in-out"
              style={{
                backgroundColor: '#F7F7F7',
                filter: 'contrast(1.12) brightness(1.04) saturate(1.05)',
                borderRadius: '8px',
                boxShadow: 'inset 0 0 0 2px #F7F7F7',
                top: '55%',
                left: '50%',
                transform: 'translate(-50%, -150%)',
                opacity: 0,
                clipPath: 'inset(0 0 0.5% 0)' // Clip bottom 0.5% to remove embedding line
              }}
            onLoadedData={(e) => {
              const video = e.target as HTMLVideoElement;
              video.playbackRate = 2.115; // 10% slower
              video.currentTime = 5; // Same starting location as Videos B and D
              video.pause(); // NEVER auto-play
              video.dataset.readyToPlay = 'false'; // Custom flag to control playback
            }}
              onTimeUpdate={(e) => {
                const video = e.target as HTMLVideoElement;
                const duration = video.duration;
                const currentTime = video.currentTime;
                
                // DRASTIC: Only allow onTimeUpdate if video is marked as ready to play
                if (video.dataset.readyToPlay !== 'true') {
                  video.pause(); // Force pause if not ready
                  return;
                }
                
                // Add 0.5 second freeze at the start (only once)
                if (currentTime >= 5 && currentTime <= 5.5 && !video.dataset.startFreezeTriggered) {
                  video.pause();
                  video.dataset.startFreezeTriggered = 'true';
                  setTimeout(() => {
                    video.play();
                  }, 500); // 0.5 second freeze
                }
                
                // Slow down first second (5.5-6.5) and last second by 50%
                if ((currentTime >= 5.5 && currentTime <= 6.5) || currentTime >= duration - 1) {
                  video.playbackRate = 1.0575; // 50% of 2.115
                } else {
                  video.playbackRate = 2.115; // 10% slower
                }
                
                // Stop 0.1 seconds before the end and freeze for 1 second (only once)
                if (currentTime >= duration - 0.1 && !video.dataset.endTriggered) {
                  video.pause();
                  video.currentTime = duration - 0.1;
                  video.dataset.endTriggered = 'true';
                  
                  // Freeze for 1 second, then fade to grey
                  setTimeout(() => {
                    const videoF = document.getElementById('videoF') as HTMLVideoElement;
                    if (videoF) {
                      videoF.style.transition = 'opacity 1s ease-out, filter 1s ease-out';
                      videoF.style.opacity = '0';
                      videoF.style.filter = 'contrast(1.12) brightness(1.04) saturate(1.05) blur(5px)';
                      
                      // After fade completes, wait 2 seconds then restart sequence
                      setTimeout(() => {
                      // Reset all videos to initial state
                      const videoA = document.getElementById('videoA') as HTMLVideoElement;
                      const videoB = document.getElementById('videoB') as HTMLVideoElement;
                      const videoC = document.getElementById('videoC') as HTMLVideoElement;
                      const videoD = document.getElementById('videoD') as HTMLVideoElement;
                      const videoE = document.getElementById('videoE') as HTMLVideoElement;
                      
                      // COMPLETE reset of all videos to initial state
                      
                      // Reset all trigger flags
                      [videoA, videoB, videoC, videoD, videoE, videoF].forEach(v => {
                        if (v) {
                          delete v.dataset.freezeTriggered;
                          delete v.dataset.flickerTriggered;
                          delete v.dataset.transitionTriggered;
                          delete v.dataset.endTriggered;
                          delete v.dataset.readyToPlay;
                          delete v.dataset.startFreezeTriggered;
                        }
                      });
                      
                      // Reset Video A to initial state
                      if (videoA) {
                        videoA.style.display = 'block';
                        videoA.style.opacity = '1';
                        videoA.style.transform = 'translate(-50%, -70%)'; // Match new 30% position
                        videoA.style.transition = '';
                        videoA.style.filter = 'contrast(1.1) brightness(1.05)';
                        videoA.currentTime = 0;
                        videoA.play();
                      }
                      
                      // Reset Video B to initial hidden state
                      if (videoB) {
                        videoB.style.display = 'none';
                        videoB.style.opacity = '0';
                        videoB.style.transform = 'translate(-50%, -150%)';
                        videoB.style.transition = '';
                        videoB.style.filter = 'contrast(1.12) brightness(1.04) saturate(1.05)';
                        videoB.currentTime = 5;
                        videoB.pause();
                      }
                      
                      // Reset Video C to initial hidden state
                      if (videoC) {
                        videoC.style.display = 'none';
                        videoC.style.opacity = '0';
                        videoC.style.transform = 'translate(-50%, -150%)';
                        videoC.style.transition = '';
                        videoC.style.filter = 'contrast(1.12) brightness(1.04) saturate(1.05)';
                        videoC.currentTime = 1.05;
                        videoC.pause();
                      }
                      
                      // Reset Video D to initial hidden state
                      if (videoD) {
                        videoD.style.display = 'none';
                        videoD.style.opacity = '0';
                        videoD.style.transform = 'translate(-50%, -150%)';
                        videoD.style.transition = '';
                        videoD.style.filter = 'contrast(1.12) brightness(1.04) saturate(1.05)';
                        videoD.currentTime = 3;
                        videoD.pause();
                      }
                      
                      // Reset Video E to initial hidden state
                      if (videoE) {
                        videoE.style.display = 'none';
                        videoE.style.opacity = '0';
                        videoE.style.transform = 'translate(-50%, -150%)';
                        videoE.style.transition = '';
                        videoE.style.filter = 'contrast(1.12) brightness(1.04) saturate(1.05)';
                        videoE.currentTime = 1.05;
                        videoE.pause();
                      }
                      
                      // Reset Video F to initial hidden state
                      if (videoF) {
                        videoF.style.display = 'none';
                        videoF.style.opacity = '0';
                        videoF.style.transform = 'translate(-50%, -150%)';
                        videoF.style.transition = '';
                        videoF.style.filter = 'contrast(1.12) brightness(1.04) saturate(1.05)';
                        videoF.currentTime = 5;
                        videoF.dataset.readyToPlay = 'false';
                        videoF.pause();
                      }
                      }, 2000); // 1s fade + 1s wait = 2s total
                    }
                  }, 1000); // 1s freeze before fade
                }
              }}
            />
            
            {/* Fake Cursor Overlay */}
            <img
              id="cursor"
              src="/assets/cursor.svg"
              alt=""
              className="absolute pointer-events-none z-20"
              style={{
                width: '32px',
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.45))',
                transform: 'translate(20px, 20px)'
              }}
            />
            
            {/* Click Ripple */}
            <div
              id="ripple"
              className="absolute pointer-events-none z-10 rounded-full border-2 border-white/90 opacity-0"
              style={{
                width: '0',
                height: '0'
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
