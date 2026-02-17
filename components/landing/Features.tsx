'use client';

import { Store, Smartphone, Users } from 'lucide-react';

const features = [
	{
		icon: Store,
		title: 'POS integration',
		desc: 'Connect DivvyTab to your existing point-of-sale. Bills flow automatically—no double entry.',
	},
	{
		icon: Smartphone,
		title: 'No app required',
		desc: 'Customers open a link in their browser. No downloads, no sign-ups—just scan and pay.',
	},
	{
		icon: Users,
		title: 'Group dining made easy',
		desc: 'Perfect for shared meals. Each person pays only for their items plus their own tip.',
	},
];

/** Features section - POS, no app, group dining */
export default function Features() {
	return (
		<section id="features" className="scroll-mt-20 py-20">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<h2 className="text-center text-3xl font-bold text-foreground">Built for restaurants</h2>
				<p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">Seamlessly integrated with your existing systems</p>
				<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{features.map(({ icon: Icon, title, desc }) => (
						<div key={title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
							<Icon className="h-10 w-10 text-primary" />
							<h3 className="mt-4 font-semibold text-foreground">{title}</h3>
							<p className="mt-2 text-sm text-muted-foreground">{desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
