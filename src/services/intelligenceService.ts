import { CreditProfile } from "../types";

export async function analyzeCreditProfile(textLogs: string[]): Promise<CreditProfile> {
  const rawInput = textLogs.join('\n');

  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rawInput })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to analyze credit profile');
  }

  const profile = await response.json();
  return profile;
}
