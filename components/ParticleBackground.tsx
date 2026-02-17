'use client';

import { useEffect, useRef } from 'react';

/** Brand colors for particles */
const PRIMARY = '#0067D6';
const SECONDARY = '#00B2C2';

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
	color: string;
}

interface ParticleBackgroundProps {
	/** Number of particles (default: 50) */
	particleCount?: number;
	/** Opacity 0-1 (default: 0.6) */
	opacity?: number;
	/** Additional class for the container */
	className?: string;
}

/**
 * Canvas-based particle background using Divvy Tab brand colors.
 * Lightweight, performant, and respects prefers-reduced-motion.
 */
export default function ParticleBackground({ particleCount = 50, opacity = 0.6, className = '' }: ParticleBackgroundProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		// Respect user preference for reduced motion
		if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationId: number;

		const resize = () => {
			const dpr = window.devicePixelRatio || 1;
			canvas.width = window.innerWidth * dpr;
			canvas.height = window.innerHeight * dpr;
			canvas.style.width = `${window.innerWidth}px`;
			canvas.style.height = `${window.innerHeight}px`;
			ctx.scale(dpr, dpr);
			initParticles();
		};

		const colors = [PRIMARY, SECONDARY, `${PRIMARY}66`, `${SECONDARY}66`];
		let particles: Particle[] = [];

		const initParticles = () => {
			particles = Array.from({ length: particleCount }, () => ({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				vx: (Math.random() - 0.5) * 0.3,
				vy: (Math.random() - 0.5) * 0.3,
				radius: Math.random() * 2 + 1,
				color: colors[Math.floor(Math.random() * colors.length)]!,
			}));
		};

		const animate = () => {
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;

				if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
				if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				ctx.fillStyle = p.color;
				ctx.globalAlpha = opacity;
				ctx.fill();
				ctx.globalAlpha = 1;
			}

			animationId = requestAnimationFrame(animate);
		};

		resize();
		animate();
		window.addEventListener('resize', resize);

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', resize);
		};
	}, [particleCount, opacity]);

	return <canvas ref={canvasRef} className={`pointer-events-none fixed inset-0 -z-10 ${className}`} aria-hidden="true" />;
}
