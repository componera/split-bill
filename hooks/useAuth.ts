'use client';

import { useState, useEffect, useCallback } from 'react';
import { getUser as fetchCurrentUser, logout as logoutFn } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import { AuthUser } from '@/lib/user';

interface UseAuthReturn {
    user: AuthUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

/**
 * Auth hook - manages current user state using cookies.
 * No token stored in client; HttpOnly cookies are used.
 */
export function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const currentUser = await fetchCurrentUser();
            setUser(currentUser);
        } catch {
            setUser(null);
        }
    }, []);

    // Sync user on mount
    useEffect(() => {
        (async () => {
            await refreshUser();
            setLoading(false);
        })();
    }, [refreshUser]);

    const login = async (email: string, password: string) => {
        await apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        await refreshUser();
    };

    const logout = async () => {
        await logoutFn(); // calls backend to clear cookies
        setUser(null);
    };

    return { user, loading, login, logout, refreshUser };
}