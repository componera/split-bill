"use client";

import { API_BASE_URL } from "./constants";

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
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
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
export async function getUser() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: "include",
    });

    if (!res.ok) return null;

    return res.json();
}
