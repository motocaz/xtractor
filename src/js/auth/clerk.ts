import { Clerk } from '@clerk/clerk-js'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
    throw new Error(
        'Missing VITE_CLERK_PUBLISHABLE_KEY environment variable. ' +
        'Please add VITE_CLERK_PUBLISHABLE_KEY=pk_... to your .env file. ' +
        'Get your key from https://dashboard.clerk.com'
    )
}

const CLERK_CONFIG = {
    signInUrl: `${import.meta.env.BASE_URL}src/pages/sign-in`,
    signUpUrl: `${import.meta.env.BASE_URL}src/pages/sign-up`,
    afterSignOutUrl: import.meta.env.BASE_URL,
    localization: {
        locale: "en-US"
    },
    polling: true
} as const;

const clerkInstance = new Clerk(publishableKey);

const clerkReady = clerkInstance.load(CLERK_CONFIG);

export { clerkReady, CLERK_CONFIG };
export default clerkInstance;