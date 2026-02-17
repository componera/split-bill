'use client';

import { useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useStaff } from '@/hooks/useStaff';
import StaffInviteForm from '@/components/staff/StaffInviteForm';
import StaffList from '@/components/staff/StaffList';
import PendingInvitesList from '@/components/staff/PendingInvitesList';
import StaffPageSkeleton from '@/components/skeletons/StaffPageSkeleton';

/**
 * Staff management page - invite staff, view active staff, manage pending invites.
 * Skeleton-first: instant render, data fills in when ready.
 */
export default function StaffPage() {
	const { users, invites, loading, initialLoading, invite, revoke, resend, remove } = useStaff();

	const handleInvite = useCallback((email: string) => invite(email), [invite]);

	const handleRevoke = useCallback((id: string) => revoke(id), [revoke]);

	const handleRemove = useCallback((userId: string) => remove(userId), [remove]);

	const handleResend = useCallback(
		async (id: string) => {
			await resend(id);
		},
		[resend],
	);

	if (initialLoading) {
		return <StaffPageSkeleton />;
	}

	return (
		<div className="mx-auto max-w-5xl space-y-8 p-6 animate-in fade-in duration-200">
			<h1 className="text-3xl font-bold text-foreground">Staff Management</h1>

			<Card>
				<CardContent className="space-y-4 p-6">
					<h2 className="text-xl font-semibold text-foreground">Invite Staff Member</h2>
					<StaffInviteForm onInvite={handleInvite} loading={loading} />
				</CardContent>
			</Card>

			<Card>
				<CardContent className="p-6">
					<h2 className="mb-4 text-xl font-semibold text-foreground">Active Staff</h2>
					<StaffList users={users} onRemove={handleRemove} />
				</CardContent>
			</Card>

			<Card>
				<CardContent className="p-6">
					<h2 className="mb-4 text-xl font-semibold text-foreground">Pending Invites</h2>
					<PendingInvitesList invites={invites} onRevoke={handleRevoke} onResend={handleResend} />
				</CardContent>
			</Card>
		</div>
	);
}
