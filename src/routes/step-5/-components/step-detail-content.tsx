import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { InstallationStep } from './installation-data';

type StepDetailContentProps = {
  step: InstallationStep;
  onAskAi: () => void;
};

/** Render expanded detail view for an installation step with instruction text, diagram placeholder, and action buttons. */
export const StepDetailContent = function ({ step, onAskAi }: StepDetailContentProps) {
  return (
    <div className="mt-3 space-y-3">
      {/* Detailed instruction */}
      <p className="text-sm text-white/70 leading-relaxed">{step.detailedInstruction}</p>

      {/* Diagram placeholder */}
      <div className="relative rounded-lg border border-white/5 bg-[oklch(0.08_0.01_240)] p-4">
        <Badge className="absolute top-2 right-2 bg-white/10 text-white/50 border-white/10 font-mono text-[9px] tracking-widest">
          DIAGRAM
        </Badge>
        <div className="flex flex-col items-center gap-2 py-3">
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
            {step.diagramLabel}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-7 text-[12px] text-white/50 gap-1.5 px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Full Schematic
        </Button>
        <Button size="sm" className="h-7 text-[12px] gap-1.5 px-3 cursor-pointer" onClick={onAskAi}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            <path d="M19 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
          </svg>
          Ask AI
        </Button>
      </div>
    </div>
  );
};
