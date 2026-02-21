import { Link, createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EquipmentGrid } from './-components/equipment-grid';

const tools = [
  { id: 'drill', name: 'Power Drill', description: 'For mounting brackets' },
  { id: 'level', name: 'Spirit Level', description: '24" or longer preferred' },
  { id: 'wrench', name: 'Adjustable Wrench', description: 'For water connections' },
  { id: 'pliers', name: 'Needle-Nose Pliers', description: 'For hose clamps' },
  { id: 'screwdriver', name: 'Screwdriver Set', description: 'Phillips & flathead' },
  { id: 'tape', name: 'Measuring Tape', description: 'Verify cabinet dimensions' },
];

const parts = [
  { id: 'supply-line', name: 'Water Supply Line', description: '3/8" braided stainless steel' },
  { id: 'drain-hose', name: 'Drain Hose', description: 'Included with unit' },
  { id: 'elbow', name: '90° Elbow Fitting', description: 'Brass, 3/8" compression' },
  { id: 'junction-box', name: 'Junction Box', description: 'For hardwired connection' },
  { id: 'wire-nuts', name: 'Wire Nuts', description: 'Assorted sizes' },
  { id: 'teflon', name: 'Teflon Tape', description: 'Thread sealant for fittings' },
];

const ancillaries = [
  { id: 'towels', name: 'Towels / Rags', description: 'For spill cleanup' },
  { id: 'bucket', name: 'Bucket', description: 'Catch residual water' },
  { id: 'flashlight', name: 'Flashlight', description: 'Under-cabinet visibility' },
  { id: 'shims', name: 'Leveling Shims', description: 'Plastic or composite' },
  { id: 'drop-cloth', name: 'Drop Cloth', description: 'Protect flooring' },
  { id: 'voltage-tester', name: 'Voltage Tester', description: 'Confirm power is off' },
];

export const Route = createFileRoute('/step-4/preparation')({
  component: function PreparationPage() {
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const allItems = [...tools, ...parts, ...ancillaries];
    const checkedCount = Object.values(checked).filter(Boolean).length;
    const allChecked = checkedCount === allItems.length;

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
          className="animate-fade-in-up relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-primary/10 bg-[oklch(0.1_0.01_240)]"
          style={{
            boxShadow: '0 0 40px oklch(0.7 0.15 200 / 8%), inset 0 1px 0 oklch(0.7 0.15 200 / 10%)',
          }}>
          {/* HUD corner brackets */}
          <div className="absolute top-3 left-3 h-6 w-6 border-t-2 border-l-2 border-primary/30" />
          <div className="absolute top-3 right-3 h-6 w-6 border-t-2 border-r-2 border-primary/30" />
          <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-primary/30" />
          <div className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-primary/30" />

          <div className="max-h-[90vh] overflow-y-auto">
            <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-primary/15 text-primary border-primary/30 font-mono text-[10px] tracking-wider">
                    STEP 4
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/10 text-white/60 font-mono text-[10px] tracking-wider">
                    SHPM88Z75N
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-[#3ce06f]/30 text-[#3ce06f]/80 font-mono text-[10px] tracking-wider">
                    EST. 90 MIN
                  </Badge>
                </div>
                <h1 className="text-2xl font-normal tracking-wide text-white">
                  Tools &amp; Equipment
                </h1>
                <p className="text-white/40 text-sm">
                  Gather everything you need before starting. Check each item as it&apos;s ready.
                </p>
              </div>

              {/* Progress count */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
                  Items Ready
                </span>
                <span className="font-mono text-[10px] tracking-wider text-primary">
                  {checkedCount}/{allItems.length}
                </span>
              </div>

              {/* Tools Section */}
              <div className="space-y-3">
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
                  Tools Required
                </span>
                <EquipmentGrid items={tools} checked={checked} onToggle={handleToggle} />
              </div>

              {/* Parts Section */}
              <div className="space-y-3">
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
                  Parts &amp; Fittings
                </span>
                <EquipmentGrid items={parts} checked={checked} onToggle={handleToggle} />
              </div>

              {/* Ancillaries Section */}
              <div className="space-y-3">
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
                  Ancillary Items
                </span>
                <EquipmentGrid items={ancillaries} checked={checked} onToggle={handleToggle} />
              </div>

              {/* CTA */}
              <div className="pt-2 pb-2">
                <Button
                  disabled={!allChecked}
                  className="h-11 w-full gap-2 rounded-lg text-sm font-normal cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={
                    allChecked
                      ? {
                          boxShadow:
                            '0 0 15px oklch(0.7 0.15 200 / 30%), 0 0 30px oklch(0.7 0.15 200 / 10%)',
                        }
                      : undefined
                  }
                  render={allChecked ? <Link to="/step-5/installation" /> : undefined}>
                  {allChecked
                    ? 'Begin Installation'
                    : `Check All ${allItems.length} Items to Continue`}
                  {allChecked && <span className="text-primary-foreground/70">&rarr;</span>}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
