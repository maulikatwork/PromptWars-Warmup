import { type FormState, type DashboardData } from '../types';
import { SYSTEM_PROMPT, buildUserPrompt } from './prompt';
import { validateDashboardData, extractJson } from './validator';

const API_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = 'deepseek-chat';

function getApiKey(): string {
  const key = import.meta.env.VITE_DEEPSEEK_KEY as string | undefined;
  if (!key) throw new Error('VITE_DEEPSEEK_KEY is not set. Add it to your .env file.');
  return key;
}

export async function generateMealPlan(form: FormState): Promise<DashboardData> {
  const key = getApiKey();

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: buildUserPrompt(form) },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    if (response.status === 401) throw new Error('Invalid API key. Check VITE_DEEPSEEK_KEY in .env.');
    if (response.status === 429) throw new Error('Rate limit reached. Please wait a moment and try again.');
    throw new Error(`API error ${response.status}: ${body.slice(0, 120)}`);
  }

  const payload = await response.json();
  const rawText: string = payload?.choices?.[0]?.message?.content ?? '';

  if (!rawText) throw new Error('Model returned an empty response.');

  // Preserve raw text for debugging
  console.debug('[API] raw model output:', rawText);

  let parsed: unknown;
  try {
    parsed = extractJson(rawText);
  } catch {
    throw new Error('Model response was not valid JSON. Try generating again.');
  }

  return validateDashboardData(parsed);
}
