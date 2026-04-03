import fs from "node:fs/promises";
import path from "node:path";
import { invokeClaude } from "@/ai/execution/claude-client";

export type AgentTask = "explain_lesson" | "review_code" | "generate_project";

type OrchestrateInput = {
  task: AgentTask;
  context: Record<string, unknown>;
};

function directivePath(task: AgentTask) {
  return path.join(process.cwd(), "ai", "directives", `${task}.md`);
}

export async function runAgent({ task, context }: OrchestrateInput) {
  const directive = await fs.readFile(directivePath(task), "utf8");
  const prompt = `${directive}\n\nINPUT:\n${JSON.stringify(context, null, 2)}`;
  const raw = await invokeClaude(prompt);

  try {
    return JSON.parse(raw);
  } catch {
    return { raw };
  }
}
