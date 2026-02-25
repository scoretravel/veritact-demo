import { useEffect, useRef } from 'react';

/** Left panel with camera feed showing AR workspace scanning overlays and capture controls. */
export const PreparationCameraView = function () {
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
      {/* Camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.5)' }}
      />

      {/* Top-left scanning status badge */}
      <div className="absolute top-6 left-6 z-30">
        <div className="flex items-center gap-2 rounded-[5px] border border-gray-200 bg-white/95 px-2.5 py-1 shadow-md backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#207e41] animate-pulse" />
          <span className="text-[12px] leading-tight font-medium tracking-wide text-gray-700">
            SCANNING WORKSPACE...
          </span>
        </div>
      </div>

      {/* AR detection overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Workbench label */}
        <div
          className="absolute"
          style={{ top: '25%', left: '40%', transform: 'translate(-50%, -50%)' }}>
          <div className="rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 backdrop-blur-sm">
            <span className="font-mono text-[11px] tracking-wider text-blue-300">WORKBENCH</span>
          </div>
        </div>

        {/* Tool Detect label with dashed outline */}
        <div
          className="absolute"
          style={{ top: '60%', left: '75%', transform: 'translate(-50%, -50%)' }}>
          {/* Dashed rectangle outline */}
          <div className="absolute -inset-6 border-2 border-dashed border-amber-400/40 rounded-lg" />
          <div className="relative rounded-full border border-amber-400/30 bg-amber-500/15 px-3 py-1 backdrop-blur-sm">
            <span className="font-mono text-[11px] tracking-wider text-amber-300">TOOL DETECT</span>
          </div>
        </div>
      </div>

      {/* Bottom capture controls */}
      <div className="absolute bottom-5 left-0 right-0 z-30 flex items-center justify-center">
        <div className="flex items-center gap-5">
          {/* Mic button */}
          <button
            type="button"
            className="w-10 h-10 rounded-full border border-gray-300 bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>

          {/* Camera shutter button (highlighted primary) */}
          <button
            type="button"
            className="w-16 h-16 rounded-full border-[3px] border-primary/80 bg-transparent flex items-center justify-center hover:border-primary transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-primary/90 group-hover:bg-primary transition-colors" />
          </button>

          {/* Pin/marker button */}
          <button
            type="button"
            className="w-10 h-10 rounded-full border border-gray-300 bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
