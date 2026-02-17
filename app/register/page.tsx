'use client';

import RegisterForm from '@/components/RegisterForm';
import GradientBackground from '@/components/GradientBackground';

/**
 * Registration page - creates new restaurant + admin user.
 */
export default function RegisterPage() {
	return (
		<GradientBackground>
			<div className="flex h-screen items-center justify-center">
				<RegisterForm />
			</div>
		</GradientBackground>
	);
}
