'use client';

import { Skeleton } from '@/components/ui/skeleton';

/**
 * Instant feedback when navigating between admin pages.
 * Shows content-area skeleton while the target page loads.
 */
export default function AdminLoading() {
	return (
		<div className="space-y-8 animate-in fade-in duration-150">
			<div className="rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm shadow-sm">
				<Skeleton className="h-8 w-48 bg-muted" />
				<Skeleton className="mt-2 h-4 w-72 bg-muted" />
			</div>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{[1, 2, 3].map(i => (
					<div key={i} className="rounded-xl border border-border bg-card p-6">
						<Skeleton className="h-4 w-24 bg-muted" />
						<Skeleton className="mt-2 h-9 w-16 bg-muted" />
					</div>
				))}
			</div>
			<div className="rounded-xl border border-border bg-card/80 p-6">
				<Skeleton className="mb-4 h-5 w-40 bg-muted" />
				<div className="h-64 rounded-lg bg-muted/30" />
			</div>
		</div>
	);
}
