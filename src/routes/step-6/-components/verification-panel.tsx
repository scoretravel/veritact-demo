import { Link } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const checklistItems = [
  {
    id: 'rinse-cycle',
    title: 'Run rinse cycle (15 min)',
    subtitle: 'Cycle completed successfully at 10:42 AM',
    checked: true,
    arVerified: false,
    media: [
      { type: 'photo' as const, label: 'Pre-cycle' },
      { type: 'photo' as const, label: 'Post-cycle' },
    ],
  },
  {
    id: 'leak-check',
    title: 'Check for leaks',
    subtitle: 'Automatically verified via AR camera feed.',
    checked: true,
    arVerified: true,
    media: [{ type: 'video' as const, label: 'AR scan' }],
  },
  {
    id: 'level-check',
    title: 'Verify unit is level',
    subtitle: 'Use physical level tool or integrated sensor.',
    checked: false,
    arVerified: false,
    media: [] as { type: 'photo' | 'video'; label: string }[],
  },
];

/** Render a small camera icon SVG. */
const CameraIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
};

/** Render a small video camera icon SVG. */
const VideoIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
};

/** Format a media count label like "2 photos" or "1 video". */
const formatMediaLabel = function (media: { type: 'photo' | 'video'; label: string }[]) {
  const photos = media.filter(function (m) {
    return m.type === 'photo';
  }).length;
  const videos = media.filter(function (m) {
    return m.type === 'video';
  }).length;
  const parts: string[] = [];
  if (photos > 0) parts.push(`${photos} photo${photos > 1 ? 's' : ''}`);
  if (videos > 0) parts.push(`${videos} video${videos > 1 ? 's' : ''}`);
  return parts.join(', ');
};

/** Right panel with status badge, appliance info, final verification checklist, and actions. */
export const VerificationPanel = function () {
  const checkedCount = checklistItems.filter(function (item) {
    return item.checked;
  }).length;
  const pendingCount = checklistItems.length - checkedCount;

  return (
    <div className="flex-[2] flex flex-col bg-white overflow-y-auto">
      <div className="flex flex-col flex-1 p-6">
        <div className="space-y-6 flex-1">
          {/* Installation successful badge */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] tracking-widest text-emerald-600 uppercase font-medium">
                Installation Successful
              </span>
            </span>
          </div>

          {/* Title + metadata */}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
              Installation Complete
            </h1>
            <p className="font-mono text-sm text-gray-400">
              Unit ID: #WASH-2024-X89 &nbsp;|&nbsp; Time: 14:32 PM
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Total Duration */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 text-gray-400">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">
                  Total Duration
                </span>
              </div>
              <span className="text-2xl font-mono font-semibold text-gray-900">
                00:45:12
              </span>
            </div>

            {/* Points Checked */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 text-gray-400">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">
                  Points Checked
                </span>
              </div>
              <div>
                <span className="text-2xl font-mono font-semibold text-gray-900">
                  {checkedCount}
                </span>
                <span className="text-2xl font-mono font-semibold text-gray-400">
                  {' '}/ {checklistItems.length}
                </span>
              </div>
            </div>
          </div>

          {/* Appliance info card */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-4">
              {/* Appliance icon */}
              <div className="shrink-0 w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-7 h-7 text-primary">
                  <rect x="3" y="2" width="18" height="20" rx="2" />
                  <circle cx="12" cy="14" r="4" />
                  <line x1="8" y1="6" x2="8" y2="6.01" />
                  <line x1="12" y1="6" x2="12" y2="6.01" />
                </svg>
              </div>
              <div>
                <div className="text-base font-medium text-gray-900">Samsung AI Washer</div>
                <div className="text-sm text-gray-400 mt-0.5">Model: WF50A8600AV</div>
                <div className="text-sm text-gray-400">
                  Serial: <span className="font-mono">S/N 8921-3321-AZ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Final verification section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-widest text-gray-500 uppercase font-semibold">
                Final Verification
              </span>
              <span className="text-sm text-primary">
                {pendingCount} Pending
              </span>
            </div>
            <div className="space-y-2.5">
              {checklistItems.map(function (item) {
                return (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 ${
                      item.arVerified
                        ? 'border-emerald-300 bg-emerald-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                    <Checkbox
                      checked={item.checked}
                      className="shrink-0 mt-0.5"
                      disabled
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${item.checked ? 'text-gray-900' : 'text-gray-700'}`}>
                          {item.title}
                        </span>
                        {item.arVerified && (
                          <Badge className="bg-emerald-100 text-emerald-600 border-emerald-300 font-mono text-[9px] tracking-wider h-4 px-1.5">
                            AR VERIFIED
                          </Badge>
                        )}
                      </div>
                      <span className="text-[12px] text-gray-400 mt-0.5 block">
                        {item.subtitle}
                      </span>
                      {item.media.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          {item.media.map(function (m) {
                            return (
                              <div
                                key={m.label}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  m.type === 'video'
                                    ? 'bg-primary/5 border border-primary/10'
                                    : 'bg-gray-900/5 border border-gray-200'
                                }`}>
                                {m.type === 'video' ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-3.5 h-3.5 text-gray-300">
                                    <polygon points="9.5 7 9.5 17 18 12 9.5 7" />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-3.5 h-3.5 text-gray-300">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                  </svg>
                                )}
                              </div>
                            );
                          })}
                          <span className="text-[11px] text-gray-400">
                            {formatMediaLabel(item.media)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 flex items-center gap-1.5">
                      <button
                        type="button"
                        className="w-7 h-7 rounded-lg bg-gray-900/5 hover:bg-gray-900/10 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-500 transition-colors cursor-pointer">
                        <CameraIcon />
                      </button>
                      <button
                        type="button"
                        className="w-7 h-7 rounded-lg bg-gray-900/5 hover:bg-gray-900/10 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-500 transition-colors cursor-pointer">
                        <VideoIcon />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Technician Notes */}
        <div className="space-y-2 pt-6">
          <span className="font-mono text-[11px] tracking-widest text-gray-500 uppercase font-semibold">
            Technician Notes (Optional)
          </span>
          <textarea
            className="rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-300 p-3 resize-none h-24 w-full focus:outline-none focus:border-gray-300"
            placeholder="Add any observations regarding the installation environment..."
          />
        </div>

        {/* Actions — pinned to bottom */}
        <div className="space-y-3 pt-8">
          <Button
            className="h-12 w-full gap-2 rounded-xl text-sm font-medium cursor-pointer"
            render={<Link to="/" />}>
            {/* Send icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Save &amp; Share Installation Report
          </Button>
          <Button
            variant="ghost"
            className="h-9 w-full text-sm font-normal text-gray-400 hover:text-gray-500 cursor-pointer">
            Retake Photo / Verify Again
          </Button>
        </div>
      </div>
    </div>
  );
};
