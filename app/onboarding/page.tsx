'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';

const WEAK_AREAS = [
  'Pharmacology',
  'Medical-Surgical',
  'Maternal & Newborn',
  'Pediatrics',
  'Mental Health',
  'Fundamentals',
  'Leadership',
  'Community Health',
];

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [examDate, setExamDate] = useState('');
  const [weakAreas, setWeakAreas] = useState<string[]>([]);
  const [dailyGoal, setDailyGoal] = useState(20);
  const [saving, setSaving] = useState(false);

  function toggleArea(area: string) {
    setWeakAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    // Upsert user record in Supabase
    await supabase.from('users').upsert({
      clerk_id: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: user.fullName,
      exam_date: examDate || null,
      weak_areas: weakAreas,
      daily_goal: dailyGoal,
    });

    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <div className="font-display text-[24px] font-black text-navy mb-2">
          Why<span className="text-teal">ze</span>
        </div>
        <h1 className="font-display text-[32px] font-black text-navy mb-2">
          Let&apos;s personalize your plan
        </h1>
        <p className="text-[#6B7280] mb-8">Takes 30 seconds. Helps us build your study path.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Exam date */}
          <div>
            <label className="block text-[14px] font-semibold text-navy mb-2">
              When is your exam? (optional)
            </label>
            <input
              type="date"
              value={examDate}
              onChange={e => setExamDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-navy/15 rounded-lg bg-white font-sans text-[15px] outline-none focus:border-teal transition-colors"
            />
          </div>

          {/* Weak areas */}
          <div>
            <label className="block text-[14px] font-semibold text-navy mb-2">
              Which areas feel weakest? (select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {WEAK_AREAS.map(area => (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleArea(area)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium border-2 transition-all ${
                    weakAreas.includes(area)
                      ? 'bg-teal border-teal text-white'
                      : 'bg-white border-navy/15 text-[#4A4A5A] hover:border-teal/50'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Daily goal */}
          <div>
            <label className="block text-[14px] font-semibold text-navy mb-2">
              Daily question goal: <span className="text-teal">{dailyGoal} questions</span>
            </label>
            <input
              type="range"
              min={10}
              max={100}
              step={10}
              value={dailyGoal}
              onChange={e => setDailyGoal(Number(e.target.value))}
              className="w-full accent-teal"
            />
            <div className="flex justify-between text-[12px] text-[#6B7280] mt-1">
              <span>10 (light)</span>
              <span>50 (solid)</span>
              <span>100 (intense)</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-navy text-white py-4 rounded-lg font-semibold text-[16px] hover:bg-navy-mid transition-colors disabled:opacity-60"
          >
            {saving ? 'Saving...' : "Let's go →"}
          </button>
        </form>
      </div>
    </div>
  );
}
