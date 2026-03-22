import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

// Placeholder dashboard — Week 5 build
export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  return (
    <div className="min-h-screen bg-cream">
      {/* Dashboard Nav */}
      <nav className="bg-white border-b border-navy/8 px-8 py-4 flex items-center justify-between">
        <div className="font-display text-[20px] font-black text-navy">
          Why<span className="text-teal">ze</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[14px] text-[#6B7280]">
            {user.firstName ?? user.emailAddresses[0].emailAddress}
          </span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-12">
        <h1 className="font-display text-[32px] font-black text-navy mb-2">
          Good morning{user.firstName ? `, ${user.firstName}` : ''} 👋
        </h1>
        <p className="text-[#6B7280] mb-10">
          Your dashboard is being built. Check back in Week 5 of the build plan.
        </p>

        {/* Placeholder stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Questions Today', value: '—', sub: 'Start studying' },
            { label: 'Current Streak', value: '0', sub: 'Days in a row' },
            { label: 'Overall Pass Rate', value: '—%', sub: 'Across all categories' },
          ].map(card => (
            <div key={card.label} className="bg-white rounded-2xl p-6 border border-navy/8">
              <p className="text-[13px] text-[#6B7280] mb-1">{card.label}</p>
              <p className="font-display text-[36px] font-black text-navy leading-none mb-1">
                {card.value}
              </p>
              <p className="text-[12px] text-[#6B7280]">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Start studying CTA */}
        <div className="bg-navy rounded-2xl p-8 text-center">
          <h2 className="font-display text-[24px] font-black text-white mb-3">
            Ready to study?
          </h2>
          <p className="text-white/60 mb-6 text-[15px]">
            Start with Pharmacology — the highest-yield NCLEX category.
          </p>
          <button className="bg-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-light transition-colors">
            Start Session →
          </button>
        </div>
      </main>
    </div>
  );
}
