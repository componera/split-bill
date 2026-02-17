'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState, useRef } from 'react';
import { apiFetch } from '@/lib/api';
import { getSocket } from '@/lib/socket';
import { useAuth } from '@/hooks/useAuth';
import StatsGrid from '@/components/StatsGrid';
import StatsCard from '@/components/StatsCard';
import DashboardSkeleton from '@/components/skeletons/DashboardSkeleton';

/** Lazy-load chart (recharts is heavy ~100kb) - reduces initial bundle */
const RevenueChart = dynamic(() => import('@/components/RevenueChart'), { ssr: false });

/**
 * Admin dashboard client - fetches stats, subscribes to real-time updates.
 * Displays Active Bills, Payments Today, Revenue Today in a grid.
 * Skeleton-first: instant render, data fills in when ready.
 */
export default function AdminDashboardClient() {
	const { user } = useAuth();
	const [stats, setStats] = useState<{
		activeBills?: number;
		paymentsToday?: number;
		revenueToday?: number;
	} | null>(null);
	const hasFetched = useRef(false);

	const fetchStats = useCallback(async () => {
		const res = await apiFetch('/admin/stats');
		const data = await res.json();
		setStats(data);
	}, []);

	useEffect(() => {
		if (!user?.restaurantId) return;

		const socket = getSocket();
		socket.emit('joinRestaurant', { restaurantId: user.restaurantId });

		if (!hasFetched.current) {
			hasFetched.current = true;
			fetchStats();
		}

		socket.on('bill.created', fetchStats);
		socket.on('bill.updated', fetchStats);
		socket.on('payment.completed', fetchStats);

		return () => {
			socket.off('bill.created', fetchStats);
			socket.off('bill.updated', fetchStats);
			socket.off('payment.completed', fetchStats);
		};
	}, [fetchStats, user?.restaurantId]);

	// Skeleton-first: show full layout with skeleton until user + stats ready
	if (!user || !stats) {
		return <DashboardSkeleton />;
	}

	return (
		<div className="space-y-8 animate-in fade-in duration-200">
			{/* Header */}
			<div className="rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm shadow-sm">
				<h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
				<p className="mt-1 text-sm text-muted-foreground">Overview of your restaurant activity</p>
			</div>

			{/* Stats cards */}
			<StatsGrid>
				<StatsCard title="Active Bills" value={stats.activeBills ?? 0} />
				<StatsCard title="Payments Today" value={stats.paymentsToday ?? 0} />
				<StatsCard title="Revenue Today" value={`R ${stats.revenueToday != null ? stats.revenueToday.toFixed(2) : '0.00'}`} />
			</StatsGrid>

			{/* Revenue & payments chart */}
			<RevenueChart />
		</div>
	);
}
