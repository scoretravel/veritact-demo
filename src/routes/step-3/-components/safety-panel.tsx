import { Link } from '@tanstack/react-router';
import { type ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

type SafetyItem = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  checked: boolean;
  snapshot: string | null;
};

type SafetyPanelProps = {
  items: SafetyItem[];
  currentItemIndex: number;
  detectionStatus: 'initializing' | 'scanning' | 'verified' | 'complete';
  recordingUrl: string | null;
  recordingDuration: number;
};

/** Render the right panel with auto-checking safety checklist, thumbnails, progress, and CTA. */
export const SafetyPanel = function (props: SafetyPanelProps) {
  const { items, currentItemIndex, detectionStatus, recordingUrl, recordingDuration } = props;

  const checkedCount = items.filter(function (item) {
    return item.checked;
  }).length;
  const progressValue = (checkedCount / items.length) * 100;
  const allChecked = checkedCount === items.length;

  return (
    <Card className="rounded-none border-0 bg-[oklch(0.1_0.01_240)] ring-0 shadow-none">
      <CardHeader className="gap-3">
        {/* Badges */}
        <div className="flex items-center gap-2">
          <Badge className="bg-primary/15 text-primary border-primary/30 font-mono text-[10px] tracking-wider">
            STEP 3
          </Badge>
          <Badge
            variant="outline"
            className="border-white/10 text-white/60 font-mono text-[10px] tracking-wider">
            SHPM88Z75N
          </Badge>
        </div>

        <CardTitle className="text-lg font-normal tracking-wide text-white">
          Safety Protocols
        </CardTitle>

        <p className="text-white/40 text-sm">
          Camera is automatically verifying each safety requirement.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
              Verification Progress
            </span>
            <span className="font-mono text-[10px] tracking-wider text-primary">
              {checkedCount}/{items.length}
            </span>
          </div>
          <Progress
            value={progressValue}
            className="[&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:bg-white/5"
          />
        </div>

        {/* Checklist */}
        <div className="space-y-3">
          {items.map(function (item, index) {
            const isCurrent = index === currentItemIndex;
            const isItemScanning = isCurrent && detectionStatus === 'scanning';

            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 rounded-lg border p-3 transition-all duration-300 ${
                  isItemScanning
                    ? 'border-primary/40 bg-primary/5'
                    : item.checked
                      ? 'border-[#3ce06f]/20 bg-[#3ce06f]/5'
                      : 'border-white/5 bg-[oklch(0.08_0.01_240)]'
                }`}>
                <Checkbox
                  checked={item.checked}
                  disabled
                  className="mt-0.5 shrink-0 disabled:cursor-default disabled:opacity-100"
                />
                <div
                  className={`shrink-0 mt-0.5 transition-colors duration-300 ${
                    item.checked
                      ? 'text-[#3ce06f]'
                      : isItemScanning
                        ? 'text-primary'
                        : 'text-white/30'
                  }`}>
                  {item.icon}
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <Label
                    className={`text-sm font-normal transition-colors duration-300 ${
                      item.checked
                        ? 'text-white/80'
                        : isItemScanning
                          ? 'text-white/70'
                          : 'text-white/60'
                    }`}>
                    {item.title}
                  </Label>
                  <p className="text-[13px] text-white/30 leading-relaxed">{item.description}</p>
                </div>
                {/* Thumbnail from snapshot */}
                {item.snapshot && (
                  <img
                    src={item.snapshot}
                    alt={`${item.title} verification`}
                    className="w-14 h-14 rounded-lg object-cover border border-[#3ce06f]/20 shrink-0"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Video Recording Attachment */}
        {recordingUrl && (
          <div className="rounded-lg border border-[#3ce06f]/20 bg-[#3ce06f]/5 p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Verification Recording</span>
              <div className="flex items-center gap-1.5 text-[#3ce06f]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="font-mono text-[10px] tracking-wider uppercase">Attached</span>
              </div>
            </div>
            <video
              src={recordingUrl}
              controls
              className="w-full rounded-lg border border-white/10"
            />
            <div className="flex items-center gap-2 text-white/40">
              <span className="font-mono text-[10px] tracking-wider">
                Duration: {String(Math.floor(recordingDuration / 60)).padStart(2, '0')}:
                {String(recordingDuration % 60).padStart(2, '0')}
              </span>
              <span className="text-white/20">&middot;</span>
              <span className="font-mono text-[10px] tracking-wider">Recorded just now</span>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="pt-2 pb-4">
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
            render={allChecked ? <Link to="/step-4/preparation" /> : undefined}>
            {allChecked ? 'Proceed to Preparation' : 'Verifying Safety Items...'}
            {allChecked && <span className="text-primary-foreground/70">&rarr;</span>}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
