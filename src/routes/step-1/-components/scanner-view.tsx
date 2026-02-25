import { CenterFocusIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useEffect, useRef } from 'react';

const statusItems = [
  { label: 'Appliance', value: 'Dishwasher', done: true },
  { label: 'Make', value: 'Bosch', done: true },
  { label: 'Model', value: 'Scanning...', done: false },
];

/** Left-side camera/scanner HUD view tailored to match the provided layout. */
export const ScannerView = function () {
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

  return (
    <div className="relative flex-[3] min-h-screen overflow-hidden bg-gray-100">
      {/* Background camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: 'brightness(0.65)',
        }}
      />

      {/* Top-right: System Online badge */}
      <div className="absolute top-6 right-6 z-30">
        <div className="flex items-center gap-2 rounded-[5px] border border-gray-200 bg-white/95 px-2.5 py-1 shadow-md backdrop-blur-md">
          <div className="flex items-center gap-1.5 border-r border-gray-200 pr-2.5">
            <span className="h-2 w-2 rounded-full bg-[#207e41]" />
            <span className="text-[12px] leading-tight font-medium tracking-wide text-gray-700">
              System Online
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" />
          </svg>
        </div>
      </div>

      {/* Center scanning box */}
      <div className="absolute inset-x-0 top-16 bottom-[220px] z-20 flex items-center justify-center px-6 pointer-events-none">
        <div className="relative w-full max-w-[400px] sm:max-w-[500px] aspect-square sm:aspect-[4/3]">
          {/* Top instruction pill - positioned on the top border */}
          <div className="absolute -top-[24px] left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full bg-[#f1f2f4]/90 px-5 py-2.5 backdrop-blur-md shadow-lg pointer-events-auto">
            <HugeiconsIcon
              icon={CenterFocusIcon}
              className="text-slate-800"
              size={18}
              strokeWidth={2.5}
            />
            <span className="font-normal text-[14px] text-slate-800 tracking-wide whitespace-nowrap">
              Align Appliance
            </span>
          </div>

          {/* Corner borders - thick primary markers */}
          <div className="absolute -top-[2px] -left-[2px] w-14 h-14 border-t-[3px] border-l-[3px] border-primary rounded-tl-[1.8rem]" />
          <div className="absolute -top-[2px] -right-[2px] w-14 h-14 border-t-[3px] border-r-[3px] border-primary rounded-tr-[1.8rem]" />
          <div className="absolute -bottom-[2px] -left-[2px] w-14 h-14 border-b-[3px] border-l-[3px] border-primary rounded-bl-[1.8rem]" />
          <div className="absolute -bottom-[2px] -right-[2px] w-14 h-14 border-b-[3px] border-r-[3px] border-primary rounded-br-[1.8rem]" />

          {/* Subtle connecting lines filling the gaps between corners (no top line) */}
          <div className="absolute top-14 bottom-14 left-0 w-[1px] bg-primary/40" />
          <div className="absolute top-14 bottom-14 right-0 w-[1px] bg-primary/40" />
          <div className="absolute bottom-0 left-14 right-14 h-[1px] bg-primary/40" />

          {/* Custom style for the scanning line animation to keep it within the box */}
          <style>
            {`
              @keyframes scan-box {
                0% { top: 2rem; }
                100% { top: calc(100% - 2rem); }
              }
            `}
          </style>

          {/* The animated scan line */}
          <div
            className="absolute left-8 right-8 z-30 flex justify-center"
            style={{ animation: 'scan-box 3.5s ease-in-out infinite alternate' }}>
            {/* Soft glow behind the line */}
            <div className="absolute h-[3px] w-full bg-primary blur-[3px] opacity-70" />

            {/* The sharp line */}
            <div
              className="relative h-[2px] w-full bg-primary/80"
              style={{
                boxShadow: '0 0 15px 2px var(--color-primary)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section Island: Information and Actions */}
      <div className="absolute bottom-5 left-4 right-4 sm:left-8 sm:right-8 lg:left-12 lg:right-12 z-30 flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md">
        {/* Status badges */}
        <div className="flex flex-wrap justify-center gap-2.5 w-full">
          {statusItems.map(function (item) {
            const isDone = item.done;
            const bgClass = isDone
              ? 'bg-green-100 border-green-300'
              : 'bg-amber-100 border-amber-300';
            const textClass = isDone ? 'text-gray-900' : 'text-amber-600';
            const iconClass = isDone ? 'text-emerald-600' : 'text-amber-600';

            return (
              <div
                key={item.label}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-sm transition-colors backdrop-blur-md ${bgClass}`}>
                {isDone ? (
                  <div className="flex items-center justify-center font-normal text-white bg-emerald-500 rounded-full h-[15px] w-[15px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-2.5 h-2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`w-[15px] h-[15px] animate-spin ${iconClass}`}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                )}
                <span className={`font-sans text-[11px] font-medium tracking-wide ${textClass}`}>
                  {item.label}: {item.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200" />

        {/* Bottom text actions */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-gray-900 font-normal text-[13px] tracking-wide">Can't scan?</span>
          <button className="text-gray-500 font-medium text-[12px] border-b border-gray-300 pb-0.5 hover:text-gray-900 hover:border-gray-400 transition-colors">
            Enter model number manually
          </button>
        </div>
      </div>
    </div>
  );
};
