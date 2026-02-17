/** Footer with copyright */
export default function LandingFooter() {
	return (
		<footer className="border-t border-border/50 py-8">
			<div className="mx-auto flex max-w-6xl justify-center px-4 sm:px-6">
				<p className="text-sm text-muted-foreground">© {new Date().getFullYear()} DivvyTab by Componera. All rights reserved.</p>
			</div>
		</footer>
	);
}
