import { NextRequest } from "next/server";
import { generateProject } from "@/api/handlers/ai";
import { getSessionFromRequest } from "@/lib/auth";
import { json, getErrorMessage } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  const key = session?.userId ?? req.headers.get("x-forwarded-for") ?? "guest";

  const limiter = rateLimit(`project:${key}`, 5, 60_000);
  if (!session) return json({ error: "Unauthorized" }, 401);

  const limiter = rateLimit(`project:${session.userId}`, 5, 60_000);
  if (!limiter.allowed) return json({ error: "Rate limited" }, 429);

  try {
    const { idea } = await req.json();
    const result = await generateProject(idea, session?.userId ?? null);
    return json({ result, mode: session ? "authenticated" : "guest" });
    const result = await generateProject(idea, session.userId);
    return json({ result });
  } catch (error) {
    return json({ error: getErrorMessage(error) }, 400);
  }
}
