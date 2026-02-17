'use client';

import { cn } from '@/lib/utils';

/**
 * Skeleton placeholder - pulse animation for loading states.
 * Use for instant page switching and seamless data loading.
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('animate-pulse rounded-md bg-muted', className)} aria-hidden="true" {...props} />;
}

export { Skeleton };
