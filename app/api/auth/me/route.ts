import { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { json } from "@/lib/http";

export async function GET(req: NextRequest) {
  const user = await getSessionFromRequest(req);
  if (!user) return json({ user: null }, 401);
  return json({ user });
}
