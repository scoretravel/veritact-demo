import { Link, createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const testingItems = [
  { id: 'water-supply', title: 'Water supply valve opened and no leaks at connection' },
  { id: 'drain', title: 'Drain hose securely attached — no kinks or leaks' },
  { id: 'power', title: 'Power connected and unit powers on successfully' },
  { id: 'level', title: 'Dishwasher is level and door opens/closes freely' },
  { id: 'cycle', title: 'Quick rinse cycle completed without error codes' },
  { id: 'leak-check', title: 'No leaks detected under unit after test cycle' },
  { id: 'mounting', title: 'Anti-tip brackets and mounting screws secured' },
];

const troubleshootingLinks = [
  { label: 'Error Code Reference', description: 'E15, E24, E25 and other common codes' },
  { label: 'Leak Troubleshooting', description: 'Supply line, drain, and door seal issues' },
  { label: 'Noise Diagnostics', description: 'Identify normal vs. abnormal sounds' },
  { label: 'Bosch Support Portal', description: 'Official support and warranty registration' },
];

export const Route = createFileRoute('/step-6/complete')({
  component: function CompletePage() {
    const [checked, setChecked] = useState<Record<string, boolean>>({});
    const checkedCount = Object.values(checked).filter(Boolean).length;
    const allChecked = checkedCount === testingItems.length;

    const handleToggle = function (id: string) {
      setChecked(function (prev) {
        return { ...prev, [id]: !prev[id] };
      });
    };

    return (
      <div className="dark relative min-h-screen bg-[oklch(0.08_0.01_240)] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Animated grid background */}
        <div
          className="animate-grid-scroll pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 39px, oklch(0.7 0.15 200) 39px, oklch(0.7 0.15 200) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, oklch(0.7 0.15 200) 39px, oklch(0.7 0.15 200) 40px)',
          }}
        />

        {/* Main card */}
        <div
          className="animate-fade-in-up relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-primary/10 bg-[oklch(0.1_0.01_240)]"
          style={{
            boxShadow: '0 0 40px oklch(0.7 0.15 200 / 8%), inset 0 1px 0 oklch(0.7 0.15 200 / 10%)',
          }}>
          {/* HUD corner brackets */}
          <div className="absolute top-3 left-3 h-6 w-6 border-t-2 border-l-2 border-[#3ce06f]/30" />
          <div className="absolute top-3 right-3 h-6 w-6 border-t-2 border-r-2 border-[#3ce06f]/30" />
          <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-[#3ce06f]/30" />
          <div className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-[#3ce06f]/30" />

          <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 space-y-6">
            {/* Success header */}
            <div className="text-center space-y-4">
              {/* Animated checkmark */}
              <div className="mx-auto w-20 h-20 rounded-full border-2 border-[#3ce06f]/40 bg-[#3ce06f]/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10 text-[#3ce06f] animate-checkmark-draw">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-normal tracking-wide text-white">
                  Installation Complete
                </h1>
                <p className="text-white/40 text-sm">
                  All 10 installation steps have been successfully completed.
                </p>
              </div>

              {/* Summary badges */}
              <div className="flex flex-wrap justify-center gap-2">
                <Badge className="bg-[#3ce06f]/15 text-[#3ce06f] border-[#3ce06f]/30 font-mono text-[10px] tracking-wider">
                  10/10 STEPS
                </Badge>
                <Badge
                  variant="outline"
                  className="border-white/10 text-white/60 font-mono text-[10px] tracking-wider">
                  87 MIN TOTAL
                </Badge>
                <Badge
                  variant="outline"
                  className="border-white/10 text-white/60 font-mono text-[10px] tracking-wider">
                  0 SKIPPED
                </Badge>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/5" />

            {/* Testing checklist */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
                Post-Installation Testing
              </span>
              <div className="space-y-2">
                {testingItems.map(function (item) {
                  const isChecked = !!checked[item.id];

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-lg border border-white/5 bg-[oklch(0.08_0.01_240)] px-4 py-3 transition-colors hover:border-white/10 cursor-pointer"
                      onClick={function () {
                        handleToggle(item.id);
                      }}>
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={function () {
                          handleToggle(item.id);
                        }}
                        className="shrink-0"
                      />
                      <Label
                        className={`text-sm font-normal cursor-pointer ${isChecked ? 'text-white/80' : 'text-white/50'} transition-colors`}>
                        {item.title}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
                Troubleshooting Resources
              </span>
              <div className="grid grid-cols-2 gap-2">
                {troubleshootingLinks.map(function (link) {
                  return (
                    <div
                      key={link.label}
                      className="rounded-lg border border-white/5 bg-[oklch(0.08_0.01_240)] p-3 space-y-1 hover:border-white/10 transition-colors cursor-pointer">
                      <span className="text-sm text-primary/80 block">{link.label}</span>
                      <span className="text-[11px] text-white/30 block">{link.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Button
                disabled={!allChecked}
                className="h-11 w-full gap-2 rounded-lg text-sm font-normal cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={
                  allChecked
                    ? {
                        boxShadow:
                          '0 0 15px oklch(0.5 0.2 145 / 30%), 0 0 30px oklch(0.5 0.2 145 / 10%)',
                        background: 'oklch(0.5 0.17 150)',
                      }
                    : undefined
                }
                render={allChecked ? <Link to="/" /> : undefined}>
                {allChecked
                  ? 'Installation Verified — Done'
                  : `Complete ${testingItems.length} Tests to Finish`}
                {allChecked && <span className="text-white/70">&check;</span>}
              </Button>
              <Button
                variant="outline"
                className="h-11 w-full gap-2 rounded-lg text-sm font-normal cursor-pointer">
                Save Installation Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
