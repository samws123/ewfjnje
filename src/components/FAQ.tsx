"use client";

import React, { useState } from "react";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is DuNorth free to try?",
      answer:
        "Yes, DuNorth offers a free trial so you can explore all features before committing to a subscription.",
    },
    {
      question: "What are the primary uses of DuNorth?",
      answer:
        "DuNorth tracks all your assignments, grades, and readings, writes papers with you, handles psets, and summarizes missed weeks. It keeps everything on track; ask & it knows!",
    },
    {
      question: "How can I verify the accuracy of AI-generated responses?",
      answer:
        "Every response includes direct links to original sources and citations back to your course readings, sou can always verify information with a single click.",
    },
    {
      question: "How secure is my data with DuNorth?",
      answer:
        "We take data security seriously with enterprise-grade encryption and compliance with major security standards.",
    },
    {
      question: "What file types does DuNorth support?",
      answer:
        "DuNorth supports PDFs, Word documents, PowerPoint presentations, and various other academic file formats.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "We offer a 30-day money-back guarantee if you're not satisfied with our service.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-36 max-md:py-24 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="w-full flex max-w-[1280px] justify-between flex-col lg:flex-row  gap-8 ">
          <div>
            <h2 className="font-perfectly-nineties  text-center max-lg:mx-auto  max-lg:max-w-[388px] lg:text-start  w-full text-[40px] max-w-[388px] leading-[42px] md:text-5xl md:leading-[50px] font-[550] mb-15 lg:mb-16">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-[600px] w-full">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  className="flex items-center gap-1.5 w-full py-8 text-left text-lg font-medium leading-none text-black hover:text-gray-600 transition-colors"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/9d05c8fe4505748968e646a43a69c5cf9604a6d8?placeholderIfAbsent=true"
                    alt=""
                    className={`w-4 h-4 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                  <span className="flex-1">{faq.question}</span>
                </button>

                {openIndex === index && (
                  <div className="pb-8 pl-6">
                    <p className="text-gray-600 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="mt-14 max-md:mt-10">
              <a
                href="#more-faqs"
                className="flex items-center gap-1 text-base font-semibold tracking-[-0.25px] leading-none px-8 py-[15px] rounded-xl hover:bg-gray-50 transition-colors max-w-max"
              >
                <span>More FAQs</span>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/069483645e3123612a5e55b058d381b05f14be5b?placeholderIfAbsent=true"
                  alt=""
                  className="w-4 h-4"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
