import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { ChefHat, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { translations } from '@/locales/translations';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import AuthModal from '@/app/components/auth/AuthModal';
import MobileMenu from '@/app/components/MobileMenu';

interface StickyNavigationProps {
  onGoToDashboard: () => void;
  autoOpenRegister?: boolean;
  onAutoOpenHandled?: () => void;
  pageReady?: boolean;
}

export default function StickyNavigation({ onGoToDashboard, autoOpenRegister, onAutoOpenHandled, pageReady }: StickyNavigationProps) {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const t = translations[language];
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Use Intersection Observer to detect when hero section is out of view
  // Re-runs when pageReady changes so it can find the hero section after loading
  useEffect(() => {
    if (!pageReady) return;
    const heroSection = document.getElementById('home');
    if (!heroSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When hero section is NOT intersecting (out of view), show sticky nav
        const shouldShow = !entry.isIntersecting;
        console.log('👁️ Hero visible:', entry.isIntersecting, '| Sticky nav visible:', shouldShow);
        setIsVisible(shouldShow);
      },
      {
        threshold: 0.1, // Trigger when 10% of hero is visible
        rootMargin: '-80px 0px 0px 0px' // Offset by nav height
      }
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect();
    };
  }, [pageReady]);

  // Auto-open register modal when coming from referral link.
  // We check a one-time flag in localStorage so the modal opens reliably
  // even if the prop arrives after auth loading completes.
  useEffect(() => {
    if (!isAuthenticated) {
      const shouldOpen = autoOpenRegister || localStorage.getItem('chefnet_referral_open_modal') === '1';
      if (shouldOpen) {
        localStorage.removeItem('chefnet_referral_open_modal');
        setAuthMode('register');
        setAuthModalOpen(true);
        onAutoOpenHandled?.();
      }
    }
  }, [autoOpenRegister, isAuthenticated]);

  const handleLoginClick = () => {
    if (isAuthenticated) {
      onGoToDashboard();
    } else {
      setAuthMode('login');
      setAuthModalOpen(true);
    }
  };

  const handleSignInClick = () => {
    if (isAuthenticated) {
      onGoToDashboard();
    } else {
      setAuthMode('register');
      setAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    setTimeout(() => {
      onGoToDashboard();
    }, 300);
  };

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-lg ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{
          backgroundColor: 'rgba(233, 222, 214, 0.85)' // Полупрозрачный #e9ded6
        }}
      >
        <div className="px-8 py-4">
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 flex-shrink-0"
            >
              <ChefHat className="w-5 h-5 text-[#FF6B35]" />
              <div className="whitespace-nowrap">
                <span className="font-semibold text-[15px] text-[#2C1810] tracking-tight">
                  ChefNet{' '}
                </span>
                <span className="font-semibold text-[15px] tracking-tight" style={{ color: '#D93F29' }}>
                  Invest
                </span>
              </div>
            </button>

            {/* Navigation Links - Centered */}
            <div className="hidden lg:block flex-1">
              <nav className="flex items-center justify-center gap-6">
                <button
                  onClick={() => document.getElementById('unique-features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap"
                >
                  {t.features}
                </button>
                <button
                  onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap"
                >
                  {t.aboutUs}
                </button>
                <button
                  onClick={() => document.getElementById('partnership')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap"
                >
                  {t.forPartners}
                </button>
                <button
                  onClick={() => document.getElementById('investments')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap"
                >
                  {t.stagesOfDevelopment}
                </button>
                <button
                  onClick={() => document.getElementById('advantages')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap"
                >
                  {t.whyChefNet}
                </button>
                <button
                  onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap"
                >
                  {t.roadmap}
                </button>
                <button
                  onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap"
                >
                  {t.faq}
                </button>
                <button
                  onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap"
                >
                  {t.team}
                </button>
                <button
                  onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap"
                >
                  {t.contacts}
                </button>
              </nav>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="mr-4">
                <LanguageSwitcher variant="dark" />
              </div>
              
              {/* Hamburger Menu Button - Mobile Only */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                className="lg:hidden p-2 text-[#6B4423] hover:bg-[#6B4423]/10 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Desktop Action Buttons */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:block px-3 py-1.5 text-[#D93F29] rounded-full text-[12px] font-medium hover:bg-[#D93F29]/10 transition-all whitespace-nowrap"
                style={{ borderColor: '#D93F29', borderWidth: '1px', borderStyle: 'solid' }}
                onClick={handleLoginClick}
              >
                {t.logIn}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:block px-3 py-1.5 text-[#D93F29] rounded-full text-[12px] font-medium hover:bg-[#D93F29]/10 transition-all whitespace-nowrap"
                style={{ borderColor: '#D93F29', borderWidth: '1px', borderStyle: 'solid' }}
                onClick={handleSignInClick}
              >
                {t.signIn}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onGoToDashboard={onGoToDashboard}
        isAuthenticated={isAuthenticated}
        handleLoginClick={handleLoginClick}
        handleSignInClick={handleSignInClick}
      />
    </>
  );
}