/**
 * Unit tests for useBills hook
 */
import { describe, it, expect, beforeEach, mock } from "bun:test";
import { renderHook, waitFor } from "@testing-library/react";
import { useBills } from "./useBills";

// Mock apiFetch and socket
const mockApiFetch = mock(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: "b1", total: 100, status: "OPEN" }]),
  } as Response)
);

const mockEmit = mock(() => { });
const mockOn = mock(() => { });
const mockOff = mock(() => { });

mock.module("@/lib/api", () => ({
  apiFetch: mockApiFetch,
}));

mock.module("@/lib/socket", () => ({
  getSocket: () => ({ emit: mockEmit, on: mockOn, off: mockOff }),
  emitEvent: mockEmit,
}));

describe("useBills", () => {
  beforeEach(() => {
    mockApiFetch.mockClear();
  });

  it("fetches bills when restaurantId is provided", async () => {
    const { result } = renderHook(() => useBills("rest-1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockApiFetch).toHaveBeenCalledWith("/admin/bills");
    expect(result.current.bills).toHaveLength(1);
    expect(result.current.bills[0].id).toBe("b1");
  });

  it("returns empty bills and not loading when restaurantId is empty", async () => {
    const { result } = renderHook(() => useBills(""));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.bills).toEqual([]);
  });
});
