'use client';

import { useState } from 'react';
import { Calendar, Bell, Moon, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [interviewDate, setInterviewDate] = useState('2027-03-12');
  const [dailyGoal, setDailyGoal] = useState(10);
  const [notifications, setNotifications] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

      {/* Interview date */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">Interview Date</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          This date drives the countdown on your dashboard.
        </p>
        <input
          type="date"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <div className="mt-2 text-xs text-muted-foreground">
          Currently set: {new Date(interviewDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* Preferences */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">Practice Preferences</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Daily Question Goal</label>
            <p className="mb-2 text-xs text-muted-foreground">
              Target number of questions per day.
            </p>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={5}
                max={30}
                step={5}
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="w-12 text-right text-sm font-semibold tabular-nums">
                {dailyGoal}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">Notifications</h2>
        </div>
        <div className="space-y-3">
          <ToggleRow
            label="Practice reminders"
            description="Get reminded to maintain your streak."
            value={notifications}
            onChange={setNotifications}
          />
          <ToggleRow
            label="Email digest"
            description="Weekly progress summary by email."
            value={emailReminders}
            onChange={setEmailReminders}
          />
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Moon className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">Appearance</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Theme</div>
            <div className="text-xs text-muted-foreground">
              Dark mode is always on for LRN.
            </div>
          </div>
          <div className="rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-sm font-medium text-muted-foreground">
            Dark
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={cn(
            'rounded-md px-5 py-2.5 text-sm font-semibold transition-colors',
            saved
              ? 'bg-primary/20 text-primary'
              : 'bg-primary text-primary-foreground hover:opacity-90',
          )}
        >
          {saved ? 'Saved' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors',
          value ? 'bg-primary' : 'bg-secondary',
        )}
      >
        <div
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform',
            value ? 'translate-x-5' : 'translate-x-0.5',
          )}
        />
      </button>
    </div>
  );
}
