'use client';

import { useState } from 'react';
import { RotateCw, ChevronRight } from 'lucide-react';
import { mockFlashcards } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type Rating = 'again' | 'hard' | 'good' | 'easy';

export default function FlashcardsPage() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [ratings, setRatings] = useState<Rating[]>([]);

  const card = mockFlashcards[idx];
  const isLast = idx === mockFlashcards.length - 1;

  const handleRate = (rating: Rating) => {
    setRatings((prev) => [...prev, rating]);
    if (!isLast) {
      setIdx((i) => i + 1);
      setFlipped(false);
    }
  };

  const handleRestart = () => {
    setIdx(0);
    setFlipped(false);
    setRatings([]);
  };

  const ratingButtons: { label: string; value: Rating; color: string }[] = [
    { label: 'Again', value: 'again', color: 'border-destructive/40 text-destructive hover:bg-destructive/10' },
    { label: 'Hard', value: 'hard', color: 'border-warning/40 text-warning hover:bg-warning/10' },
    { label: 'Good', value: 'good', color: 'border-chart-4/40 text-chart-4 hover:bg-chart-4/10' },
    { label: 'Easy', value: 'easy', color: 'border-primary/40 text-primary hover:bg-primary/10' },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Flashcards</h1>
        <p className="mt-1 text-muted-foreground">
          Review key concepts. Reveal the answer, then rate your recall.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Card {idx + 1} of {mockFlashcards.length}
        </span>
        <div className="flex gap-1">
          {mockFlashcards.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 w-6 rounded-full',
                i < idx ? 'bg-primary' : i === idx ? 'bg-primary' : 'bg-secondary',
              )}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      {!isLast || ratings.length < mockFlashcards.length ? (
        <>
          <div
            onClick={() => setFlipped(!flipped)}
            className="min-h-[280px] cursor-pointer rounded-lg border border-border bg-card p-8 transition-colors hover:border-primary/30"
          >
            {!flipped ? (
              <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-center">
                <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {card.category} · {card.concept}
                </div>
                <p className="text-xl font-semibold leading-relaxed">
                  {card.question}
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <RotateCw className="h-3.5 w-3.5" />
                  Click to reveal answer
                </div>
              </div>
            ) : (
              <div className="animate-scale-in flex h-full min-h-[220px] flex-col">
                <div className="mb-3 text-xs font-medium uppercase tracking-wider text-primary">
                  Answer
                </div>
                <p className="text-base leading-relaxed text-foreground">
                  {card.answer}
                </p>
              </div>
            )}
          </div>

          {/* Controls */}
          {flipped ? (
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                {ratingButtons.map((btn) => (
                  <button
                    key={btn.value}
                    onClick={() => handleRate(btn.value)}
                    className={cn(
                      'rounded-md border bg-card px-3 py-2.5 text-sm font-semibold transition-colors',
                      btn.color,
                    )}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              <div className="text-center text-xs text-muted-foreground">
                Next review: Tomorrow
              </div>
            </div>
          ) : (
            <button
              onClick={() => setFlipped(true)}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card py-3 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Reveal Answer
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </>
      ) : (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <h2 className="text-xl font-bold">Session Complete</h2>
          <p className="mt-2 text-muted-foreground">
            You reviewed {ratings.length} cards.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm">
            {ratingButtons.map((btn) => {
              const count = ratings.filter((r) => r === btn.value).length;
              return (
                <div key={btn.value}>
                  <span className="font-bold tabular-nums">{count}</span>
                  <span className="text-muted-foreground"> {btn.label}</span>
                </div>
              );
            })}
          </div>
          <button
            onClick={handleRestart}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <RotateCw className="h-4 w-4" />
            Review Again
          </button>
        </div>
      )}
    </div>
  );
}
