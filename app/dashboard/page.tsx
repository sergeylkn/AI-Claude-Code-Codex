import Link from "next/link";
import { Sidebar } from "@/components/layout/sidebar";
import { getCourses } from "@/api/services";

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <div className="md:flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="mb-4 text-2xl font-semibold">Course Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <div className="card" key={course.id}>
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="mb-3 mt-2 text-sm text-zinc-300">{course.description}</p>
              <p className="mb-3 text-xs text-zinc-400">{course.modules.length} modules</p>
              <Link href={`/courses/${course.id}`} className="button inline-flex">
                Open Course
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
