import Link from 'next/link';
import { ArrowRight, Stethoscope, TrendingUp, Target, Layers } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 lg:py-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            IB & PE Interview Prep
          </div>
          <h1 className="text-balance text-5xl font-bold tracking-tight lg:text-6xl">
            Know if you&apos;re interview ready
            <br />
            <span className="text-primary">and exactly what to fix.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            LRN diagnoses your skill gaps across accounting, valuation, M&A, and LBO
            mechanics — then guides you through targeted practice with AI-powered feedback.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Take Diagnostic
              <Stethoscope className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Core loop */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight">The LRN Loop</h2>
          <p className="mt-2 text-muted-foreground">
            Diagnose, practice, review, and improve — repeat.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Stethoscope, title: 'Diagnose', desc: 'Identify your skill gaps with a structured diagnostic.' },
            { icon: Target, title: 'Practice', desc: 'Receive targeted questions in your weakest areas.' },
            { icon: TrendingUp, title: 'Review', desc: 'Get detailed feedback on what you missed and why.' },
            { icon: Layers, title: 'Improve', desc: 'Track mastery over time and close gaps systematically.' },
          ].map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative rounded-lg border border-border bg-card p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Ready to find out what you don&apos;t know?
          </h2>
          <Link
            href="/diagnostic"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start Diagnostic
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
