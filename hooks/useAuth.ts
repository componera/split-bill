'use client';

import { useState, useEffect } from 'react';
import { getUser as fetchCurrentUser, logout as logoutFn } from '@/lib/auth';
import { apiFetch } from '@/lib/api';

/**
 * Auth hook - manages current user state using cookies.
 * No token stored in client; HttpOnly cookies are used.
 */
export function useAuth() {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // Sync user on mount
    useEffect(() => {
        (async () => {
            try {
                const currentUser = await fetchCurrentUser();
                setUser(currentUser);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const login = async (email: string, password: string) => {
        // login via cookie-based endpoint
        const res = await apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        // apiFetch already throws if not ok, so response is valid
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
    };

    const logout = () => {
        logoutFn();
        setUser(null);
    };

    return { user, login, logout, loading };
}