import { describe, expect, it } from "vitest";
import { normalizeProductName, normalizePublicAssetUrl } from "../lib/product";

describe("product name configuration", () => {
  it("uses a trimmed configured name", () => {
    expect(normalizeProductName("  Acme Chat  ")).toBe("Acme Chat");
  });

  it("falls back for empty names and removes control characters", () => {
    expect(normalizeProductName(" \n\t ")).toBe("Neo Chat");
    expect(normalizeProductName("Acme\u0000 Chat")).toBe("Acme Chat");
  });

  it("bounds public product names", () => {
    expect(normalizeProductName("a".repeat(100))).toHaveLength(80);
  });

  it("accepts root-relative and HTTP(S) brand asset URLs", () => {
    expect(normalizePublicAssetUrl("/brand/logo.png")).toBe("/brand/logo.png");
    expect(normalizePublicAssetUrl("https://cdn.example.com/logo.png")).toBe(
      "https://cdn.example.com/logo.png",
    );
  });

  it("rejects unsafe or incomplete brand asset URLs", () => {
    expect(
      normalizePublicAssetUrl("//cdn.example.com/logo.png"),
    ).toBeUndefined();
    expect(normalizePublicAssetUrl("javascript:alert(1)")).toBeUndefined();
    expect(normalizePublicAssetUrl("https://")).toBeUndefined();
  });
});
