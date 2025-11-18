import clerk, { clerkReady } from './clerk.ts';
import { CLERK_CONFIG } from './clerk.ts';
import { clerkAppearance } from './clerk-appearance.ts';

interface MountSignInOptions {
    containerId: string;
    onError?: (error: Error) => void;
}

export async function mountSignIn({
    containerId,
    onError
}: MountSignInOptions): Promise<void> {
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
            throw new Error(`Container with id "${containerId}" not found`);
        }

        container.style.minHeight = '400px';

        const user = await clerk.user;
        if (user) {
            container.innerHTML = `
                <div class="text-center p-4">
                    <p class="text-white mb-4">You are already signed in.</p>
                    <a href="/" class="text-fuchsia-400 hover:text-fuchsia-300">Go to Home</a>
                </div>
            `;
            return;
        }

        clerk.mountSignIn(container as HTMLDivElement, {
            routing: 'virtual',
            signUpUrl: CLERK_CONFIG.signUpUrl,
            appearance: clerkAppearance,
        });
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        console.error('Error mounting Clerk sign-in component:', err);
        onError?.(err);
        throw err;
    }
}