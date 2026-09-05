import type { CategoryMastery } from '@/types';
import { cn } from '@/lib/utils';

export function MasteryChart({ data }: { data: CategoryMastery[] }) {
  const sorted = [...data].sort((a, b) => b.score - a.score);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Mastery by Category</h3>
        <span className="text-xs text-muted-foreground">Overall 72%</span>
      </div>
      <div className="space-y-3">
        {sorted.map((item) => (
          <div key={item.category}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium">{item.category}</span>
              <span className="tabular-nums text-muted-foreground">{item.score}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-700',
                  item.score >= 75 ? 'bg-primary' :
                  item.score >= 60 ? 'bg-chart-4' :
                  'bg-warning',
                )}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
