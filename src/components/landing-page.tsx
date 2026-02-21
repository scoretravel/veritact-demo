import { CircleArrowRightIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';

const systemStatus = [
  { label: 'AR Module', status: 'ACTIVE' },
  { label: 'Calibration', status: 'SYNCED' },
  { label: 'Model Database', status: 'LOADED' },
  { label: 'Connection', status: 'SECURE' },
];

function DottedLeader({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex justify-between gap-2 font-mono text-xs sm:text-sm">
      <span className="text-white/40">{label}</span>
      <span className="flex-1 border-b border-dotted border-white/10 translate-y-[-4px]" />
      <span className="text-primary font-semibold">{status}</span>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="dark relative min-h-screen bg-[oklch(0.08_0.01_240)] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Animated grid background */}
      <div
        className="animate-grid-scroll pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 39px, oklch(0.7 0.15 200) 39px, oklch(0.7 0.15 200) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, oklch(0.7 0.15 200) 39px, oklch(0.7 0.15 200) 40px)',
        }}
      />

      {/* Scan line */}
      <div
        className="animate-scan pointer-events-none absolute left-0 right-0 h-[2px] z-20"
        style={{
          background: 'linear-gradient(90deg, transparent, oklch(0.7 0.15 200 / 60%), transparent)',
          boxShadow: '0 0 15px oklch(0.7 0.15 200 / 40%), 0 0 30px oklch(0.7 0.15 200 / 20%)',
        }}
      />

      {/* Main card */}
      <div
        className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-primary/10 bg-[oklch(0.1_0.01_240)]"
        style={{
          boxShadow: '0 0 40px oklch(0.7 0.15 200 / 8%), inset 0 1px 0 oklch(0.7 0.15 200 / 10%)',
        }}>
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80)',
            filter: 'saturate(0.3) brightness(0.6) hue-rotate(180deg)',
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.1_0.01_240)] via-[oklch(0.1_0.01_240/90%)] to-[oklch(0.1_0.01_240/40%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.1_0.01_240)] via-transparent to-[oklch(0.1_0.01_240/60%)]" />

        {/* HUD corner brackets */}
        <div className="absolute top-3 left-3 h-6 w-6 border-t-2 border-l-2 border-primary/30" />
        <div className="absolute top-3 right-3 h-6 w-6 border-t-2 border-r-2 border-primary/30" />
        <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-primary/30" />
        <div className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-primary/30" />

        {/* Content */}
        <div className="relative z-10 px-8 py-12 sm:px-10 sm:py-14 md:px-16 md:py-20 max-w-2xl">
          {/* Status badge */}
          <div
            className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1"
            style={{ animationDelay: '0.1s' }}>
            <span className="size-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              System Online
            </span>
          </div>

          {/* Heading */}
          <h1
            className="animate-fade-in-up text-4xl font-extrabold tracking-widest text-white font-thin md:text-5xl lg:text-6xl"
            style={{
              animationDelay: '0.2s',
              textShadow: '0 0 20px oklch(0.7 0.15 200), 0 0 40px oklch(0.7 0.15 200 / 30%)',
            }}>
            Veritact
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-in-up mt-3 font-mono text-xs sm:text-sm tracking-[0.2em] text-white/50"
            style={{ animationDelay: '0.3s' }}>
            AR-Guided Installation CoPilot
          </p>

          {/* System readout panel */}
          <div
            className="animate-fade-in-up mt-8 rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-2.5"
            style={{ animationDelay: '0.45s' }}>
            {systemStatus.map(({ label, status }) => (
              <DottedLeader key={label} label={label} status={status} />
            ))}
          </div>

          {/* CTA button */}
          <div
            className="animate-fade-in-up mt-10 flex flex-wrap gap-4"
            style={{ animationDelay: '0.6s' }}>
            <Button
              size="lg"
              className="h-14 gap-3 rounded-xl px-7 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/85 cursor-pointer"
              style={{
                boxShadow: '0 0 20px oklch(0.7 0.15 200 / 40%), 0 0 40px oklch(0.7 0.15 200 / 15%)',
              }}>
              Begin Installation
              <HugeiconsIcon icon={CircleArrowRightIcon} size={20} strokeWidth={3} />
            </Button>
          </div>

          {/* Footer */}
          <div
            className="animate-fade-in-up mt-10 font-mono text-[10px] tracking-widest text-white/20 uppercase"
            style={{ animationDelay: '0.75s' }}>
            v0.0.3 &nbsp;// &nbsp;Veritact Systems
          </div>
        </div>
      </div>
    </div>
  );
}
