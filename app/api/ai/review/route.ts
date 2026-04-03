import { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { json, getErrorMessage } from "@/lib/http";
import { reviewCode } from "@/api/handlers/ai";

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) return json({ error: "Unauthorized" }, 401);

  try {
    const { code, taskContext } = await req.json();
    const review = await reviewCode(code, taskContext);
    return json({ review });
  } catch (error) {
    return json({ error: getErrorMessage(error) }, 400);
  }
}
