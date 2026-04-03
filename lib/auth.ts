import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { env } from "@/lib/env";

export type SessionUser = {
  userId: string;
  role: "ADMIN" | "USER";
  email: string;
};

const COOKIE_NAME = "ai_learn_session";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signSessionToken(payload: SessionUser) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifySessionToken(token: string): SessionUser {
  return jwt.verify(token, env.JWT_SECRET) as SessionUser;
}

export async function setSessionCookie(payload: SessionUser) {
  const token = signSessionToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSessionFromRequest(req: NextRequest): Promise<SessionUser | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    return verifySessionToken(token);
  } catch {
    return null;
  }
}
