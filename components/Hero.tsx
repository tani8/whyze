'use client';
import { useEffect, useRef } from 'react';
import WaitlistForm from './WaitlistForm';

const AVATARS = [
  { initials: 'JK', bg: '#2D6A4F' },
  { initials: 'ML', bg: '#1B4F72' },
  { initials: 'SR', bg: '#7B2D8B' },
  { initials: 'PT', bg: '#C9973A' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-16 px-6 lg:px-12 pt-28 pb-20 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-gradient-radial from-teal/10 to-transparent pointer-events-none" />

      {/* LEFT — Copy */}
      <div>
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 px-4 py-1.5 rounded-full text-[12px] font-semibold text-teal uppercase tracking-widest mb-6 fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-dot" />
          Beta Opening Spring 2026
        </div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(40px,5vw,64px)] font-black leading-[1.08] text-navy tracking-tight mb-6 fade-up">
          Exam prep that explains{' '}
          <em className="italic text-teal not-italic">why you</em>
          <br />got it wrong
        </h1>

        {/* Subhead */}
        <p className="text-lg leading-relaxed text-[#6B7280] max-w-[480px] mb-10 fade-up">
          Every other platform shows you the right answer.{' '}
          <strong className="text-navy font-semibold">Whyze gives you a personalized AI explanation</strong>{' '}
          of your exact reasoning error — so you never make the same mistake twice.
        </p>

        {/* Form */}
        <div className="fade-up">
          <WaitlistForm source="hero" />
          <p className="text-[13px] text-[#6B7280] mt-3">
            Free beta access · No credit card · Cancel anytime
          </p>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-3 mt-10 fade-up">
          <div className="flex">
            {AVATARS.map((a, i) => (
              <div
                key={a.initials}
                style={{ backgroundColor: a.bg, marginLeft: i === 0 ? 0 : -10 }}
                className="w-9 h-9 rounded-full border-2 border-cream flex items-center justify-center text-white text-[13px] font-bold"
              >
                {a.initials}
              </div>
            ))}
          </div>
          <p className="text-[14px] text-[#6B7280]">
            <strong className="text-navy">340+ students</strong> already on the waitlist
          </p>
        </div>
      </div>

      {/* RIGHT — Question Card */}
      <div className="relative fade-up">
        {/* Floating badge */}
        <div className="absolute -top-4 -right-4 z-10 bg-gold text-white px-4 py-2.5 rounded-xl text-[13px] font-bold shadow-lg rotate-3">
          ✦ AI-Powered
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-[0_20px_60px_rgba(15,31,61,0.12),0_4px_16px_rgba(15,31,61,0.06)] animate-float">
          {/* Card header */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-teal bg-teal/10 px-3 py-1 rounded-full">
              Pharmacology
            </span>
            <span className="font-mono text-[12px] text-[#6B7280]">Q 47 / 200</span>
          </div>

          {/* Question */}
          <p className="text-[15px] leading-relaxed text-navy font-medium mb-5">
            A client is prescribed metformin for type 2 diabetes. Which lab value requires
            the nurse to hold the medication and notify the provider?
          </p>

          {/* Options */}
          <div className="flex flex-col gap-2.5 mb-5">
            <Option letter="A" text="HbA1c of 8.2%" state="wrong" />
            <Option letter="B" text="Serum creatinine of 2.1 mg/dL" state="correct" />
            <Option letter="C" text="Fasting glucose of 180 mg/dL" state="neutral" />
            <Option letter="D" text="eGFR of 65 mL/min" state="neutral" />
          </div>

          {/* AI Explanation */}
          <div className="bg-gradient-to-br from-navy/[0.04] to-teal/[0.06] border border-teal/20 rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-4 h-4 bg-navy rounded-[4px] flex items-center justify-center text-white text-[9px]">
                ✦
              </div>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-navy">
                Whyze explains your mistake
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-navy">
              You selected A (HbA1c), which suggests you&apos;re focused on glycemic control — but
              metformin&apos;s risk is{' '}
              <span className="text-teal font-semibold">lactic acidosis via renal accumulation</span>.
              Elevated creatinine signals impaired clearance, requiring the med to be held.
              eGFR of 65 is still acceptable; the threshold is typically &lt;30.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Option({
  letter,
  text,
  state,
}: {
  letter: string;
  text: string;
  state: 'correct' | 'wrong' | 'neutral';
}) {
  const styles = {
    correct: 'border-teal bg-teal/8 text-teal font-semibold',
    wrong: 'border-[#E55C5C] bg-[#E55C5C]/7 text-[#E55C5C]',
    neutral: 'border-navy/10 text-[#4A4A5A]',
  };
  const letterStyles = {
    correct: 'bg-teal text-white',
    wrong: 'bg-[#E55C5C] text-white',
    neutral: 'bg-navy/8 text-[#6B7280]',
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-[1.5px] text-[14px] ${styles[state]}`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0 ${letterStyles[state]}`}>
        {letter}
      </div>
      {text}
    </div>
  );
}
