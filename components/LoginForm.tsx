'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getUser } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * Login form component - handles email/password authentication.
 * Uses primary theme colors for consistency with Divvy Tab brand.
 */
export default function LoginForm() {
	const { login } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async () => {
		setLoading(true);
		setError(null);

		try {
			await login(email, password);
			const loggedInUser = getUser();
			if (!loggedInUser) {
				window.location.href = '/admin/dashboard';
				return;
			}
			switch (loggedInUser.role) {
				case 'OWNER':
				case 'MANAGER':
					window.location.href = '/admin/dashboard';
					break;
				case 'STAFF':
					window.location.href = '/admin/dashboard';
					break;
				default:
					window.location.href = '/admin/dashboard';
			}
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : 'Login failed');
		} finally {
			setLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') handleLogin();
	};

	return (
		<div className="bg-card p-8 rounded-2xl shadow-lg w-full max-w-sm border border-border transition-colors duration-300">
			<h2 className="text-2xl font-semibold mb-6 text-center text-foreground">Restaurant Login</h2>

			{error && <div className="bg-destructive/10 text-destructive p-2 mb-4 rounded transition-colors duration-300">{error}</div>}

			<Input
				className="mb-4"
				placeholder="Email"
				type="email"
				value={email}
				onChange={e => setEmail(e.target.value)}
				onKeyDown={handleKeyPress}
			/>

			<Input
				className="mb-4"
				type="password"
				placeholder="Password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				onKeyDown={handleKeyPress}
			/>

			<Button onClick={handleLogin} disabled={loading} className="w-full">
				{loading ? 'Logging in...' : 'Login'}
			</Button>
		</div>
	);
}
