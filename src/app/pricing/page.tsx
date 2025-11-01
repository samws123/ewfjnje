'use client'

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      {/* Keep content below the fixed header */}
      <main className="mx-auto w-full px-9 md:px-13 lg:px-16 max-w-[1280px] pt-32 pb-24">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Headline + intro + bullets */}
          <div>
            <h1 className="font-perfectly-nineties font-[550] text-[44px] md:text-[56px] leading-[1.05] tracking-[-0.6px]">
              Meet DuNorth Enterprise
            </h1>
            <p className="mt-5 text-[17px] leading-7 text-black/70 max-w-[46ch]">
              DuNorth helps your students learn faster with AI—safely and at scale. We’d love to show you how.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Secure workspace with admin controls',
                'SAML SSO authentication',
                'FERPA/SOC 2–aligned operations',
                'Volume discounts',
                'Priority support & onboarding',
                'Dedicated account manager',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-6">
                  <Check className="w-4 h-4 mt-1 text-black" />
                  <span className="text-gray-900">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Non-functional form (visual only) */}
          <form
            className="rounded-3xl border border-black/10 p-8 bg-white shadow-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-5">
              <div>
                <label className="block text-[13px] font-medium mb-2">Work email</label>
                <input className="w-full h-12 rounded-xl border border-black/15 px-4 outline-none focus:border-black/40" placeholder="name@school.edu" />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-2">Institution / company</label>
                <input className="w-full h-12 rounded-xl border border-black/15 px-4 outline-none focus:border-black/40" placeholder="University / Organization" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-medium mb-2">First name</label>
                  <input className="w-full h-12 rounded-xl border border-black/15 px-4 outline-none focus:border-black/40" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium mb-2">Last name</label>
                  <input className="w-full h-12 rounded-xl border border-black/15 px-4 outline-none focus:border-black/40" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-medium mb-2">Headcount</label>
                  <input className="w-full h-12 rounded-xl border border-black/15 px-4 outline-none focus:border-black/40" placeholder="e.g. 10,000" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium mb-2">Seats needed</label>
                  <input className="w-full h-12 rounded-xl border border-black/15 px-4 outline-none focus:border-black/40" placeholder="e.g. 1,000" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-2">What brought you to DuNorth?</label>
                <textarea className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/40" rows={4} placeholder="Tell us your intended use case" />
              </div>
              <button className="w-full h-12 rounded-xl bg-black text-white font-medium hover:bg-black/85">Request demo</button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

