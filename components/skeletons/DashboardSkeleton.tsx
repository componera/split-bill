'use client';

import { Skeleton } from '@/components/ui/skeleton';
import StatsGrid from '@/components/StatsGrid';

export default function DashboardSkeleton() {
	return (
		<div className="space-y-8 animate-in fade-in duration-200">
			{/* Header */}
			<div className="rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm shadow-sm">
				<Skeleton className="h-8 w-64 bg-muted" />
				<Skeleton className="mt-2 h-4 w-96 bg-muted" />
			</div>

			{/* Stats cards */}
			<StatsGrid>
				{[1, 2, 3].map(i => (
					<div key={i} className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-md">
						<div className="absolute inset-x-0 top-0 h-1 bg-muted" />
						<Skeleton className="h-4 w-24 bg-muted" />
						<Skeleton className="mt-2 h-9 w-16 bg-muted" />
					</div>
				))}
			</StatsGrid>

			{/* Chart */}
			<div className="rounded-xl border border-border bg-card/80 p-6 shadow-md backdrop-blur-sm">
				<Skeleton className="mb-4 h-6 w-48 bg-muted" />
				<div className="h-[320px] flex items-center justify-center rounded-lg bg-muted/30">
					<Skeleton className="h-3 w-full max-w-md bg-muted" />
				</div>
				<div className="mt-4 flex justify-center gap-6">
					<Skeleton className="h-3 w-16 bg-muted" />
					<Skeleton className="h-3 w-16 bg-muted" />
				</div>
			</div>
		</div>
	);
}
