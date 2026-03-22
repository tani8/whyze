'use client';
import { useEffect, useRef } from 'react';

const FEATURES = [
  {
    icon: '🧠',
    bg: 'bg-teal/10',
    title: 'Personalized Wrong-Answer Analysis',
    body:
      "When you miss a question, our AI doesn't just show you the right answer. It analyzes why your specific choice was wrong and what concept you need to revisit.",
  },
  {
    icon: '🔁',
    bg: 'bg-navy/8',
    title: 'Spaced Repetition That Adapts',
    body:
      'Our SM-2 algorithm resurfaces your weak questions at exactly the right moment — not too early to bore you, not too late to forget.',
  },
  {
    icon: '📊',
    bg: 'bg-gold/10',
    title: 'Clinical Gap Dashboard',
    body:
      'See your pass rate by exam category at a glance. Know exactly which areas need attention before your exam date.',
  },
];

export default function WhySection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 lg:px-12 bg-white">
      <div className="fade-up">
        <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-teal mb-4">
          Why Whyze
        </p>
        <h2 className="font-display text-[clamp(32px,4vw,48px)] font-black text-navy tracking-tight leading-[1.1] mb-4">
          Built for how you actually learn
        </h2>
        <p className="text-[17px] text-[#6B7280] leading-relaxed max-w-[520px] mb-16">
          Passing your exam isn&apos;t about memorizing answers. It&apos;s about closing gaps in your
          reasoning — and that requires knowing exactly where your thinking went wrong.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className="fade-up p-8 rounded-2xl border border-navy/8 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,31,61,0.08)] transition-all duration-200"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 ${f.bg}`}>
              {f.icon}
            </div>
            <h3 className="text-[17px] font-bold text-navy mb-2.5">{f.title}</h3>
            <p className="text-[14px] leading-relaxed text-[#6B7280]">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
