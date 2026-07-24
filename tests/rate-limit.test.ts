import { describe, expect, it } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("allows requests under the limit", () => {
    const key = `test-${Date.now()}`;
    const first = rateLimit(key, 2, 1000);
    const second = rateLimit(key, 2, 1000);
    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
  });

  it("blocks requests over the limit", () => {
    const key = `test-over-${Date.now()}`;
    rateLimit(key, 1, 1000);
    const blocked = rateLimit(key, 1, 1000);
    expect(blocked.allowed).toBe(false);
  });
});
