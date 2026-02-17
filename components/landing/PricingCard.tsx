'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface PricingCardProps {
	title: string;
	price: ReactNode;
	description: string;
	features: string[];
	cta: string;
	ctaHref: string;
	ctaVariant?: 'default' | 'outline';
	variant?: 'default' | 'popular';
}

/** Reusable pricing tier card */
export default function PricingCard({
	title,
	price,
	description,
	features,
	cta,
	ctaHref,
	ctaVariant = 'default',
	variant = 'default',
}: PricingCardProps) {
	const isPopular = variant === 'popular';

	return (
		<div
			className={`relative w-full max-w-sm rounded-2xl border-2 p-8 shadow-md ${
				isPopular ? 'border-primary bg-card shadow-lg' : 'border-border bg-card'
			}`}>
			{isPopular && (
				<span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
					Popular
				</span>
			)}
			<h3 className="text-lg font-semibold text-foreground">{title}</h3>
			<div className="mt-2 text-3xl font-bold text-foreground">{price}</div>
			<p className="mt-4 text-sm text-muted-foreground">{description}</p>
			<ul className="mt-6 space-y-3 text-sm text-muted-foreground">
				{features.map((f, i) => (
					<li key={i}>{f}</li>
				))}
			</ul>
			<Button className="mt-8 w-full" variant={ctaVariant} asChild>
				<Link href={ctaHref}>{cta}</Link>
			</Button>
		</div>
	);
}
