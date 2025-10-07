'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import DuNorthLogo from "@/components/DuNorthLogo";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signIn('google', { 
        callbackUrl: '/user-purpose',
        redirect: false 
      });
      
      if (result?.error) {
        
      }
    } catch (error) {
   
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      setLoading(true);
      console.log('Starting Microsoft sign-in...');
      const result = await signIn('azure-ad', { 
        callbackUrl: '/user-purpose',
        redirect: false 
      });
      
      console.log('Microsoft sign-in result:', result);
      
      if (result?.error) {
        console.error('Microsoft sign-in error:', result.error);
        
      } else if (result?.ok) {
        console.log('Microsoft sign-in successful');
      
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Microsoft sign-in exception:', error);

    } finally {
      setLoading(false);
    }
  };

  const handleContinueWithEmail = async () => {
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      
      // Send verification code
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          isSignup: true
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to verification page with email
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      
      } else {
        toast.error(data.error || 'Failed to send verification code');
      }
    } catch (error) {
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute requireAuth={false} redirectTo="/user-purpose">
      <div
        className="min-h-screen bg-white flex flex-col items-center justify-center px-4 font-inter font-medium leading-6 tracking-[-0.32px] antialiased"
        style={{
          colorScheme: "light",
          fontFeatureSettings: "normal",
          fontVariationSettings: "normal",
        }}
      >
      <div className="fixed top-0 flex flex-row justify-between px-9 py-11 w-full">
        <div>
          <button
            className="flex justify-center items-center w-11 h-11 rounded-4 p-3 ease-in transition-all duration-150 cursor-pointer hover:bg-popover-hover"
            type="button"
            onClick={() => router.push("/")}
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
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <DuNorthLogo className="w-[64px] h-auto" />
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
          </div>

          {/* Social Login Buttons */}
          <div className=" ">
            <button
              className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary text-secondary-foreground hover:bg-secondary-hover h-14 px-7 rounded-7 hover:scale-[1.02] transition-all gap-4 w-full"
              onClick={handleGoogleSignIn}
              disabled={loading}
              style={{
                fontFeatureSettings: "normal",
                fontVariationSettings: "normal",
                colorScheme: "light",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
                />
              </svg>
              {loading ? 'Loading...' : 'Continue with Google'}
            </button>

            <button
              className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary text-secondary-foreground hover:bg-secondary-hover h-14 px-7 rounded-7 hover:scale-[1.02] transition-all gap-4 w-full mt-6"
              onClick={handleMicrosoftSignIn}
              disabled={loading}
              style={{
                fontFeatureSettings: "normal",
                fontVariationSettings: "normal",
                colorScheme: "light",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="0" y="0" width="11.5" height="11.5" fill="#F25022" />
                <rect
                  x="12.5"
                  y="0"
                  width="11.5"
                  height="11.5"
                  fill="#7FBA00"
                />
                <rect
                  x="0"
                  y="12.5"
                  width="11.5"
                  height="11.5"
                  fill="#00A4EF"
                />
                <rect
                  x="12.5"
                  y="12.5"
                  width="11.5"
                  height="11.5"
                  fill="#FFB900"
                />
              </svg>
              {loading ? 'Loading...' : 'Continue with Microsoft'}
            </button>

            <button
              className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary text-secondary-foreground hover:bg-secondary-hover h-14 px-7 rounded-7 hover:scale-[1.02] transition-all gap-4 w-full mt-6"
             
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
             Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 w-full flex flex-row items-center px-2 ">
            <div className="h-1 w-full bg-border1"></div>
            <div className="bg-white mx-7 text-sm text-text-secondary">or</div>
            <div className="h-1 w-full bg-border1"></div>
          </div>

          <div className="flex flex-col gap-6">
            <input
              placeholder="Email"
              className="font-medium border-2 border-border-primary2 rounded-7 px-7 p-4 h-14 focus:outline-none placeholder:text-text-secondary3 focus:border-blue"
              required
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <button
              aria-busy={loading}
              className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-background-inverse text-text-inverse h-14 px-7 rounded-7 gap-5 hover:scale-[1.02] transition-all"
              type="submit"
              onClick={handleContinueWithEmail}
              disabled={loading}
            >
              <span className="truncate">
                {loading ? 'Sending...' : 'Continue with email'}
              </span>
            </button>
          </div>

          {/* Join Text */}
          <p className="text-sm text-text-primary mt-9 text-center  ">
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
 
    </ProtectedRoute>
  );
}
