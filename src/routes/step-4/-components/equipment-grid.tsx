import { Checkbox } from '@/components/ui/checkbox';

type EquipmentItem = {
  id: string;
  name: string;
  description: string;
};

type EquipmentGridProps = {
  items: EquipmentItem[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
};

/** Reusable grid for displaying tools, parts, or ancillaries with checkboxes. */
export const EquipmentGrid = function ({ items, checked, onToggle }: EquipmentGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {items.map(function (item) {
        const isChecked = !!checked[item.id];

        return (
          <div
            key={item.id}
            className="group flex flex-col gap-3 rounded-lg border border-white/5 bg-[oklch(0.08_0.01_240)] p-3 transition-colors hover:border-white/10 cursor-pointer"
            onClick={function () {
              onToggle(item.id);
            }}>
            <div className="flex items-start justify-between gap-2">
              <div className="w-9 h-9 rounded-md border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`w-4 h-4 ${isChecked ? 'text-primary' : 'text-white/20'} transition-colors`}>
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <Checkbox
                checked={isChecked}
                onCheckedChange={function () {
                  onToggle(item.id);
                }}
                className="shrink-0"
              />
            </div>
            <div className="space-y-1">
              <span
                className={`text-sm font-normal ${isChecked ? 'text-white/80' : 'text-white/60'} transition-colors block`}>
                {item.name}
              </span>
              <span className="text-[11px] text-white/30 leading-relaxed block">
                {item.description}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
