'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { getSocket, emitEvent } from '@/lib/socket';

export function useBills(restaurantId: string) {
  const [bills, setBills] = useState<any[]>([]);

  // Stable async function to fetch bills
  const fetchBills = useCallback(async () => {
    const res = await apiFetch(`/admin/${restaurantId}/bills`);
    const data = await res.json();
    setBills(data);
  }, [restaurantId]);

  useEffect(() => {
    // Wrap in async function to avoid synchronous setState
    const initialize = async () => {
      await fetchBills();

      const socket = getSocket();

      // Join the restaurant room
      emitEvent('joinRestaurant', { restaurantId });

      const handleBillUpdated = (bill: any) => {
        setBills(prev => prev.map(b => (b.id === bill.id ? bill : b)));
      };

      const handleBillCreated = (bill: any) => {
        setBills(prev => [bill, ...prev]);
      };

      socket.on('bill.updated', handleBillUpdated);
      socket.on('bill.created', handleBillCreated);

      // Cleanup function
      return () => {
        socket.off('bill.updated', handleBillUpdated);
        socket.off('bill.created', handleBillCreated);
      };
    };

    void initialize(); // async effect pattern

  }, [restaurantId, fetchBills]);

  return { bills, fetchBills };
}
