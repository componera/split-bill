'use client';

import GradientBackground from '@/components/GradientBackground';
import LandingHeader from './LandingHeader';
import LandingHero from './LandingHero';
import HowItWorks from './HowItWorks';
import Features from './Features';
import Pricing from './Pricing';
import LandingCTA from './LandingCTA';
import LandingFooter from './LandingFooter';

/**
 * DivvyTab landing page - hero, how it works, features, pricing.
 * Logged-in users are redirected to dashboard via HomePage.
 * Composed from smaller sections for readability and reuse.
 */
export default function LandingPage() {
	return (
		<GradientBackground withParticles className="overflow-x-hidden">
			<LandingHeader />
			<main>
				<LandingHero />
				<HowItWorks />
				<Features />
				<Pricing />
				<LandingCTA />
			</main>
			<LandingFooter />
		</GradientBackground>
	);
}
