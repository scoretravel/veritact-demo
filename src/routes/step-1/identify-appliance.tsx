import { createFileRoute } from '@tanstack/react-router';
import { ApplianceForm } from './-components/appliance-form';
import { ScannerView } from './-components/scanner-view';

export const Route = createFileRoute('/step-1/identify-appliance')({
  component: function IdentifyAppliancePage() {
    return (
      <div className="flex h-screen w-full bg-[oklch(0.08_0.01_240)] overflow-hidden">
        {/* Left: Scanner / Camera view */}
        <ScannerView />

        {/* Divider line */}
        <div className="w-px bg-white/5" />

        {/* Right: Form panel */}
        <div className="flex-[2] overflow-y-auto">
          <ApplianceForm />
        </div>
      </div>
    );
  },
});
