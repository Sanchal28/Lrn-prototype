import type {
  Question,
  GradeResult,
  MasteryResponse,
  PracticeResponse,
} from '@/types';

import {
  mockQuestions,
  mockMastery,
  mockRecommendations,
} from '@/lib/mock-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const DISABLE_API = process.env.NEXT_PUBLIC_DISABLE_API === 'true';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getQuestions(): Promise<Question[]> {
  if (DISABLE_API) return mockQuestions;
  try {
    return await apiFetch<Question[]>('/api/questions');
  } catch {
    return mockQuestions;
  }
}

export async function getQuestion(id: string): Promise<Question> {
  if (DISABLE_API) {
    const q = mockQuestions.find((x) => x.id === id);
    if (!q) throw new Error('Question not found');
    return q;
  }
  try {
    return await apiFetch<Question>(`/api/questions/${id}`);
  } catch {
    const q = mockQuestions.find((x) => x.id === id);
    if (!q) throw new Error('Question not found');
    return q;
  }
}

export async function gradeAnswer(
  questionId: string,
  answer: string,
): Promise<GradeResult> {
  if (DISABLE_API) {
    return mockGrade(questionId, answer);
  }
  try {
    return await apiFetch<GradeResult>('/api/grade', {
      method: 'POST',
      body: JSON.stringify({ question_id: questionId, answer }),
    });
  } catch {
    return mockGrade(questionId, answer);
  }
}

export async function getMastery(): Promise<MasteryResponse> {
  if (DISABLE_API) {
    return {
      overall: 72,
      categories: mockMastery,
      strongest: 'Judgment',
      weakest: 'LBO Mechanics',
    };
  }
  try {
    return await apiFetch<MasteryResponse>('/api/mastery');
  } catch {
    return {
      overall: 72,
      categories: mockMastery,
      strongest: 'Judgment',
      weakest: 'LBO Mechanics',
    };
  }
}

export async function getPractice(): Promise<PracticeResponse> {
  if (DISABLE_API) {
    return {
      recommendations: mockRecommendations,
      weakest_areas: ['LBO Mechanics', 'Valuation'],
    };
  }
  try {
    return await apiFetch<PracticeResponse>('/api/practice');
  } catch {
    return {
      recommendations: mockRecommendations,
      weakest_areas: ['LBO Mechanics', 'Valuation'],
    };
  }
}

// --- Deterministic mock grading (mirrors the FastAPI implementation) ---

function mockGrade(questionId: string, answer: string): GradeResult {
  const question = mockQuestions.find((q) => q.id === questionId);
  const answerLower = answer.toLowerCase().trim();
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;

  let score = 35;
  const conceptsHit: string[] = [];
  const conceptsMissed: string[] = [];

  if (question) {
    for (const concept of question.key_concepts) {
      if (answerLower.includes(concept.toLowerCase())) {
        score += Math.round(55 / question.key_concepts.length);
        conceptsHit.push(concept);
      } else {
        conceptsMissed.push(concept);
      }
    }
  }

  if (wordCount < 20) score = Math.min(score, 30);
  if (wordCount > 80) score += 5;
  if (wordCount > 150) score += 5;
  if (answerLower.includes('because')) score += 3;
  if (answerLower.includes('for example')) score += 3;
  if (answer.trim() === '') score = 0;

  score = Math.max(0, Math.min(100, score));

  const band =
    score >= 85 ? 'Advanced' :
    score >= 70 ? 'Proficient' :
    score >= 50 ? 'Competent' : 'Developing';

  const hitPct = question && question.key_concepts.length > 0
    ? conceptsHit.length / question.key_concepts.length
    : 0;

  const feedback = generateFeedback(score, conceptsHit, conceptsMissed, question?.model_answer);
  const mistakes = generateMistake(conceptsMissed, wordCount);
  const nextStep = generateNextStep(conceptsMissed, question?.category);

  return {
    question_id: questionId,
    score,
    band,
    concepts_hit: conceptsHit,
    concepts_missed: conceptsMissed,
    feedback,
    mistakes,
    recommended_next_step: nextStep,
  };
}

function generateFeedback(
  score: number,
  hit: string[],
  missed: string[],
  modelAnswer?: string,
): string {
  if (score === 0) return 'No answer submitted. Please attempt the question to receive feedback.';
  if (score >= 85) {
    return `Excellent answer. You correctly identified ${hit.join(', ')} and demonstrated strong understanding. Your explanation is clear and well-structured.`;
  }
  if (score >= 70) {
    return `Strong answer. You correctly identified ${hit.join(', ')} but missed ${missed.length} key concept${missed.length === 1 ? '' : 's'}. ${modelAnswer ? 'Compare your answer to the model response to close the gap.' : ''}`;
  }
  if (score >= 50) {
    return `Partially correct. You identified ${hit.length} concept${hit.length === 1 ? '' : 's'} (${hit.join(', ') || 'none'}) but missed ${missed.join(', ')}. Your answer needs more depth and structure.`;
  }
  return `Your answer needs significant improvement. You missed key concepts: ${missed.join(', ')}. ${modelAnswer ? 'Review the model answer and retry.' : 'Study this topic and attempt again.'}`;
}

function generateMistake(missed: string[], wordCount: number): string {
  if (missed.length === 0) return 'No significant mistakes — well done.';
  const mistakes: string[] = [];
  if (wordCount < 30) mistakes.push('Answer was too brief for a technical question');
  if (missed.length > 2) mistakes.push(`Failed to address ${missed.length} key concepts`);
  mistakes.push(`Missed: ${missed.join(', ')}`);
  return mistakes.join('. ');
}

function generateNextStep(missed: string[], category?: string): string {
  if (missed.length === 0) return 'Move to a more advanced question in this category.';
  return `Review ${missed.slice(0, 2).join(' and ')}${category ? ` in ${category}` : ''} and retry a related question.`;
}
