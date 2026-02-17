/**
 * Smoke tests for LandingPage - renders without error
 */
import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
	it('renders landing content', () => {
		render(<LandingPage />);
		expect(screen.getByText('Divvy')).toBeInTheDocument();
		expect(screen.getByText('Tab')).toBeInTheDocument();
	});

	it('includes How it works section', () => {
		render(<LandingPage />);
		expect(screen.getByRole('heading', { name: 'How it works' })).toBeInTheDocument();
	});

	it('includes Features section', () => {
		render(<LandingPage />);
		expect(screen.getByRole('heading', { name: 'Built for restaurants' })).toBeInTheDocument();
	});

	it('includes Pricing section', () => {
		render(<LandingPage />);
		expect(screen.getByRole('heading', { name: 'Simple pricing' })).toBeInTheDocument();
	});
});
