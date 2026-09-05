'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Send, Clock, Tag } from 'lucide-react';
import { getQuestions, gradeAnswer } from '@/lib/api';
import { diagnosticQuestionIds } from '@/lib/mock-data';
import type { Question, GradeResult } from '@/types';
import { ProgressBar } from '@/components/diagnostic/ProgressBar';
import { GradeResultCard } from '@/components/diagnostic/GradeResultCard';
import { cn } from '@/lib/utils';

export default function DiagnosticPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [grades, setGrades] = useState<Record<string, GradeResult>>({});
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentGrade, setCurrentGrade] = useState<GradeResult | null>(null);

  useEffect(() => {
    (async () => {
      const all = await getQuestions();
      const diag = diagnosticQuestionIds
        .map((id) => all.find((q) => q.id === id))
        .filter((q): q is Question => q !== undefined);
      setQuestions(diag);
      setLoading(false);
    })();
  }, []);

  const current = questions[currentIdx];
  const total = questions.length;

  const handleSubmit = async () => {
    if (!current || !answer.trim()) return;
    setSubmitting(true);
    const grade = await gradeAnswer(current.id, answer);
    setGrades((prev) => ({ ...prev, [current.id]: grade }));
    setCurrentGrade(grade);
    setAnswers((prev) => ({ ...prev, [current.id]: answer }));
    setShowResult(true);
    setSubmitting(false);
  };

  const handleNext = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx((i) => i + 1);
      setAnswer('');
      setShowResult(false);
      setCurrentGrade(null);
    } else {
      // Complete — navigate to results
      const scores = Object.values(grades);
      const overall = Math.round(
        scores.reduce((sum, g) => sum + g.score, 0) / scores.length,
      );
      sessionStorage.setItem(
        'diagnostic_result',
        JSON.stringify({ overall, grades, answers }),
      );
      router.push('/diagnostic/results');
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-8 w-64 animate-pulse rounded bg-secondary" />
        <div className="h-2 w-full animate-pulse rounded bg-secondary" />
        <div className="h-64 animate-pulse rounded-lg bg-secondary" />
      </div>
    );
  }

  if (!current) {
    return (
      <div className="mx-auto max-w-3xl py-20 text-center">
        <p className="text-muted-foreground">No questions available.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Tag className="h-3.5 w-3.5" />
          Diagnostic Assessment
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          Question {currentIdx + 1} of {total}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Answer each question to the best of your ability. You&apos;ll receive
          AI-powered feedback after each submission.
        </p>
      </div>

      {/* Progress */}
      <ProgressBar current={currentIdx + 1} total={total} />

      {/* Question card */}
      <div className="rounded-lg border border-border bg-card p-6">
        {/* Meta */}
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
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            Free text
          </span>
        </div>

        {/* Question */}
        <h2 className="text-lg font-semibold leading-relaxed">
          {current.question}
        </h2>

        {/* Answer area */}
        {!showResult ? (
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
      {showResult && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setShowResult(false);
              setCurrentGrade(null);
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Edit Answer
          </button>
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {currentIdx < total - 1 ? 'Next Question' : 'See Results'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
