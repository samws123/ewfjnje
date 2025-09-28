import React from "react";
import { Button } from "@/components/ui/Button";

export const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "Resources",
      links: ["User guide", "Changelog", "Join Discord", "Blog", "FAQs"],
    },
    {
      title: "Company",
      links: ["Careers", "Support", "Contact", "Press kit", "Affiliates"],
    },
    {
      title: "Products",
      links: ["Web application", "Chrome extension", "PDF viewer"],
    },
    {
      title: "Legal",
      links: [
        "Terms",
        "DPA",
        "Privacy",
        "Subprocessors",
        "Trust center",
        "Cookies",
      ],
    },
    {
      title: "Socials",
      links: ["X (Twitter)", "Instagram", "TikTok", "LinkedIn"],
    },
  ];

  return (
    <footer className="bg-white w-full">
      <div className="">
        {/* CTA Section */}
        {/* <section className="text-center py-24 max-md:py-16">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/54e2aed4d8ac903922f9ec45fc8fc129f704b2fc?placeholderIfAbsent=true"
            alt="Anara Icon"
            className="w-10 h-10 mx-auto mb-2.5"
          />
          <h2 className="font-perfectly-nineties font-[570] text-black text-[54px] leading-none tracking-[-0.96px] mb-4 max-md:text-[40px]">
            Where people and AI do research work together
          </h2>
          <p className="text-neutral-900 text-base font-medium tracking-[-0.4px] mb-9 max-w-2xl mx-auto">
            Anara helps you find, understand, organize and produce scientific
            documents with AI. Take it for a spin today. No card required.
          </p>

          <div className="flex justify-center gap-3.5 mb-14 max-md:flex-col max-md:items-center">
            <Button variant="primary" size="lg" className="w-[143px]">
              Get Anara free
            </Button>
            <Button variant="secondary" size="lg" className="w-[142px]">
              Request demo
            </Button>
          </div>

          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/4d38a068ebd3cca84550b189bff99de961d04aac?placeholderIfAbsent=true"
            alt="Product Screenshot"
            className="aspect-[2.43] object-contain w-full rounded-2xl"
          />
        </section> */}

        <div className="flex flex-col items-start text-start w-full max-w-[1280px] tracking-tight pt-24 pb-12 md:pb-[200px] mx-auto px-9 md:px-13 lg:px-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
            className="w-13 h-13 mx-auto text-[#E0E0E0]"
          >
            <path
              fill="currentColor"
              d="M1.56 15.846c-.915.553-1.959-.491-1.406-1.407L5.41 7.281a1.024 1.024 0 0 0 0-1.06l-3.048-4.66C1.808.645 2.85-.4 3.767.154l4.661 3.049c.326.196.734.196 1.06 0L14.438.154c.916-.553 1.96.491 1.407 1.407l-3.049 4.952a1.024 1.024 0 0 0 0 1.059l3.049 4.66c.553.916-.491 1.96-1.407 1.407l-4.66-3.048a1.024 1.024 0 0 0-1.06 0l-7.158 5.255Z"
            ></path>
          </svg>
          <h2 className="font-perfectly-nineties font-[550] text-balance text-center mx-auto leading-[39px] sm:leading-[46px] md:leading-[58px] lg:leading-[68px] xl:leading-[76px] text-[36px] sm:text-[42px] md:text-[56px] lg:text-[64px] xl:text-[72px] max-w-[820px] mt-5">
            Where people and AI do research work together
          </h2>
          <p className="text-secondary-foreground leading-6 max-w-[750px] mt-7 mx-auto text-center text-balance">
            Anara helps you find, understand, organize and produce scientific
            documents with AI. Take it for a spin today. No card required.
          </p>
          <div className="flex flex-row items-center justify-center gap-[14px] mt-12 mx-auto">
            <button
              aria-busy="false"
              className="inline-flex items-center select-none relative justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-background-inverse text-text-inverse h-14 rounded-7 gap-5 tracking-normal text-base leading-4 font-medium hover:scale-[1.02] transition-all duration-200 ease-in-out !rounded-full px-7 py-6"
            >
              <span className="truncate">Get Anara free</span>
            </button>
            <button
              aria-busy="false"
              className="inline-flex items-center select-none relative justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary hover:bg-secondary-hover h-14 rounded-7 gap-5 tracking-normal text-text-primary text-base leading-4 font-medium hover:scale-[1.02] transition-all duration-200 ease-in-out !rounded-full px-7 py-6"
            >
              <span className="truncate">Request demo</span>
            </button>
          </div>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/4d38a068ebd3cca84550b189bff99de961d04aac?placeholderIfAbsent=true"
            alt="Product Screenshot"
            className="aspect-[2.43] object-contain w-full mt-15 rounded-2xl"
          />
        </div>

        <div className="max-w-[1280px] w-full mx-auto px-9 md:px-13 lg:px-16 pb-[60px] md:pb-[56px]">
          <div className="flex flex-col md:flex-row gap-7 lg:gap-10 justify-between items-start w-full mb-10">
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col text-lg font-medium">
                <div className="flex items-center gap-4">
                  <span className="text-black text-lg font-semibold">
                    DuNorth
                  </span>
                  <span className="text-text-secondary text-lg font-normal">
                    — AI workspace for
                  </span>
                </div>
                <span className="text-text-secondary text-lg font-normal">
                  students who use Canvas
                </span>
              </div>
              <p className="rounded-full font text-sm leading-4 text-text-secondary py-3 flex flex-row items-center gap-3">
                <img
                  src="/logos/alliance.png"
                  alt="Alliance"
                  className="w-[18px] h-[18px] rounded-md scale-95"
                />
                Backed by Alliance
              </p>
            </div>
            <div className="flex flex-wrap gap-16 w-full md:w-fit">
              <div>
                <h3 className="text-black text-base leading-[18px] font-semibold mb-6">
                  Resources
                </h3>
                <ul>
                  <li>
                    <a
                      href="https://docs.anara.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      User guide
                    </a>
                  </li>
                  <li>
                    <a
                      href="/changelog"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Changelog
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/7c9ucr3DZJ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Join Discord
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="/faqs"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-black text-base leading-[18px] font-semibold mb-6">
                  Company
                </h3>
                <ul>
                  <li>
                    <a
                      href="https://www.ycombinator.com/companies/anara/jobs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      id="intercom_support"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Support
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:support@anara.com"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://drive.google.com/drive/folders/1czxkRszv11zHu-gAEj53Dfgj-CYHq44G"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Press kit
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://partners.dub.co/anara"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Affiliates
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-black text-base leading-[18px] font-semibold mb-6">
                  Products
                </h3>
                <ul>
                  <li>
                    <a
                      href="/new"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Web application
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://chromewebstore.google.com/detail/unriddle-ai-generated-sum/iinmigjlcpeckfihbbfajpkiilfmakff"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Chrome extension
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://lector-weld.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      PDF viewer
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-black text-base leading-[18px] font-semibold mb-6">
                  Legal
                </h3>
                <ul>
                  <li>
                    <a
                      href="https://anara.com/docs/legal/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://anara.com/dpa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      DPA
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://anara.com/docs/legal/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/subprocessors"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Subprocessors
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://trust.delve.co/anara"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Trust center
                    </a>
                  </li>
                  <li>
                    <button className="text-muted-foreground text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-2.5 text-left">
                      Cookies
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-black text-base leading-[18px] font-semibold mb-6">
                  Socials
                </h3>
                <ul>
                  <li>
                    <a
                      href="https://x.com/anara"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      X (Twitter)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/anaralabs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/@anaralabs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      TikTok
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/anaralabs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-base leading-[18px] cursor-pointer transition-all ease duration-200 hover:text-black block mb-5"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="border-t border-[#F2F2F2] mb-9" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-7">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://trust.delve.co/anara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary font-medium text-sm leading-[16px] bg-secondary w-fit p-2 rounded-4 cursor-pointer"
                >
                  GDPR
                </a>
                <a
                  href="https://trust.delve.co/anara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary font-medium text-sm leading-[16px] bg-secondary w-fit p-2 rounded-4 cursor-pointer"
                >
                  SOC 2
                </a>
                <a
                  href="https://trust.delve.co/anara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary font-medium text-sm leading-[16px] bg-secondary w-fit p-2 rounded-4 cursor-pointer"
                >
                  ISO27001
                </a>
              </div>
              <p className="text-[#9A9A9A] text-sm leading-[16px] font-normal">
                Sub-processors include Stripe, Vercel and Supabase.
              </p>
            </div>
            <p className="text-[#9A9A9A] text-base leading-[16px]">
              © 2025 Study Tools LLC
            </p>
          </div>
        </div>

        {/* Footer Links */}
        {/* <div className="py-16">
          <div className="grid md:grid-cols-6 gap-8 mb-8">
            <div className="md:col-span-1">
              <div className="mb-3">
                <div className="flex items-center gap-2 text-lg leading-none mb-1">
                  <span className="text-black font-semibold">Anara</span>
                  <span className="text-gray-600 font-normal">— AI for</span>
                </div>
                <div className="text-gray-600 font-normal">
                  scientific advancement
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium bg-gray-50 px-3 py-1.5 rounded-full w-fit">
                <img
                  src="/logos/alliance.png"
                  alt="Alliance"
                  className="w-[18px] h-[18px] rounded-md scale-95"
                />
                <span>Backed by Alliance</span>
              </div>
            </div>

            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-black font-semibold text-base leading-none mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-600 font-medium text-base leading-none hover:text-black transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <hr className="border-gray-200 mb-6" />

          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <div className="flex gap-2 mb-3">
                {["GDPR", "SOC 2", "ISO27001"].map((cert) => (
                  <span
                    key={cert}
                    className="bg-black/5 text-gray-600 font-medium text-sm px-1 py-1 rounded-lg"
                  >
                    {cert}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 font-normal text-sm">
                Sub-processors include Stripe, Vercel and Supabase.
              </p>
            </div>
            <p className="text-gray-400 text-base font-medium">
              © 2025 Study Tools LLC
            </p>
          </div>
        </div> */}
      </div>
    </footer>
  );
};
