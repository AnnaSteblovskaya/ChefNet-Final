import { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import NewPasswordModal from '@/app/components/auth/NewPasswordModal';
import HeroSection from '@/app/components/sections/HeroSection';
import StickyNavigation from '@/app/components/StickyNavigation';

const AboutSection = lazy(() => import('@/app/components/sections/AboutSection'));
const UniqueFeaturesSection = lazy(() => import('@/app/components/sections/UniqueFeaturesSection'));
const OpportunitiesSection = lazy(() => import('@/app/components/sections/OpportunitiesSection'));
const PartnershipSection = lazy(() => import('@/app/components/sections/PartnershipSection'));
const InvestmentsSection = lazy(() => import('@/app/components/sections/InvestmentsSection'));
const AdvantagesSection = lazy(() => import('@/app/components/sections/AdvantagesSection'));
const RoadmapSection = lazy(() => import('@/app/components/sections/RoadmapSection'));
const ChefNetAppSection = lazy(() => import('@/app/components/sections/ChefNetAppSection'));
const FAQSection = lazy(() => import('@/app/components/sections/FAQSection'));
const CTABanner = lazy(() => import('@/app/components/sections/CTABanner'));
const TeamSection = lazy(() => import('@/app/components/sections/TeamSection'));
const Footer = lazy(() => import('@/app/components/sections/Footer'));
const Dashboard = lazy(() => import('@/app/components/dashboard/Dashboard'));

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
  const [showDashboard, setShowDashboard] = useState(false);
  const [verifiedBanner, setVerifiedBanner] = useState(false);
  const [verifyErrorBanner, setVerifyErrorBanner] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('verified') === 'true') {
      setVerifiedBanner(true);
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setVerifiedBanner(false), 8000);
    }
    const verifyError = params.get('verify_error');
    if (verifyError) {
      setVerifyErrorBanner(verifyError);
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setVerifyErrorBanner(null), 10000);
    }
    const token = params.get('reset_token');
    if (token) {
      setResetToken(token);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated && showDashboard) {
    return (
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
          <div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <Dashboard onBackToHome={() => setShowDashboard(false)} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-colors duration-300 overflow-x-hidden w-full max-w-full">
      {(isPasswordRecovery) && <NewPasswordModal />}
      {resetToken && <NewPasswordModal resetToken={resetToken} onClose={() => setResetToken(null)} />}
      {verifiedBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 max-w-[90vw]">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="font-medium text-sm">{verifiedTexts[language] || verifiedTexts.ru}</span>
          <button onClick={() => setVerifiedBanner(false)} className="ml-2 text-white/80 hover:text-white">×</button>
        </div>
      )}
      {verifyErrorBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-red-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 max-w-[90vw]">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          <span className="font-medium text-sm">{(verifyErrorTexts[verifyErrorBanner] || verifyErrorTexts.invalid)[language] || (verifyErrorTexts[verifyErrorBanner] || verifyErrorTexts.invalid).ru}</span>
          <button onClick={() => setVerifyErrorBanner(null)} className="ml-2 text-white/80 hover:text-white">×</button>
        </div>
      )}
      <StickyNavigation onGoToDashboard={() => setShowDashboard(true)} />
      <HeroSection key={language} onGoToDashboard={() => setShowDashboard(true)} />
      <Suspense fallback={null}>
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
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="chefnet-theme">
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
