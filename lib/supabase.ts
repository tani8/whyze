import { createClient } from '@supabase/supabase-js';

// Client-side Supabase client (uses anon key)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Types matching your schema
export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
};

export type Question = {
  id: string;
  category_id: string;
  question_text: string;
  options: Array<{ letter: string; text: string }>;
  correct_letter: string;
  rationale: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
};

export type UserQuestionProgress = {
  id: string;
  user_id: string;
  question_id: string;
  easiness_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_at: string;
  times_seen: number;
  times_correct: number;
};

export type StudySession = {
  id: string;
  user_id: string;
  category_id: string | null;
  started_at: string;
  ended_at: string | null;
  questions_count: number;
  correct_count: number;
};

export type QuestionAttempt = {
  id: string;
  user_id: string;
  session_id: string;
  question_id: string;
  selected_letter: string;
  is_correct: boolean;
  time_spent_secs: number | null;
  ai_explanation: string | null;
};
