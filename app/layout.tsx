import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import { ThemeToggle } from '../components/ThemeToggle';

export const metadata = {
	title: 'DivvyTab – Split the bill, not the hassle',
	description:
		"Integrate bill splitting with your POS. Customers scan a QR code, select their items, add a tip, and pay. Friends split the bill until it's settled.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body suppressHydrationWarning>
				<ThemeProvider>
					<ThemeToggle />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
