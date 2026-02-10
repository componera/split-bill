"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket";

interface Callbacks {

    onBillUpdated?: (bill: any) => void;
    onPaymentCompleted?: (payment: any) => void;
    onBillClosed?: (bill: any) => void;
}

export function useBillSocket(
    restaurantId: string,
    billId: string,
    callbacks: Callbacks
) {

    useEffect(() => {

        if (!restaurantId || !billId) return;

        const socket = getSocket();

        socket.emit("joinBill", {
            restaurantId,
            billId,
        });

        socket.on("bill.updated", callbacks.onBillUpdated || (() => { }));
        socket.on("payment.completed", callbacks.onPaymentCompleted || (() => { }));
        socket.on("bill.closed", callbacks.onBillClosed || (() => { }));

        return () => {

            socket.emit("leaveBill", {
                restaurantId,
                billId,
            });

            socket.off("bill.updated");
            socket.off("payment.completed");
            socket.off("bill.closed");
        };

    }, [restaurantId, billId]);
}
