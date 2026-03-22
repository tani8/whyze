const ROWS = [
  { feature: 'Practice questions', them: '✓ Thousands', us: '✓ 2,000+ and growing' },
  { feature: 'Personalized wrong-answer explanation', them: '✗ Generic rationale only', us: '✓ AI diagnoses your exact mistake' },
  { feature: 'Adapts to your weak areas', them: '✗ Static question banks', us: '✓ Spaced repetition engine' },
  { feature: 'Study streak & motivation', them: '✗', us: '✓ Streaks + progress dashboard' },
  { feature: 'Price', them: '$80–$149/month', us: '$39/month (free beta)' },
];

export default function CompareSection() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-navy">
      <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-teal-light mb-4">
        How We Compare
      </p>
      <h2 className="font-display text-[clamp(32px,4vw,48px)] font-black text-white tracking-tight leading-[1.1] mb-4">
        Finally, an edge over UWorld
      </h2>
      <p className="text-[17px] text-white/60 leading-relaxed max-w-[520px] mb-12">
        UWorld has thousands of questions. Whyze has something more powerful: it knows{' '}
        <em className="not-italic font-semibold text-white/80">your</em> gaps.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left px-6 py-4 text-[13px] font-semibold tracking-widest uppercase text-white/40" />
              <th className="text-left px-6 py-4 text-[13px] font-semibold tracking-widest uppercase text-white/40">
                UWorld / Archer
              </th>
              <th className="text-left px-6 py-4 text-[13px] font-semibold tracking-widest uppercase text-teal-light">
                Whyze
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.feature} className="border-t border-white/[0.06]">
                <td className="px-6 py-4 text-[15px] text-white/80 font-medium">{row.feature}</td>
                <td className={`px-6 py-4 text-[15px] ${row.them.startsWith('✗') ? 'text-white/25' : 'text-white/40'}`}>
                  {row.them}
                </td>
                <td className="px-6 py-4 text-[15px] text-teal-light font-semibold">{row.us}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
