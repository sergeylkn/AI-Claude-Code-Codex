import { bootstrapCourses } from "@/api/services";

async function main() {
  await bootstrapCourses();
  console.log("Seeded courses");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
