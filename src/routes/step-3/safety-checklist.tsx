import { createFileRoute } from '@tanstack/react-router';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { SafetyCameraView } from './-components/safety-camera-view';
import { SafetyPanel } from './-components/safety-panel';

const safetyItemsData = [
  {
    id: 'power',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Electrical Power Disconnected',
    description:
      'Confirm the circuit breaker for the kitchen dishwasher outlet is in the OFF position.',
  },
  {
    id: 'water',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    title: 'Water Supply Shut Off',
    description:
      'Turn off the hot water supply valve under the sink before disconnecting any lines.',
  },
  {
    id: 'ppe',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'PPE Equipped',
    description: 'Wear safety glasses and work gloves. Non-slip footwear recommended.',
  },
  {
    id: 'area',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: 'Work Area Cleared',
    description:
      'Remove items from under the sink and clear a path from the doorway to the installation site.',
  },
  {
    id: 'old-unit',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    title: 'Old Unit Removed (if applicable)',
    description:
      'Previous dishwasher has been disconnected, drained, and removed from the cabinet opening.',
  },
  {
    id: 'manual',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    title: 'Installation Manual Reviewed',
    description:
      'Read through the Bosch SHPM88Z75N installation guide and confirmed all requirements are met.',
  },
];

type SafetyItemState = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  checked: boolean;
  snapshot: string | null;
};

type DetectionStatus = 'initializing' | 'scanning' | 'verified' | 'complete';

export const Route = createFileRoute('/step-3/safety-checklist')({
  component: function SafetyChecklistPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [items, setItems] = useState<SafetyItemState[]>(
      safetyItemsData.map(function (item) {
        return { ...item, checked: false, snapshot: null };
      })
    );
    const [currentItemIndex, setCurrentItemIndex] = useState(-1);
    const [detectionStatus, setDetectionStatus] = useState<DetectionStatus>('initializing');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
    const recordingDuration = Math.round((2000 + safetyItemsData.length * (3500 + 800)) / 1000);

    // Camera initialization and recording
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

          // Start MediaRecorder for verification recording
          const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
          mediaRecorderRef.current = recorder;
          chunksRef.current = [];

          recorder.ondataavailable = function (e) {
            if (e.data.size > 0) {
              chunksRef.current.push(e.data);
            }
          };

          recorder.onstop = function () {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' });
            setRecordingUrl(URL.createObjectURL(blob));
          };

          recorder.start();
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

    // Simulated detection flow
    useEffect(() => {
      const INIT_DELAY = 2000;
      const SCAN_DURATION = 3500;
      const VERIFIED_FLASH = 800;
      const timers: ReturnType<typeof setTimeout>[] = [];

      /** Capture a JPEG snapshot from the current video frame. */
      const captureSnapshot = function () {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return null;

        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg', 0.7);
      };

      // Start scanning after init delay
      timers.push(
        setTimeout(function () {
          setDetectionStatus('scanning');
          setCurrentItemIndex(0);
        }, INIT_DELAY)
      );

      // Schedule each item's detection cycle
      for (let i = 0; i < safetyItemsData.length; i++) {
        const scanStart = INIT_DELAY + i * (SCAN_DURATION + VERIFIED_FLASH);
        const verifyTime = scanStart + SCAN_DURATION;
        const nextScanTime = verifyTime + VERIFIED_FLASH;

        // Verify item i — capture snapshot and mark checked
        timers.push(
          setTimeout(function () {
            setDetectionStatus('verified');
            const snapshot = captureSnapshot();
            setItems(function (prev) {
              return prev.map(function (item, idx) {
                if (idx === i) {
                  return { ...item, checked: true, snapshot };
                }
                return item;
              });
            });
          }, verifyTime)
        );

        // Move to next item or mark complete
        if (i < safetyItemsData.length - 1) {
          timers.push(
            setTimeout(function () {
              setDetectionStatus('scanning');
              setCurrentItemIndex(i + 1);
            }, nextScanTime)
          );
        } else {
          timers.push(
            setTimeout(function () {
              setDetectionStatus('complete');
              setCurrentItemIndex(safetyItemsData.length);
            }, nextScanTime)
          );
        }
      }

      return () => {
        timers.forEach(function (timer) {
          clearTimeout(timer);
        });
      };
    }, []);

    // Stop recording when detection completes
    useEffect(() => {
      if (
        detectionStatus === 'complete' &&
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === 'recording'
      ) {
        mediaRecorderRef.current.stop();
      }
    }, [detectionStatus]);

    const checkedCount = items.filter(function (item) {
      return item.checked;
    }).length;

    const currentItemName =
      currentItemIndex >= 0 && currentItemIndex < items.length ? items[currentItemIndex].title : '';

    return (
      <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
        {/* Hidden canvas for snapshot capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Left: Camera view */}
        <SafetyCameraView
          videoRef={videoRef}
          detectionStatus={detectionStatus}
          currentItemName={currentItemName}
          currentItemIndex={currentItemIndex}
          totalItems={items.length}
          checkedCount={checkedCount}
        />

        {/* Divider */}
        <div className="w-px bg-gray-200" />

        {/* Right: Safety panel */}
        <div className="flex-[2] overflow-y-auto">
          <SafetyPanel
            items={items}
            currentItemIndex={currentItemIndex}
            detectionStatus={detectionStatus}
            recordingUrl={recordingUrl}
            recordingDuration={recordingDuration}
          />
        </div>
      </div>
    );
  },
});
