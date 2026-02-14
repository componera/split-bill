"use client";

import Link from "next/link";

export default function AdminLayout({ children }: any) {
	return (
		<div className="flex">
			<aside className="w-64 bg-gray-100 min-h-screen p-4">
				<nav className="space-y-3">
					<Link href="/admin/dashboard">Dashboard</Link>
					<Link href="/admin/staff">Staff</Link>
				</nav>
			</aside>

			<main className="flex-1 p-6">{children}</main>
		</div>
	);
}
