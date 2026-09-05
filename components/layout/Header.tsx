'use client';

import { Menu, Calendar, Flame, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { mockUserProfile } from '@/lib/mock-data';

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Mobile menu */}
      <button
        className="text-muted-foreground hover:text-foreground lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex flex-1 items-center gap-6">
        {/* Interview countdown */}
        <Link
          href="/settings"
          className="hidden items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-primary/50 sm:flex"
        >
          <Calendar className="h-4 w-4 text-primary" />
          <span className="font-semibold tabular-nums text-foreground">188 days</span>
          <span className="text-muted-foreground">until interview</span>
        </Link>

        {/* Streak */}
        <div className="hidden items-center gap-2 text-sm md:flex">
          <Flame className="h-4 w-4 text-warning" />
          <span className="font-semibold tabular-nums">7</span>
          <span className="text-muted-foreground">day streak</span>
        </div>

        {/* Mastery */}
        <div className="hidden items-center gap-2 text-sm md:flex">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="font-semibold tabular-nums">72%</span>
          <span className="text-muted-foreground">mastery</span>
        </div>
      </div>

      {/* Profile */}
      <Link
        href="/profile"
        className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 transition-colors hover:border-primary/50"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {mockUserProfile.name.charAt(0).toUpperCase()}
        </div>
        <span className="hidden text-sm font-medium sm:inline">
          {mockUserProfile.name}
        </span>
      </Link>
    </header>
  );
}
