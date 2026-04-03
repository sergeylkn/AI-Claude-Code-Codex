import { describe, expect, it } from "vitest";
import { assertAgentTask } from "@/api/handlers/ai";

describe("assertAgentTask", () => {
  it("accepts valid tasks", () => {
    expect(assertAgentTask("review_code")).toBe("review_code");
  });

  it("throws for invalid tasks", () => {
    expect(() => assertAgentTask("bad")).toThrow("Unsupported task");
  });
});
