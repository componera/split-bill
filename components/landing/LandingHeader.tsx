'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

/** Sticky header with nav and auth CTAs */
export default function LandingHeader() {
	const { user } = useAuth();

	return (
		<header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
				<Link href="/" className="text-xl font-bold text-foreground">
					<span className="text-primary">Divvy</span>Tab
				</Link>
				<nav className="hidden items-center gap-8 md:flex">
					<Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
						How it works
					</Link>
					<Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
						Features
					</Link>
					<Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
						Pricing
					</Link>
				</nav>
				<div className="flex items-center gap-3">
					{user ? (
						<Button asChild>
							<Link href="/admin/dashboard">Dashboard</Link>
						</Button>
					) : (
						<>
							<Button variant="ghost" asChild>
								<Link href="/login">Log in</Link>
							</Button>
							<Button asChild>
								<Link href="/register">Get started</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
