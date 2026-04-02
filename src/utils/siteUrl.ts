export function getSiteUrl(): string {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    if (!isLocalhost) return origin;
  }

  if (import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL;
  }

  return 'https://chefnet.ai';
}
