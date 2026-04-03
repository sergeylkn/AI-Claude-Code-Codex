import { notFound } from "next/navigation";
import { prisma } from "@/db/prisma";
import { Sidebar } from "@/components/layout/sidebar";
import { ChatPanel } from "@/components/chat/chat-panel";
import { CodePractice } from "@/components/editor/code-practice";

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) return notFound();

  return (
    <div className="md:flex">
      <Sidebar />
      <main className="grid flex-1 gap-4 p-6 lg:grid-cols-2">
        <section className="card">
          <h1 className="mb-2 text-xl font-semibold">{lesson.title}</h1>
          <p className="mb-3 text-sm text-zinc-300 whitespace-pre-wrap">{lesson.theory}</p>
          <div className="mb-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300">{lesson.example}</div>
          <div className="rounded-lg border border-indigo-900 bg-indigo-950/40 p-3 text-sm">Task: {lesson.task}</div>
        </section>
        <section className="space-y-4">
          <ChatPanel lessonId={lesson.id} />
          <CodePractice task={lesson.task} />
        </section>
      </main>
    </div>
  );
}
