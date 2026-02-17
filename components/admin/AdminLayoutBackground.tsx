'use client';

/**
 * Admin layout background - gradient layers and brand orbs.
 * Extracted to reduce nesting in AdminLayout.
 */
export default function AdminLayoutBackground() {
	return (
		<>
			<div
				className="fixed inset-0 -z-10 bg-linear-to-br from-background via-background via-50% to-primary/10 dark:to-primary/25"
				aria-hidden
			/>
			<div
				className="fixed inset-0 -z-10 bg-linear-to-tl from-background via-transparent to-secondary/10 dark:to-secondary/25"
				aria-hidden
			/>
			<div
				className="fixed -right-1/4 top-0 h-1/2 w-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/25 dark:blur-[80px]"
				aria-hidden
			/>
			<div
				className="fixed -left-1/4 bottom-0 h-1/2 w-1/2 rounded-full bg-secondary/10 blur-3xl dark:bg-secondary/25 dark:blur-[80px]"
				aria-hidden
			/>
		</>
	);
}
