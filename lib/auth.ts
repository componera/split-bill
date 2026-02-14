'use client';

import { decodeToken, JwtPayload } from './jwt';

/**
 * Safely get token in browser
 */
export function getToken(): string | null {
    if (typeof window === 'undefined') return null; // SSR-safe
    return localStorage.getItem('accessToken');
}

/**
 * Safely set token in browser
 */
export function setToken(token: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', token);
}

/**
 * Register a new restaurant/admin user
 */
export async function register(data: {
    restaurantName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Registration failed');

    const result = await res.json();

    // Only set token in browser
    if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', result.accessToken);
    }

    return result;
}

/**
 * Logout safely
 */
export function logout() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    }
}

/**
 * Decode JWT to get user info
 */
export function getUser(): JwtPayload | null {
    if (typeof window === 'undefined') return null; // SSR-safe
    const token = getToken();
    if (!token) return null;
    return decodeToken(token);
}
