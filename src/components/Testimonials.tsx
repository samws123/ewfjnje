"use client";

import React from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export const Testimonials: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const testimonials = [
    [
      {
        name: "Anna",
        title: "Student Researcher, Caltech",
        content:
          "DuNorth accomplishes in minutes what would take me literally ages to do manually (sorting assignments, doing them). What really impresses me is how it NEVER misses things, and sees patterns in coursework I've completely missed. It's particularly good at pointing out important details (by that I mean remember to do them and doing them for you) in small assignments that take up hours a day.",
      },
      {
        name: "Paula",
        title: "Biogenetics at SDSU",
        content:
          "With DuNorth I'm able to do all my HW in 30 mins -- it used to take 3 hours. There's nothing else like it.",
      },
      {
        name: "Alexis",
        title: "Data Science Undergrad, Georgia Tech",
        content:
          "Genuinely makes research so much more intuitive. A hive mind of documents related to everything you're doing in all classes and endeavors at once!",
      },
    ],
    [
      {
        name: "James",
        title: "Psychology Undergrad, SDSU",
        content:
          "I've tried a lot of AI hw / chatbot apps, and DuNorth is by far the best in terms of simplicity, quality, and speed... not even close.",
      },
      {
        name: "Zora",
        title: "Lab Assistant, UC Berkeley",
        content:
          "I'm using DuNorth RIGHT NOW for my courses on BOTH history in 19th century America and single-cell multiomics frameworks! Saves me a lot of time and hastle and have more time to kick it with friends.",
      },
      {
        name: "Tylar",
        title: "PhD Student at Stanford",
        content:
          "As a PhD candidate, DuNorth is STILL my number 1 app for speed reading, auto-doing my HW, and answering discussion questions.",
      },
      {
        name: "Alamin",
        title: "Dermatology Student, Med School",
        content:
          "DuNorth makes diving into research papers so much easier and quicker. A must-try tool.",
      },
    ],
    [ 
      {
        name: "Samuel",
        title: "Neuroscience, Northwestern",
        content:
          "DuNorth makes life easier for basically everyone I know. Some of us don't even look at Canvas anymore. It breaks down what's due, how to due it, and basically does it for you (cuz it's basically done all your readings so far - you don't even need to upload them).",
      },
      {
        name: "Jordan",
        title: "Physics, CUNY",
        content:
          "Doing school with DuNorth... is like not doing it if you don't want to :)",
      },
      {
        name: "Nabila",
        title: "History Undergrad, MSU",
        content:
          "It aided in my research works tremendously… The reading reports and annotated bibliographies used to take several days, but now only a matter of minutes. I already recommended it to all my friends struggling with and essays.",
      },
    ],
    [
      {
        name: "Jorria",
        title: "Pre-Med, Yale",
        content:
          "I love how functional and flexible DuNorth is for classwork when I skip weeks on end. It's like an assistant that goes to class for you, takes notes, and sets up assignments for you to have the easiest possible time completing them. It makes the whole process of working through academic papers so much smoother.",
      },
      {
        name: "Elaine",
        title: "Astrophysics, Berkeley",
        content:
          "It's so useful to be able to find a little piece of information you know you've already read in a paper but you don't remember where. And it's trustworthy since it shows you where it picked it's information, and you can verify afterward.",
      },
      {
        name: "Taylor",
        title: "English, Columbia University",
        content:
          "Excellent tool to use, especially for those minor HW assignments that take up hours each week. Enjoying it. Thank you",
      },
    ],
  ];

  return (
    <section ref={elementRef} className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className={`font-perfectly-nineties mb-16 font-[550] text-balance text-center mx-auto leading-[100%] text-[32px] md:text-[56px] max-w-[820px] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          What students are saying
        </h2>

        <div
          className={`grid md:grid-cols-4 gap-5 max-md:grid-cols-1 transition-all duration-600 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {testimonials.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {column.map((testimonial, index) => (
                <article
                  key={index}
                  className={`break-inside-avoid mb-7 border border-[#E5E5E5]  rounded-7 p-9`}
                  style={{
                    animationDelay: `${
                      (columnIndex * column.length + index) * 80
                    }ms`,
                  }}
                >
                  <div className="mb-6">
                    <h3 className="text-neutral-900 font-medium text-base group-hover:text-primary transition-colors duration-300">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 text-base group-hover:text-gray-500 transition-colors duration-300">
                      {testimonial.title}
                    </p>
                  </div>
                  <p className="text-neutral-900 font-normal text-base tracking-[-0.32px] group-hover:text-neutral-800 transition-colors duration-300">
                    {testimonial.content}
                  </p>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
