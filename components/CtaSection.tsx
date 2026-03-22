'use client';
import { useEffect, useRef } from 'react';
import WaitlistForm from './WaitlistForm';

export default function CtaSection() {
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
    <section
      id="cta"
      ref={ref}
      className="py-32 px-6 lg:px-12 text-center relative overflow-hidden bg-cream"
    >
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-teal/8 to-transparent pointer-events-none" />

      <h2 className="font-display text-[clamp(36px,5vw,56px)] font-black text-navy tracking-tight leading-[1.1] mb-5 relative fade-up">
        Ready to pass{' '}
        <em className="italic text-teal">on your terms?</em>
      </h2>

      <p className="text-[18px] text-[#6B7280] max-w-[480px] mx-auto mb-10 leading-relaxed relative fade-up">
        Join the beta. Free access. No credit card required. We open spots in small cohorts
        to make sure every user gets a great experience.
      </p>

      <div className="flex justify-center relative fade-up">
        <WaitlistForm
          source="cta"
          buttonText="Claim My Spot →"
        />
      </div>

      <p className="text-[13px] text-[#6B7280] mt-4 relative fade-up">
        Free during beta · $39/month after · Cancel anytime
      </p>
    </section>
  );
}
