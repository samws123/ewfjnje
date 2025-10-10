'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
  subscription_status?: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  subscription_current_period_start?: string;
  subscription_current_period_end?: string;
  subscription_plan?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => void;
  checkAuth: (forceRefresh?: boolean) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// localStorage keys
const USER_STORAGE_KEY = 'auth_user_profile';
const USER_CACHE_EXPIRY_KEY = 'auth_user_cache_expiry';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Helper functions for localStorage
const saveUserToStorage = (userData: User) => {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem(USER_CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

const getUserFromStorage = (): User | null => {
  try {
    const cachedUser = localStorage.getItem(USER_STORAGE_KEY);
    const cacheExpiry = localStorage.getItem(USER_CACHE_EXPIRY_KEY);
    
    if (!cachedUser || !cacheExpiry) {
      return null;
    }
    
    // Check if cache is expired
    if (Date.now() > parseInt(cacheExpiry)) {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(USER_CACHE_EXPIRY_KEY);
      return null;
    }
    
    return JSON.parse(cachedUser);
  } catch (error) {
    console.error('Error reading user from localStorage:', error);
    return null;
  }
};

const clearUserFromStorage = () => {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(USER_CACHE_EXPIRY_KEY);
  } catch (error) {
    console.error('Error clearing user from localStorage:', error);
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const cachedUser = getUserFromStorage();
    if (cachedUser) {
      console.log('Initializing with cached user data');
      setUser(cachedUser);
      setLoading(false);
    }
  }, []);

  const checkAuth = async (forceRefresh = false) => {
    // For NextAuth sessions, we get user data from the session
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    if (session?.user) {
      const userData = {
        id: session.user.id,
        email: session.user.email!,
        name: session.user.name || undefined,
        emailVerified: session.user.emailVerified || false,
      };
      setUser(userData);
      saveUserToStorage(userData);
    } else {
      // Check localStorage cache first (unless forced refresh)
      if (!forceRefresh) {
        const cachedUser = getUserFromStorage();
        if (cachedUser) {
          console.log('Using cached user data');
          setUser(cachedUser);
          setLoading(false);
          return;
        }
      }

      // Fallback to JWT cookie check for non-NextAuth users
      try {
        console.log('Fetching user data from API');
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          // Save to localStorage for future use
          if (data.user) {
            saveUserToStorage(data.user);
          }
        } else {
          setUser(null);
          clearUserFromStorage();
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setUser(null);
        clearUserFromStorage();
      }
    }
    
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, [session, status]);

  const refreshUser = async () => {
    await checkAuth(true); // Force refresh from API
  };

  const signOut = async () => {
    try {
      // Clear localStorage first
      clearUserFromStorage();
      
      if (session) {
        // Use NextAuth signOut for NextAuth sessions
        await nextAuthSignOut({ callbackUrl: '/signup' });
      } else {
        // Use custom logout for JWT sessions
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
       
        window.location.href = '/signup';
      }
    } catch (error) {
      console.error('Error signing out:', error);
      // Force logout even if API call fails
      document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      clearUserFromStorage();
      setUser(null);
      window.location.href = '/signup';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, checkAuth, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
