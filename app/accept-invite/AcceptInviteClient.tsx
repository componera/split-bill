'use client';

import { useSearchParams } from 'next/navigation';
import AcceptInviteForm from '@/components/AcceptInviteForm';
import GradientBackground from '@/components/GradientBackground';

/**
 * Client wrapper for accept-invite - reads token from URL and renders form.
 */
export default function AcceptInviteClient() {
	const params = useSearchParams();
	const token = params.get('token');

	return (
		<GradientBackground>
			<div className="flex min-h-screen items-center justify-center py-12">
				<AcceptInviteForm token={token} />
			</div>
		</GradientBackground>
	);
}
