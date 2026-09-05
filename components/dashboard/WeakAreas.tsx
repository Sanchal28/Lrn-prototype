import { AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Category } from '@/types';

export function WeakAreas({ areas }: { areas: Category[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <h3 className="font-semibold">Your Weakest Areas</h3>
      </div>
      <div className="space-y-3">
        {areas.map((area) => (
          <div
            key={area}
            className="flex items-center justify-between rounded-md border border-border bg-secondary/30 p-3"
          >
            <div>
              <div className="font-medium">{area}</div>
              <div className="text-xs text-muted-foreground">
                Below target mastery
              </div>
            </div>
            <Link
              href="/practice"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80"
            >
              Practice
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
