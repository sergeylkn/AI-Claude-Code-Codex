import { loginUser } from "@/api/handlers/auth";
import { getErrorMessage, json } from "@/lib/http";
import { setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await loginUser(body);
    await setSessionCookie({ userId: user.id, email: user.email, role: user.role });
    return json({ user });
  } catch (error) {
    return json({ error: getErrorMessage(error) }, 400);
  }
}
