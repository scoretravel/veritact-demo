import { createFileRoute } from '@tanstack/react-router';
import { VerificationCameraView } from './-components/verification-camera-view';
import { VerificationPanel } from './-components/verification-panel';

export const Route = createFileRoute('/step-6/complete')({
  component: function CompletePage() {
    return (
      <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
        {/* Left: AR camera with leak check mode */}
        <VerificationCameraView />

        {/* Divider line */}
        <div className="w-px bg-gray-200" />

        {/* Right: Verification panel */}
        <VerificationPanel />
      </div>
    );
  },
});
