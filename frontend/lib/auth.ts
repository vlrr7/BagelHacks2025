export interface User {
    email: string;
    first_name: string;
    last_name: string;
    account_type: string;
    has_cv: boolean;
}

export async function checkAuth(): Promise<User | null> {
    try {
        const response = await fetch('http://localhost:5000/check-auth', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Auth check failed:', response.status);
            return null;
        }

        const data = await response.json();
        if (!data || !data.email) {
            console.error('Invalid user data:', data);
            return null;
        }

        return data;
    } catch (e) {
        console.error('Auth check failed:', e);
        return null;
    }
}

export async function logout(): Promise<void> {
    try {
        await fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include'
        });
        localStorage.removeItem('user');
        window.location.href = '/login';
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
