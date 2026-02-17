'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useBills } from '@/hooks/useBills';
import DataTable from '@/components/DataTable';
import TableSkeleton from '@/components/skeletons/TableSkeleton';

/**
 * Admin Bills page - lists all bills for the logged-in user's restaurant.
 * Skeleton-first: instant render, data fills in when ready.
 */
export default function BillsPage() {
	const { user } = useAuth();
	const restaurantId = user?.restaurantId ?? '';
	const { bills, loading } = useBills(restaurantId);

	return (
		<div className="space-y-4 p-6 animate-in fade-in duration-200">
			<h1 className="text-xl font-bold text-foreground">Bills (Realtime)</h1>
			{loading || !restaurantId ? (
				<TableSkeleton rows={6} columns={4} />
			) : (
				<DataTable
					columns={[
						{ key: 'id', header: 'ID', render: b => b.id },
						{ key: 'total', header: 'Total', render: b => `R ${b.total}` },
						{ key: 'status', header: 'Status', render: b => b.status },
						{
							key: 'view',
							header: 'View',
							render: b => (
								<Link href={`/admin/bills/${b.id}`} className="text-primary hover:underline">
									View
								</Link>
							),
						},
					]}
					data={bills}
					emptyMessage="No bills yet"
				/>
			)}
		</div>
	);
}
