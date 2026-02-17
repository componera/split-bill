'use client';

import { Button } from '@/components/ui/button';
import type { StaffInvite } from '@/lib/api';

interface PendingInvitesListProps {
	invites: StaffInvite[];
	onRevoke: (id: string) => Promise<void>;
	onResend: (id: string) => Promise<void>;
}

/**
 * Renders pending invites with revoke and resend actions.
 */
export default function PendingInvitesList({ invites, onRevoke, onResend }: PendingInvitesListProps) {
	return (
		<div className="space-y-2">
			{invites.map(invite => (
				<div key={invite.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
					<div>
						<p className="text-foreground">{invite.email}</p>
						<p className="text-sm text-muted-foreground">Expires: {new Date(invite.expiresAt).toLocaleDateString()}</p>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" size="sm" onClick={() => onResend(invite.id)}>
							Resend
						</Button>
						<Button variant="destructive" size="sm" onClick={() => onRevoke(invite.id)}>
							Revoke
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
