import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-3 rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300">AI Learning SaaS</p>
      <h1 className="mb-4 text-4xl font-bold">Master Claude Code & AI Product Development</h1>
      <p className="mb-8 max-w-2xl text-zinc-300">
        Structured courses, coding tasks, AI feedback, and a project generator that turns ideas into production-ready
        foundations.
      </p>
      <div className="flex gap-3">
        <Link href="/auth/register" className="button">
          Get Started
        </Link>
        <Link href="/auth/login" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800">
          Login
        </Link>
      </div>
    </main>
  );
}
