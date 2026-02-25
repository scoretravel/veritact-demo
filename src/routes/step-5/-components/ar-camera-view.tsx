import { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import type { InstallationStep } from './installation-data';

type ArCameraViewProps = {
  currentStep: InstallationStep;
  completedSteps: number[];
};

const focusAreaColors: Record<string, string> = {
  cabinet: 'oklch(0.7 0.15 200)',
  plumbing: 'oklch(0.7 0.15 250)',
  electrical: 'oklch(0.8 0.18 80)',
  mounting: 'oklch(0.7 0.15 150)',
};

/** Left panel with camera feed and AR overlay indicators for the current step. */
export const ArCameraView = function ({ currentStep, completedSteps }: ArCameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const color = focusAreaColors[currentStep.focusArea] ?? focusAreaColors.cabinet;
  const progress = `${completedSteps.length}/10`;

  return (
    <div className="relative flex-[3] min-h-screen overflow-hidden bg-gray-100">
      {/* Camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.5)' }}
      />

      {/* Top-right status badges */}
      <div className="absolute top-6 right-6 z-30 flex flex-col items-end gap-2">
        <div className="flex items-center gap-2 rounded-[5px] border border-gray-200 bg-white/95 px-2.5 py-1 shadow-md backdrop-blur-md">
          <div className="flex items-center gap-1.5 border-r border-gray-200 pr-2.5">
            <span className="h-2 w-2 rounded-full bg-[#207e41] animate-pulse" />
            <span className="text-[12px] leading-tight font-medium tracking-wide text-gray-700">
              AR Active
            </span>
          </div>
          <span className="text-[12px] font-mono text-primary">{progress}</span>
        </div>
        <Badge
          className="font-mono text-[10px] tracking-wider border"
          style={{
            backgroundColor: `color-mix(in oklch, ${color} 15%, transparent)`,
            color: color,
            borderColor: `color-mix(in oklch, ${color} 30%, transparent)`,
          }}>
          {currentStep.focusArea.toUpperCase()}
        </Badge>
      </div>

      {/* AR overlay region */}
      <div className="absolute inset-x-0 top-20 bottom-[140px] z-20 flex items-center justify-center px-6 pointer-events-none">
        <div className="relative w-full max-w-[420px] sm:max-w-[500px] aspect-[4/3]">
          {/* Corner brackets colored by focus area */}
          <div
            className="absolute -top-[2px] -left-[2px] w-14 h-14 border-t-[3px] border-l-[3px] rounded-tl-[1.8rem] animate-bracket-pulse"
            style={{ borderColor: `color-mix(in oklch, ${color} 70%, transparent)` }}
          />
          <div
            className="absolute -top-[2px] -right-[2px] w-14 h-14 border-t-[3px] border-r-[3px] rounded-tr-[1.8rem] animate-bracket-pulse"
            style={{ borderColor: `color-mix(in oklch, ${color} 70%, transparent)` }}
          />
          <div
            className="absolute -bottom-[2px] -left-[2px] w-14 h-14 border-b-[3px] border-l-[3px] rounded-bl-[1.8rem] animate-bracket-pulse"
            style={{ borderColor: `color-mix(in oklch, ${color} 70%, transparent)` }}
          />
          <div
            className="absolute -bottom-[2px] -right-[2px] w-14 h-14 border-b-[3px] border-r-[3px] rounded-br-[1.8rem] animate-bracket-pulse"
            style={{ borderColor: `color-mix(in oklch, ${color} 70%, transparent)` }}
          />

          {/* Connecting lines */}
          <div
            className="absolute top-14 bottom-14 left-0 w-[1px]"
            style={{ backgroundColor: `color-mix(in oklch, ${color} 30%, transparent)` }}
          />
          <div
            className="absolute top-14 bottom-14 right-0 w-[1px]"
            style={{ backgroundColor: `color-mix(in oklch, ${color} 30%, transparent)` }}
          />
          <div
            className="absolute top-0 left-14 right-14 h-[1px]"
            style={{ backgroundColor: `color-mix(in oklch, ${color} 30%, transparent)` }}
          />
          <div
            className="absolute bottom-0 left-14 right-14 h-[1px]"
            style={{ backgroundColor: `color-mix(in oklch, ${color} 30%, transparent)` }}
          />

          {/* Focus area label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <div
              className="font-mono text-[11px] tracking-[0.3em] uppercase opacity-40"
              style={{ color }}>
              {currentStep.focusArea} zone
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Current step overlay */}
      <div className="absolute bottom-5 left-4 right-4 sm:left-8 sm:right-8 lg:left-12 lg:right-12 z-30 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Step number */}
          <div
            className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-semibold"
            style={{
              backgroundColor: `color-mix(in oklch, ${color} 15%, transparent)`,
              color: color,
              border: `1px solid color-mix(in oklch, ${color} 30%, transparent)`,
            }}>
            {currentStep.number}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-gray-900 text-sm font-normal tracking-wide truncate">
              {currentStep.title}
            </div>
            <div className="text-gray-400 text-[12px] mt-0.5">
              ~{currentStep.estimatedMinutes} min
            </div>
          </div>

          {/* Confidence badge */}
          <div className="shrink-0 flex items-center gap-1.5 rounded-full bg-green-100 border border-green-300 px-2.5 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px] text-emerald-600">HIGH</span>
          </div>
        </div>
      </div>
    </div>
  );
};
