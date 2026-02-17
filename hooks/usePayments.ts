"use client";

import useSWR from "swr";
import { useRealtime } from "./useRealtime";
import { apiFetch } from "@/lib/api";

const fetcher = async (url: string) => {
  const res = await apiFetch(url);
  if (!res.ok) throw new Error("Failed to fetch payments");
  return res.json();
};

/**
 * Fetches payments for a restaurant with SWR + real-time socket updates.
 * Uses apiFetch for consistent auth handling.
 */
export function usePayments(restaurantId: string) {
  const { data, isLoading, mutate } = useSWR(
    restaurantId ? `/admin/${restaurantId}/payments` : null,
    fetcher
  );

  useRealtime(restaurantId, {
    onPaymentUpdated: () => mutate(),
  });

  return {
    payments: data || [],
    loading: isLoading,
    mutate,
  };
}
