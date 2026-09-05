export type Category =
  | 'Accounting'
  | 'Valuation'
  | 'M&A'
  | 'LBO Mechanics'
  | 'Markets'
  | 'Judgment'
  | 'Technical Concepts'
  | 'Financial Statements';

export type Difficulty = 'Foundational' | 'Intermediate' | 'Advanced';

export type QuestionType = 'Free Text' | 'Multiple Choice' | 'Case Study';

export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  question_type: QuestionType;
  question: string;
  model_answer?: string;
  key_concepts: string[];
  is_pro?: boolean;
  source?: string;
}

export interface GradeResult {
  question_id: string;
  score: number;
  band: MasteryBand;
  concepts_hit: string[];
  concepts_missed: string[];
  feedback: string;
  mistakes: string;
  recommended_next_step: string;
}

export type MasteryBand =
  | 'Developing'
  | 'Competent'
  | 'Proficient'
  | 'Advanced';

export interface CategoryMastery {
  category: Category;
  score: number;
  questions_attempted: number;
}

export interface MasteryResponse {
  overall: number;
  categories: CategoryMastery[];
  strongest: Category;
  weakest: Category;
}

export interface PracticeRecommendation {
  category: Category;
  reason: string;
  priority: number;
  question_ids: string[];
}

export interface PracticeResponse {
  recommendations: PracticeRecommendation[];
  weakest_areas: Category[];
}

export interface DiagnosticResult {
  overall: number;
  categories: CategoryMastery[];
  strongest: Category;
  weakest: Category;
  priority_gaps: { category: Category; score: number }[];
  two_week_plan: { days: string; focus: string }[];
}

export interface Flashcard {
  id: string;
  concept: string;
  question: string;
  answer: string;
  category: Category;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: Category;
  related?: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  target_role: string;
  target_firms: string[];
  interview_date: string;
  plan: 'FREE' | 'PRO' | 'SEASON PASS';
}

export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface DashboardStats {
  current_streak: number;
  best_streak: number;
  today_progress: { done: number; total: number };
  overall_mastery: number;
  days_until_interview: number;
}

export interface DashboardData {
  headline: string;
  stats: DashboardStats;
  mastery: CategoryMastery[];
  weak_areas: Category[];
  todays_focus: {
    category: Category;
    title: string;
    description: string;
    question_count: number;
  };
  activity: ActivityDay[];
}
