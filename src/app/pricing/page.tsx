'use client'

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
              <div className="space-y-8">
                <div>
                  <label className="block text-[17px] font-bold text-black mb-2.5">
                    What's your work email? <span className="text-black">*</span>
                  </label>
                  <input 
                    type="email"
                    className="w-full h-[46px] rounded-md border border-[#e5e7eb] bg-white px-4 text-[15px] text-black outline-none focus:border-[#d1d5db] placeholder:text-[#9ca3af] transition-colors font-normal" 
                    placeholder="name@school.edu" 
                  />
                </div>
                <div>
                  <label className="block text-[17px] font-bold text-black mb-2.5">
                    What's your school's name? <span className="text-black">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full h-[46px] rounded-md border border-[#e5e7eb] bg-white px-4 text-[15px] text-black outline-none focus:border-[#d1d5db] placeholder:text-[#9ca3af] transition-colors font-normal" 
                    placeholder="Your school's name" 
                  />
                </div>
                <div>
                  <label className="block text-[17px] font-bold text-black mb-2.5">
                    What's your name? <span className="text-black">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full h-[46px] rounded-md border border-[#e5e7eb] bg-white px-4 text-[15px] text-black outline-none focus:border-[#d1d5db] placeholder:text-[#9ca3af] transition-colors font-normal" 
                    placeholder="Your name" 
                  />
                </div>
                <div>
                  <label className="block text-[17px] font-bold text-black mb-2.5">
                    How many students are at your school? <span className="text-black">*</span>
                  </label>
                  <select 
                    className="w-full h-[46px] rounded-md border border-[#e5e7eb] bg-white px-4 text-[15px] text-[#9ca3af] outline-none focus:border-[#d1d5db] transition-colors font-normal appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat"
                  >
                    <option value="">Student enrollment</option>
                    <option value="1-500">1-500</option>
                    <option value="501-1000">501-1,000</option>
                    <option value="1001-5000">1,001-5,000</option>
                    <option value="5001-10000">5,001-10,000</option>
                    <option value="10001-25000">10,001-25,000</option>
                    <option value="25000+">25,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[17px] font-bold text-black mb-2.5">
                    How many seats are you interested in? <span className="text-black">*</span>
                  </label>
                  <select 
                    className="w-full h-[46px] rounded-md border border-[#e5e7eb] bg-white px-4 text-[15px] text-[#9ca3af] outline-none focus:border-[#d1d5db] transition-colors font-normal appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat"
                  >
                    <option value="">Seats needed</option>
                    <option value="1-100">1-100</option>
                    <option value="101-500">101-500</option>
                    <option value="501-1000">501-1,000</option>
                    <option value="1001-5000">1,001-5,000</option>
                    <option value="5001-10000">5,001-10,000</option>
                    <option value="10000+">10,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[17px] font-bold text-black mb-2.5">
                    What brought you to DuNorth? <span className="text-black">*</span>
                  </label>
                  <textarea 
                    className="w-full h-[110px] rounded-md border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-black outline-none focus:border-[#d1d5db] placeholder:text-[#9ca3af] transition-colors resize-none font-normal" 
                    placeholder="Your intended use-case"
                  />
                </div>
                <button type="submit" className="w-full h-[46px] rounded-md bg-black text-white text-[15px] font-semibold hover:bg-black/90 transition-colors">
                  Request demo
                </button>
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
    </div>
  )
}

