import { useEffect, useRef, useState } from 'react';

/** Left panel with camera feed showing AR scan with verified checkpoints and capture controls. */
export const VerificationCameraView = function () {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captured, setCaptured] = useState(false);

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

  /** Capture a still frame from the video feed. */
  const handleCapture = function () {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
    }

    setCaptured(true);
    setTimeout(function () {
      setCaptured(false);
    }, 2000);
  };

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

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top-right AR status badge */}
      <div className="absolute top-6 right-6 z-30">
        <div className="flex flex-col items-end gap-1 rounded-[5px] border border-gray-200 bg-white/95 px-3 py-2 shadow-md backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#207e41] animate-pulse" />
            <span className="text-[12px] leading-tight font-medium tracking-wide text-gray-700">
              AR SCAN ACTIVE
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-wider text-emerald-600 font-medium">
            100% CONFIDENCE
          </span>
        </div>
      </div>

      {/* Dashed scan region brackets */}
      <div className="absolute inset-x-12 top-16 bottom-32 z-10 pointer-events-none">
        {/* Top-left corner */}
        <div className="absolute -top-px -left-px w-12 h-12 border-t-2 border-l-2 border-dashed border-gray-300 rounded-tl-lg" />
        {/* Top-right corner */}
        <div className="absolute -top-px -right-px w-12 h-12 border-t-2 border-r-2 border-dashed border-gray-300 rounded-tr-lg" />
        {/* Bottom-left corner */}
        <div className="absolute -bottom-px -left-px w-12 h-12 border-b-2 border-l-2 border-dashed border-gray-300 rounded-bl-lg" />
        {/* Bottom-right corner */}
        <div className="absolute -bottom-px -right-px w-12 h-12 border-b-2 border-r-2 border-dashed border-gray-300 rounded-br-lg" />
      </div>

      {/* Green verified checkpoints */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Checkpoint 1 — upper-left area */}
        <div
          className="absolute"
          style={{ top: '32%', left: '18%', transform: 'translate(-50%, -50%)' }}>
          <div className="w-14 h-14 rounded-full border-2 border-emerald-400 bg-emerald-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-emerald-600">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Checkpoint 2 — lower-center area */}
        <div
          className="absolute"
          style={{ top: '65%', left: '35%', transform: 'translate(-50%, -50%)' }}>
          <div className="w-14 h-14 rounded-full border-2 border-emerald-400 bg-emerald-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-emerald-600">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom capture controls */}
      <div className="absolute bottom-5 left-0 right-0 z-30 flex flex-col items-center gap-3">
        {/* Capture flash feedback */}
        {captured && (
          <div className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1">
            <span className="font-mono text-[11px] text-emerald-600 tracking-wider">
              PHOTO CAPTURED
            </span>
          </div>
        )}

        {/* Capture button row */}
        <div className="flex items-center gap-5">
          {/* Video toggle placeholder */}
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
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </button>

          {/* Shutter button */}
          <button
            type="button"
            onClick={handleCapture}
            className="w-16 h-16 rounded-full border-[3px] border-gray-700 bg-transparent flex items-center justify-center hover:border-gray-900 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-gray-900/90 group-hover:bg-gray-900 transition-colors" />
          </button>

          {/* Gallery/preview placeholder */}
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
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
