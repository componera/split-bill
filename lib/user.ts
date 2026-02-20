export interface AuthUser {
    id: string;
    email: string;
    role: 'OWNER' | 'MANAGER' | 'STAFF';
    restaurantId: string;
    firstName?: string;
    lastName?: string;
}