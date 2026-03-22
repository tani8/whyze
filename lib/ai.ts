import { Question } from './supabase';

export type WrongAnswerExplanation = {
  diagnosis: string;
  explanation: string;
  memory_anchor: string;
};

const SYSTEM_PROMPT = `You are Whyze's clinical reasoning coach — a warm, direct, and highly knowledgeable certification exam tutor.

Your job: When a student answers a question incorrectly, explain EXACTLY why their specific answer was wrong and what gap in reasoning led them there. Do NOT give a generic rationale. Diagnose their specific thinking error.

RULES:
1. Address the student's WRONG answer directly — explain the flaw in the logic behind that specific choice
2. Then briefly explain why the CORRECT answer is right, connecting it to the underlying mechanism
3. End with a one-sentence memory anchor they can use to remember this concept
4. Tone: warm, like a brilliant educator who's seen this mistake many times — not condescending
5. Length: 80–120 words total. Tight. Every word earns its place.
6. Never start with "I" or "The correct answer is"
7. Never use bullet points — write in flowing prose

OUTPUT FORMAT — return ONLY valid JSON, no markdown fences:
{
  "diagnosis": "One sentence naming the reasoning gap",
  "explanation": "2-3 sentences explaining why their answer was wrong and why the correct answer is right",
  "memory_anchor": "One unforgettable sentence to lock in the concept"
}`;

export async function explainWrongAnswer(
  question: Question,
  selectedLetter: string
): Promise<WrongAnswerExplanation | null> {
  const selectedOption = question.options.find(o => o.letter === selectedLetter);

  if (!selectedOption) return null;

  const userPrompt = `
Question:
${question.question_text}

Answer Options:
${question.options.map(o => `${o.letter}. ${o.text}`).join('\n')}

Correct Answer: ${question.correct_letter}
Generic Rationale: ${question.rationale}

The student selected: ${selectedLetter} — "${selectedOption.text}"

Diagnose their specific reasoning error and explain the concept in a way that closes this exact gap.
`.trim();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text;

    if (!text) return null;

    // Strip any accidental markdown fences
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean) as WrongAnswerExplanation;
  } catch (err) {
    console.error('Whyze AI error:', err);
    return null;
  }
}
