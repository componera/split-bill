/**
 * Unit tests for HowItWorks component
 */
import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import HowItWorks from './HowItWorks';

describe('HowItWorks', () => {
	it('renders section heading', () => {
		render(<HowItWorks />);
		expect(screen.getByRole('heading', { level: 2, name: 'How it works' })).toBeInTheDocument();
	});

	it('renders all three steps', () => {
		render(<HowItWorks />);
		expect(screen.getByText('1. Scan the QR code')).toBeInTheDocument();
		expect(screen.getByText('2. Select & pay your items')).toBeInTheDocument();
		expect(screen.getByText('3. Bill fully paid')).toBeInTheDocument();
	});

	it('has correct id for anchor linking', () => {
		const { container } = render(<HowItWorks />);
		const section = container.querySelector('#how-it-works');
		expect(section).toBeInTheDocument();
	});
});
