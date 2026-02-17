'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import LandingPage from '@/components/landing/LandingPage';

/**
 * Home page - shows DivvyTab landing (hero, how it works, pricing).
 * Logged-in users are redirected to dashboard.
 */
export default function HomePage() {
	const router = useRouter();
	const { user } = useAuth();

	useEffect(() => {
		if (user) {
			router.replace('/admin/dashboard');
		}
	}, [user, router]);

	return <LandingPage />;
}
