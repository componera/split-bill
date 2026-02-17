'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export default function StaffPageSkeleton() {
	return (
		<div className="mx-auto max-w-5xl space-y-8 p-6 animate-in fade-in duration-200">
			<Skeleton className="h-9 w-64 bg-muted" />

			{/* Invite form card */}
			<Card>
				<CardContent className="space-y-4 p-6">
					<Skeleton className="h-6 w-48 bg-muted" />
					<div className="flex gap-2">
						<Skeleton className="h-9 flex-1 bg-muted" />
						<Skeleton className="h-9 w-24 bg-muted" />
					</div>
				</CardContent>
			</Card>

			{/* Active staff card */}
			<Card>
				<CardContent className="p-6">
					<Skeleton className="mb-4 h-6 w-32 bg-muted" />
					<div className="space-y-3">
						{[1, 2, 3].map(i => (
							<div key={i} className="flex items-center justify-between border-b border-border py-2 last:border-0">
								<div className="flex items-center gap-3">
									<Skeleton className="h-8 w-8 rounded-full bg-muted" />
									<Skeleton className="h-4 w-40 bg-muted" />
								</div>
								<Skeleton className="h-8 w-20 rounded bg-muted" />
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Pending invites card */}
			<Card>
				<CardContent className="p-6">
					<Skeleton className="mb-4 h-6 w-36 bg-muted" />
					<div className="space-y-3">
						{[1, 2].map(i => (
							<div key={i} className="flex items-center justify-between border-b border-border py-2 last:border-0">
								<Skeleton className="h-4 w-48 bg-muted" />
								<div className="flex gap-2">
									<Skeleton className="h-8 w-16 rounded bg-muted" />
									<Skeleton className="h-8 w-20 rounded bg-muted" />
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
