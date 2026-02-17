'use client';

import { Skeleton } from '@/components/ui/skeleton';

interface TableSkeletonProps {
	rows?: number;
	columns?: number;
}

export default function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
	return (
		<div className="w-full overflow-hidden rounded-lg border border-border bg-card">
			{/* Header */}
			<div className="flex gap-4 border-b border-border bg-muted/50 p-3">
				{Array.from({ length: columns }).map((_, i) => (
					<Skeleton key={i} className="h-4 flex-1 bg-muted" />
				))}
			</div>
			{/* Rows */}
			{Array.from({ length: rows }).map((_, rowIndex) => (
				<div key={rowIndex} className="flex gap-4 border-t border-border p-3">
					{Array.from({ length: columns }).map((_, colIndex) => (
						<Skeleton key={colIndex} className="h-4 flex-1 bg-muted" />
					))}
				</div>
			))}
		</div>
	);
}
