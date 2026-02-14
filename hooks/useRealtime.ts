'use client';

import { useEffect } from 'react';
import { getSocket, emitEvent } from '@/lib/socket';

interface RealtimeOptions {
    onBillUpdated?: (bill: any) => void;
    onBillCreated?: (bill: any) => void;
    onPaymentUpdated?: (payment: any) => void;
    onBillClosed?: (bill: any) => void;
}

export function useRealtime(restaurantId: string, options: RealtimeOptions) {
    useEffect(() => {
        if (!restaurantId) return;

        const socket = getSocket();

        // Join the restaurant room
        emitEvent('joinRestaurant', { restaurantId });

        // Handlers
        const handleBillUpdated = (bill: any) => options.onBillUpdated?.(bill);
        const handleBillCreated = (bill: any) => options.onBillCreated?.(bill);
        const handlePaymentUpdated = (payment: any) => options.onPaymentUpdated?.(payment);
        const handleBillClosed = (bill: any) => options.onBillClosed?.(bill);

        // Register listeners
        socket.on('bill.updated', handleBillUpdated);
        socket.on('bill.created', handleBillCreated);
        socket.on('payment.completed', handlePaymentUpdated);
        socket.on('bill.closed', handleBillClosed);

        return () => {
            // Cleanup
            socket.off('bill.updated', handleBillUpdated);
            socket.off('bill.created', handleBillCreated);
            socket.off('payment.completed', handlePaymentUpdated);
            socket.off('bill.closed', handleBillClosed);
        };
    }, [restaurantId, options]);
}
