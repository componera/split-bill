'use client';

import { useAuth } from '@/hooks/useAuth';
import { usePayments } from '@/hooks/usePayments';
import DataTable from '@/components/DataTable';
import TableSkeleton from '@/components/skeletons/TableSkeleton';

interface Payment {
	id: string;
	amount?: number;
	status?: string;
}

/**
 * Admin Payments page - lists payments for the logged-in user's restaurant.
 * Skeleton-first: instant render, data fills in when ready.
 */
export default function PaymentsPage() {
	const { user } = useAuth();
	const restaurantId = user?.restaurantId ?? '';
	const { payments, loading } = usePayments(restaurantId);

	return (
		<div className="space-y-4 p-6 animate-in fade-in duration-200">
			<h1 className="text-xl font-bold text-foreground">Payments (Realtime)</h1>
			{loading || !restaurantId ? (
				<TableSkeleton rows={6} columns={3} />
			) : (
				<DataTable<Payment>
					columns={[
						{ key: 'id', header: 'ID', render: p => p.id },
						{ key: 'amount', header: 'Amount', render: p => `R ${(p.amount ?? 0).toFixed(2)}` },
						{ key: 'status', header: 'Status', render: p => p.status ?? '-' },
					]}
					data={payments as Payment[]}
					emptyMessage="No payments yet"
				/>
			)}
		</div>
	);
}
