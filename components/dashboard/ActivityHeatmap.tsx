import type { ActivityDay } from '@/types';
import { cn } from '@/lib/utils';

export function ActivityHeatmap({ data }: { data: ActivityDay[] }) {
  // Group into weeks (columns of 7)
  const weeks: ActivityDay[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const levelColors: Record<number, string> = {
    0: 'bg-secondary',
    1: 'bg-primary/30',
    2: 'bg-primary/50',
    3: 'bg-primary/70',
    4: 'bg-primary',
  };

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Weekly Activity</h3>
        <span className="text-xs text-muted-foreground">Last 4 weeks</span>
      </div>
      <div className="flex gap-1.5 overflow-x-auto scrollbar-thin">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1.5">
            {week.map((day) => (
              <div
                key={day.date}
                className={cn(
                  'h-7 w-7 rounded-sm transition-colors',
                  levelColors[day.level],
                )}
                title={`${day.date}: ${day.count} questions`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div
            key={l}
            className={cn('h-3 w-3 rounded-sm', levelColors[l])}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
