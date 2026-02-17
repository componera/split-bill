/**
 * Unit tests for useChartColors hook
 */
import { describe, it, expect, mock } from "bun:test";
import { renderHook } from "@testing-library/react";
import { useChartColors } from "./useChartColors";

// Mock next-themes
mock.module("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "light" }),
}));

describe("useChartColors", () => {
  it("returns light theme colors when resolvedTheme is light", () => {
    const { result } = renderHook(() => useChartColors());

    expect(result.current.primary).toBe("hsl(211, 100%, 42%)");
    expect(result.current.secondary).toBe("hsl(185, 100%, 38%)");
  });
});
