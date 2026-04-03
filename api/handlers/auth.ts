import { z } from "zod";
import { prisma } from "@/db/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const loginSchema = registerSchema;

export async function registerUser(input: unknown) {
  const parsed = registerSchema.parse(input);
  const existing = await prisma.user.findUnique({ where: { email: parsed.email } });
  if (existing) throw new Error("Email already registered");

  const user = await prisma.user.create({
    data: {
      email: parsed.email,
      passwordHash: await hashPassword(parsed.password),
      role: "USER"
    }
  });

  return { id: user.id, email: user.email, role: user.role };
}

export async function loginUser(input: unknown) {
  const parsed = loginSchema.parse(input);
  const user = await prisma.user.findUnique({ where: { email: parsed.email } });
  if (!user) throw new Error("Invalid credentials");

  const ok = await verifyPassword(parsed.password, user.passwordHash);
  if (!ok) throw new Error("Invalid credentials");

  return { id: user.id, email: user.email, role: user.role };
}
