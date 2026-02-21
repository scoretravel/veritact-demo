import { createFileRoute } from '@tanstack/react-router';
import { DetectedView } from './-components/detected-view';
import { ModelInfoPanel } from './-components/model-info-panel';

export const Route = createFileRoute('/step-2/model-details')({
  component: function ModelDetailsPage() {
    return (
      <div className="flex h-screen w-full bg-[oklch(0.08_0.01_240)] overflow-hidden">
        {/* Left: Camera with detection overlay */}
        <DetectedView />

        {/* Divider line */}
        <div className="w-px bg-white/5" />

        {/* Right: Model info panel */}
        <div className="flex-[2] overflow-y-auto">
          <ModelInfoPanel />
        </div>
      </div>
    );
  },
});
