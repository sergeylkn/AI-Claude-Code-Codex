import { prisma } from "@/db/prisma";
import { runAgent, type AgentTask } from "@/ai/orchestration/agent";

export async function createChatResponse(userId: string | null, lessonId: string | null, message: string) {
  const result = await runAgent({
    task: "explain_lesson",
    context: { message, lessonId }
  });

  if (userId) {
    await prisma.chatHistory.create({
      data: {
        userId,
        lessonId,
        role: "USER",
        content: message
      }
    });

    await prisma.chatHistory.create({
      data: {
        userId,
        lessonId,
        role: "ASSISTANT",
        content: JSON.stringify(result)
      }
    });
  }

  return result;
}

export async function reviewCode(code: string, taskContext: string) {
  return runAgent({
    task: "review_code",
    context: { code, taskContext }
  });
}

export async function generateProject(idea: string, userId: string | null) {
  const result = await runAgent({
    task: "generate_project",
    context: { idea }
  });

  if (userId) {
    await prisma.generatedProject.create({
      data: {
        userId,
        prompt: idea,
        output: JSON.stringify(result)
      }
    });
  }

  return result;
}

export function assertAgentTask(task: string): AgentTask {
  if (["explain_lesson", "review_code", "generate_project"].includes(task)) {
    return task as AgentTask;
  }
  throw new Error("Unsupported task");
}
