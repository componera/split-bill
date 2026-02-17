'use client';

import { useAuth } from '@/hooks/useAuth';
import PricingCard from './PricingCard';

/** Pricing section - Starter, Growth, Enterprise */
export default function Pricing() {
	const { user } = useAuth();

	return (
		<section id="pricing" className="scroll-mt-20 border-t border-border/50 bg-muted/30 py-20">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<h2 className="text-center text-3xl font-bold text-foreground">Simple pricing</h2>
				<p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">Start with a plan that fits your restaurant</p>
				<div className="mt-16 flex flex-wrap justify-center gap-8">
					<PricingCard
						title="Starter"
						price={
							<>
								<span>R 299</span>
								<span className="ml-1 text-base font-normal text-muted-foreground">/month</span>
							</>
						}
						description="For single-location restaurants getting started with bill splitting."
						features={['Unlimited bills & payments', 'QR code generation', 'Admin dashboard', 'Email support']}
						cta="Get started"
						ctaHref="/register"
					/>
					<PricingCard
						title="Growth"
						price={
							<>
								<span>R 699</span>
								<span className="ml-1 text-base font-normal text-muted-foreground">/month</span>
							</>
						}
						description="For growing restaurants with multiple locations or higher volume."
						features={['Everything in Starter', 'Multi-location support', 'Staff management', 'Priority support']}
						cta="Get started"
						ctaHref="/register"
						variant="popular"
					/>
					<PricingCard
						title="Enterprise"
						price="Custom"
						description="For chains and franchises with custom integrations and dedicated support."
						features={['Everything in Growth', 'Custom POS integrations', 'API access', 'Dedicated success manager']}
						cta="Contact sales"
						ctaHref="/register"
						ctaVariant="outline"
					/>
				</div>
			</div>
		</section>
	);
}
