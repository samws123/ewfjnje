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
  const router = useRouter();
  const { user } = useAuth();

  const EXTENSION_ID = 'elipinieeokobcniibdafjkbifbfencb';
  const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/dunorth/gjchdhoaldcgmpclllljlpiefjolmdal';



  const checkExtensionInstalled = () => {
    return new Promise<boolean>((resolve) => {
      if (!window.chrome?.runtime) {
        resolve(false);
        return;
      }

      try {
        window.chrome.runtime.sendMessage(
          EXTENSION_ID,
          { type: 'PING' },
          (response) => {
            if (window.chrome?.runtime?.lastError) {
              resolve(false);
            } else {
              resolve(!!response?.ok);
            }
          }
        );
      } catch (error) {
        resolve(false);
      }
    });
  };

  const handleInstallExtension = () => {
    window.open(CHROME_STORE_URL, '_blank');
    router.push("/dashboard")
  };

  // Show simple install button
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Install Extension
        </h1> */}
        
        <Button
          variant="primary"
          size="lg"
          onClick={handleInstallExtension}
          className="w-full"
        >
          Install Extension
        </Button>
        
        <p className="text-sm text-gray-500 mt-4">
          Last step - We promise
        </p>
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
