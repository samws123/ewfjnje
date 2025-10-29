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
      <main className="flex flex-col items-center mx-auto w-full px-9 md:px-13 lg:px-16 max-w-[1280px] py-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-red-600 text-sm font-medium mb-4 tracking-wide uppercase">
            Pricing
          </p>
          <h1 className="font-perfectly-nineties font-[550] text-[48px] md:text-[56px] lg:text-[64px] leading-tight mb-6">
            Choose Your DuNorth Plan
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
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
          <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="mb-8">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Department Plan</h2>
              <p className="text-gray-600">
                For individual programs, courses, and departments.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                Features
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Unlimited AI Assistants</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Analytics dashboard</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">FERPA/COPPA compliant</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Basic support and training</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">LMS integration (iframe)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Comprehensive help guide</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Flexible AI model selection</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-4 px-6 rounded-lg transition-colors">
              Contact sales
            </button>
          </div>

          {/* Institution Plan */}
          <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="mb-8">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Institution Plan</h2>
              <p className="text-gray-600">
                For small to large campuses.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                Features
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Everything in our <span className="font-semibold text-gray-900">Department Plan</span> plus....
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Campus-wide implementation</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Advanced support and training</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Centralized management</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">Cost savings at scale</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">LMS integration (LTI 1.3)</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-4 px-6 rounded-lg transition-colors">
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

