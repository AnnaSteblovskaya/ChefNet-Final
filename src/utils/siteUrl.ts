export function getSiteUrl(): string {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    if (!origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return origin;
    }
  }

  if (import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL;
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return 'https://chefnetinvest.com';
}
