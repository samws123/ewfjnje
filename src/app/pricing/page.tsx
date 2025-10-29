'use client'

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('ai');

  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      {/* offset for fixed header so content never scrolls underneath */}
      <main className="flex flex-col items-center mx-auto w-full px-9 md:px-13 lg:px-16 max-w-[1280px] pt-32 pb-24">
        {/* Header Section */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium mb-3 tracking-wide uppercase text-black/60">
            Pricing
          </p>
          <h1 className="font-perfectly-nineties font-[550] text-[44px] md:text-[52px] lg:text-[60px] leading-[1.05]">
            Choose Your DuNorth Plan
          </h1>
          <p className="font-system text-base md:text-lg text-secondary-foreground tracking-[-0.32px] max-w-2xl mx-auto mt-4">
            Affordable plans for programs of any size.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-16 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-8 py-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'ai'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            DuNorth AI
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-8 py-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'chat'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            DuNorth Chat
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Department Plan */}
          <div className="border border-black/10 rounded-3xl p-10 hover:shadow-md transition-shadow bg-white">
            <div className="mb-6">
              <h2 className="text-[24px] font-semibold tracking-[-0.2px]">Department Plan</h2>
              <p className="text-black/60 mt-2">
                For individual programs, courses, and departments.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-semibold text-black mb-4 uppercase tracking-wide">
                Features
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-900 text-[15px] leading-6">Unlimited AI Assistants</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-900 text-[15px] leading-6">Analytics dashboard</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-900 text-[15px] leading-6">FERPA/COPPA compliant</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-900 text-[15px] leading-6">Basic support and training</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-900 text-[15px] leading-6">LMS integration (iframe)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-900 text-[15px] leading-6">Comprehensive help guide</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-900 text-[15px] leading-6">Flexible AI model selection</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-black hover:bg-black/85 text-white font-medium py-4 px-6 rounded-lg transition-colors">
              Contact sales
            </button>
          </div>

          {/* Institution Plan */}
          <div className="border border-black/10 rounded-3xl p-10 hover:shadow-md transition-shadow bg-white">
            <div className="mb-6">
              <h2 className="text-[24px] font-semibold tracking-[-0.2px]">Institution Plan</h2>
              <p className="text-black/60 mt-2">
                For small to large campuses.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-semibold text-black mb-4 uppercase tracking-wide">
                Features
              </h3>
              <p className="text-black/60 text-[15px] mb-4">
                Everything in our <span className="font-semibold text-black">Department Plan</span> plus...
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-900 text-[15px] leading-6">Campus-wide implementation</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-900 text-[15px] leading-6">Advanced support and training</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-900 text-[15px] leading-6">Centralized management</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-900 text-[15px] leading-6">Cost savings at scale</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-900 text-[15px] leading-6">LMS integration (LTI 1.3)</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-black hover:bg-black/85 text-white font-medium py-4 px-6 rounded-lg transition-colors">
              Contact sales
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

