'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

/**
 * Floating theme toggle - unobtrusive, fixed in top-right corner.
 * Themed with brand colors, switches between light and dark mode.
 */
export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
	};

	const isDark = (resolvedTheme ?? 'light') === 'dark';

	return (
		<button
			onClick={toggleTheme}
			aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
			className="fixed top-4 right-4 z-100 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg active:scale-95">
			{isDark ? <Sun className="h-5 w-5 text-amber-400" aria-hidden /> : <Moon className="h-5 w-5 text-primary" aria-hidden />}
		</button>
	);
}
