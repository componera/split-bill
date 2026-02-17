/**
 * Unit tests for DashboardSkeleton component
 */
import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import DashboardSkeleton from './DashboardSkeleton';

describe('DashboardSkeleton', () => {
	it('renders header skeleton', () => {
		const { container } = render(<DashboardSkeleton />);
		const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
		expect(skeletons.length).toBeGreaterThan(0);
	});

	it('renders three stats card placeholders', () => {
		const { container } = render(<DashboardSkeleton />);
		const cards = container.querySelectorAll('.rounded-xl.border');
		expect(cards.length).toBeGreaterThanOrEqual(3);
	});
});
