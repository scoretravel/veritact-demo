import {
  CenterFocusIcon,
  CheckmarkCircle02Icon,
  Loading03Icon,
  Target02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Badge } from '@/components/ui/badge';

const statusItems = [
  { label: 'TYPE', value: 'Dishwasher', done: true },
  { label: 'MAKE', value: 'Bosch', done: true },
  { label: 'MODEL', value: 'Scanning...', done: false },
];

/** Left-side camera/scanner HUD view with overlays. */
export const ScannerView = function () {
  return (
    <div className="relative flex-[3] min-h-screen overflow-hidden bg-[oklch(0.06_0.01_240)]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80)',
          filter: 'saturate(0.2) brightness(0.5) hue-rotate(180deg)',
        }}
      />

      {/* Dark vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.06_0.01_240/70%)] via-transparent to-[oklch(0.06_0.01_240/80%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.06_0.01_240/40%)] via-transparent to-[oklch(0.06_0.01_240/60%)]" />

      {/* Scan line */}
      <div
        className="animate-scan pointer-events-none absolute left-0 right-0 h-[2px] z-20"
        style={{
          background: 'linear-gradient(90deg, transparent, oklch(0.7 0.15 200 / 50%), transparent)',
          boxShadow: '0 0 15px oklch(0.7 0.15 200 / 30%), 0 0 30px oklch(0.7 0.15 200 / 15%)',
        }}
      />

      {/* Top-left: LIVE FEED indicator */}
      <div className="absolute top-6 left-6 z-30 flex items-center gap-2">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
        </span>
        <span className="font-mono text-[11px] font-semibold tracking-widest text-red-400 uppercase">
          Live Feed
        </span>
      </div>

      {/* Top-right: Auto-Focus badge */}
      <div className="absolute top-6 right-6 z-30">
        <Badge
          variant="outline"
          className="gap-1.5 border-primary/30 bg-primary/10 text-primary font-mono text-[10px] tracking-wider">
          <HugeiconsIcon icon={CenterFocusIcon} size={12} strokeWidth={2} />
          Auto-Focus Active
        </Badge>
      </div>

      {/* Center: Scanning brackets + crosshair */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="relative size-56 sm:size-64 md:size-72">
          {/* Corner brackets */}
          <div className="animate-bracket-pulse absolute top-0 left-0 h-10 w-10 border-t-2 border-l-2 border-primary/60" />
          <div className="animate-bracket-pulse absolute top-0 right-0 h-10 w-10 border-t-2 border-r-2 border-primary/60" />
          <div className="animate-bracket-pulse absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-primary/60" />
          <div className="animate-bracket-pulse absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-primary/60" />

          {/* Crosshair icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <HugeiconsIcon
              icon={Target02Icon}
              size={32}
              strokeWidth={1.5}
              className="text-primary/40"
            />
          </div>
        </div>
      </div>

      {/* Bottom center: Instruction tooltip */}
      <div className="absolute bottom-28 left-0 right-0 z-30 flex justify-center">
        <div className="rounded-lg border border-white/10 bg-[oklch(0.1_0.01_240/80%)] px-5 py-2.5 backdrop-blur-sm">
          <p className="text-center font-mono text-xs text-white/60">
            Point your camera at the home appliance
          </p>
          <p className="mt-1 text-center font-mono text-[10px] text-white/30">
            Keep the device steady for scanning
          </p>
        </div>
      </div>

      {/* Bottom: Status badges */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
        {statusItems.map(function (item) {
          return (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-md border border-white/10 bg-[oklch(0.1_0.01_240/80%)] px-3 py-1.5 backdrop-blur-sm">
              <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
                {item.label}:
              </span>
              <span
                className={`font-mono text-xs font-semibold ${item.done ? 'text-emerald-400' : 'text-white/60'}`}>
                {item.value}
              </span>
              {item.done ? (
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  size={14}
                  strokeWidth={2}
                  className="text-emerald-400"
                />
              ) : (
                <HugeiconsIcon
                  icon={Loading03Icon}
                  size={14}
                  strokeWidth={2}
                  className="animate-spin text-white/40"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
