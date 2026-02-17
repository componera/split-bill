/**
 * Unit tests for Features component
 */
import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import Features from './Features';

describe('Features', () => {
	it('renders section heading', () => {
		render(<Features />);
		expect(screen.getByRole('heading', { level: 2, name: 'Built for restaurants' })).toBeInTheDocument();
	});

	it('renders all feature cards', () => {
		render(<Features />);
		expect(screen.getByText('POS integration')).toBeInTheDocument();
		expect(screen.getByText('No app required')).toBeInTheDocument();
		expect(screen.getByText('Group dining made easy')).toBeInTheDocument();
	});

	it('has correct id for anchor linking', () => {
		const { container } = render(<Features />);
		const section = container.querySelector('#features');
		expect(section).toBeInTheDocument();
	});
});
