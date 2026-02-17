'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

/** CTA section before footer */
export default function LandingCTA() {
	const { user } = useAuth();

	return (
		<section className="py-20">
			<div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
				<h2 className="text-3xl font-bold text-foreground">Ready to simplify splitting bills?</h2>
				<p className="mt-4 text-muted-foreground">
					Join restaurants using DivvyTab to give their customers a better dining experience.
				</p>
				{!user && (
					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<Button size="lg" asChild>
							<Link href="/register">Create account</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="/login">Log in</Link>
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
