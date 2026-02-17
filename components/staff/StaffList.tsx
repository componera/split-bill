'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { StaffUser } from '@/lib/api';

interface StaffListProps {
	users: StaffUser[];
	onRemove: (userId: string) => Promise<void>;
}

const roleStyles: Record<string, string> = {
	OWNER: 'bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/40',
	MANAGER: 'bg-secondary/15 text-secondary border-secondary/30',
	STAFF: 'bg-muted text-muted-foreground border-border',
	admin: 'bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/40',
	owner: 'bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/40',
	manager: 'bg-secondary/15 text-secondary border-secondary/30',
	staff: 'bg-muted text-muted-foreground border-border',
};

function isOwner(role: string): boolean {
	const r = role?.toUpperCase() ?? '';
	return r === 'OWNER' || r === 'ADMIN';
}

/**
 * Renders the list of active staff members with styled role badges and remove button.
 * Remove button is disabled for owners.
 */
export default function StaffList({ users, onRemove }: StaffListProps) {
	return (
		<div className="space-y-2">
			{users.map(user => {
				const owner = isOwner(user.role);
				return (
					<div key={user.id} className="flex items-center justify-between gap-3 py-2 border-b border-border last:border-0">
						<span className="text-foreground">{user.email}</span>
						<div className="flex items-center gap-2">
							<span
								className={`inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
									roleStyles[user.role] ?? 'bg-muted text-muted-foreground border-border'
								}`}>
								{user.role}
							</span>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
								onClick={() => onRemove(user.id)}
								disabled={owner}
								aria-label={owner ? 'Cannot remove owner' : `Remove ${user.email}`}>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					</div>
				);
			})}
		</div>
	);
}
