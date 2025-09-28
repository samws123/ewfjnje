import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function Home() {
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
    </div>
  );
}