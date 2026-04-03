import { registerUser } from "@/api/handlers/auth";
import { getErrorMessage, json } from "@/lib/http";
import { setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await registerUser(body);
    await setSessionCookie({ userId: user.id, email: user.email, role: user.role });
    return json({ user }, 201);
  } catch (error) {
    return json({ error: getErrorMessage(error) }, 400);
  }
}
