const safetyItems = [
  'Electrical power disconnected at breaker',
  'Water supply valve shut off',
  'PPE equipped (glasses, gloves)',
  'Work area cleared and protected',
  'Old unit removed (if applicable)',
  'Installation manual reviewed',
];

const specs = [
  { label: 'Model', value: 'SHPM88Z75N' },
  { label: 'Dimensions', value: '23.6" W × 33.9" H × 24.5" D' },
  { label: 'Power', value: '120V / 60Hz / 15A' },
  { label: 'Water Supply', value: '3/8" hot water, 120°F min' },
  { label: 'Water Pressure', value: '20-120 PSI' },
  { label: 'Drain Connection', value: 'Disposal inlet or standpipe' },
  { label: 'Noise Level', value: '40 dBA' },
  { label: 'Capacity', value: '16 place settings' },
  { label: 'Weight', value: '57.3 lbs (26 kg)' },
  { label: 'Energy Rating', value: 'ENERGY STAR certified' },
];

/** Tab content showing read-only safety checklist and full model specifications. */
export const SafetySpecsTab = function () {
  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6 p-4">
        {/* Safety checklist (read-only) */}
        <div className="space-y-3">
          <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
            Safety Checklist
          </span>
          <div className="space-y-1.5">
            {safetyItems.map(function (item, i) {
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-md border border-[#3ce06f]/10 bg-[#3ce06f]/5 px-3 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 text-[#3ce06f] shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm text-white/60">{item}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full specifications */}
        <div className="space-y-3">
          <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
            Full Specifications
          </span>
          <div className="rounded-lg border border-white/5 overflow-hidden">
            {specs.map(function (spec, i) {
              return (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between px-3 py-2.5 ${
                    i % 2 === 0 ? 'bg-[oklch(0.08_0.01_240)]' : 'bg-transparent'
                  }`}>
                  <span className="font-mono text-[11px] text-white/40">{spec.label}</span>
                  <span className="text-sm text-white/70">{spec.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Diagram placeholders */}
        <div className="space-y-3">
          <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
            Reference Diagrams
          </span>
          <div className="grid grid-cols-2 gap-2">
            {['Wiring Diagram', 'Plumbing Layout'].map(function (name) {
              return (
                <div
                  key={name}
                  className="rounded-lg border border-white/5 bg-[oklch(0.08_0.01_240)] p-4 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-md border border-white/10 bg-white/5 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-6 h-6 text-white/20">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] text-white/30 tracking-wider text-center">
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
