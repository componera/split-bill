'use client';

import { useTheme } from 'next-themes';

/** Theme-aware chart colors (primary, secondary, grid, text, etc.) for light/dark mode */
export function useChartColors() {
	const { resolvedTheme } = useTheme();
	const isDark = resolvedTheme === 'dark';

	return {
		primary: isDark ? 'hsl(211, 100%, 50%)' : 'hsl(211, 100%, 42%)',
		secondary: isDark ? 'hsl(185, 100%, 42%)' : 'hsl(185, 100%, 38%)',
		grid: isDark ? 'hsl(220, 15%, 25%)' : 'hsl(214, 16%, 85%)',
		text: isDark ? 'hsl(210, 20%, 75%)' : 'hsl(220, 14%, 42%)',
		card: isDark ? 'hsl(220, 18%, 14%)' : 'hsl(212, 20%, 96%)',
		border: isDark ? 'hsl(220, 15%, 22%)' : 'hsl(214, 16%, 82%)',
	};
}
