import clerk, { clerkReady } from './clerk.js';
import { showPaymentVerificationModal, hidePaymentVerificationModal, showPaymentTimeoutMessage, showAlert } from '../ui.js';

export function detectPaymentReturn(): boolean {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('payment') === 'success';
}

export async function pollForSubscriptionUpdate(): Promise<boolean> {
    const maxAttempts = 10;
    const delayMs = 1000;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        
        try {
            await clerk.user?.reload();
            
            const metadata = clerk.user?.publicMetadata as { plan?: string; status?: string };
            
            if (metadata?.status === 'active' && metadata?.plan === 'pro') {
                return true;
            }
            
            if (attempt < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }
        } catch (error) {
            if (attempt < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }
        }
    }
    
    return false;
}

export function cleanupPaymentParams(): void {
    const url = new URL(window.location.href);
    url.searchParams.delete('payment');
    url.searchParams.delete('checkout_id');
    url.searchParams.delete('customer_session_token');
    window.history.replaceState({}, document.title, url.pathname + url.search);
}

export async function handlePaymentReturn(): Promise<void> {
    await clerkReady;
    
    showPaymentVerificationModal();
    
    const success = await pollForSubscriptionUpdate();
    
    if (success) {
        cleanupPaymentParams();
        hidePaymentVerificationModal();
        
        showAlert(
            '🎉 Welcome to Pro!',
            'Your subscription has been activated. You now have access to all premium features!'
        );
    } else {
        showPaymentTimeoutMessage();
        
        setTimeout(() => {
            hidePaymentVerificationModal();
            cleanupPaymentParams();
        }, 5000);
    }
}

