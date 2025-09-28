'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function EmailVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const router = useRouter();

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div
      className="min-h-screen bg-white flex flex-col items-center justify-center px-4 font-inter font-medium leading-6 tracking-[-0.32px] antialiased"
      style={{
        colorScheme: "light",
        fontFeatureSettings: "normal",
        fontVariationSettings: "normal",
      }}
    >
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col h-full items-center justify-center">
          <div className="fixed top-0 flex flex-row justify-between px-9 py-11 w-full">
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="flex flex-row justify-start items-center gap-4 p-4 -m-4 cursor-pointer dark:invert max-lg:h-20">
                <svg
                  className="w-[64px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="487"
                  height="138"
                  viewBox="0 0 487 138"
                  fill="none"
                >
                  <path
                    fill="#000"
                    d="M432.758 137.312c-7.965 0-14.581-1.348-19.848-4.046-5.268-2.698-9.186-6.295-11.755-10.792-2.57-4.496-3.854-9.378-3.854-14.645 0-6.167 1.541-11.498 4.625-15.994 3.211-4.497 7.9-7.965 14.067-10.406 6.166-2.57 13.746-3.855 22.739-3.855h24.473c0-5.138-.706-9.378-2.12-12.718-1.413-3.468-3.597-6.038-6.551-7.708-2.955-1.67-6.745-2.505-11.37-2.505-5.267 0-9.764 1.22-13.489 3.661-3.726 2.313-6.038 5.91-6.937 10.792h-22.739c.77-6.938 3.083-12.847 6.937-17.73 3.854-5.01 8.928-8.863 15.223-11.561 6.424-2.827 13.425-4.24 21.005-4.24 9.121 0 16.894 1.606 23.317 4.818 6.424 3.083 11.305 7.58 14.646 13.49 3.468 5.78 5.202 12.782 5.202 21.004V135h-19.655l-2.313-15.609c-1.284 2.569-2.954 4.946-5.01 7.13-1.927 2.184-4.175 4.111-6.744 5.781-2.57 1.542-5.525 2.762-8.865 3.662-3.212.899-6.873 1.348-10.984 1.348Zm5.203-18.306c3.726 0 7.002-.643 9.828-1.927 2.955-1.414 5.46-3.341 7.515-5.781 2.184-2.57 3.854-5.396 5.011-8.479 1.156-3.084 1.927-6.36 2.312-9.828v-.386h-21.39c-4.496 0-8.222.578-11.177 1.735-2.955 1.027-5.074 2.57-6.359 4.625-1.285 2.055-1.927 4.432-1.927 7.13 0 2.697.642 5.01 1.927 6.937 1.285 1.927 3.148 3.404 5.588 4.432 2.441 1.028 5.332 1.542 8.672 1.542ZM335.354 135V37.878h20.619l2.12 18.114c2.313-4.24 5.203-7.837 8.672-10.791 3.468-3.084 7.515-5.46 12.14-7.13 4.753-1.67 9.956-2.506 15.609-2.506V60.04h-8.093c-3.855 0-7.516.513-10.985 1.541-3.468.9-6.487 2.441-9.057 4.625-2.441 2.056-4.368 4.946-5.781 8.672-1.413 3.597-2.119 8.157-2.119 13.682V135h-23.125ZM268.637 137.312c-7.965 0-14.581-1.348-19.849-4.046-5.267-2.698-9.185-6.295-11.754-10.792-2.57-4.496-3.854-9.378-3.854-14.645 0-6.167 1.541-11.498 4.624-15.994 3.212-4.497 7.901-7.965 14.068-10.406 6.166-2.57 13.746-3.855 22.739-3.855h24.473c0-5.138-.707-9.378-2.12-12.718-1.413-3.468-3.597-6.038-6.552-7.708-2.954-1.67-6.744-2.505-11.369-2.505-5.267 0-9.764 1.22-13.489 3.661-3.726 2.313-6.038 5.91-6.938 10.792h-22.739c.771-6.938 3.084-12.847 6.938-17.73 3.854-5.01 8.928-8.863 15.223-11.561 6.424-2.827 13.425-4.24 21.005-4.24 9.121 0 16.893 1.606 23.317 4.818 6.423 3.083 11.305 7.58 14.645 13.49 3.469 5.78 5.203 12.782 5.203 21.004V135h-19.655l-2.313-15.609c-1.285 2.569-2.955 4.946-5.01 7.13-1.927 2.184-4.175 4.111-6.745 5.781-2.569 1.542-5.524 2.762-8.864 3.662-3.212.899-6.873 1.348-10.984 1.348Zm5.203-18.306c3.725 0 7.001-.643 9.828-1.927 2.954-1.414 5.46-3.341 7.515-5.781 2.184-2.57 3.854-5.396 5.01-8.479 1.157-3.084 1.927-6.36 2.313-9.828v-.386h-21.39c-4.497 0-8.222.578-11.177 1.735-2.955 1.027-5.074 2.57-6.359 4.625-1.285 2.055-1.927 4.432-1.927 7.13 0 2.697.642 5.01 1.927 6.937 1.285 1.927 3.147 3.404 5.588 4.432 2.441 1.028 5.332 1.542 8.672 1.542ZM131.526 135V37.878h20.426l1.735 16.187c2.954-5.653 7.194-10.15 12.718-13.49s12.076-5.01 19.656-5.01c7.836 0 14.517 1.67 20.041 5.01 5.524 3.212 9.764 7.966 12.718 14.26 3.084 6.296 4.625 14.132 4.625 23.51V135h-23.124V80.465c0-8.093-1.799-14.324-5.396-18.692s-8.928-6.552-15.994-6.552c-4.625 0-8.8 1.092-12.526 3.276-3.597 2.184-6.488 5.396-8.672 9.635-2.055 4.111-3.083 9.121-3.083 15.03V135h-23.124ZM.818 135 50.15.108h25.822L125.304 135H100.83L62.868 27.086 24.905 135H.818Zm21.968-31.796 6.166-18.307h66.483l6.166 18.307H22.786Z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <button
                className="flex justify-center items-center w-11 h-11 rounded-4 p-3 ease-in transition-all duration-150 cursor-pointer hover:bg-popover-hover"
                type="button"
                onClick={() => router.push("/signup")}
                aria-label="Go back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666666"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-left"
                  aria-hidden="true"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="w-80 flex flex-col items-stretch">
            <div className="px-9">
              <h2 className="text-xl text-center mb-3">
                <span
                  style={{
                    display: "inline-block",
                    verticalAlign: "top",
                    textDecoration: "inherit",
                    textWrap: "balance",
                  }}
                >
                  Log in or sign up
                </span>
              </h2>

              <p className="text-sm text-text-secondary text-center mb-8 leading-6">
                <span
                  style={{
                    display: "inline-block",
                    verticalAlign: "top",
                    textDecoration: "inherit",
                    textWrap: "balance",
                    maxWidth: "255px",
                  }}
                >
                  We sent a temporary log in code. Check your inbox at{" "}
                  <strong>yobapi7533@hiepth.com</strong>
                </span>
              </p>
            </div>

            {/* Code Input Fields */}
            <div className="flex justify-center mb-6">
              <div className="flex  rounded-lg ">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`relative flex h-15 w-[3.3rem] items-center justify-center border-y-2 border-r-2 text-base transition-all first:rounded-l-lg first:border-l-2 last:rounded-r-lg border-border-primary2 text-center ${
                      index < 5 ? "border-r border-gray-300" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="px-9">
              {/* Continue Button */}
              <Button
                variant="primary"
                size="lg"
                className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-background-inverse text-text-inverse h-14 px-7 rounded-7 gap-5 hover:scale-[1.02] transition-all w-full mb-6"
                onClick={() => router.push("/user-purpose")}
              >
                Continue
              </Button>

              <div className="flex flex-row justify-stretch gap-4">
                <div className="w-1/2">
                  <button
                    aria-busy="false"
                    className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary text-secondary-foreground hover:bg-secondary-hover h-14 px-7 rounded-7 gap-5 w-full hover:scale-[1.02] transition-all"
                    type="button"
                  >
                    <span className="truncate">Open Gmail</span>
                  </button>
                </div>
                <div className="w-1/2">
                  <button
                    aria-busy="false"
                    className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary text-secondary-foreground hover:bg-secondary-hover h-14 px-7 rounded-7 gap-5 w-full hover:scale-[1.02] transition-all"
                    type="button"
                  >
                    <span className="truncate">Open Outlook</span>
                  </button>
                </div>
              </div>

              {/* Join Text */}
              <p className="text-sm text-text-primary mt-9 text-center">
                Join 100k+ students
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-8 text-text-secondary3 w-64 text-center fixed bottom-0">
            <span className="text-sm text-text-tertiary">
              By continuing, you agree to Anara's{" "}
              <a
                href="https://anara.com/docs/legal/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-all duration-150 ease-in underline"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="https://anara.com/docs/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-all duration-150 ease-in underline"
              >
                Privacy Policy
              </a>
              .
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}