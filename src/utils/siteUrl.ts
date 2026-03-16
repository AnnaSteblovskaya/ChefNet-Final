const PRODUCTION_URL = 'https://chefnet.replit.app';

export function getSiteUrl(): string {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    const isDevReplit = origin.includes('.worf.replit.dev') || origin.includes('.replit.dev');

    if (!isLocalhost && !isDevReplit) {
      return origin;
    }
  }

  if (import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL;
  }

  return PRODUCTION_URL;
}
