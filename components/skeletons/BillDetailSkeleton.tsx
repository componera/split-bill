'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function BillDetailSkeleton() {
	return (
		<div className="space-y-4 p-6 animate-in fade-in duration-200">
			<Skeleton className="h-8 w-48 bg-muted" />
			<div className="overflow-hidden rounded-xl border border-border bg-card shadow">
				<div className="border-b border-border bg-muted/50 p-3">
					<div className="flex gap-4">
						<Skeleton className="h-4 flex-1 bg-muted" />
						<Skeleton className="h-4 flex-1 bg-muted" />
					</div>
				</div>
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="flex gap-4 border-t border-border p-3">
						<Skeleton className="h-4 flex-1 bg-muted" />
						<Skeleton className="h-4 w-20 bg-muted" />
					</div>
				))}
			</div>
			<Skeleton className="h-5 w-24 bg-muted" />
		</div>
	);
}
