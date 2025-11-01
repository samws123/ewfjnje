'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Smooth-scroll to hash targets with offset once the page mounts
    const hash = window.location.hash?.slice(1);
    if (hash) {
      const headerOffset = 120;
      const extraOffset = hash === 'testimonials' ? Math.round(window.innerHeight * 0.05) : 0;
      const section = document.getElementById(hash);
      if (section) {
        const top = Math.max(0, section.getBoundingClientRect().top + window.scrollY - headerOffset + extraOffset);
        // Delay to allow header/menu transitions to close
        setTimeout(() => window.scrollTo({ top, behavior: 'smooth' }), 100);
      }
    }
  }, []);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render home page if user is authenticated (will redirect)
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      <main className="flex flex-col items-center mx-auto w-full px-9 md:px-13 lg:px-16 max-w-[1280px]">
        <Hero />
        <Features />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <ScrollToTop />

      {/* Debug button (temporary) */}
      <button
        onClick={() => router.push('/closedbeta?v=debug')}
        className="fixed bottom-5 right-5 z-50 bg-black text-white text-xs px-3 py-2 rounded-md shadow hover:bg-gray-800"
        aria-label="Go to Closed Beta (debug)"
      >
        Closed Beta (debug)
      </button>
    </div>
  );
}