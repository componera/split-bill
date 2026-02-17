'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getSocket, emitEvent, SocketEvents } from '@/lib/socket';
import { Socket } from 'socket.io-client';
import BillDetailSkeleton from '@/components/skeletons/BillDetailSkeleton';

interface BillItem {
	id: string;
	name: string;
	price: number;
	paid: boolean;
}

interface Bill {
	id: string;
	items: BillItem[];
}

/**
 * Admin Bill Detail - single bill view at /admin/bills/[billsId]
 * Gets restaurantId from user context, billId from route params.
 */
export default function BillDetail() {
	const params = useParams() as { billsId: string };
	const billId = params.billsId;
	const { user } = useAuth();
	const restaurantId = user?.restaurantId ?? '';
	const [bill, setBill] = useState<Bill | null>(null);

	useEffect(() => {
		// Async fetch to avoid synchronous setState warning
		const fetchBill = async () => {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${restaurantId}/bills/${billId}`);
			setBill(res.data);
		};

		void fetchBill(); // sync call

		// Socket.IO real-time updates
		const socket: Socket<SocketEvents> = getSocket();

		// Join rooms
		emitEvent('joinBill', { restaurantId, billId });
		emitEvent('joinRestaurant', { restaurantId });

		// Event listeners
		const handleBillUpdated = (updatedBill: Bill) => {
			if (updatedBill.id === billId) setBill(updatedBill);
		};

		socket.on('bill.updated', handleBillUpdated);

		return () => {
			socket.off('bill.updated', handleBillUpdated);
		};
	}, [restaurantId, billId]);

	if (!restaurantId || !bill) {
		return <BillDetailSkeleton />;
	}

	const total = bill.items.reduce((sum, item) => sum + item.price, 0);

	return (
		<div className="animate-in fade-in duration-200 p-6">
			<h1 className="text-2xl font-bold mb-4">Bill Detail</h1>
			<table className="min-w-full bg-white shadow rounded-xl">
				<thead>
					<tr>
						<th className="p-2 text-left">Item</th>
						<th className="p-2 text-left">Price</th>
					</tr>
				</thead>
				<tbody>
					{bill.items.map(item => (
						<tr key={item.id}>
							<td className="p-2">{item.name}</td>
							<td className="p-2">R {item.price.toFixed(2)}</td>
						</tr>
					))}
				</tbody>
			</table>
			<p className="mt-4 font-bold">Total: R {total.toFixed(2)}</p>
		</div>
	);
}
