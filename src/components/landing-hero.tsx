import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LandingHero() {
  return (
    <div className="dark min-h-screen bg-[oklch(0.1_0_0)] flex items-center justify-center p-6">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.15_0_0)]">
        {/* Background image area */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80)',
          }}
        />
        {/* Gradient overlay to fade image on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0_0)] via-[oklch(0.15_0_0)/85%] to-transparent" />

        {/* Content */}
        <div className="relative z-10 px-10 py-14 md:px-16 md:py-20 max-w-2xl">
          {/* Status badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              System Ready
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Veritact
          </h1>

          {/* Action buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="h-14 gap-3 rounded-xl bg-[oklch(0.5_0.2_260)] px-7 text-base font-semibold text-white hover:bg-[oklch(0.55_0.2_260)]">
              <Play className="size-5 fill-current" />
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
