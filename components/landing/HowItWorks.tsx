'use client';

import { QrCode, CreditCard, CheckCircle2 } from 'lucide-react';

const steps = [
	{
		icon: QrCode,
		title: '1. Scan the QR code',
		desc: 'At the table, customers scan a QR code unique to their bill. No app download required—everything runs in the browser.',
		color: 'bg-primary/15 text-primary',
	},
	{
		icon: CreditCard,
		title: '2. Select & pay your items',
		desc: 'Each friend sees the full bill and selects only what they ordered. Add a tip, pay with card—items are marked paid in real time.',
		color: 'bg-secondary/15 text-secondary',
	},
	{
		icon: CheckCircle2,
		title: '3. Bill fully paid',
		desc: 'Everyone pays their share until the entire bill is settled. Your POS stays in sync—no manual reconciliation.',
		color: 'bg-primary/15 text-primary',
	},
];

/** How it works section - 3 steps */
export default function HowItWorks() {
	return (
		<section id="how-it-works" className="scroll-mt-20 border-t border-border/50 bg-muted/30 py-20">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<h2 className="text-center text-3xl font-bold text-foreground">How it works</h2>
				<p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">From table to payment in three simple steps</p>
				<div className="mt-16 grid gap-12 sm:grid-cols-3">
					{steps.map(({ icon: Icon, title, desc, color }) => (
						<div key={title} className="flex flex-col items-center text-center">
							<div className={`flex h-14 w-14 items-center justify-center rounded-xl ${color}`}>
								<Icon className="h-7 w-7" />
							</div>
							<h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
							<p className="mt-2 text-sm text-muted-foreground">{desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
