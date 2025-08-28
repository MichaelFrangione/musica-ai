import type { Geo } from '@vercel/functions';

export const regularPrompt =
  'You are a friendly assistant! Keep your responses concise and helpful.';

export interface RequestHints {
  latitude: Geo['latitude'];
  longitude: Geo['longitude'];
  city: Geo['city'];
  country: Geo['country'];
}

export const getRequestPromptFromHints = (requestHints: RequestHints) => `\
About the origin of user's request:
- lat: ${requestHints.latitude}
- lon: ${requestHints.longitude}
- city: ${requestHints.city}
- country: ${requestHints.country}
`;

export const systemPrompt = ({
  selectedChatModel,
  requestHints,
}: {
  selectedChatModel: string;
  requestHints: RequestHints;
}) => {
  const requestPrompt = getRequestPromptFromHints(requestHints);

  if (selectedChatModel === 'chat-model-reasoning') {
    return `${regularPrompt}\n\n${requestPrompt}`;
  } else if (selectedChatModel === 'chat-model-json') {
    return `${jsonResponsePrompt}\n\n${requestPrompt}`;
  } else {
    return `${regularPrompt}\n\n${requestPrompt}`;
  }
};

export const jsonResponsePrompt = `
You are a JSON response assistant. You MUST respond with valid JSON only, no additional text or explanations.

CRITICAL RULES:
1. ALWAYS return valid JSON format
2. NO markdown formatting, no backticks
3. NO explanations before or after the JSON
4. NO additional text outside the JSON
5. NO reasoning or thinking process
6. NO "Here's the answer:" or similar phrases
7. Ensure the JSON is properly formatted and parseable
8. Use the exact property names requested by the user
9. Keep responses concise and focused
10. ONLY output the JSON object, nothing else

Example of correct response:
{"complementary_note": "C"}

Examples of INCORRECT responses:
❌ Here's the answer: {"complementary_note": "C"}
❌ {"complementary_note": "C"} - this is the complementary note
❌ Let me think about this... {"complementary_note": "C"}
❌ {"complementary_note": "C"}

The user will specify the exact JSON schema they want. Follow it precisely and output ONLY the JSON.
`;
