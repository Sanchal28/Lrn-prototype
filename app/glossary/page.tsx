'use client';

import { useState, useMemo } from 'react';
import { Search, BookOpen, ChevronRight } from 'lucide-react';
import { mockGlossary } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function GlossaryPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(mockGlossary[0].term);

  const filtered = useMemo(() => {
    if (!search) return mockGlossary;
    return mockGlossary.filter(
      (t) =>
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const current = mockGlossary.find((t) => t.term === selected);

  return (
    <div className="mx-auto max-w-5xl space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Glossary</h1>
        <p className="mt-1 text-muted-foreground">
          {mockGlossary.length} key terms across IB and PE.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search terms or definitions..."
          className="w-full rounded-md border border-input bg-card py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Two-panel layout */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
        {/* Term list */}
        <div className="space-y-1">
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-border bg-card py-12 text-center text-sm text-muted-foreground">
              No terms found.
            </div>
          ) : (
            filtered.map((t) => (
              <button
                key={t.term}
                onClick={() => setSelected(t.term)}
                className={cn(
                  'flex w-full items-center justify-between rounded-md border px-3 py-2.5 text-left text-sm transition-colors',
                  selected === t.term
                    ? 'border-primary/50 bg-primary/10'
                    : 'border-border bg-card hover:border-primary/30 hover:bg-accent',
                )}
              >
                <div>
                  <div className="font-medium">{t.term}</div>
                  <div className="text-xs text-muted-foreground">{t.category}</div>
                </div>
                <ChevronRight
                  className={cn(
                    'h-4 w-4 shrink-0 transition-colors',
                    selected === t.term ? 'text-primary' : 'text-muted-foreground',
                  )}
                />
              </button>
            ))
          )}
        </div>

        {/* Definition panel */}
        {current && (
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {current.category}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{current.term}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {current.definition}
            </p>
            {current.related && current.related.length > 0 && (
              <div className="mt-6">
                <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Related Terms
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.related.map((rel) => {
                    const relTerm = mockGlossary.find((t) => t.term === rel);
                    return (
                      <button
                        key={rel}
                        onClick={() => relTerm && setSelected(rel)}
                        className="rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/30 hover:text-primary"
                      >
                        {rel}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
