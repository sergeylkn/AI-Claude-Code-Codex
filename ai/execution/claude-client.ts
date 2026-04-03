import { env } from "@/lib/env";

const CLAUDE_URL = "https://api.anthropic.com/v1/messages";

type ClaudeResponse = {
  content?: Array<{ type: string; text?: string }>;
};

export async function invokeClaude(prompt: string, maxRetries = 2): Promise<string> {
  if (!env.ANTHROPIC_API_KEY) {
    return JSON.stringify({
      answer: "Anthropic key is not configured. Add ANTHROPIC_API_KEY to enable live AI responses.",
      nextAction: "Set env vars and retry."
    });
  }

  let lastError: unknown;

  for (let i = 0; i <= maxRetries; i += 1) {
    try {
      const response = await fetch(CLAUDE_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-latest",
          max_tokens: 1200,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        throw new Error(`Claude API request failed: ${response.status}`);
      }

      const data = (await response.json()) as ClaudeResponse;
      const text = data.content?.find((block) => block.type === "text")?.text;
      return text ?? "{}";
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 500 * (i + 1)));
    }
  }

  throw lastError;
}
