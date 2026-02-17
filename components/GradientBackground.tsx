'use client';

import { ReactNode } from 'react';
import ParticleBackground from './ParticleBackground';

interface GradientBackgroundProps {
	children: ReactNode;
	/** Show particle effect (default: true) */
	withParticles?: boolean;
	/** Additional class for outer wrapper */
	className?: string;
}

/**
 * Full-screen gradient background with optional particle overlay.
 * Uses Divvy Tab brand colors (#0067D6, #00B2C2).
 */
export default function GradientBackground({ children, withParticles = true, className = '' }: GradientBackgroundProps) {
	return (
		<div className={`relative min-h-screen overflow-hidden ${className}`} aria-hidden="false">
			{/* Gradient background - brand colors with rich dark mode */}
			<div
				className="fixed inset-0 -z-20 bg-linear-to-br from-background via-background via-40% to-primary/10 dark:to-primary/25"
				aria-hidden="true"
			/>
			<div
				className="fixed inset-0 -z-20 bg-linear-to-tl from-background via-background via-60% to-secondary/10 dark:to-secondary/25"
				aria-hidden="true"
			/>
			{/* Radial gradient orbs - stronger in dark mode */}
			<div
				className="fixed -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/30 dark:blur-[100px]"
				aria-hidden="true"
			/>
			<div
				className="fixed -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-secondary/10 blur-3xl dark:bg-secondary/30 dark:blur-[100px]"
				aria-hidden="true"
			/>

			{withParticles && <ParticleBackground opacity={0.5} particleCount={40} />}

			{children}
		</div>
	);
}
