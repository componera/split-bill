/**
 * Unit tests for PricingCard component
 */
import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import PricingCard from './PricingCard';

describe('PricingCard', () => {
	it('renders title, price, description, and features', () => {
		render(
			<PricingCard
				title="Starter"
				price="R 299/month"
				description="For small restaurants"
				features={['Feature 1', 'Feature 2']}
				cta="Get started"
				ctaHref="/register"
			/>,
		);
		expect(screen.getByText('Starter')).toBeInTheDocument();
		expect(screen.getByText('R 299/month')).toBeInTheDocument();
		expect(screen.getByText('For small restaurants')).toBeInTheDocument();
		expect(screen.getByText('Feature 1')).toBeInTheDocument();
		expect(screen.getByText('Feature 2')).toBeInTheDocument();
	});

	it('renders CTA button with correct href', () => {
		render(
			<PricingCard title="Pro" price="R 699" description="For growing businesses" features={[]} cta="Sign up" ctaHref="/register" />,
		);
		const link = screen.getByRole('link', { name: 'Sign up' });
		expect(link).toHaveAttribute('href', '/register');
	});

	it('shows Popular badge when variant is popular', () => {
		render(
			<PricingCard
				title="Growth"
				price="R 699"
				description="Popular plan"
				features={[]}
				cta="Get started"
				ctaHref="/register"
				variant="popular"
			/>,
		);
		expect(screen.getByText('Popular')).toBeInTheDocument();
	});

	it('does not show Popular badge when variant is default', () => {
		render(<PricingCard title="Starter" price="R 299" description="Basic plan" features={[]} cta="Get started" ctaHref="/register" />);
		expect(screen.queryByText('Popular')).not.toBeInTheDocument();
	});
});
