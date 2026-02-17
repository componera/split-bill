'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface StaffInviteFormProps {
	onInvite: (email: string) => Promise<string>;
	loading: boolean;
}

/**
 * Form to invite a staff member by email.
 */
export default function StaffInviteForm({ onInvite, loading }: StaffInviteFormProps) {
	const [email, setEmail] = useState('');
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async () => {
		setError(null);
		const err = await onInvite(email);
		if (err) {
			setError(err);
		} else {
			setEmail('');
		}
	};

	return (
		<div className="space-y-2">
			<div className="flex gap-3">
				<Input
					placeholder="Enter staff email"
					type="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					onKeyDown={e => e.key === 'Enter' && handleSubmit()}
				/>
				<Button onClick={handleSubmit} disabled={loading || !email.trim()}>
					{loading ? 'Sending...' : 'Send Invite'}
				</Button>
			</div>
			{error && <p className="text-sm text-destructive">{error}</p>}
		</div>
	);
}
