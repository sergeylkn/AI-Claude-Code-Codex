import { AppShell } from "@/components/layout/app-shell";

export default function HomePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-4">
        <p className="inline-flex rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">PHASE 1 COMPLETE</p>
        <h1 className="text-3xl font-bold">Local-First AI Learning Platform</h1>
        <p className="text-zinc-300">
          Browser-first web foundation is ready: Next.js + TypeScript + Tailwind + responsive sidebar/main layout.
        </p>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="card">
            <h3 className="mb-2 font-semibold">Frontend</h3>
            <p className="text-sm text-zinc-400">Next.js App Router + TypeScript for scalable feature modules.</p>
          </div>
          <div className="card">
            <h3 className="mb-2 font-semibold">Styling</h3>
            <p className="text-sm text-zinc-400">Tailwind CSS utility system with reusable card/button/input classes.</p>
          </div>
          <div className="card">
            <h3 className="mb-2 font-semibold">Layout</h3>
            <p className="text-sm text-zinc-400">Sidebar navigation + primary content viewport optimized for future phases.</p>
          </div>
        </section>

        <div className="card border-indigo-800/60 bg-indigo-950/20">
          <h2 className="mb-2 font-semibold text-indigo-300">Next Step</h2>
          <p className="text-sm text-zinc-300">Phase 2: local JSON course system with lesson navigation and content renderer.</p>
        </div>
      </div>
    </AppShell>
  );
}
