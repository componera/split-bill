"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";

interface AuthGuardProps {
	children: React.ReactNode;
	allowedRoles?: string[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const user = await getUser(); // await the Promise

				if (!user) {
					router.push("/login");
					return;
				}

				if (allowedRoles && !allowedRoles.includes(user.role)) {
					router.push("/login");
					return;
				}

				setAuthorized(true); // user is allowed
			} catch {
				router.push("/login");
			}
		})();
	}, [allowedRoles, router]);

	// Only render children if authorized
	return <>{authorized ? children : null}</>;
}
