import Link from "next/link";
import { prisma } from "@/db/prisma";
import { Sidebar } from "@/components/layout/sidebar";

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { modules: { include: { lessons: true } } }
  });

  if (!course) return <div className="p-6">Course not found.</div>;

  return (
    <div className="md:flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="mb-2 text-2xl font-semibold">{course.title}</h1>
        <p className="mb-6 text-zinc-300">{course.description}</p>
        {course.modules.map((module) => (
          <section key={module.id} className="card mb-4">
            <h2 className="mb-3 font-semibold">{module.title}</h2>
            <div className="space-y-2">
              {module.lessons.map((lesson) => (
                <Link key={lesson.id} href={`/lessons/${lesson.id}`} className="block rounded-lg border border-zinc-800 p-3 hover:bg-zinc-800">
                  {lesson.title}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
