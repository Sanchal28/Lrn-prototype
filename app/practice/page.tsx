'use client';

import { useEffect, useState } from 'react';
import { Send, ArrowRight, RotateCcw, Target, CheckCircle2 } from 'lucide-react';
import { getPractice, getQuestions, gradeAnswer } from '@/lib/api';
import type {
  Question,
  GradeResult,
  PracticeRecommendation,
} from '@/types';
import { GradeResultCard } from '@/components/diagnostic/GradeResultCard';
import { cn } from '@/lib/utils';

type Phase = 'setup' | 'question' | 'result' | 'complete';

export default function PracticePage() {
  const [recommendations, setRecommendations] = useState<PracticeRecommendation[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<Phase>('setup');
  const [sessionSize, setSessionSize] = useState(5);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [currentGrade, setCurrentGrade] = useState<GradeResult | null>(null);
  const [scores, setScores] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const [practice, questions] = await Promise.all([
        getPractice(),
        getQuestions(),
      ]);
      setRecommendations(practice.recommendations);
      setAllQuestions(questions);
      setLoading(false);
    })();
  }, []);

  const startSession = (size: number) => {
    // Prioritize weak categories — pick questions from recommended categories first
    const weakCats = recommendations.map((r) => r.category);
    const weakQs = allQuestions.filter(
      (q) => weakCats.includes(q.category) && !q.is_pro,
    );
    const otherQs = allQuestions.filter(
      (q) => !weakCats.includes(q.category) && !q.is_pro,
    );
    const shuffled = [...weakQs, ...otherQs].slice(0, size);
    setSessionQuestions(shuffled);
    setSessionSize(size);
    setCurrentIdx(0);
    setAnswer('');
    setScores([]);
    setPhase('question');
  };

  const current = sessionQuestions[currentIdx];

  const handleSubmit = async () => {
    if (!current || !answer.trim()) return;
    setSubmitting(true);
    const grade = await gradeAnswer(current.id, answer);
    setCurrentGrade(grade);
    setScores((prev) => [...prev, grade.score]);
    setPhase('result');
    setSubmitting(false);
  };

  const handleNext = () => {
    if (currentIdx < sessionQuestions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setAnswer('');
      setCurrentGrade(null);
      setPhase('question');
    } else {
      setPhase('complete');
    }
  };

  const handleRestart = () => {
    setPhase('setup');
    setCurrentIdx(0);
    setAnswer('');
    setCurrentGrade(null);
    setScores([]);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-secondary" />
        <div className="h-32 animate-pulse rounded-lg bg-secondary" />
      </div>
    );
  }

  // Setup phase
  if (phase === 'setup') {
    return (
      <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Practice</h1>
          <p className="mt-1 text-muted-foreground">
            Practice what you&apos;re weakest at. Sessions are adaptively ordered
            to target your biggest gaps first.
          </p>
        </div>

        {/* Recommendations */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <Target className="h-4 w-4 text-primary" />
            Recommended For You
          </h2>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div
                key={rec.category}
                className="rounded-md border border-border bg-secondary/30 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
                      {rec.priority}
                    </span>
                    <span className="font-semibold">{rec.category}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {rec.question_ids.length} questions
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{rec.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Session size */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="mb-4 font-semibold">Choose Session Size</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[5, 10, 20].map((size) => (
              <button
                key={size}
                onClick={() => startSession(size)}
                className={cn(
                  'rounded-md border p-4 text-left transition-colors',
                  'hover:border-primary/50 hover:bg-accent',
                )}
              >
                <div className="text-2xl font-bold tabular-nums">{size}</div>
                <div className="text-sm text-muted-foreground">questions</div>
                <div className="mt-2 text-xs text-muted-foreground">
                  ~{size * 3} min
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Complete phase
  if (phase === 'complete') {
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return (
      <div className="mx-auto max-w-2xl space-y-6 animate-fade-in text-center">
        <div className="rounded-lg border border-border bg-card p-8">
          <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-2xl font-bold">Session Complete</h1>
          <div className="mt-4 text-5xl font-bold tabular-nums text-primary">
            {avg}
          </div>
          <div className="text-sm text-muted-foreground">Average Score</div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {scores.map((s, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-md border px-3 py-1.5 text-sm font-semibold tabular-nums',
                  s >= 75
                    ? 'border-primary/30 bg-primary/10 text-primary'
                    : s >= 50
                      ? 'border-chart-4/30 bg-chart-4/10 text-chart-4'
                      : 'border-warning/30 bg-warning/10 text-warning',
                )}
              >
                Q{i + 1}: {s}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <RotateCcw className="h-4 w-4" />
          New Session
        </button>
      </div>
    );
  }

  // Question / Result phase
  if (!current) {
    return (
      <div className="mx-auto max-w-3xl py-20 text-center text-muted-foreground">
        No questions available for this session.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Practice Session
          </div>
          <h1 className="mt-1 text-xl font-bold">
            Question {currentIdx + 1} of {sessionQuestions.length}
          </h1>
        </div>
        <div className="flex gap-1">
          {sessionQuestions.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 w-6 rounded-full',
                i < currentIdx
                  ? 'bg-primary'
                  : i === currentIdx
                    ? 'bg-primary'
                    : 'bg-secondary',
              )}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {current.category}
          </span>
          <span
            className={cn(
              'rounded border px-2 py-0.5 text-xs font-medium',
              current.difficulty === 'Advanced'
                ? 'border-destructive/30 text-destructive'
                : current.difficulty === 'Intermediate'
                  ? 'border-warning/30 text-warning'
                  : 'border-primary/30 text-primary',
            )}
          >
            {current.difficulty}
          </span>
        </div>

        <h2 className="text-lg font-semibold leading-relaxed">
          {current.question}
        </h2>

        {phase === 'question' ? (
          <div className="mt-5">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[160px] w-full resize-y rounded-md border border-input bg-background px-4 py-3 text-sm leading-relaxed placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              autoFocus
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {answer.trim().split(/\s+/).filter(Boolean).length} words
              </span>
              <button
                onClick={handleSubmit}
                disabled={!answer.trim() || submitting}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? 'Grading...' : 'Submit Answer'}
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <div className="mb-4 rounded-md border border-border bg-secondary/30 p-4">
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Your Answer
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {answer}
              </p>
            </div>
            {currentGrade && <GradeResultCard result={currentGrade} />}
          </div>
        )}
      </div>

      {/* Navigation */}
      {phase === 'result' && (
        <div className="flex items-center justify-end">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {currentIdx < sessionQuestions.length - 1 ? 'Next Question' : 'Finish Session'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
