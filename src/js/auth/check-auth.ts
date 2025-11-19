import clerk, { clerkReady } from './clerk.ts';

/**
 * Checks if the user is authenticated
 * @returns Promise<boolean> - true if authenticated, false otherwise
 */
export async function checkAuth(): Promise<boolean> {
    try {
        await clerkReady;
        const user = clerk.user;
        return !!user;
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
}

