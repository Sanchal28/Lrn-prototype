'use client';

import { useState, useMemo } from 'react';
import { Search, Lock, Crown, ChevronRight } from 'lucide-react';
import { mockQuestions } from '@/lib/mock-data';
import type { Category, Difficulty } from '@/types';
import { cn } from '@/lib/utils';

const categories: (Category | 'All')[] = [
  'All',
  'Accounting',
  'Valuation',
  'M&A',
  'LBO Mechanics',
  'Markets',
  'Judgment',
  'Technical Concepts',
  'Financial Statements',
];

const difficulties: (Difficulty | 'All')[] = ['All', 'Foundational', 'Intermediate', 'Advanced'];

export default function QuestionBankPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All');

  const filtered = useMemo(() => {
    return mockQuestions.filter((q) => {
      if (category !== 'All' && q.category !== category) return false;
      if (difficulty !== 'All' && q.difficulty !== difficulty) return false;
      if (search && !q.question.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [search, category, difficulty]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Question Bank</h1>
        <p className="mt-1 text-muted-foreground">
          Browse {mockQuestions.length} interview questions across all categories.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="w-full rounded-md border border-input bg-card py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                'rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
                category === cat
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Difficulty:
          </span>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={cn(
                'rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
                difficulty === diff
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground',
              )}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="text-sm text-muted-foreground">
        {filtered.length} question{filtered.length === 1 ? '' : 's'}
      </div>

      {/* Question cards */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-border bg-card py-16 text-center text-muted-foreground">
            No questions match your filters.
          </div>
        ) : (
          filtered.map((q) => (
            <div
              key={q.id}
              className={cn(
                'group flex items-start justify-between gap-4 rounded-lg border border-border bg-card p-4 transition-colors',
                q.is_pro ? 'opacity-90' : 'hover:border-primary/30 cursor-pointer',
              )}
            >
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {q.category}
                  </span>
                  <span
                    className={cn(
                      'rounded border px-2 py-0.5 text-xs font-medium',
                      q.difficulty === 'Advanced'
                        ? 'border-destructive/30 text-destructive'
                        : q.difficulty === 'Intermediate'
                          ? 'border-warning/30 text-warning'
                          : 'border-primary/30 text-primary',
                    )}
                  >
                    {q.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {q.question_type}
                  </span>
                  {q.is_pro && (
                    <span className="flex items-center gap-1 rounded border border-warning/30 bg-warning/10 px-2 py-0.5 text-xs font-semibold text-warning">
                      <Crown className="h-3 w-3" />
                      PRO
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  {q.question}
                </p>
              </div>
              {q.is_pro ? (
                <div className="flex shrink-0 flex-col items-center gap-1">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-warning">
                    Upgrade to unlock
                  </span>
                </div>
              ) : (
                <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
