import { useEffect, useRef } from 'react';

/** Left-side camera view with detection overlay for the identified appliance. */
export const DetectedView = function () {
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
    <div className="relative flex-[3] min-h-screen overflow-hidden bg-black">
      {/* Background camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.55)' }}
      />

      {/* Top-right: Model Detected badge */}
      <div className="absolute top-6 right-6 z-30">
        <div className="flex items-center gap-2 rounded-[5px] border border-blue-200/5 bg-[#171b22]/95 px-2.5 py-1 shadow-md backdrop-blur-md">
          <div className="flex items-center gap-1.5 border-r border-[#30363d] pr-2.5">
            <span className="h-2 w-2 rounded-full bg-[#207e41]" />
            <span className="text-[12px] leading-tight font-medium tracking-wide text-slate-200">
              Model Detected
            </span>
          </div>
          <span className="text-[12px] font-mono text-primary">98.7%</span>
        </div>
      </div>

      {/* Detection bounding box */}
      <div className="absolute inset-x-0 top-16 bottom-[120px] z-20 flex items-center justify-center px-6 pointer-events-none">
        <div className="relative w-full max-w-[420px] sm:max-w-[520px] aspect-[4/3]">
          {/* Corner brackets - green for detected */}
          <div className="absolute -top-[2px] -left-[2px] w-14 h-14 border-t-[3px] border-l-[3px] border-[#3ce06f]/70 rounded-tl-[1.8rem]" />
          <div className="absolute -top-[2px] -right-[2px] w-14 h-14 border-t-[3px] border-r-[3px] border-[#3ce06f]/70 rounded-tr-[1.8rem]" />
          <div className="absolute -bottom-[2px] -left-[2px] w-14 h-14 border-b-[3px] border-l-[3px] border-[#3ce06f]/70 rounded-bl-[1.8rem]" />
          <div className="absolute -bottom-[2px] -right-[2px] w-14 h-14 border-b-[3px] border-r-[3px] border-[#3ce06f]/70 rounded-br-[1.8rem]" />

          {/* Connecting lines */}
          <div className="absolute top-14 bottom-14 left-0 w-[1px] bg-[#3ce06f]/30" />
          <div className="absolute top-14 bottom-14 right-0 w-[1px] bg-[#3ce06f]/30" />
          <div className="absolute top-0 left-14 right-14 h-[1px] bg-[#3ce06f]/30" />
          <div className="absolute bottom-0 left-14 right-14 h-[1px] bg-[#3ce06f]/30" />

          {/* Detection label */}
          <div className="absolute -top-[28px] left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full bg-[#3ce06f]/90 px-4 py-1.5 backdrop-blur-md shadow-lg">
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
            <span className="font-medium text-[13px] text-black tracking-wide whitespace-nowrap">
              Appliance Identified
            </span>
          </div>
        </div>
      </div>

      {/* Bottom info island */}
      <div className="absolute bottom-5 left-4 right-4 sm:left-8 sm:right-8 lg:left-12 lg:right-12 z-30 flex flex-col items-center gap-3 rounded-2xl border border-blue-200/5 bg-[#171b22]/95 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap justify-center gap-2.5 w-full">
          {[
            { label: 'Type', value: 'Dishwasher' },
            { label: 'Brand', value: 'Bosch' },
            { label: 'Model', value: 'SHPM88Z75N' },
          ].map(function (item) {
            return (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-full border bg-[#314a34]/80 border-[#396e3d] px-3 py-1.5 shadow-sm backdrop-blur-md">
                <div className="flex items-center justify-center font-normal text-black bg-[#3ce06f] rounded-full h-[15px] w-[15px]">
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
                <span className="font-sans text-[11px] font-medium tracking-wide text-white">
                  {item.label}: {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
