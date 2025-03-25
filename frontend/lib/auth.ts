export interface User {
    email: string;
    first_name: string;
    last_name: string;
    account_type: string;
    has_cv: boolean;
}

export async function checkAuth(): Promise<User | null> {
    try {
        const response = await fetch('/check-auth', {
            credentials: 'include',
        });

        if (response.status === 401) {
            // Silently handle expected authentication error
            return null;
        }

        if (!response.ok) {
            console.error('Unexpected auth error:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Auth check network error:', error);
        return null;
    }
}

export async function logout(router: any): Promise<void> {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include'
        });
        
        if (response.ok) {
            localStorage.removeItem('user');
            // Force a full page refresh to clear all states
            window.location.href = '/login';
        } else {
            console.error('Logout failed:', response.status);
        }
    } catch (e) {
        console.error('Logout failed:', e);
    }
}

export function getStoredUser(): User | null {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;
    try {
        return JSON.parse(storedUser);
    } catch {
        return null;
    }
}
