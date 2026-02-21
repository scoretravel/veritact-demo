import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ChecklistItem = {
  id: string;
  name: string;
  description: string;
  optional?: boolean;
};

const tools: ChecklistItem[] = [
  { id: 'wrench', name: 'Adjustable Wrench', description: 'Standard size (8-10 inch)' },
  { id: 'screwdriver', name: 'Phillips Screwdriver', description: '#2 size head' },
  { id: 'level', name: 'Spirit Level', description: 'For alignment' },
  { id: 'drill', name: 'Power Drill', description: 'Variable speed' },
  { id: 'tape', name: 'Measuring Tape', description: '25ft minimum' },
  { id: 'light', name: 'Work Light', description: 'For under-cabinet visibility', optional: true },
];

const parts: ChecklistItem[] = [
  { id: 'supply-line', name: 'Water Supply Line', description: '3/8" braided stainless steel' },
  { id: 'drain-hose', name: 'Drain Hose', description: 'Included with unit' },
  { id: 'elbow', name: '90° Elbow Fitting', description: 'Brass, 3/8" compression' },
  { id: 'junction-box', name: 'Junction Box', description: 'For hardwired connection' },
  { id: 'wire-nuts', name: 'Wire Nuts', description: 'Assorted sizes' },
  { id: 'teflon', name: 'Teflon Tape', description: 'Thread sealant for fittings' },
];

/** Tool-specific SVG icon by item id. */
const ToolIcon = function ({ id }: { id: string }) {
  const className = 'w-5 h-5';
  const props = {
    xmlns: 'http://www.w3.org/2000/svg' as const,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };

  switch (id) {
    case 'wrench':
      return (
        <svg {...props}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'screwdriver':
      return (
        <svg {...props}>
          <path d="M15 3l6 6-9 9-6-6 9-9z" />
          <path d="M6 12L2 16l4 4 4-4" />
        </svg>
      );
    case 'level':
      return (
        <svg {...props}>
          <rect x="2" y="7" width="20" height="10" rx="2" />
          <circle cx="12" cy="12" r="2" />
          <line x1="6" y1="12" x2="8" y2="12" />
          <line x1="16" y1="12" x2="18" y2="12" />
        </svg>
      );
    case 'drill':
      return (
        <svg {...props}>
          <path d="M14 4l6 6-4 4-6-6 4-4z" />
          <path d="M10 10l-7 7a2 2 0 1 0 3 3l7-7" />
          <line x1="20" y1="10" x2="22" y2="4" />
        </svg>
      );
    case 'tape':
      return (
        <svg {...props}>
          <path d="M2 12h6" />
          <circle cx="14" cy="12" r="8" />
          <circle cx="14" cy="12" r="3" />
        </svg>
      );
    case 'light':
      return (
        <svg {...props}>
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      );
  }
};

/** Part-specific SVG icon by item id. */
const PartIcon = function ({ id }: { id: string }) {
  const className = 'w-5 h-5';
  const props = {
    xmlns: 'http://www.w3.org/2000/svg' as const,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };

  switch (id) {
    case 'supply-line':
      return (
        <svg {...props}>
          <path d="M4 14c0-4 8-4 8-8" />
          <path d="M12 6c0 4 8 4 8 8" />
          <line x1="4" y1="14" x2="4" y2="20" />
          <line x1="20" y1="14" x2="20" y2="20" />
        </svg>
      );
    case 'drain-hose':
      return (
        <svg {...props}>
          <path d="M6 4v4a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4v4" />
          <circle cx="6" cy="4" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
      );
    case 'elbow':
      return (
        <svg {...props}>
          <path d="M4 20h4a8 8 0 0 0 8-8V4" />
          <polyline points="4 16 4 20 8 20" />
          <polyline points="12 4 16 4 16 8" />
        </svg>
      );
    case 'junction-box':
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <circle cx="8" cy="12" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="16" cy="12" r="1" />
        </svg>
      );
    case 'wire-nuts':
      return (
        <svg {...props}>
          <path d="M12 2v4" />
          <path d="M8 6l4 14 4-14" />
          <path d="M7 10h10" />
        </svg>
      );
    case 'teflon':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 4v1" />
          <path d="M12 19v1" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      );
  }
};

/** Right panel with Tools/Parts tabbed checklist and Begin Installation CTA. */
export const PreparationPanel = function () {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const allItems = [...tools, ...parts];
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = allItems.length > 0 ? Math.round((checkedCount / allItems.length) * 100) : 0;

  const handleToggle = function (id: string) {
    setChecked(function (prev) {
      return { ...prev, [id]: !prev[id] };
    });
  };

  /** Render a single checklist row. */
  const renderItem = function (
    item: ChecklistItem,
    IconComponent: typeof ToolIcon | typeof PartIcon
  ) {
    const isChecked = !!checked[item.id];

    return (
      <div
        key={item.id}
        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 transition-colors hover:border-gray-300 cursor-pointer"
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
        <div className="w-9 h-9 rounded-md border border-gray-200 bg-gray-900/5 flex items-center justify-center shrink-0">
          <span className={isChecked ? 'text-primary' : 'text-gray-300'}>
            <IconComponent id={item.id} />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span
            className={`text-sm font-medium block ${isChecked ? 'text-gray-800' : 'text-gray-500'} transition-colors`}>
            {item.name}
          </span>
          <span className="text-[11px] text-gray-400 leading-relaxed block">{item.description}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-[2] flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 px-5 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Preparation</h2>
          <span className="text-primary font-mono text-sm font-semibold">{progress}%</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Verify you have all necessary items.</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="tools" className="flex-1 flex flex-col overflow-hidden gap-0">
        <TabsList
          variant="line"
          className="w-full justify-start px-4 border-b border-gray-200 h-10 rounded-none">
          <TabsTrigger value="tools" className="text-[12px] font-mono tracking-wider">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            Tools
          </TabsTrigger>
          <TabsTrigger value="parts" className="text-[12px] font-mono tracking-wider">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            Parts
          </TabsTrigger>
        </TabsList>

        {/* Tools tab */}
        <TabsContent value="tools" className="flex-1 overflow-y-auto min-h-0">
          <div className="p-4 space-y-2">
            {tools
              .filter(function (item) {
                return !item.optional;
              })
              .map(function (item) {
                return renderItem(item, ToolIcon);
              })}

            {/* Optional section */}
            <div className="pt-3 pb-1">
              <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">
                Optional / Recommended
              </span>
            </div>
            {tools
              .filter(function (item) {
                return item.optional;
              })
              .map(function (item) {
                return renderItem(item, ToolIcon);
              })}
          </div>
        </TabsContent>

        {/* Parts tab */}
        <TabsContent value="parts" className="flex-1 overflow-y-auto min-h-0">
          <div className="p-4 space-y-2">
            {parts.map(function (item) {
              return renderItem(item, PartIcon);
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom pinned area */}
      <div className="border-t border-gray-200 px-5 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Estimated Install Time</span>
          <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-900/5 px-2.5 py-1">
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
            <span className="font-mono text-[12px] text-gray-700">45 mins</span>
          </div>
        </div>
        <Button
          className="h-11 w-full gap-2 rounded-lg text-sm font-normal cursor-pointer"
          style={{
            boxShadow:
              '0 0 15px oklch(0.52 0.15 210 / 20%), 0 0 30px oklch(0.52 0.15 210 / 8%)',
          }}
          render={<Link to="/step-5/installation" />}>
          Begin Installation <span className="text-primary-foreground/70">&rarr;</span>
        </Button>
      </div>
    </div>
  );
};
