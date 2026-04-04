import { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SiteContentProvider } from '@/contexts/SiteContentContext';
import NewPasswordModal from '@/app/components/auth/NewPasswordModal';
import AdminPanel from '@/app/components/admin/AdminPanel';
import PrivacyPolicy from '@/app/components/legal/PrivacyPolicy';
import TermsOfUse from '@/app/components/legal/TermsOfUse';
import RiskDisclosure from '@/app/components/legal/RiskDisclosure';
import ReferralTerms from '@/app/components/legal/ReferralTerms';
import CookiePolicy from '@/app/components/legal/CookiePolicy';
import Impressum from '@/app/components/legal/Impressum';
import AmlKycPolicy from '@/app/components/legal/AmlKycPolicy';
import Disclaimer from '@/app/components/legal/Disclaimer';
import Datenschutz from '@/app/components/legal/Datenschutz';
import Nutzungsbedingungen from '@/app/components/legal/Nutzungsbedingungen';
import HeroSection from '@/app/components/sections/HeroSection';
import AboutSection from '@/app/components/sections/AboutSection';
import UniqueFeaturesSection from '@/app/components/sections/UniqueFeaturesSection';
import OpportunitiesSection from '@/app/components/sections/OpportunitiesSection';
import PartnershipSection from '@/app/components/sections/PartnershipSection';
import InvestmentsSection from '@/app/components/sections/InvestmentsSection';
import AdvantagesSection from '@/app/components/sections/AdvantagesSection';
import RoadmapSection from '@/app/components/sections/RoadmapSection';
import ChefNetAppSection from '@/app/components/sections/ChefNetAppSection';
import FAQSection from '@/app/components/sections/FAQSection';
import CTABanner from '@/app/components/sections/CTABanner';
import Footer from '@/app/components/sections/Footer';
import Dashboard from '@/app/components/dashboard/Dashboard';
import StickyNavigation from '@/app/components/StickyNavigation';
import TeamSection from '@/app/components/sections/TeamSection';
import CookieConsent from '@/app/components/CookieConsent';
import AccessibilityPanel from '@/app/components/AccessibilityPanel';

const verifiedTexts: Record<string, string> = {
  en: 'Email confirmed! You can now log in.',
  ru: 'Email подтверждён! Теперь вы можете войти.',
  de: 'E-Mail bestätigt! Sie können sich jetzt anmelden.',
  es: 'Email confirmado! Ahora puedes iniciar sesión.',
  tr: 'E-posta onaylandı! Artık giriş yapabilirsiniz.',
};

const verifyErrorTexts: Record<string, Record<string, string>> = {
  invalid: {
    en: 'Verification link is invalid. Please request a new one.',
    ru: 'Ссылка для подтверждения недействительна. Запросите новую.',
    de: 'Bestätigungslink ist ungültig. Bitte fordern Sie einen neuen an.',
    es: 'El enlace de verificación no es válido. Solicite uno nuevo.',
    tr: 'Doğrulama bağlantısı geçersiz. Lütfen yeni bir tane isteyin.',
  },
  expired: {
    en: 'Verification link has expired. Please request a new one.',
    ru: 'Ссылка для подтверждения истекла. Запросите новую.',
    de: 'Bestätigungslink ist abgelaufen. Bitte fordern Sie einen neuen an.',
    es: 'El enlace de verificación ha expirado. Solicite uno nuevo.',
    tr: 'Doğrulama bağlantısının süresi doldu. Lütfen yeni bir tane isteyin.',
  },
  server: {
    en: 'A server error occurred. Please try again later.',
    ru: 'Произошла ошибка сервера. Попробуйте позже.',
    de: 'Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    es: 'Ocurrió un error del servidor. Inténtelo de nuevo más tarde.',
    tr: 'Bir sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.',
  },
  missing: {
    en: 'Verification link is incomplete. Please use the full link from the email.',
    ru: 'Ссылка для подтверждения неполная. Используйте полную ссылку из письма.',
    de: 'Bestätigungslink ist unvollständig.',
    es: 'El enlace de verificación está incompleto.',
    tr: 'Doğrulama bağlantısı eksik.',
  },
};

function AppContent() {
  const { isAuthenticated, loading, isPasswordRecovery } = useAuth();
  const { language } = useLanguage();
  const [showAdmin, setShowAdmin] = useState(window.location.pathname === '/admin');
  const pathname = window.location.pathname;

  // Dashboard visibility driven by URL — survives page refresh
  const [showDashboard, setShowDashboard] = useState(
    () => window.location.pathname === '/dashboard'
  );

  const goToDashboard = () => {
    setShowDashboard(true);
    window.history.pushState({}, '', '/dashboard');
  };

  const goToHome = () => {
    setShowDashboard(false);
    window.history.pushState({}, '', '/');
  };

  // If user was on /dashboard but auth check completed and they are NOT logged in,
  // redirect them to landing so they can log in.
  useEffect(() => {
    if (!loading && !isAuthenticated && showDashboard) {
      setShowDashboard(false);
      window.history.replaceState({}, '', '/');
    }
  }, [loading, isAuthenticated, showDashboard]);

  // Sync showDashboard with browser back/forward navigation
  useEffect(() => {
    const onPopState = () => {
      setShowDashboard(window.location.pathname === '/dashboard');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const [verifiedBanner, setVerifiedBanner] = useState(false);
  const [verifyErrorBanner, setVerifyErrorBanner] = useState<string | null>(null);
  const [resendEmail, setResendEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [showResendInput, setShowResendInput] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [autoOpenRegister, setAutoOpenRegister] = useState(false);
  const resendTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref && /^CHEF-[A-Z0-9]{6}$/i.test(ref)) {
      localStorage.setItem('chefnet_referral_code', ref.toUpperCase());
      // Set a one-time flag so StickyNavigation opens the register modal
      // regardless of auth loading timing
      localStorage.setItem('chefnet_referral_open_modal', '1');
      setAutoOpenRegister(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
    if (params.get('verified') === 'true') {
      setVerifiedBanner(true);
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setVerifiedBanner(false), 8000);
    }
    const verifyError = params.get('verify_error');
    if (verifyError) {
      setVerifyErrorBanner(verifyError);
      const emailParam = params.get('email');
      if (emailParam) {
        setResendEmail(emailParam);
      }
      window.history.replaceState({}, '', window.location.pathname);
    }
    const token = params.get('reset_token');
    if (token) {
      setResetToken(token);
      window.history.replaceState({}, '', window.location.pathname);
    }
    return () => {
      if (resendTimerRef.current) clearTimeout(resendTimerRef.current);
    };
  }, []);

  const handleResendVerification = async () => {
    if (!resendEmail) return;
    setResendLoading(true);
    try {
      const res = await fetch('/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resendEmail, firstName: '', lang: language }),
      });
      if (res.ok) {
        setResendSent(true);
        setShowResendInput(false);
        resendTimerRef.current = setTimeout(() => {
          setVerifyErrorBanner(null);
          setResendSent(false);
        }, 8000);
      }
    } catch (_e) {
    } finally {
      setResendLoading(false);
    }
  };

  // Admin panel — independent of loading state, has its own auth check
  if (showAdmin) {
    return <AdminPanel onExit={() => { setShowAdmin(false); window.history.replaceState({}, '', '/'); }} />;
  }

  // Legal pages — no auth required
  if (pathname === '/privacy') return <PrivacyPolicy />;
  if (pathname === '/terms') return <TermsOfUse />;
  if (pathname === '/risks') return <RiskDisclosure />;
  if (pathname === '/referral-terms') return <ReferralTerms />;
  if (pathname === '/cookies') return <CookiePolicy />;
  if (pathname === '/impressum') return <Impressum />;
  if (pathname === '/aml-kyc') return <AmlKycPolicy />;
  if (pathname === '/disclaimer') return <Disclaimer />;
  if (pathname === '/datenschutz') return <Datenschutz />;
  if (pathname === '/nutzungsbedingungen') return <Nutzungsbedingungen />;

  // While auth is loading on /dashboard — show full-screen spinner (no landing flash)
  if (loading && showDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]" role="status" aria-label="Loading">
        <div className="w-10 h-10 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show dashboard if authenticated and URL is /dashboard
  if (!loading && isAuthenticated && showDashboard) {
    return <Dashboard onBackToHome={goToHome} />;
  }

  // Show main landing page (StickyNavigation is always mounted so referral modal
  // can open reliably regardless of auth loading state)
  return (
    <main id="main-content" role="main" className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-colors duration-300 overflow-x-hidden w-full max-w-full">
      {(isPasswordRecovery) && <NewPasswordModal />}
      {resetToken && <NewPasswordModal resetToken={resetToken} onClose={() => setResetToken(null)} />}
      {/* StickyNavigation always rendered — needed for referral link auto-open */}
      <StickyNavigation onGoToDashboard={goToDashboard} autoOpenRegister={autoOpenRegister} onAutoOpenHandled={() => setAutoOpenRegister(false)} pageReady={!loading} />
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (<>
      {verifiedBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 max-w-[90vw]" role="alert" aria-live="polite">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="font-medium text-sm">{verifiedTexts[language] || verifiedTexts.ru}</span>
          <button onClick={() => setVerifiedBanner(false)} className="ml-2 text-white/80 hover:text-white">×</button>
        </div>
      )}
      {verifyErrorBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-red-600 text-white rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-4 max-w-[92vw] w-full sm:max-w-md" role="alert" aria-live="polite">
          <div className="px-4 py-3 flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">
                {resendSent
                  ? (language === 'ru' ? 'Письмо отправлено! Проверьте почту.' : language === 'de' ? 'E-Mail gesendet!' : language === 'es' ? '¡Correo enviado!' : language === 'tr' ? 'E-posta gönderildi!' : 'Email sent! Check your inbox.')
                  : (verifyErrorTexts[verifyErrorBanner] || verifyErrorTexts.invalid)[language] || (verifyErrorTexts[verifyErrorBanner] || verifyErrorTexts.invalid).ru
                }
              </p>
              {!resendSent && (verifyErrorBanner === 'invalid' || verifyErrorBanner === 'expired') && (
                <div className="mt-2">
                  {!showResendInput ? (
                    <button
                      onClick={() => setShowResendInput(true)}
                      className="text-xs underline text-white/90 hover:text-white"
                    >
                      {language === 'ru' ? 'Запросить новую ссылку' : language === 'de' ? 'Neuen Link anfordern' : language === 'es' ? 'Solicitar nuevo enlace' : language === 'tr' ? 'Yeni bağlantı iste' : 'Request a new link'}
                    </button>
                  ) : (
                    <div className="flex gap-2 mt-1">
                      <input
                        type="email"
                        value={resendEmail}
                        onChange={(e) => setResendEmail(e.target.value)}
                        placeholder="Email"
                        className="flex-1 px-2 py-1 text-xs rounded text-gray-900 min-w-0"
                      />
                      <button
                        onClick={handleResendVerification}
                        disabled={resendLoading || !resendEmail}
                        className="px-3 py-1 text-xs bg-white text-red-600 rounded font-semibold hover:bg-red-50 disabled:opacity-50 whitespace-nowrap"
                      >
                        {resendLoading ? '...' : (language === 'ru' ? 'Отправить' : 'Send')}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button onClick={() => { setVerifyErrorBanner(null); setShowResendInput(false); setResendSent(false); }} className="text-white/80 hover:text-white flex-shrink-0">×</button>
          </div>
        </div>
      )}
      <HeroSection key={language} onGoToDashboard={goToDashboard} />
      <UniqueFeaturesSection />
      <OpportunitiesSection />
      <PartnershipSection />
      <InvestmentsSection />
      <AboutSection />
      <AdvantagesSection />
      <RoadmapSection />
      <ChefNetAppSection />
      <FAQSection />
      <CTABanner />
      <TeamSection />
      <Footer />
      <CookieConsent />
      <AccessibilityPanel />
      </>)}
    </main>
  );
}

export default function App() {
  return (
    <SiteContentProvider>
      <LanguageProvider>
        <AuthProvider>
          <ThemeProvider defaultTheme="light" storageKey="chefnet-theme">
            <AppContent />
          </ThemeProvider>
        </AuthProvider>
      </LanguageProvider>
    </SiteContentProvider>
  );
    }import { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SiteContentProvider } from '@/contexts/SiteContentContext';
import NewPasswordModal from '@/app/components/auth/NewPasswordModal';
import AdminPanel from '@/app/components/admin/AdminPanel';
import PrivacyPolicy from '@/app/components/legal/PrivacyPolicy';
import TermsOfUse from '@/app/components/legal/TermsOfUse';
import RiskDisclosure from '@/app/components/legal/RiskDisclosure';
import ReferralTerms from '@/app/components/legal/ReferralTerms';
import HeroSection from '@/app/components/sections/HeroSection';
import AboutSection from '@/app/components/sections/AboutSection';
import UniqueFeaturesSection from '@/app/components/sections/UniqueFeaturesSection';
import OpportunitiesSection from '@/app/components/sections/OpportunitiesSection';
import PartnershipSection from '@/app/components/sections/PartnershipSection';
import InvestmentsSection from '@/app/components/sections/InvestmentsSection';
import AdvantagesSection from '@/app/components/sections/AdvantagesSection';
import RoadmapSection from '@/app/components/sections/RoadmapSection';
import ChefNetAppSection from '@/app/components/sections/ChefNetAppSection';
import FAQSection from '@/app/components/sections/FAQSection';
import CTABanner from '@/app/components/sections/CTABanner';
import Footer from '@/app/components/sections/Footer';
import Dashboard from '@/app/components/dashboard/Dashboard';
import StickyNavigation from '@/app/components/StickyNavigation';
import TeamSection from '@/app/components/sections/TeamSection';

const verifiedTexts: Record<string, string> = {
  en: 'Email confirmed! You can now log in.',
  ru: 'Email подтверждён! Теперь вы можете войти.',
  de: 'E-Mail bestätigt! Sie können sich jetzt anmelden.',
  es: 'Email confirmado! Ahora puedes iniciar sesión.',
  tr: 'E-posta onaylandı! Artık giriş yapabilirsiniz.',
};

const verifyErrorTexts: Record<string, Record<string, string>> = {
  invalid: {
    en: 'Verification link is invalid. Please request a new one.',
    ru: 'Ссылка для подтверждения недействительна. Запросите новую.',
    de: 'Bestätigungslink ist ungültig. Bitte fordern Sie einen neuen an.',
    es: 'El enlace de verificación no es válido. Solicite uno nuevo.',
    tr: 'Doğrulama bağlantısı geçersiz. Lütfen yeni bir tane isteyin.',
  },
  expired: {
    en: 'Verification link has expired. Please request a new one.',
    ru: 'Ссылка для подтверждения истекла. Запросите новую.',
    de: 'Bestätigungslink ist abgelaufen. Bitte fordern Sie einen neuen an.',
    es: 'El enlace de verificación ha expirado. Solicite uno nuevo.',
    tr: 'Doğrulama bağlantısının süresi doldu. Lütfen yeni bir tane isteyin.',
  },
  server: {
    en: 'A server error occurred. Please try again later.',
    ru: 'Произошла ошибка сервера. Попробуйте позже.',
    de: 'Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    es: 'Ocurrió un error del servidor. Inténtelo de nuevo más tarde.',
    tr: 'Bir sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.',
  },
  missing: {
    en: 'Verification link is incomplete. Please use the full link from the email.',
    ru: 'Ссылка для подтверждения неполная. Используйте полную ссылку из письма.',
    de: 'Bestätigungslink ist unvollständig.',
    es: 'El enlace de verificación está incompleto.',
    tr: 'Doğrulama bağlantısı eksik.',
  },
};

function AppContent() {
  const { isAuthenticated, loading, isPasswordRecovery } = useAuth();
  const { language } = useLanguage();
  const [showAdmin, setShowAdmin] = useState(window.location.pathname === '/admin');
  const pathname = window.location.pathname;

  // Dashboard visibility driven by URL — survives page refresh
  const [showDashboard, setShowDashboard] = useState(
    () => window.location.pathname === '/dashboard'
  );

  const goToDashboard = () => {
    setShowDashboard(true);
    window.history.pushState({}, '', '/dashboard');
  };

  const goToHome = () => {
    setShowDashboard(false);
    window.history.pushState({}, '', '/');
  };

  // If user was on /dashboard but auth check completed and they are NOT logged in,
  // redirect them to landing so they can log in.
  useEffect(() => {
    if (!loading && !isAuthenticated && showDashboard) {
      setShowDashboard(false);
      window.history.replaceState({}, '', '/');
    }
  }, [loading, isAuthenticated, showDashboard]);

  // Sync showDashboard with browser back/forward navigation
  useEffect(() => {
    const onPopState = () => {
      setShowDashboard(window.location.pathname === '/dashboard');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const [verifiedBanner, setVerifiedBanner] = useState(false);
  const [verifyErrorBanner, setVerifyErrorBanner] = useState<string | null>(null);
  const [resendEmail, setResendEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [showResendInput, setShowResendInput] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [autoOpenRegister, setAutoOpenRegister] = useState(false);
  const resendTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref && /^CHEF-[A-Z0-9]{6}$/i.test(ref)) {
      localStorage.setItem('chefnet_referral_code', ref.toUpperCase());
      // Set a one-time flag so StickyNavigation opens the register modal
      // regardless of auth loading timing
      localStorage.setItem('chefnet_referral_open_modal', '1');
      setAutoOpenRegister(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
    if (params.get('verified') === 'true') {
      setVerifiedBanner(true);
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setVerifiedBanner(false), 8000);
    }
    const verifyError = params.get('verify_error');
    if (verifyError) {
      setVerifyErrorBanner(verifyError);
      const emailParam = params.get('email');
      if (emailParam) {
        setResendEmail(emailParam);
      }
      window.history.replaceState({}, '', window.location.pathname);
    }
    const token = params.get('reset_token');
    if (token) {
      setResetToken(token);
      window.history.replaceState({}, '', window.location.pathname);
    }
    return () => {
      if (resendTimerRef.current) clearTimeout(resendTimerRef.current);
    };
  }, []);

  const handleResendVerification = async () => {
    if (!resendEmail) return;
    setResendLoading(true);
    try {
      const res = await fetch('/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resendEmail, firstName: '', lang: language }),
      });
      if (res.ok) {
        setResendSent(true);
        setShowResendInput(false);
        resendTimerRef.current = setTimeout(() => {
          setVerifyErrorBanner(null);
          setResendSent(false);
        }, 8000);
      }
    } catch (_e) {
    } finally {
      setResendLoading(false);
    }
  };

  // Admin panel — independent of loading state, has its own auth check
  if (showAdmin) {
    return <AdminPanel onExit={() => { setShowAdmin(false); window.history.replaceState({}, '', '/'); }} />;
  }

  // Legal pages — no auth required
  if (pathname === '/privacy') return <PrivacyPolicy />;
  if (pathname === '/terms') return <TermsOfUse />;
  if (pathname === '/risks') return <RiskDisclosure />;
  if (pathname === '/referral-terms') return <ReferralTerms />;

  // While auth is loading on /dashboard — show full-screen spinner (no landing flash)
  if (loading && showDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="w-10 h-10 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show dashboard if authenticated and URL is /dashboard
  if (!loading && isAuthenticated && showDashboard) {
    return <Dashboard onBackToHome={goToHome} />;
  }

  // Show main landing page (StickyNavigation is always mounted so referral modal
  // can open reliably regardless of auth loading state)
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-colors duration-300 overflow-x-hidden w-full max-w-full">
      {(isPasswordRecovery) && <NewPasswordModal />}
      {resetToken && <NewPasswordModal resetToken={resetToken} onClose={() => setResetToken(null)} />}
      {/* StickyNavigation always rendered — needed for referral link auto-open */}
      <StickyNavigation onGoToDashboard={goToDashboard} autoOpenRegister={autoOpenRegister} onAutoOpenHandled={() => setAutoOpenRegister(false)} pageReady={!loading} />
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (<>
      {verifiedBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 max-w-[90vw]">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="font-medium text-sm">{verifiedTexts[language] || verifiedTexts.ru}</span>
          <button onClick={() => setVerifiedBanner(false)} className="ml-2 text-white/80 hover:text-white">×</button>
        </div>
      )}
      {verifyErrorBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-red-600 text-white rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-4 max-w-[92vw] w-full sm:max-w-md">
          <div className="px-4 py-3 flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">
                {resendSent
                  ? (language === 'ru' ? 'Письмо отправлено! Проверьте почту.' : language === 'de' ? 'E-Mail gesendet!' : language === 'es' ? '¡Correo enviado!' : language === 'tr' ? 'E-posta gönderildi!' : 'Email sent! Check your inbox.')
                  : (verifyErrorTexts[verifyErrorBanner] || verifyErrorTexts.invalid)[language] || (verifyErrorTexts[verifyErrorBanner] || verifyErrorTexts.invalid).ru
                }
              </p>
              {!resendSent && (verifyErrorBanner === 'invalid' || verifyErrorBanner === 'expired') && (
                <div className="mt-2">
                  {!showResendInput ? (
                    <button
                      onClick={() => setShowResendInput(true)}
                      className="text-xs underline text-white/90 hover:text-white"
                    >
                      {language === 'ru' ? 'Запросить новую ссылку' : language === 'de' ? 'Neuen Link anfordern' : language === 'es' ? 'Solicitar nuevo enlace' : language === 'tr' ? 'Yeni bağlantı iste' : 'Request a new link'}
                    </button>
                  ) : (
                    <div className="flex gap-2 mt-1">
                      <input
                        type="email"
                        value={resendEmail}
                        onChange={(e) => setResendEmail(e.target.value)}
                        placeholder="Email"
                        className="flex-1 px-2 py-1 text-xs rounded text-gray-900 min-w-0"
                      />
                      <button
                        onClick={handleResendVerification}
                        disabled={resendLoading || !resendEmail}
                        className="px-3 py-1 text-xs bg-white text-red-600 rounded font-semibold hover:bg-red-50 disabled:opacity-50 whitespace-nowrap"
                      >
                        {resendLoading ? '...' : (language === 'ru' ? 'Отправить' : 'Send')}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button onClick={() => { setVerifyErrorBanner(null); setShowResendInput(false); setResendSent(false); }} className="text-white/80 hover:text-white flex-shrink-0">×</button>
          </div>
        </div>
      )}
      <HeroSection key={language} onGoToDashboard={goToDashboard} />
      <UniqueFeaturesSection />
      <OpportunitiesSection />
      <PartnershipSection />
      <InvestmentsSection />
      <AboutSection />
      <AdvantagesSection />
      <RoadmapSection />
      <ChefNetAppSection />
      <FAQSection />
      <CTABanner />
      <TeamSection />
      <Footer />
      </>)}
    </div>
  );
}

export default function App() {
  return (
    <SiteContentProvider>
      <LanguageProvider>
        <AuthProvider>
          <ThemeProvider defaultTheme="light" storageKey="chefnet-theme">
            <AppContent />
          </ThemeProvider>
        </AuthProvider>
      </LanguageProvider>
    </SiteContentProvider>
  );
}
