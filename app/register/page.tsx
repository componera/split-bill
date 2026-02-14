"use client";

import { useState } from "react";
import { register } from "@/lib/auth";

export default function RegisterPage() {
	const [form, setForm] = useState({
		restaurantName: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);

	const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

	const submit = async () => {
		try {
			setLoading(true);

			await register(form);

			window.location.href = "/admin/dashboard";
		} catch {
			alert("Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex h-screen items-center justify-center">
			<div className="w-[400px] bg-white shadow rounded p-6">
				<h1 className="text-2xl font-bold mb-4">Create Restaurant Account</h1>

				<input
					placeholder="Restaurant Name"
					className="border p-2 w-full mb-2"
					value={form.restaurantName}
					onChange={e => update("restaurantName", e.target.value)}
				/>

				<input
					placeholder="First Name"
					className="border p-2 w-full mb-2"
					value={form.firstName}
					onChange={e => update("firstName", e.target.value)}
				/>

				<input
					placeholder="Last Name"
					className="border p-2 w-full mb-2"
					value={form.lastName}
					onChange={e => update("lastName", e.target.value)}
				/>

				<input
					placeholder="Email"
					className="border p-2 w-full mb-2"
					value={form.email}
					onChange={e => update("email", e.target.value)}
				/>

				<input
					type="password"
					placeholder="Password"
					className="border p-2 w-full mb-4"
					value={form.password}
					onChange={e => update("password", e.target.value)}
				/>

				<button onClick={submit} disabled={loading} className="bg-blue-600 text-white w-full py-2 rounded">
					{loading ? "Creating..." : "Create Account"}
				</button>
			</div>
		</div>
	);
}
