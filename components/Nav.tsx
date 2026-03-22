'use client';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 bg-cream/90 backdrop-blur-md border-b border-navy/8">
      <div className="font-display text-[22px] font-black text-navy tracking-tight">
        Why<span className="text-teal">ze</span>
      </div>
      <Link
        href="#cta"
        className="bg-navy text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-navy-mid transition-colors"
      >
        Join the Beta
      </Link>
    </nav>
  );
}
