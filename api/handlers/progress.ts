import { prisma } from "@/db/prisma";

export async function completeLesson(userId: string, lessonId: string) {
  return prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId,
        lessonId
      }
    },
    update: {
      completed: true,
      completedAt: new Date()
    },
    create: {
      userId,
      lessonId,
      completed: true,
      completedAt: new Date()
    }
  });
}
