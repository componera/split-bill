"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CreditCard, Store, QrCode, Settings } from "lucide-react";

const menuItems = [
	{
		name: "Dashboard",
		href: "/admin/dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "Staff",
		href: "/admin/staff",
		icon: Users,
	},
	{
		name: "Restaurants",
		href: "/admin/restaurants",
		icon: Store,
	},
	{
		name: "Payments",
		href: "/admin/payments",
		icon: CreditCard,
	},
	{
		name: "QR Codes",
		href: "/admin/qr",
		icon: QrCode,
	},
	{
		name: "Settings",
		href: "/admin/settings",
		icon: Settings,
	},
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="flex min-h-screen bg-gray-50">
			{/* Sidebar */}
			<aside className="w-64 bg-white border-r shadow-sm">
				{/* Logo */}
				<div className="h-16 flex items-center px-6 border-b">
					<span className="text-xl font-bold text-gray-800">Admin Panel</span>
				</div>

				{/* Menu */}
				<nav className="p-4 space-y-1">
					{menuItems.map(item => {
						const Icon = item.icon;
						const isActive = pathname === item.href;

						return (
							<Link
								key={item.href}
								href={item.href}
								className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all
								${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
								<Icon size={18} />
								{item.name}
							</Link>
						);
					})}
				</nav>

				{/* Footer */}
				<div className="absolute bottom-0 w-64 border-t p-4 text-xs text-gray-400">© {new Date().getFullYear()} Divvy Tab</div>
			</aside>

			{/* Main content */}
			<main className="flex-1">
				{/* Topbar */}
				<header className="h-16 bg-white border-b flex items-center px-6 justify-between">
					<h1 className="text-lg font-semibold text-gray-800">Admin</h1>

					<div className="flex items-center gap-4">
						<div className="text-sm text-gray-600">Admin User</div>
					</div>
				</header>

				{/* Page content */}
				<div className="p-6">{children}</div>
			</main>
		</div>
	);
}
