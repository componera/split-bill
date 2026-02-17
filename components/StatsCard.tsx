import { memo } from 'react';

/** Stats card - metric title and value. Brand gradient accent. Memoized for perf. */
const StatsCard = memo(({ title, value }: { title: string; value: string | number }) => (
	<div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-md transition-shadow hover:shadow-lg">
		{/* Subtle brand gradient accent */}
		<div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary to-secondary" aria-hidden="true" />
		<h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{title}</h2>
		<p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
	</div>
));
StatsCard.displayName = 'StatsCard';

export default StatsCard;
