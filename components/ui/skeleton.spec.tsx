/**
 * Unit tests for Skeleton component
 */
import { describe, it, expect } from 'bun:test';
import { render } from '@testing-library/react';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
	it('renders with default classes', () => {
		const { container } = render(<Skeleton />);
		const el = container.firstChild as HTMLElement;
		expect(el).toBeInTheDocument();
		expect(el.tagName).toBe('DIV');
		expect(el).toHaveClass('animate-pulse', 'rounded-md', 'bg-muted');
	});

	it('applies custom className', () => {
		const { container } = render(<Skeleton className="h-4 w-32" />);
		const el = container.firstChild as HTMLElement;
		expect(el).toHaveClass('h-4', 'w-32');
	});

	it('has aria-hidden for accessibility', () => {
		const { container } = render(<Skeleton />);
		const el = container.firstChild as HTMLElement;
		expect(el).toHaveAttribute('aria-hidden', 'true');
	});
});
