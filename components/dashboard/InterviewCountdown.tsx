import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function InterviewCountdown({ days }: { days: number }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-gradient-to-br from-card to-secondary/30 p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            Interview Countdown
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-bold tabular-nums text-primary">
              {days}
            </span>
            <span className="text-lg text-muted-foreground">days</span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            March 12, 2027 — Goldman Sachs
          </div>
        </div>
        <Link
          href="/settings"
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
