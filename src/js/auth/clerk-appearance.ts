export const clerkAppearance = {
    baseTheme: 'dark',
    variables: {
        colorPrimary: 'var(--color-fuchsia-600)',
        colorPrimaryHover: 'var(--color-fuchsia-700)',
        colorPrimaryActive: 'var(--color-fuchsia-800)',
        colorBackground: 'var(--color-tool-card)',
        colorInputBackground: 'var(--color-input-bg)',
        colorInputText: '#ffffff',
        colorText: '#ffffff',
        colorTextSecondary: '#d1d5db',
        colorTextTertiary: '#9ca3af',
        colorDanger: '#dc2626',
        colorSuccess: '#10b981',
        colorWarning: '#f59e0b',
        colorNeutral: '#374151',
        colorShimmer: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '0.5rem',
        fontFamily: 'var(--font-sans)',
    },
    elements: {
        // Card styling
        card: {
            backgroundColor: 'var(--color-tool-card)',
            borderColor: '#374151',
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05)',
        },
        // Input fields
        formFieldInput: {
            backgroundColor: 'var(--color-input-bg)',
            borderColor: '#374151',
            color: '#ffffff',
            '&:focus': {
                borderColor: 'var(--color-fuchsia-600)',
                boxShadow: '0 0 0 3px rgba(217, 70, 239, 0.1)',
            },
        },
        // Primary buttons
        formButtonPrimary: {
            backgroundColor: 'var(--color-fuchsia-600)',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: 'var(--color-fuchsia-700)',
            },
            '&:active': {
                backgroundColor: 'var(--color-fuchsia-800)',
            },
        },
        // Social buttons
        socialButtonsBlockButton: {
            backgroundColor: 'var(--color-input-bg)',
            borderColor: '#374151',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#374151',
                borderColor: '#4b5563',
            },
        },
        // Links
        footerActionLink: {
            color: 'var(--color-fuchsia-400)',
            '&:hover': {
                color: 'var(--color-fuchsia-300)',
            },
        },
        // Footer text
        footer: {
            color: '#9ca3af',
            '& p, & span, & div': {
                color: '#9ca3af',
            },
        },
        // Badges (like "Last used")
        badge: {
            backgroundColor: 'var(--color-fuchsia-600)',
            color: '#ffffff',
        },
        // Divider
        dividerLine: {
            borderColor: '#374151',
            backgroundColor: '#374151',
        },
    },
} as any;
