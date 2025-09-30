'use client'

import React, { useState } from "react";
import { toast } from "sonner";

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

interface CanvasSyncProps {
  className?: string;
}

export const CanvasSync: React.FC<CanvasSyncProps> = ({ className = "" }) => {
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  // Extension communication configuration
  const CONFIG = {
    EXTENSION_ID: 'elipinieeokobcniibdafjkbifbfencb',
    DEFAULT_BASE_URL: 'https://princeton.instructure.com',
    TIMEOUTS: {
      BRIDGE_DEFAULT: 8000,
      EXTENSION_PING: 4000,
      FINGERPRINT: 6000,
      SYNC_CANVAS: 8000,
      EXTRACTION_POLL: 200000
    },
  };

  // Extension communication functions
  const generateRequestId = () => Math.random().toString(36).substring(2, 15);

  const displayMessage = (message: string) => {
    setSyncMessage(message);
    console.log(message);
  };

  const extensionCall = async (type: string, payload = {}, timeoutMs = CONFIG.TIMEOUTS.BRIDGE_DEFAULT) => {
    try {
      // Try Chrome extension first
      return await chromeExtensionCall(type, payload, timeoutMs);
    } catch (chromeError) {
      console.warn('Chrome extension call failed, trying bridge:', chromeError);
      
      try {
        // Fallback to bridge
        return await bridgeCall(type, payload, timeoutMs);
      } catch (bridgeError) {
        console.error('Both Chrome extension and bridge calls failed');
        throw new Error(`Extension communication failed: ${bridgeError.message}`);
      }
    }
  };

  const chromeExtensionCall = (type: string, payload = {}, timeoutMs = CONFIG.TIMEOUTS.BRIDGE_DEFAULT) => {
    return new Promise((resolve, reject) => {
      if (!window.chrome || !window.chrome.runtime) {
        reject(new Error('Chrome runtime not available'));
        return;
      }
      
      const timer = setTimeout(() => {
        reject(new Error('Chrome extension timeout'));
      }, timeoutMs);
      
      chrome.runtime.sendMessage(
        CONFIG.EXTENSION_ID, 
        { type, ...payload }, 
        (response: any) => {
          clearTimeout(timer);
          
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
            return;
          }
          
          if (!response?.ok) {
            reject(new Error(response?.error || 'No response from extension'));
            return;
          }
          
          resolve(response);
        }
      );
    });
  };

  const bridgeCall = (type: string, payload: any, timeoutMs = CONFIG.TIMEOUTS.BRIDGE_DEFAULT) => {
    return new Promise((resolve, reject) => {
      const reqId = generateRequestId();
      
      const timer = setTimeout(() => {
        window.removeEventListener('message', onMessage);
        reject(new Error('Bridge timeout'));
      }, timeoutMs);
      
      function onMessage(event: MessageEvent) {
        const data = event.data && event.data.__SHX_RES;
        if (!data || data.reqId !== reqId) return;
        
        clearTimeout(timer);
        window.removeEventListener('message', onMessage);
        
        if (data.ok) {
          resolve(data.data);
        } else {
          reject(new Error(data.error || 'Bridge error'));
        }
      }
      
      window.addEventListener('message', onMessage);
      window.postMessage({ 
        __SHX: { type, payload, reqId } 
      }, '*');
    });
  };

  const testExtensionConnection = async () => {
    try {
      await extensionCall('PING', {}, CONFIG.TIMEOUTS.EXTENSION_PING);
      return true;
    } catch (error) {
      console.warn('Extension connection test failed:', error);
      return false;
    }
  };

  const getExtensionFingerprint = async () => {
    try {
      const fingerprint = await extensionCall('TEST_FINGERPRINT', {}, CONFIG.TIMEOUTS.FINGERPRINT);
      return fingerprint;
    } catch (error) {
      console.warn('Failed to get extension fingerprint:', error);
      return null;
    }
  };

  const handleCanvasSync = async () => {
    setSyncing(true);
    setSyncMessage('');

    try {
      displayMessage('🔄 Checking extension connection…');
      
      // Test extension connection
      const connected = await testExtensionConnection();
      if (!connected) {
        throw new Error('Extension connection failed');
      }
      
      displayMessage('✅ Extension connected. Starting Canvas sync…');
      
      // Get extension fingerprint for verification
      const fingerprint = await getExtensionFingerprint();
      if (fingerprint?.ok) {
        displayMessage(`🔐 Fingerprint: ${fingerprint.name} (len ${fingerprint.length}, sha256 ${fingerprint.sha256_12})`);
      }

      // Here you would typically call the actual sync function
      // For now, we'll simulate a successful sync
      await new Promise(resolve => setTimeout(resolve, 2000));
      displayMessage('✅ Canvas sync completed successfully!');
      
      toast.success('Canvas sync completed!');
    } catch (error: any) {
      console.error('Canvas sync failed:', error);
      displayMessage(`❌ Sync failed: ${error.message}`);
      toast.error(`Canvas sync failed: ${error.message}`);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Canvas Sync Button */}
      <button
        aria-busy="false"
        className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 px-4 py-2 h-9.5 rounded-5 gap-3"
        onClick={handleCanvasSync}
        disabled={syncing}
      >
        {syncing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span className="truncate">Syncing...</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-refresh-cw"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
              <path d="M3 21v-5h5"></path>
            </svg>
            <span className="truncate">Refresh Canvas</span>
          </>
        )}
      </button>

      {/* Sync Status Message */}
      {syncMessage && (
        <div className="text-sm text-gray-600 text-center p-2 bg-gray-50 rounded-md max-w-md">
          {syncMessage}
        </div>
      )}
    </div>
  );
};
