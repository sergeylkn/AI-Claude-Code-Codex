import catalog from "@/courses/catalog.json";
import { prisma } from "@/db/prisma";

export async function bootstrapCourses() {
  const existing = await prisma.course.count();
  if (existing > 0) return;

  for (const course of catalog) {
    await prisma.course.create({
      data: {
        slug: course.slug,
        title: course.title,
        description: course.description,
        modules: {
          create: course.modules.map((mod, i) => ({
            title: mod.title,
            position: i,
            lessons: {
              create: mod.lessons.map((lesson, j) => ({
                title: lesson.title,
                theory: lesson.theory,
                example: lesson.example,
                task: lesson.task,
                position: j
              }))
            }
          }))
        }
      }
    });
  }
}

export async function getCourses() {
  await bootstrapCourses();
  return prisma.course.findMany({ include: { modules: { include: { lessons: true } } } });
}
