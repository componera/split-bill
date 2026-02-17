'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminLayoutBackground from '@/components/admin/AdminLayoutBackground';

/** Admin layout - sidebar + main content. Logged-in restaurant staff only. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative flex min-h-screen bg-background text-foreground">
			<AdminLayoutBackground />
			<AdminSidebar />
			<main className="min-w-0 flex-1 p-6">{children}</main>
		</div>
	);
}
