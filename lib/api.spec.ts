/**
 * Unit tests for API utilities
 */
import { describe, it, expect, beforeEach, mock } from "bun:test";
import { fetchBill, payItems, fetchStaff } from "./api";

describe("api", () => {
	const originalFetch = globalThis.fetch;

	beforeEach(() => {
		globalThis.fetch = originalFetch;
	});

	describe("fetchBill", () => {
		it("returns bill data on success", async () => {
			const mockBill = { id: "bill-1", items: [] };
			globalThis.fetch = mock(() =>
				Promise.resolve({
					ok: true,
					json: () => Promise.resolve(mockBill),
				} as Response)
			);

			const result = await fetchBill("bill-1");

			expect(result).toEqual(mockBill);
			expect(globalThis.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/bills/bill-1"),
				expect.any(Object)
			);
		});

		it("throws on failure", async () => {
			globalThis.fetch = mock(() =>
				Promise.resolve({ ok: false } as Response)
			);

			await expect(fetchBill("bad-id")).rejects.toThrow("Failed to fetch bill");
		});
	});

	describe("payItems", () => {
		it("sends correct payload", async () => {
			const mockRes = { paymentId: "p1" };
			globalThis.fetch = mock(() =>
				Promise.resolve({
					ok: true,
					json: () => Promise.resolve(mockRes),
				} as Response)
			);

			await payItems("bill-1", ["item-1", "item-2"]);

			expect(globalThis.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/payments"),
				expect.objectContaining({
					method: "POST",
					body: JSON.stringify({
						billId: "bill-1",
						itemIds: ["item-1", "item-2"],
					}),
				})
			);
		});

		it("throws on failure", async () => {
			globalThis.fetch = mock(() =>
				Promise.resolve({ ok: false } as Response)
			);

			await expect(payItems("bill-1", ["item-1"])).rejects.toThrow(
				"Payment failed"
			);
		});
	});

	describe("fetchStaff", () => {
		it("returns users and invites on success", async () => {
			const mockData = { users: [{ id: "u1", email: "a@b.com", role: "STAFF" }], invites: [] };
			globalThis.fetch = mock(() =>
				Promise.resolve({
					ok: true,
					json: () => Promise.resolve(mockData),
				} as Response)
			);

			const result = await fetchStaff();

			expect(result).toEqual(mockData);
			expect(globalThis.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/staff"),
				expect.any(Object)
			);
		});

		it("throws on failure", async () => {
			globalThis.fetch = mock(() =>
				Promise.resolve({ ok: false } as Response)
			);

			await expect(fetchStaff()).rejects.toThrow("Failed to fetch staff");
		});
	});
});
