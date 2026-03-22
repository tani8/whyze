'use client';
import { useEffect, useRef } from 'react';

const TESTIMONIALS = [
  {
    stars: 5,
    text: "I've used UWorld for months. Whyze is the first tool that actually told me why I keep missing pharmacology questions. It's like having a tutor who knows exactly how my brain works.",
    initials: 'JK',
    name: 'Jasmine K.',
    role: 'RN Student, University of Texas',
    bg: '#2D6A4F',
  },
  {
    stars: 5,
    text: 'The dashboard showing my weak NCLEX categories is something I wish I had from day one. I went from a 48% pass rate in med-surg to 71% in two weeks.',
    initials: 'ML',
    name: 'Marcus L.',
    role: 'Nursing Student, Ohio State',
    bg: '#1B4F72',
  },
  {
    stars: 5,
    text: "I failed NCLEX twice. On my third attempt I used Whyze exclusively for the last 6 weeks. I passed with 85 questions. The AI explanations are that good.",
    initials: 'SR',
    name: 'Sunita R.',
    role: 'New RN, Kaiser Permanente',
    bg: '#7B2D8B',
  },
];

export default function TestimonialsSection() {
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
    <section ref={ref} className="py-24 px-6 lg:px-12 bg-warm">
      <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-teal mb-4 fade-up">
        Beta Feedback
      </p>
      <h2 className="font-display text-[clamp(32px,4vw,48px)] font-black text-navy tracking-tight leading-[1.1] mb-16 fade-up">
        What students are saying
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.name}
            className="fade-up bg-white rounded-2xl p-7 shadow-[0_4px_20px_rgba(15,31,61,0.06)]"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="text-gold tracking-widest text-[16px] mb-4">
              {'★'.repeat(t.stars)}
            </div>
            <p className="text-[15px] leading-relaxed text-[#1A1A2E] italic mb-5">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                style={{ backgroundColor: t.bg }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[15px]"
              >
                {t.initials}
              </div>
              <div>
                <div className="font-semibold text-[14px] text-navy">{t.name}</div>
                <div className="text-[12px] text-[#6B7280]">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
