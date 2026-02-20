"use client";

import { API_BASE_URL } from "./constants";

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

/**
 * Deduplicated access token refresh
 * Uses httpOnly refresh cookie automatically
 */
async function refreshAccessToken(): Promise<void> {
  if (isRefreshing && refreshPromise) return refreshPromise;

  isRefreshing = true;

  refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include", // critical
  })
    .then(async (res) => {
      if (!res.ok) throw new Error("Refresh failed");
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
}

/**
 * Authenticated fetch using cookies only.
 * Automatically retries after refresh on 401.
 */
export async function apiFetch<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const fetchWithCredentials = () =>
    fetch(`${API_BASE_URL}${url}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

  let res = await fetchWithCredentials();

  if (res.status === 401) {
    try {
      await refreshAccessToken();
      res = await fetchWithCredentials();
    } catch {
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Request failed");
  }

  // Try to parse JSON, fallback to undefined
  try {
    return await res.json();
  } catch {
    return undefined as unknown as T;
  }
}

/** Bills API */
export async function fetchBill(billId: string) {
  return apiFetch(`/bills/${billId}?cache=no-store`);
}

export async function payItems(billId: string, itemIds: string[]) {
  return apiFetch("/payments", {
    method: "POST",
    body: JSON.stringify({ billId, itemIds }),
  });
}

/** Staff API */
export async function fetchStaff() {
  return apiFetch<{ users: StaffUser[]; invites: StaffInvite[] }>("/staff");
}

export async function inviteStaff(email: string) {
  return apiFetch("/staff/invite", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function revokeInvite(inviteId: string) {
  return apiFetch(`/staff/invite/${inviteId}`, { method: "DELETE" });
}

export async function resendInvite(inviteId: string) {
  return apiFetch("/staff/resend", {
    method: "POST",
    body: JSON.stringify({ inviteId }),
  });
}

export async function removeStaff(userId: string) {
  return apiFetch(`/staff/${userId}`, { method: "DELETE" });
}

/** Types */
export interface StaffUser {
  id: string;
  email: string;
  role: string;
}

export interface StaffInvite {
  id: string;
  email: string;
  expiresAt: string;
}