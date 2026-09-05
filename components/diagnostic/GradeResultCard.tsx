import { Check, X, Lightbulb, AlertCircle, ArrowRightCircle } from 'lucide-react';
import type { GradeResult } from '@/types';
import { cn } from '@/lib/utils';

export function GradeResultCard({ result }: { result: GradeResult }) {
  const bandColor =
    result.band === 'Advanced'
      ? 'text-primary border-primary/30 bg-primary/10'
      : result.band === 'Proficient'
        ? 'text-primary border-primary/30 bg-primary/5'
        : result.band === 'Competent'
          ? 'text-chart-4 border-chart-4/30 bg-chart-4/5'
          : 'text-warning border-warning/30 bg-warning/5';

  return (
    <div className="animate-scale-in space-y-4 rounded-md border border-border bg-card p-5">
      {/* Score + band */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            AI Grading
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-4xl font-bold tabular-nums">{result.score}</span>
            <span className="text-lg text-muted-foreground">/ 100</span>
          </div>
        </div>
        <span
          className={cn(
            'rounded-md border px-3 py-1.5 text-sm font-semibold',
            bandColor,
          )}
        >
          {result.band}
        </span>
      </div>

      {/* Concepts */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Concepts Hit
          </div>
          <div className="space-y-1.5">
            {result.concepts_hit.length > 0 ? (
              result.concepts_hit.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-2 text-sm"
                >
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  {c}
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">None identified</div>
            )}
          </div>
        </div>
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Concepts Missed
          </div>
          <div className="space-y-1.5">
            {result.concepts_missed.length > 0 ? (
              result.concepts_missed.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-2 text-sm"
                >
                  <X className="h-4 w-4 shrink-0 text-destructive" />
                  {c}
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">None missed</div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="rounded-md border border-border bg-secondary/30 p-4">
        <div className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Lightbulb className="h-3.5 w-3.5" />
          Feedback
        </div>
        <p className="text-sm leading-relaxed">{result.feedback}</p>
      </div>

      {/* Common mistake */}
      <div className="rounded-md border border-warning/20 bg-warning/5 p-4">
        <div className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-warning">
          <AlertCircle className="h-3.5 w-3.5" />
          Common Mistake
        </div>
        <p className="text-sm leading-relaxed">{result.mistakes}</p>
      </div>

      {/* Next step */}
      <div className="flex items-start gap-2 text-sm">
        <ArrowRightCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div>
          <span className="font-medium">Recommended next step: </span>
          <span className="text-muted-foreground">
            {result.recommended_next_step}
          </span>
        </div>
      </div>
    </div>
  );
}
