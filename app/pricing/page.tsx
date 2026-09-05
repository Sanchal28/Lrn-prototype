import { Check, Crown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'FREE',
    price: '$0',
    period: 'forever',
    icon: Sparkles,
    features: [
      'Free diagnostic',
      'Limited practice (5 questions/day)',
      'Basic mastery tracking',
      'Access to glossary',
    ],
    cta: 'Current Plan',
    highlighted: false,
  },
  {
    name: 'PRO',
    price: '$19',
    period: 'per month',
    icon: Crown,
    features: [
      'Full question bank',
      'Unlimited practice',
      'Detailed AI feedback',
      'Flashcards',
      'Advanced mastery analytics',
      'Priority practice recommendations',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    name: 'SEASON PASS',
    price: '$79',
    period: '6 months',
    icon: Crown,
    features: [
      'Everything in Pro',
      '6 months of access',
      'Save 30% vs monthly',
      'Full recruiting season coverage',
    ],
    cta: 'Get Season Pass',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Pricing</h1>
        <p className="mt-2 text-muted-foreground">
          Choose the plan that fits your recruiting timeline.
        </p>
      </div>

      {/* Plans */}
      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.name}
              className={cn(
                'relative rounded-lg border p-6',
                plan.highlighted
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-border bg-card',
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Recommended
                </div>
              )}
              <div className="mb-4 flex items-center gap-2">
                <Icon
                  className={cn(
                    'h-5 w-5',
                    plan.highlighted ? 'text-primary' : 'text-muted-foreground',
                  )}
                />
                <span className="font-semibold">{plan.name}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tabular-nums">{plan.price}</span>
                <span className="text-sm text-muted-foreground">/{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check
                      className={cn(
                        'mt-0.5 h-4 w-4 shrink-0',
                        plan.highlighted ? 'text-primary' : 'text-muted-foreground',
                      )}
                    />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={cn(
                  'mt-6 w-full rounded-md py-2.5 text-sm font-semibold transition-colors',
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'border border-border bg-card hover:border-primary/50',
                )}
              >
                {plan.cta}
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Prototype pricing — no real payment is processed.
      </p>
    </div>
  );
}
