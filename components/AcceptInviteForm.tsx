'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { API_BASE_URL } from '@/lib/constants';

interface AcceptInviteFormProps {
	token: string | null;
}

/**
 * Accept invite form - allows staff to set password and complete registration.
 * Token comes from URL query param (?token=...).
 */
export default function AcceptInviteForm({ token }: AcceptInviteFormProps) {
	const [password, setPassword] = useState('');

	const submit = async () => {
		if (!token) return;

		const res = await fetch(`${API_BASE_URL}/auth/accept-invite`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token, password }),
		});

		if (!res.ok) {
			const err = await res.json().catch(() => ({}));
			alert(err.message || 'Failed to accept invite');
			return;
		}

		alert('Account created');
		window.location.href = '/login';
	};

	if (!token) {
		return (
			<div className="p-6 max-w-md mx-auto text-destructive">
				<h1 className="text-2xl font-semibold mb-4">Invalid Invite</h1>
				<p>No invite token found. Please use the link from your invitation email.</p>
			</div>
		);
	}

	return (
		<div className="p-6 max-w-md mx-auto">
			<h1 className="text-2xl font-semibold mb-4 text-foreground">Accept Invite</h1>
			<Input
				type="password"
				placeholder="Create password"
				className="mb-2"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<Button onClick={submit}>Create Account</Button>
		</div>
	);
}
