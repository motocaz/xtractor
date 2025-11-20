import clerk, { clerkReady } from './clerk.ts';

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

export async function checkSubscription(): Promise<boolean> {
    try {
        await clerkReady;
        const user = clerk.user;

        if (!user) {
            return false;
        }

        const metadata = user.publicMetadata as { plan?: string; status?: string };

        const hasActivePro = metadata?.plan === 'pro' && metadata?.status === 'active';

        return hasActivePro;
    } catch (error) {
        console.error('Error checking subscription:', error);
        return false;
    }
}

