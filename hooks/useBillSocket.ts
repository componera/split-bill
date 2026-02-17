"use client";

import { useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";

/**
 * Subscribes to real-time bill updates for a specific bill.
 * Uses ref for onUpdate to avoid effect re-runs.
 */
export function useBillSocket(billId: string, onUpdate: (bill: unknown) => void) {
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useEffect(() => {
    const socket = getSocket();
    socket.emit("joinBill", { restaurantId: "", billId });

    const handleUpdate = (payload: unknown) => onUpdateRef.current(payload);

    socket.on("bill.updated", handleUpdate);
    socket.on("payment.completed", handleUpdate);

    return () => {
      socket.off("bill.updated", handleUpdate);
      socket.off("payment.completed", handleUpdate);
    };
  }, [billId]);
}
