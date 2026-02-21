import { type RefObject, useEffect, useState } from 'react';

type SafetyCameraViewProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  detectionStatus: 'initializing' | 'scanning' | 'verified' | 'complete';
  currentItemName: string;
  currentItemIndex: number;
  totalItems: number;
  checkedCount: number;
};

/** Render the left panel with live camera feed, HUD overlay, scanning animation, and REC indicator. */
export const SafetyCameraView = function (props: SafetyCameraViewProps) {
  const { videoRef, detectionStatus, currentItemName, currentItemIndex, totalItems, checkedCount } =
    props;

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(function () {
      setElapsedSeconds(function (prev) {
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = function (seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isScanning = detectionStatus === 'scanning';
  const isVerified = detectionStatus === 'verified';
  const isComplete = detectionStatus === 'complete';

  const bracketBorderClass = isVerified || isComplete ? 'border-[#3ce06f]/70' : 'border-primary';

  const connectorColorClass = isVerified || isComplete ? 'bg-[#3ce06f]/30' : 'bg-primary/40';

  const statusDotColor = isComplete
    ? 'bg-[#3ce06f]'
    : isVerified
      ? 'bg-[#3ce06f]'
      : isScanning
        ? 'bg-primary'
        : 'bg-yellow-500';

  const statusText = isComplete
    ? 'All Verified'
    : isVerified
      ? 'Item Verified'
      : isScanning
        ? 'Scanning...'
        : 'Initializing';

  return (
    <div className="relative flex-[3] min-h-screen overflow-hidden bg-black">
      {/* Camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.55)' }}
      />

      {/* Top-left: REC indicator */}
      <div className="absolute top-6 left-6 z-30">
        <div className="flex items-center gap-2 rounded-[5px] border border-blue-200/5 bg-[#171b22]/95 px-2.5 py-1 shadow-md backdrop-blur-md">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-recording-pulse" />
          <span className="text-[12px] leading-tight font-mono font-medium tracking-wider text-red-400">
            REC
          </span>
          <span className="text-[12px] font-mono text-white/60">{formatTime(elapsedSeconds)}</span>
        </div>
      </div>

      {/* Top-right: Status badge */}
      <div className="absolute top-6 right-6 z-30">
        <div className="flex items-center gap-2 rounded-[5px] border border-blue-200/5 bg-[#171b22]/95 px-2.5 py-1 shadow-md backdrop-blur-md">
          <span
            className={`h-2 w-2 rounded-full ${statusDotColor} transition-colors duration-300`}
          />
          <span className="text-[12px] leading-tight font-medium tracking-wide text-slate-200">
            {statusText}
          </span>
        </div>
      </div>

      {/* Center HUD */}
      <div className="absolute inset-x-0 top-16 bottom-[120px] z-20 flex items-center justify-center px-6 pointer-events-none">
        <div className="relative w-full max-w-[400px] sm:max-w-[500px] aspect-square sm:aspect-[4/3]">
          {/* Top label pill */}
          {(isScanning || isVerified) && (
            <div
              className={`absolute -top-[24px] left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full px-5 py-2.5 backdrop-blur-md shadow-lg transition-colors duration-300 ${
                isVerified ? 'bg-[#3ce06f]/90' : 'bg-[#f1f2f4]/90'
              }`}>
              {isVerified && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 text-black">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              <span
                className={`text-[14px] tracking-wide whitespace-nowrap ${
                  isVerified ? 'text-black font-medium' : 'text-slate-800 font-normal'
                }`}>
                {isVerified ? 'Verified' : currentItemName}
              </span>
            </div>
          )}

          {isComplete && (
            <div className="absolute -top-[24px] left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full bg-[#3ce06f]/90 px-5 py-2.5 backdrop-blur-md shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 text-black">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[14px] font-medium tracking-wide whitespace-nowrap text-black">
                All Items Verified
              </span>
            </div>
          )}

          {/* Corner brackets */}
          <div
            className={`absolute -top-[2px] -left-[2px] w-14 h-14 border-t-[3px] border-l-[3px] ${bracketBorderClass} rounded-tl-[1.8rem] transition-colors duration-300`}
          />
          <div
            className={`absolute -top-[2px] -right-[2px] w-14 h-14 border-t-[3px] border-r-[3px] ${bracketBorderClass} rounded-tr-[1.8rem] transition-colors duration-300`}
          />
          <div
            className={`absolute -bottom-[2px] -left-[2px] w-14 h-14 border-b-[3px] border-l-[3px] ${bracketBorderClass} rounded-bl-[1.8rem] transition-colors duration-300`}
          />
          <div
            className={`absolute -bottom-[2px] -right-[2px] w-14 h-14 border-b-[3px] border-r-[3px] ${bracketBorderClass} rounded-br-[1.8rem] transition-colors duration-300`}
          />

          {/* Connecting lines */}
          <div
            className={`absolute top-14 bottom-14 left-0 w-[1px] ${connectorColorClass} transition-colors duration-300`}
          />
          <div
            className={`absolute top-14 bottom-14 right-0 w-[1px] ${connectorColorClass} transition-colors duration-300`}
          />
          <div
            className={`absolute bottom-0 left-14 right-14 h-[1px] ${connectorColorClass} transition-colors duration-300`}
          />

          {/* Scan line animation — only during scanning */}
          {isScanning && (
            <>
              <style>
                {`
                  @keyframes scan-safety {
                    0% { top: 2rem; }
                    100% { top: calc(100% - 2rem); }
                  }
                `}
              </style>
              <div
                className="absolute left-8 right-8 z-30 flex justify-center"
                style={{ animation: 'scan-safety 3.5s ease-in-out infinite alternate' }}>
                <div className="absolute h-[3px] w-full bg-primary blur-[3px] opacity-70" />
                <div
                  className="relative h-[2px] w-full bg-primary/80"
                  style={{ boxShadow: '0 0 15px 2px var(--color-primary)' }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom island */}
      <div className="absolute bottom-5 left-4 right-4 sm:left-8 sm:right-8 lg:left-12 lg:right-12 z-30 flex items-center justify-between rounded-2xl border border-blue-200/5 bg-[#171b22]/95 px-5 py-3.5 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          {isScanning && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-primary animate-spin">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          )}
          {(isVerified || isComplete) && (
            <div className="flex items-center justify-center text-black bg-[#3ce06f] rounded-full h-[18px] w-[18px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-2.5 h-2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}
          {detectionStatus === 'initializing' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-yellow-500 animate-spin">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          )}
          <span className="text-[13px] font-medium tracking-wide text-white">
            {isComplete
              ? 'All Safety Items Verified'
              : currentItemIndex >= 0
                ? currentItemName
                : 'Preparing Safety Scan...'}
          </span>
        </div>
        <span className="font-mono text-[11px] text-primary tracking-wider">
          {checkedCount}/{totalItems}
        </span>
      </div>
    </div>
  );
};
