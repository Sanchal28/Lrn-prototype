'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Trophy, AlertTriangle, Calendar, Target } from 'lucide-react';
import { mockDiagnosticResult } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface StoredResult {
  overall: number;
  grades: Record<string, { score: number; band: string }>;
  answers: Record<string, string>;
}

export default function DiagnosticResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('diagnostic_result');
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  // Use stored overall if available, else mock data
  const overall = result?.overall ?? mockDiagnosticResult.overall;
  const categories = mockDiagnosticResult.categories;
  const sorted = [...categories].sort((a, b) => b.score - a.score);

  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Diagnostic Complete
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Your Interview Readiness
        </h1>
      </div>

      {/* Readiness score */}
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
          <svg className="h-40 w-40 -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="8"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(overall / 100) * 439.8} 439.8`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold tabular-nums text-primary">
              {overall}%
            </span>
            <span className="text-xs text-muted-foreground">Ready</span>
          </div>
        </div>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          {overall >= 75
            ? 'You are in strong shape. Focus on polishing your weakest areas to push above 80%.'
            : overall >= 60
              ? 'You have a solid foundation but several gaps to close before interview day.'
              : 'Significant gaps remain. Prioritize your weakest areas before moving to advanced topics.'}
        </p>
      </div>

      {/* Category breakdown */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-4 font-semibold">Category Breakdown</h2>
        <div className="space-y-3">
          {sorted.map((cat) => (
            <div key={cat.category}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium">{cat.category}</span>
                <span className="tabular-nums text-muted-foreground">
                  {cat.score}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-700',
                    cat.score >= 75 ? 'bg-primary' :
                    cat.score >= 60 ? 'bg-chart-4' : 'bg-warning',
                  )}
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strongest + Needs work */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Strongest Area
            </span>
          </div>
          <div className="text-xl font-bold">{mockDiagnosticResult.strongest}</div>
        </div>
        <div className="rounded-lg border border-warning/20 bg-warning/5 p-5">
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Needs Work
            </span>
          </div>
          <div className="text-xl font-bold">{mockDiagnosticResult.weakest}</div>
        </div>
      </div>

      {/* Priority gaps */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-4 flex items-center gap-2 font-semibold">
          <Target className="h-4 w-4 text-primary" />
          Priority Gaps
        </h2>
        <div className="space-y-2">
          {mockDiagnosticResult.priority_gaps.map((gap, i) => (
            <div
              key={gap.category}
              className="flex items-center gap-4 rounded-md border border-border bg-secondary/30 p-3"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="flex-1 font-medium">{gap.category}</span>
              <span className="tabular-nums text-sm text-muted-foreground">
                {gap.score}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Two-week plan */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-4 flex items-center gap-2 font-semibold">
          <Calendar className="h-4 w-4 text-primary" />
          Two-Week Priority Plan
        </h2>
        <div className="space-y-3">
          {mockDiagnosticResult.two_week_plan.map((phase, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-md border border-border bg-secondary/30 p-4"
            >
              <div className="shrink-0">
                <div className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-xs font-semibold text-primary">
                  {phase.days}
                </div>
              </div>
              <div className="text-sm leading-relaxed">{phase.focus}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-primary/30 bg-primary/5 p-5">
        <div>
          <h3 className="font-semibold">Ready to close your gaps?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Start targeted practice on your weakest areas.
          </p>
        </div>
        <Link
          href="/practice"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start Priority Practice
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
