'use client'

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import DuNorthLogo from "@/components/DuNorthLogo";

export default function EmailVerificationContent() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkAuth } = useAuth();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const modeParam = searchParams.get('mode');
    
    if (emailParam) {
      setEmail(emailParam);
      setMode(modeParam === 'signin' ? 'signin' : 'signup');
    } else {
      // Redirect back to signup if no email
      router.push('/signup');
    }
  }, [searchParams, router]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
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

  const handleVerify = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code: verificationCode,
          name: email.split('@')[0], // Extract name from email
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh auth context to get user data
        await checkAuth();
        
        // Redirect based on mode
        if (data.message !== 'Successfully signed in') {
          // New user goes to institution setup
          router.push('/user-purpose');
        } else {
          // Existing user - check if they have a school selected
          try {
            const profileResponse = await fetch('/api/user/profile');
            if (profileResponse.ok) {
              const profileData = await profileResponse.json();
              if (profileData.profile && profileData.profile.school_id) {
                // User has school selected, go to invite-friends
                router.push('/invite-friends');
              } else {
                // User doesn't have school selected, go to school selection
                router.push('/user-purpose');
              }
            } else {
              // If profile check fails, default to user-purpose
              router.push('/user-purpose');
            }
          } catch (error) {
            console.error('Error checking user profile:', error);
            // If profile check fails, default to user-purpose
            router.push('/user-purpose');
          }
        }
      } else {
        toast.error(data.error || 'Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('An error occurred during verification');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          isSignup: mode === 'signup'
        }),
      });

      if (response.ok) {
        toast.success('New verification code sent');
        setCode(["", "", "", "", "", ""]);
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to resend code');
      }
    } catch (error) {
      console.error('Resend error:', error);
      toast.error('Failed to resend code');
    } finally {
      setIsLoading(false);
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
              <DuNorthLogo className="w-[64px] h-auto mx-auto mb-6" />
              <h2 className="text-xl text-center mb-3">
                <span
                  style={{
                    display: "inline-block",
                    verticalAlign: "top",
                    textDecoration: "inherit",
                    textWrap: "balance",
                  }}
                >
                  {mode === 'signup' ? "Verify your email" : "Sign in"}
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
                  We sent a temporary {mode === 'signup' ? "verification" : "login"} code. Check your inbox at{" "}
                  <strong>{email}</strong>
                </span>
              </p>
            </div>

            {/* Code Input Fields */}
            <div className="flex justify-center mb-6">
              <div className="flex rounded-lg">
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
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            <div className="px-9">
              {/* Continue Button */}
              <button
                className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-background-inverse text-text-inverse h-14 px-7 rounded-7 gap-5 hover:scale-[1.02] transition-all w-full mb-6"
                onClick={handleVerify}
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Continue"}
              </button>

              {/* Resend code button */}
              <div className="text-center mb-6">
                <button
                  onClick={handleResendCode}
                  disabled={isLoading}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Didn't receive the code? Resend
                </button>
              </div>

              <div className="flex flex-row justify-stretch gap-4">
                <div className="w-1/2">
                  <button
                    aria-busy="false"
                    className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary text-secondary-foreground hover:bg-secondary-hover h-14 px-7 rounded-7 gap-5 w-full hover:scale-[1.02] transition-all"
                    type="button"
                    onClick={() => window.open('https://gmail.com', '_blank')}
                  >
                    <span className="truncate">Open Gmail</span>
                  </button>
                </div>
                <div className="w-1/2">
                  <button
                    aria-busy="false"
                    className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary text-secondary-foreground hover:bg-secondary-hover h-14 px-7 rounded-7 gap-5 w-full hover:scale-[1.02] transition-all"
                    type="button"
                    onClick={() => window.open('https://outlook.com', '_blank')}
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
              By continuing, you agree to DuNorth's{" "}
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
