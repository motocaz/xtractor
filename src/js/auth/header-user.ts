import clerk, { clerkReady } from './clerk.ts';
import { CLERK_CONFIG } from './clerk.ts';
import { clerkAppearance } from './clerk-appearance.ts';

interface MountHeaderUserOptions {
    containerId: string;
    onError?: (error: Error) => void;
}

export async function mountHeaderUser({
    containerId,
    onError
}: MountHeaderUserOptions): Promise<void> {
    try {
        await clerkReady;

        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        const container = document.getElementById(containerId);
        if (!container) {
            return;
        }

        const user = await clerk.user;

        if (user) {
            clerk.mountUserButton(container as HTMLDivElement, {
                appearance: clerkAppearance,
            });
        } else {
            // User is not authenticated - show sign-in button
            container.innerHTML = `
                <a 
                    href="${CLERK_CONFIG.signInUrl}" 
                    class="inline-flex items-center px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold transition-colors"
                >
                    Sign In
                </a>
            `;
        }
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        console.error('Error mounting header user component:', err);
        onError?.(err);
        throw err;
    }
}

