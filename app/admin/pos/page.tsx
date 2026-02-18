"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminPosPage() {
	const [isConnecting, setIsConnecting] = useState(false);

	const handleConnectSquare = () => {
		const clientId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
		const redirectUri = `${window.location.origin}/admin/pos`; // redirect back here
		const scope = encodeURIComponent(
			"PAYMENTS_READ PAYMENTS_WRITE ORDERS_READ ORDERS_WRITE CUSTOMERS_READ CUSTOMERS_WRITE ITEMS_READ ITEMS_WRITE",
		); // add more scopes if needed
		const squareAuthUrl = `https://connect.squareup.com/oauth2/authorize?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}`;

		setIsConnecting(true);
		window.location.href = squareAuthUrl;
	};

	// Check if Square redirected back with code
	useEffect(() => {
		const code = new URLSearchParams(window.location.search).get("code");

		if (!code) return;

		// Wrap async logic in an inner function
		const exchangeCode = async () => {
			try {
				setIsConnecting(true); // safe now, inside async function

				const res = await fetch("/api/square-exchange", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ code }),
				});

				const data = await res.json();
				console.log("Square auth saved:", data);

				// Remove code from URL
				window.history.replaceState({}, document.title, "/admin/pos");
			} catch (err) {
				console.error(err);
			} finally {
				setIsConnecting(false);
			}
		};

		exchangeCode();
	}, []);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white dark:bg-black p-8">
			<Image src="/divvy-tab-logo.png" alt="DivvyTab Logo" width={200} height={80} priority />

			<button
				onClick={handleConnectSquare}
				disabled={isConnecting}
				className={`px-6 py-3 rounded-lg font-semibold transition-colors
        ${isConnecting ? "bg-primary/50 text-white cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"}`}>
				{isConnecting ? "Connecting..." : "Connect to Square"}
			</button>
		</div>
	);
}
