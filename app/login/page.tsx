'use client';

import LoginForm from '@/components/LoginForm';
import GradientBackground from '@/components/GradientBackground';

/**
 * Login page - centered auth form with gradient and particle background.
 */
export default function LoginPage() {
	return (
		<GradientBackground>
			<div className="flex h-screen items-center justify-center transition-colors duration-300">
				<LoginForm />
			</div>
		</GradientBackground>
	);
}
