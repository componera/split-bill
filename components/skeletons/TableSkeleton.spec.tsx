/**
 * Unit tests for TableSkeleton component
 */
import { describe, it, expect } from 'bun:test';
import { render } from '@testing-library/react';
import TableSkeleton from './TableSkeleton';

describe('TableSkeleton', () => {
	it('renders without error', () => {
		const { container } = render(<TableSkeleton />);
		expect(container.firstChild).toBeInTheDocument();
	});

	it('renders header and row skeletons', () => {
		const { container } = render(<TableSkeleton rows={2} columns={3} />);
		const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
		expect(skeletons.length).toBeGreaterThan(0);
	});
});
