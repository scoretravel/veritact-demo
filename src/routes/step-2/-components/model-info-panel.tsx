import { Link } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const clearanceDimensions = [
  { label: 'Width', value: '24"' },
  { label: 'Depth', value: '24"' },
  { label: 'Height', value: '33⅞"' },
];

const electricalSpecs = [
  { label: 'Voltage', value: '120 V' },
  { label: 'Frequency', value: '60 Hz' },
  { label: 'Current', value: '12 Amps' },
  { label: 'Connection Type', value: 'Hardwired / Plug' },
];

const plumbingSpecs = [
  { label: 'Water Supply', value: 'Hot (120°F)' },
  { label: 'Pressure', value: '15 – 145 PSI' },
  { label: 'Inlet Hose', value: '3/8" OD Copper' },
];

const includedParts = [
  'Water inlet hose',
  'Drain hose',
  'Mounting brackets',
  'Junction box cover',
  'Installation manual',
];

/** Inline SVG icon for clearance / dimensions. */
const ClearanceIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-primary">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 12h18M12 3v18" />
    </svg>
  );
};

/** Inline SVG icon for electrical specs. */
const ElectricalIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-primary">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
};

/** Inline SVG icon for plumbing specs. */
const PlumbingIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-primary">
      <path d="M12 2v6m0 0a4 4 0 0 1 4 4v1a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-1a4 4 0 0 1 4-4z" />
      <path d="M6 22v-5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
    </svg>
  );
};

/** Inline SVG icon for included parts. */
const PartsIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-primary">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
};

/** Inline SVG icon for external link button. */
const ExternalLinkIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
};

/** Inline SVG icon for headset / contact support. */
const HeadsetIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
    </svg>
  );
};

/** Inline SVG caution icon for warning notes. */
const CautionIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 text-amber-400 shrink-0">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
};

/** Section header with icon and title. */
const SectionHeader = function ({
  icon,
  title,
  trailing,
}: {
  icon: React.ReactNode;
  title: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm font-medium text-gray-800">{title}</span>
      {trailing && <span className="ml-auto">{trailing}</span>}
    </div>
  );
};

/** Right-side panel displaying detected model information and specifications. */
export const ModelInfoPanel = function () {
  return (
    <Card className="rounded-none border-0 bg-white ring-0 shadow-none">
      <CardHeader className="gap-3">
        {/* Header — image placeholder + model info */}
        <div className="flex items-start gap-4">
          {/* Product image placeholder */}
          <div className="w-16 h-16 shrink-0 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-7 h-7 text-gray-300">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>

          <div className="space-y-1.5">
            <span className="font-mono text-[10px] tracking-widest text-primary uppercase block">
              DISHWASHER &middot; 800 Series
            </span>
            <CardTitle className="text-lg font-normal tracking-wide text-gray-900">
              Bosch 800 Series
            </CardTitle>
            <Badge
              variant="outline"
              className="border-gray-200 text-gray-500 font-mono text-[10px] tracking-wider">
              Model: SHPM88Z75N
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="default"
            className="h-9 gap-2 text-sm font-normal cursor-pointer"
            render={<a href="#" />}>
            <ExternalLinkIcon />
            Full Manual
          </Button>
          <Button
            variant="outline"
            className="h-9 gap-2 border-gray-200 text-gray-700 text-sm font-normal cursor-pointer"
            render={<a href="#" />}>
            <HeadsetIcon />
            Contact Support
          </Button>
        </div>

        {/* Clearance Requirements */}
        <div className="space-y-3">
          <SectionHeader
            icon={<ClearanceIcon />}
            title="Clearance Requirements"
            trailing={
              <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">
                Inches
              </span>
            }
          />
          <div className="grid grid-cols-3 gap-2">
            {clearanceDimensions.map(function (dim) {
              return (
                <div
                  key={dim.label}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center space-y-1">
                  <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase block">
                    {dim.label}
                  </span>
                  <span className="text-lg font-bold font-mono text-gray-800 block">
                    {dim.value}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2.5">
            <CautionIcon />
            <span className="text-xs text-amber-700 leading-relaxed">
              Allow 0.5" side clearance when installing near a corner wall to ensure the door opens
              fully.
            </span>
          </div>
        </div>

        {/* Electrical Specs */}
        <div className="space-y-3">
          <SectionHeader icon={<ElectricalIcon />} title="Electrical Specs" />
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            {electricalSpecs.map(function (spec, i) {
              return (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between px-4 py-3 ${i < electricalSpecs.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <span className="text-sm text-gray-500">{spec.label}</span>
                  <span className="text-sm font-mono text-gray-800">{spec.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Plumbing Specs */}
        <div className="space-y-3">
          <SectionHeader icon={<PlumbingIcon />} title="Plumbing Specs" />
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            {plumbingSpecs.map(function (spec, i) {
              return (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between px-4 py-3 ${i < plumbingSpecs.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <span className="text-sm text-gray-500">{spec.label}</span>
                  <span className="text-sm font-mono text-gray-800">{spec.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Included Parts */}
        <div className="space-y-3">
          <SectionHeader icon={<PartsIcon />} title="Included Parts" />
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <ul className="space-y-2">
              {includedParts.map(function (part) {
                return (
                  <li key={part} className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="h-1 w-1 rounded-full bg-primary/60 shrink-0" />
                    {part}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3 pt-2 pb-4">
          <Button
            className="h-11 w-full gap-2 rounded-lg text-sm font-normal cursor-pointer"
            style={{
              boxShadow: '0 0 15px oklch(0.52 0.15 210 / 20%), 0 0 30px oklch(0.52 0.15 210 / 8%)',
            }}
            render={<Link to="/step-3/safety-checklist" />}>
            Continue to Safety Check
            <span className="text-primary-foreground/70">&rarr;</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
