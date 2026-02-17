/**
 * Unit tests for LandingFooter component
 */
import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import LandingFooter from './LandingFooter';

describe('LandingFooter', () => {
	it('renders copyright with DivvyTab and Componera', () => {
		render(<LandingFooter />);
		expect(screen.getByText(/DivvyTab by Componera/)).toBeInTheDocument();
	});

	it('includes current year in copyright', () => {
		render(<LandingFooter />);
		const year = new Date().getFullYear();
		expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument();
	});
});
