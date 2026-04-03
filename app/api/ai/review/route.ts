import { NextRequest } from "next/server";
import { json, getErrorMessage } from "@/lib/http";
import { reviewCode } from "@/api/handlers/ai";

export async function POST(req: NextRequest) {
  try {
    const { code, taskContext } = await req.json();
    const review = await reviewCode(code, taskContext);
    return json({ review, mode: "guest" });
  } catch (error) {
    return json({ error: getErrorMessage(error) }, 400);
  }
}
