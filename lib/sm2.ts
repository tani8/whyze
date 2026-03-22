/**
 * SM-2 Spaced Repetition Algorithm
 * Used to calculate next review interval after each question attempt.
 * quality: 0 = blackout, 1 = wrong, 2 = wrong+hint, 3 = correct+hard, 4 = correct, 5 = easy
 */

export type SM2State = {
  easinessFactor: number; // starts at 2.5, min 1.3
  intervalDays: number;   // days until next review
  repetitions: number;    // consecutive correct answers
};

export function calculateSM2(state: SM2State, quality: 0 | 1 | 2 | 3 | 4 | 5): SM2State {
  const { easinessFactor, intervalDays, repetitions } = state;

  // Update easiness factor
  const newEF = Math.max(
    1.3,
    easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  if (quality < 3) {
    // Incorrect answer — reset
    return {
      easinessFactor: newEF,
      intervalDays: 1,
      repetitions: 0,
    };
  }

  // Correct answer — advance interval
  let newInterval: number;
  if (repetitions === 0) {
    newInterval = 1;
  } else if (repetitions === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(intervalDays * newEF);
  }

  return {
    easinessFactor: newEF,
    intervalDays: newInterval,
    repetitions: repetitions + 1,
  };
}

/**
 * Map a user's answer to an SM-2 quality score.
 * For NCLEX prep: wrong = 1, correct with hesitation = 4, confident correct = 5
 */
export function answerToQuality(
  isCorrect: boolean,
  timeSpentSecs?: number
): 0 | 1 | 2 | 3 | 4 | 5 {
  if (!isCorrect) return 1;

  // If they answered quickly and correctly, score higher
  if (timeSpentSecs && timeSpentSecs < 30) return 5;
  return 4;
}
