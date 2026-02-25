import { createFileRoute } from '@tanstack/react-router';
import { PreparationCameraView } from './-components/preparation-camera-view';
import { PreparationPanel } from './-components/preparation-panel';

export const Route = createFileRoute('/step-4/preparation')({
  component: function PreparationPage() {
    return (
      <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
        {/* Left: AR camera view */}
        <PreparationCameraView />

        {/* Divider line */}
        <div className="w-px bg-gray-200" />

        {/* Right: Tabbed panel */}
        <PreparationPanel />
      </div>
    );
  },
});
