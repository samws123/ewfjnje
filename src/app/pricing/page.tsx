'use client'

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      {/* Keep content below the fixed header */}
      <main className="mx-auto w-full px-9 md:px-13 lg:px-16 max-w-[1280px] pt-44 pb-32">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          {/* Left: Headline + intro + bullets */}
          <div>
            <h1 className="font-perfectly-nineties font-[550] text-[48px] md:text-[64px] lg:text-[72px] leading-[1.02] tracking-[-1px]">
              Meet DuNorth<br />Enterprise
            </h1>
            <p className="mt-6 text-[18px] leading-7 text-black/70 max-w-[48ch]">
              DuNorth helps your students learn faster with AI -- safely and at scale. We’d love to show you how.
            </p>
            <ul className="mt-10 space-y-3">
              {[
                'Secure workspace with admin controls',
                'SAML SSO authentication',
                'FERPA/SOC 2–aligned operations',
                'Volume discounts',
                'Priority support & onboarding',
                'Dedicated account manager',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3.5 text-[16px] leading-[26px]">
                  <span className="mt-1 inline-flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-[#EEF6FF] ring-1 ring-[#4299ff]/20">
                    <Check className="text-[#2F7FE8]" size={14} strokeWidth={3} />
                  </span>
                  <span className="text-[#6b7280]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Non-functional form (visual only) */}
          {!submitted ? (
            <form
              className="self-start w-full max-w-[560px] space-y-6"
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
            >
              <div className="space-y-6">
              <div>
                <label className="flex items-center gap-1.5 text-[13px] font-semibold text-black/80 mb-2 tracking-[-0.01em]">
                  Work email <span className="text-slate-400">•</span>
                </label>
                <input className="w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-slate-300 placeholder:text-slate-400 transition-colors" placeholder="name@school.edu" />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-[13px] font-semibold text-black/80 mb-2 tracking-[-0.01em]">
                  Institution / company <span className="text-slate-400">•</span>
                </label>
                <input className="w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-slate-300 placeholder:text-slate-400 transition-colors" placeholder="University / Organization" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-1.5 text-[13px] font-semibold text-black/80 mb-2 tracking-[-0.01em]">
                    First name <span className="text-slate-400">•</span>
                  </label>
                  <input className="w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-slate-300 placeholder:text-slate-400 transition-colors" />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[13px] font-semibold text-black/80 mb-2 tracking-[-0.01em]">
                    Last name <span className="text-slate-400">•</span>
                  </label>
                  <input className="w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-slate-300 placeholder:text-slate-400 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-1.5 text-[13px] font-semibold text-black/80 mb-2 tracking-[-0.01em]">
                    Headcount <span className="text-slate-400">•</span>
                  </label>
                  <input className="w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-slate-300 placeholder:text-slate-400 transition-colors" placeholder="e.g. 10,000" />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[13px] font-semibold text-black/80 mb-2 tracking-[-0.01em]">
                    Seats needed <span className="text-slate-400">•</span>
                  </label>
                  <input className="w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-slate-300 placeholder:text-slate-400 transition-colors" placeholder="e.g. 1,000" />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-[13px] font-semibold text-black/80 mb-2 tracking-[-0.01em]">
                  What brought you to DuNorth? <span className="text-slate-400">•</span>
                </label>
                <textarea className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-300 placeholder:text-slate-400 transition-colors" rows={4} placeholder="Tell us your intended use case" />
              </div>
                <button type="submit" className="w-full h-12 rounded-xl bg-black text-white font-medium hover:bg-black/85">Request demo</button>
              </div>
            </form>
          ) : (
            <div className="self-start w-full max-w-[560px] rounded-3xl ring-1 ring-black/10 p-8 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04),0_16px_40px_rgba(0,0,0,0.06)] flex items-start gap-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E6FAEF] ring-1 ring-emerald-300/40">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#0BA360" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </span>
              <div>
                <div className="font-semibold text-[16px] tracking-[-0.01em]">Thanks—request received</div>
                <div className="mt-1 text-[14px] leading-6 text-black/70">We’ll reach out to you shortly. In the meantime, you can reply to support@dunorth.io if you have any questions.</div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

