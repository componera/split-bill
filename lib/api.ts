"use client";

import { getToken, setToken, logout } from "./auth";
import { API_BASE_URL } from "./constants";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

/** Deduplicated token refresh - prevents multiple refresh calls on 401 burst */
async function refreshAccessToken(): Promise<string> {
  if (isRefreshing && refreshPromise) return refreshPromise;
  isRefreshing = true;
  refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  })
    .then(async (res) => {
      if (!res.ok) throw new Error("Refresh failed");
      const data = await res.json();
      setToken(data.accessToken);
      return data.accessToken;
    })
    .finally(() => {
      isRefreshing = false;
    });
  return refreshPromise;
}

/** Build request headers with auth token */
function buildHeaders(token: string | null, options: RequestInit): HeadersInit {
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };
}

/**
 * Authenticated fetch with auto token refresh on 401.
 * Deduplicates refresh requests to reduce server load.
 */
export async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  let token = getToken();
  let res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: buildHeaders(token, options),
  });

  if (res.status === 401) {
    try {
      token = await refreshAccessToken();
      res = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        credentials: "include",
        headers: buildHeaders(token, options),
      });
    } catch {
      logout();
      throw new Error("Session expired");
    }
  }

  return res;
}

/**
 * Fetch a single bill
 */
export async function fetchBill(billId: string) {
  const res = await apiFetch(`/bills/${billId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch bill');

  return res.json();
}

/**
 * Pay selected items on a bill
 */
export async function payItems(billId: string, itemIds: string[]) {
  const res = await apiFetch('/payments', {
    method: 'POST',
    body: JSON.stringify({
      billId,
      itemIds,
    }),
  });

  if (!res.ok) throw new Error('Payment failed');

  return res.json();
}

/** Staff API - uses apiFetch for auth + refresh token handling */
export async function fetchStaff() {
  const res = await apiFetch('/staff');
  if (!res.ok) throw new Error('Failed to fetch staff');
  return res.json() as Promise<{ users: StaffUser[]; invites: StaffInvite[] }>;
}

export async function inviteStaff(email: string) {
  const res = await apiFetch('/staff/invite', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('Failed to invite');
  return res.json();
}

export async function revokeInvite(inviteId: string) {
  const res = await apiFetch(`/staff/invite/${inviteId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to revoke');
}

export async function resendInvite(inviteId: string) {
  const res = await apiFetch('/staff/resend', {
    method: 'POST',
    body: JSON.stringify({ inviteId }),
  });
  if (!res.ok) throw new Error('Failed to resend');
}

export async function removeStaff(userId: string) {
  const res = await apiFetch(`/staff/${userId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to remove staff');
}

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

