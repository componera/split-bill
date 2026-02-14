// app/accept-invite/AcceptInviteClient.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AcceptInviteClient() {
	const params = useSearchParams();
	const token = params.get("token");

	const [password, setPassword] = useState("");

	const submit = async () => {
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/accept-invite`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token, password }),
		});

		alert("Account created");
		window.location.href = "/login";
	};

	return (
		<div className="p-6 max-w-md mx-auto">
			<h1 className="text-2xl font-semibold mb-4">Accept Invite</h1>
			<input
				type="password"
				placeholder="Create password"
				className="border p-2 mb-2 w-full"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={submit}>
				Create Account
			</button>
		</div>
	);
}
