import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = (current / total) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Progress: {current} / {total}
        </span>
        <span className="tabular-nums">{Math.round(pct)}%</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              i < current - 1
                ? 'bg-primary'
                : i === current - 1
                  ? 'bg-primary'
                  : 'bg-secondary',
            )}
          />
        ))}
      </div>
    </div>
  );
}
