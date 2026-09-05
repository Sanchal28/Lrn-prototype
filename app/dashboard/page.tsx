import Link from 'next/link';
import { ArrowRight, Target, CheckCircle2 } from 'lucide-react';
import { mockDashboardData } from '@/lib/mock-data';
import { StatCard } from '@/components/dashboard/StatCard';
import { MasteryChart } from '@/components/dashboard/MasteryChart';
import { ActivityHeatmap } from '@/components/dashboard/ActivityHeatmap';
import { WeakAreas } from '@/components/dashboard/WeakAreas';
import { InterviewCountdown } from '@/components/dashboard/InterviewCountdown';

export default function DashboardPage() {
  const { headline, stats, mastery, weak_areas, todays_focus, activity } =
    mockDashboardData;
  const progressPct = Math.round(
    (stats.today_progress.done / stats.today_progress.total) * 100,
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-fade-in">
      {/* Headline */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          {headline}
        </h1>
        <p className="mt-1 text-muted-foreground">
          You&apos;ve completed {stats.today_progress.done} of{' '}
          {stats.today_progress.total} questions today. Keep the streak going.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InterviewCountdown days={stats.days_until_interview} />
        <StatCard
          label="Current Streak"
          value={`${stats.current_streak} days`}
          sublabel={`Best: ${stats.best_streak} days`}
          accent="warning"
        />
        <StatCard
          label="Today's Progress"
          value={`${stats.today_progress.done} / ${stats.today_progress.total}`}
          sublabel={`${progressPct}% complete`}
        >
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </StatCard>
        <StatCard
          label="Overall Mastery"
          value={`${stats.overall_mastery}%`}
          sublabel="Across all categories"
          accent="primary"
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left: mastery + heatmap */}
        <div className="space-y-4 lg:col-span-2">
          <MasteryChart data={mastery} />
          <ActivityHeatmap data={activity} />
        </div>

        {/* Right: weak areas + today's focus */}
        <div className="space-y-4">
          <WeakAreas areas={weak_areas} />

          {/* Today's Focus */}
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Today&apos;s Focus</h3>
            </div>
            <div className="text-sm font-medium">{todays_focus.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">
              {todays_focus.description}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {todays_focus.question_count} questions · {todays_focus.category}
            </div>
            <Link
              href="/practice"
              className="mt-4 flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Continue Practice
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
