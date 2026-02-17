'use client';

import { useState } from 'react';
import { register } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * Registration form for new restaurant owners.
 * Creates restaurant and admin user in one step.
 */
export default function RegisterForm() {
	const [form, setForm] = useState({
		restaurantName: '',
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);

	const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

	const submit = async () => {
		try {
			setLoading(true);
			await register(form);
			window.location.href = '/admin/dashboard';
		} catch {
			alert('Registration failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-[400px] bg-card shadow rounded-lg p-6 border border-border">
			<h1 className="text-2xl font-bold mb-4 text-foreground">Create Restaurant Account</h1>

			<Input
				placeholder="Restaurant Name"
				className="mb-2"
				value={form.restaurantName}
				onChange={e => update('restaurantName', e.target.value)}
			/>
			<Input placeholder="First Name" className="mb-2" value={form.firstName} onChange={e => update('firstName', e.target.value)} />
			<Input placeholder="Last Name" className="mb-2" value={form.lastName} onChange={e => update('lastName', e.target.value)} />
			<Input placeholder="Email" className="mb-2" type="email" value={form.email} onChange={e => update('email', e.target.value)} />
			<Input
				type="password"
				placeholder="Password"
				className="mb-4"
				value={form.password}
				onChange={e => update('password', e.target.value)}
			/>

			<Button onClick={submit} disabled={loading} className="w-full">
				{loading ? 'Creating...' : 'Create Account'}
			</Button>
		</div>
	);
}
