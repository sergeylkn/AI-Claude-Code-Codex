import { NextRequest } from "next/server";
import { completeLesson } from "@/api/handlers/progress";
import { getSessionFromRequest } from "@/lib/auth";
import { json } from "@/lib/http";

export async function POST(req: NextRequest, { params }: { params: Promise<{ lessonId: string }> }) {
  const session = await getSessionFromRequest(req);
  if (!session) return json({ error: "Unauthorized" }, 401);
  const { lessonId } = await params;
  const progress = await completeLesson(session.userId, lessonId);
  return json({ progress });
}
