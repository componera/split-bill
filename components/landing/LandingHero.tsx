'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

/** Hero section with headline and CTAs */
export default function LandingHero() {
	const { user } = useAuth();

	return (
		<section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
			<div className="mx-auto max-w-3xl text-center">
				<h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
					Split the bill, not the hassle
				</h1>
				<p className="mt-6 text-lg text-muted-foreground sm:text-xl">
					DivvyTab integrates with your POS so customers can scan a QR code, select only the items they ordered, add a tip, and
					pay. Friends pay their share until the bill is fully settled—no more awkward splits.
				</p>
				{!user && (
					<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
						<Button size="lg" asChild>
							<Link href="/register">Start for restaurants</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="#how-it-works">See how it works</Link>
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
