import { Clerk } from '@clerk/clerk-js'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
    throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY environment variable')
}

const CLERK_CONFIG = {
    signInUrl: "/sign-in",
    signUpUrl: "/sign-up",
    afterSignOutUrl: "/",
    localization: {
        locale: "en-US"
    },
    polling: true
} as const;

const clerkInstance = new Clerk(publishableKey);

const clerkReady = clerkInstance.load(CLERK_CONFIG);

export { clerkReady, CLERK_CONFIG };
export default clerkInstance;