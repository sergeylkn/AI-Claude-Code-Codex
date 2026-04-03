import { NextRequest } from "next/server";
import { createChatResponse } from "@/api/handlers/ai";
import { getSessionFromRequest } from "@/lib/auth";
import { getErrorMessage, json } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  const key = session?.userId ?? req.headers.get("x-forwarded-for") ?? "guest";

  const limiter = rateLimit(`chat:${key}`, 30, 60_000);
  if (!limiter.allowed) {
    return json({ error: "Rate limited", retryAfterMs: limiter.retryAfterMs }, 429);
  }

  try {
    const { message, lessonId } = await req.json();
    const response = await createChatResponse(session?.userId ?? null, lessonId ?? null, message);
    return json({ response, mode: session ? "authenticated" : "guest" });
  } catch (error) {
    return json({ error: getErrorMessage(error) }, 400);
  }
}
