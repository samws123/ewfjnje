'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Chrome extension types
declare global {
  interface Window {
    chrome?: {
      runtime?: {
        sendMessage: (extensionId: string, message: any, callback: (response: any) => void) => void;
        lastError?: { message: string };
      };
    };
  }
}

function InstallExtension() {
  const [checking, setChecking] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Check for success parameter from payment
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('upgrade') === 'success') {
      toast.success('Payment successful! Now install the extension to get started.');
    }
  }, []);

  const EXTENSION_ID = 'deiphgmjjaananhnhnlehfojldceoplj';
  const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/studyhackz/lhfclolcgndpomhfdijbocgcbjhfjkah';

  const handleInstallExtension = () => {
    window.open(CHROME_STORE_URL, '_blank');
  };

  const checkExtensionInstalled = () => {
    return new Promise<boolean>((resolve) => {
      if (!window.chrome?.runtime) {
        resolve(false);
        return;
      }

      try {
        window.chrome.runtime.sendMessage(
          EXTENSION_ID,
          { action: 'ping' },
          (response) => {
            if (window.chrome?.runtime?.lastError) {
              resolve(false);
            } else {
              resolve(!!response);
            }
          }
        );
      } catch (error) {
        resolve(false);
      }
    });
  };

  const handleCheckInstalled = async () => {
    setChecking(true);
    
    try {
      const isInstalled = await checkExtensionInstalled();
      
      if (isInstalled) {
        toast.success('Extension detected! Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        toast.error('Extension not detected. Please install the extension first.');
      }
    } catch (error) {
      console.error('Error checking extension:', error);
      toast.error('Could not detect extension. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Install DnNorth Extension
          </h1>
          <p className="text-gray-600 text-sm">
            Get the most out of your subscription with our Chrome extension
          </p>
        </div>

        {/* Extension Icon/Logo Area */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>

        {/* Benefits List */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Access your study materials instantly</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Sync with your Canvas courses</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Get AI-powered study assistance</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          {/* Install Extension Button */}
          <Button
            variant="primary"
            size="lg"
            className="inline-flex items-center select-none relative justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-background-inverse text-text-inverse px-1.5 py-2 text-sm rounded-4 font-medium gap-3 w-full rounded-6 h-14"
            onClick={handleInstallExtension}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Install Extension
          </Button>

          {/* I Installed It Button */}
          <Button
            variant="secondary"
            size="lg"
            className="inline-flex items-center select-none relative justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary text-secondary-foreground hover:bg-secondary-hover px-1.5 py-2 text-sm rounded-4 font-medium gap-3 w-full rounded-6 h-14"
            onClick={handleCheckInstalled}
            disabled={checking}
          >
            {checking ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                Checking...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                I Installed It
              </>
            )}
          </Button>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 font-normal">
            (last step - we promise)
          </p>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center justify-center py-8 text-text-primary w-full text-center text-sm">
          <span className="mb-2">
            Continuing as{" "}
            <span className="font-semibold">{user?.email}</span>
          </span>
          <span>
            Log in with another email{" "}
            <a
              href="/signup"
              className="hover:text-black transition-all duration-150 ease-in underline"
            >
              here
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

// Wrap with authentication
function InstallExtensionPage() {
  return (
    <ProtectedRoute requireAuth={true} redirectTo="/signup">
      <InstallExtension />
    </ProtectedRoute>
  );
}

export default InstallExtensionPage;
