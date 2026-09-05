import { Crown, Mail, Briefcase, Building2, Calendar, Target } from 'lucide-react';
import { mockUserProfile } from '@/lib/mock-data';

export default function ProfilePage() {
  const user = mockUserProfile;

  const stats = [
    { label: 'Questions Answered', value: '130' },
    { label: 'Diagnostic Score', value: '72%' },
    { label: 'Current Streak', value: '7 days' },
    { label: 'Member Since', value: 'Aug 2026' },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight">Profile</h1>

      {/* Profile header */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <span className="flex items-center gap-1 rounded border border-warning/30 bg-warning/10 px-2 py-0.5 text-xs font-semibold text-warning">
                <Crown className="h-3 w-3" />
                {user.plan}
              </span>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
            <div className="mt-1.5 text-xl font-bold tabular-nums">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 font-semibold">Recruiting Profile</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Target Role
              </div>
              <div className="mt-0.5 text-sm">{user.target_role}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Target Firms
              </div>
              <div className="mt-1 flex flex-wrap gap-2">
                {user.target_firms.map((firm) => (
                  <span
                    key={firm}
                    className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-sm"
                  >
                    {firm}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Interview Date
              </div>
              <div className="mt-0.5 text-sm">
                March 12, 2027 — 188 days from now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
