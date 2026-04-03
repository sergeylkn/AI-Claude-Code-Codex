import { describe, expect, it } from "vitest";
import { getErrorMessage } from "@/lib/http";

describe("getErrorMessage", () => {
  it("returns message for Error", () => {
    expect(getErrorMessage(new Error("boom"))).toBe("boom");
  });

  it("returns fallback for unknown", () => {
    expect(getErrorMessage("oops")).toBe("Unexpected error");
  });
});
