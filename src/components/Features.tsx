"use client";

import React from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export const Features: React.FC = () => {
  const { elementRef: featuresRef, isVisible: featuresVisible } =
    useIntersectionObserver();
  const { elementRef: statsRef, isVisible: statsVisible } =
    useIntersectionObserver();
  const features = [
    {
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/b155b43a7569a17b97cd1de4dfc0891693164460?placeholderIfAbsent=true",
      title: "Handles all assignments",
      description:
        "Let us do your p-sets, reading questions, and essays using course materials as your prof wishes.",
    },
    {
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/92762232d271445717f7e2a40eb913ca5b4917b5?placeholderIfAbsent=true",
      title: "Already knows your courses",
      description:
        "We link up to your Canvas, constantly updating, so there's no work to do on your part.",
    },
    {
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/5fb8b04e0e203cab86c7825848555eda0ca32cfc?placeholderIfAbsent=true",      
        title: "Never miss a deadline",
      description:
        "We keep track of assignments as they come in, budget time, and tell you what to work on today.",
    },
  ];

  const workflowFeatures = [
    {
      title: (
        <>
          Your entire academic
          <br />
          life, perfectly organized
        </>
      ),
      altText: "Your entire academic life, organized perfectly",
      description: (
        <>
          Create folders for each course, group related papers by topic, 
          <br />
          and manage hundreds of documents without any chaos
        </>
      ),
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/065eb60eac00bb375691563fd74ca26e89d272d5?placeholderIfAbsent=true",
    },
    {
      title: (
        <>
          Write essays
          <br />
          with ease
        </>
      ),
      altText: "Understand any file or group of files, instantly",
      description: (
        <>
          Whether it's a dense 200-page textbook, a new clinical study, or a
          <br />
          technical math lecture that you skipped, just ask us and we'll summarize it.
        </>
      ),
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/448af277074f66a5f2a680fed3cacd8ffcbdb971?placeholderIfAbsent=true",
    },
    {
      title: (
        <>
          Generate flashcards and
          <br />
          multiple choice questions
        </>
      ),
      altText: "Generate flashcards and multiple choice questions",
      description: (
        <>
          Upload lecture slides, textbooks, or videos, and Anara will create
          <br />
          flashcards and practice quizzes tailored to your specific materials
        </>
      ),
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/d17249b7f45f154dddeb37defddb0ec9281f21d9?placeholderIfAbsent=true",
    },
    {
      title: (
        <>
          No more schedules,
          <br />
          No more planners
        </>
      ),
      altText: "Build a single, searchable library for all your projects",
      description: (
        <>
          Whether working solo or collaborating with a team, Anara
          <br />
          provides one organized place for all your scholarly work
        </>
      ),
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/069088bed1bf853b7a711b661f378f13bf7659b1?placeholderIfAbsent=true",
    },
  ];

  const stats = [
    { label: "Files analyzed", value: "17M" },
    { label: "Assignments completed", value: "630K" },
    { label: "Questions answered", value: "27M" },
    { label: "Hours saved per week", value: "12H" },
  ];

  return (
    <div className="py-16 w-full">
      <section ref={featuresRef} className="w-full">
        <p
          className={`font-perfectly-nineties whitespace-break-spaces text-[40px] font-[550] md:text-[56px] md:leading-[54px] leading-normal pb-7  text-center max-w-full ${
            featuresVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          How students are using DuNorth
        </p>

        <div
          className={`grid md:grid-cols-3 gap-8 mb-32 transition-all duration-600 ease-out delay-200 ${
            featuresVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ marginTop: `50px` }}
        >
          {features.map((feature, index) => (
            <article
              key={index}
              className={`text-center  transition-all duration-500 group animate-bounce-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl mb-8">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="aspect-[1.56] object-contain w-full transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col md:mt-7 items-center mx-auto">
                <p className="text-lg font-medium text-text-primary text-lg text-center">
                  {feature.title}
                </p>
                <p className="pt-3 text-sm text-text-secondary text-balance text-center max-w-[300px]">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {workflowFeatures.map((feature, index) => (
          <WorkflowFeature key={index} feature={feature} index={index} />
        ))}

        <section ref={statsRef} className="text-center mb-32">
          <h2
            className={`font-perfectly-nineties mb-16 font-[550] text-balance text-center mx-auto leading-[100%] text-[32px] md:text-[56px] max-w-[820px] ${
              statsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Trusted by millions
          </h2>

          {/* <div
            className={`grid md:grid-cols-4 gap-4 transition-all duration-600 ease-out delay-200 ${
              statsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          > */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 w-full ${
              statsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-col items-start text-center p-10 rounded-7 bg-[#F7F7F7] gap-24">
              <div className="text-text-secondary mb-4 leading-none font-[450]">
                Files analyzed
              </div>
              <div className="text-text-secondary font-interDisplay text-[40px] font-medium">
                17M
              </div>
            </div>
            <div className="flex flex-col items-start text-center p-10 rounded-7 bg-[#F7F7F7] gap-24">
              <div className="text-text-secondary mb-4 leading-none font-[450]">
                Assignments completed
              </div>
              <div className="text-text-secondary font-interDisplay text-[40px] font-medium">
                630K
              </div>
            </div>
            <div className="flex flex-col items-start text-center p-10 rounded-7 bg-[#F7F7F7] gap-24">
              <div className="text-text-secondary mb-4 leading-none font-[450]">
                Questions answered
              </div>
              <div className="text-text-secondary font-interDisplay text-[40px] font-medium">
                27M
              </div>
            </div>
            <div className="flex flex-col items-start text-center p-10 rounded-7 bg-[#F7F7F7] gap-24">
              <div className="text-text-secondary mb-4 leading-none font-[450]">
                Hours saved per week
              </div>
              <div className="text-text-secondary font-interDisplay text-[40px] font-medium">
                12H
              </div>
            </div>
          </div>
          {/* </div> */}
        </section>
      </section>
    </div>
  );
};

const WorkflowFeature: React.FC<{ feature: any; index: number }> = ({
  feature,
}) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section ref={elementRef} className="mb-[276px] max-md:mb-20">
      <div
        className={`text-center mb-14 max-md:mb-10 transition-all duration-600 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-perfectly-nineties whitespace-break-spaces text-[40px] font-[550] md:text-[56px] md:leading-[54px] leading-normal pb-7  text-center max-w-full">
          {feature.title}
        </p>
        {/* <p class="whitespace-break-spaces text-[40px] font-[550] md:text-[56px] md:leading-[50px] leading-tight pb-7 font-perfectlyNineties text-center max-w-full">Built specifically for academic workflows</p> */}
        <p className="text-sm md:text-base text-text-secondary text-center text-balance mx-auto max-w-[620px]">
          {feature.description}
        </p>
      </div>
      <div
        className={`bg-gradient-to-br bg-[#F7F7F7] from-gray-100 to-gray-200 rounded-2xl p-14 max-md:p-5 transition-all duration-600 ease-out delay-300  overflow-hidden group glass-effect border border-white/30 pb-0  ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <div className="relative overflow-hidden rounded-[0px]">
          <img
            src={feature.image}
            alt={feature.altText}
            className="  w-full transition-all duration-700 relative z-10 w-[100%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0  transition-opacity duration-500"></div>
        </div>
      </div>
    </section>
  );
};
