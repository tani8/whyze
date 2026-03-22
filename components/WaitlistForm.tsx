'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  source?: string;
  buttonText?: string;
  className?: string;
};

export default function WaitlistForm({
  source = 'landing',
  buttonText = 'Get Early Access →',
  className,
}: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 bg-teal/10 border border-teal rounded-lg px-5 py-3.5 text-teal font-semibold text-[15px]">
        ✓ You&apos;re on the list! Check your inbox shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex max-w-[460px]', className)}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-5 py-4 text-[15px] border-2 border-navy/15 border-r-0 rounded-l-lg bg-white outline-none focus:border-teal transition-colors font-sans"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-7 py-4 bg-teal text-white font-semibold text-[15px] rounded-r-lg hover:bg-teal-light transition-colors disabled:opacity-60 whitespace-nowrap font-sans"
      >
        {status === 'loading' ? 'Joining...' : buttonText}
      </button>
    </form>
  );
}
