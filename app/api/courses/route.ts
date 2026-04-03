import { getCourses } from "@/api/services";
import { json, getErrorMessage } from "@/lib/http";

export async function GET() {
  try {
    const courses = await getCourses();
    return json({ courses });
  } catch (error) {
    return json({ error: getErrorMessage(error) }, 500);
  }
}
