import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { partCategories, parts } from './installation-data';

/** Tab content showing parts and tools grid with category filter. */
export const PartsToolsTab = function () {
  const [activeCategory, setActiveCategory] = useState<(typeof partCategories)[number]>('all');

  const filteredParts =
    activeCategory === 'all'
      ? parts
      : parts.filter(function (part) {
          return part.category === activeCategory;
        });

  return (
    <div className="flex flex-col h-full">
      {/* Category filter */}
      <div className="flex gap-1.5 p-4 pb-2 flex-wrap">
        {partCategories.map(function (cat) {
          return (
            <button
              key={cat}
              className={cn(
                'font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md border transition-colors cursor-pointer',
                activeCategory === cat
                  ? 'bg-primary/15 border-primary/30 text-primary'
                  : 'bg-transparent border-gray-200 text-gray-400 hover:text-gray-500 hover:border-gray-300'
              )}
              onClick={function () {
                setActiveCategory(cat);
              }}>
              {cat}
            </button>
          );
        })}
      </div>

      {/* Parts grid */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid grid-cols-2 gap-2 p-4 pt-2">
          {filteredParts.map(function (part) {
            return (
              <div
                key={part.id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm text-gray-700">{part.name}</span>
                  <Badge
                    variant="outline"
                    className="border-gray-200 text-gray-400 font-mono text-[9px] tracking-wider shrink-0">
                    ×{part.quantity}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-400">{part.partNumber}</span>
                  <span
                    className={cn(
                      'font-mono text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded border',
                      part.category === 'plumbing' &&
                        'text-blue-400/70 border-blue-400/20 bg-blue-400/5',
                      part.category === 'electrical' &&
                        'text-yellow-400/70 border-yellow-400/20 bg-yellow-400/5',
                      part.category === 'mounting' &&
                        'text-green-400/70 border-green-400/20 bg-green-400/5',
                      part.category === 'accessory' &&
                        'text-purple-400/70 border-purple-400/20 bg-purple-400/5'
                    )}>
                    {part.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
