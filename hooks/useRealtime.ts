"use client";

import { useEffect, useRef } from "react";
import { getSocket, emitEvent } from "@/lib/socket";

interface RealtimeOptions {
    onBillUpdated?: (bill: unknown) => void;
    onBillCreated?: (bill: unknown) => void;
    onPaymentUpdated?: (payment: unknown) => void;
    onBillClosed?: (bill: unknown) => void;
}

/**
 * Subscribes to real-time restaurant events via socket.io.
 * Uses ref for callbacks to avoid effect re-runs on parent re-renders.
 */
export function useRealtime(restaurantId: string, options: RealtimeOptions) {
    const optsRef = useRef(options);
    optsRef.current = options;

    useEffect(() => {
        if (!restaurantId) return;

        const socket = getSocket();
        emitEvent("joinRestaurant", { restaurantId });

        const handlers = {
            "bill.updated": (bill: unknown) => optsRef.current.onBillUpdated?.(bill),
            "bill.created": (bill: unknown) => optsRef.current.onBillCreated?.(bill),
            "payment.completed": (p: unknown) => optsRef.current.onPaymentUpdated?.(p),
            "bill.closed": (bill: unknown) => optsRef.current.onBillClosed?.(bill),
        };

        socket.on("bill.updated", handlers["bill.updated"]);
        socket.on("bill.created", handlers["bill.created"]);
        socket.on("payment.completed", handlers["payment.completed"]);
        socket.on("bill.closed", handlers["bill.closed"]);

        return () => {
            socket.off("bill.updated", handlers["bill.updated"]);
            socket.off("bill.created", handlers["bill.created"]);
            socket.off("payment.completed", handlers["payment.completed"]);
            socket.off("bill.closed", handlers["bill.closed"]);
        };
    }, [restaurantId]);
}
