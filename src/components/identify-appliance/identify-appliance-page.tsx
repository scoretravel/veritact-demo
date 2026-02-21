import { ApplianceForm } from '@/components/identify-appliance/appliance-form';
import { ScannerView } from '@/components/identify-appliance/scanner-view';

/** Split-screen layout: scanner (60%) left, form (40%) right. */
export const IdentifyAppliancePage = function () {
  return (
    <div className="flex min-h-screen bg-[oklch(0.08_0.01_240)]">
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
};
