import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  accent?: 'default' | 'primary' | 'warning';
  children?: React.ReactNode;
}

export function StatCard({
  label,
  value,
  sublabel,
  accent = 'default',
  children,
}: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div
        className={cn(
          'mt-2 text-3xl font-bold tabular-nums',
          accent === 'primary' && 'text-primary',
          accent === 'warning' && 'text-warning',
        )}
      >
        {value}
      </div>
      {sublabel && (
        <div className="mt-1 text-sm text-muted-foreground">{sublabel}</div>
      )}
      {children}
    </div>
  );
}
