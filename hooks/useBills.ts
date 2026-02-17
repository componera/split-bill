"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";
import { getSocket, emitEvent } from "@/lib/socket";

/**
 * Fetches bills for a restaurant with real-time socket updates.
 * Properly cleans up socket listeners on unmount.
 */
export function useBills(restaurantId: string) {
  const [bills, setBills] = useState<{ id: string; total: number; status: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = useCallback(async () => {
    if (!restaurantId) return;
    setLoading(true);
    try {
      const res = await apiFetch("/admin/bills");
      const data = await res.json();
      setBills(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    if (!restaurantId) {
      setLoading(false);
      return;
    }

    void fetchBills();

    const socket = getSocket();
    emitEvent("joinRestaurant", { restaurantId });

    const handleBillUpdated = (bill: { id: string }) => {
      setBills((prev) => prev.map((b) => (b.id === bill.id ? { ...b, ...bill } : b)));
    };

    const handleBillCreated = (bill: { id: string }) => {
      setBills((prev) => [bill as typeof prev[0], ...prev]);
    };

    socket.on("bill.updated", handleBillUpdated);
    socket.on("bill.created", handleBillCreated);

    return () => {
      socket.off("bill.updated", handleBillUpdated);
      socket.off("bill.created", handleBillCreated);
    };
  }, [restaurantId, fetchBills]);

  return { bills, loading, fetchBills };
}
