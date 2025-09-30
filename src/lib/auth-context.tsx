'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    // For NextAuth sessions, we get user data from the session
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email!,
        name: session.user.name || undefined,
        emailVerified: session.user.emailVerified || false,
      });
    } else {
      // Fallback to JWT cookie check for non-NextAuth users
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setUser(null);
      }
    }
    
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, [session, status]);

  const signOut = async () => {
    try {
      if (session) {
        // Use NextAuth signOut for NextAuth sessions
        await nextAuthSignOut({ callbackUrl: '/signup' });
      } else {
        // Use custom logout for JWT sessions
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
        toast.success('Logged out successfully');
        window.location.href = '/signup';
      }
    } catch (error) {
      console.error('Error signing out:', error);
      // Force logout even if API call fails
      document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setUser(null);
      window.location.href = '/signup';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, checkAuth }}>
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
