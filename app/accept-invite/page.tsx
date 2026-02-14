// app/accept-invite/page.tsx
import React, { Suspense } from "react";
import AcceptInviteClient from "./AcceptInviteClient";

export default function AcceptInvitePage() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<AcceptInviteClient />
		</Suspense>
	);
}
