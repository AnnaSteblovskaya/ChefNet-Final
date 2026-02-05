import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChefHat, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { translations } from '@/locales/translations';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import AuthModal from '@/app/components/auth/AuthModal';
import MobileMenu from '@/app/components/MobileMenu';

interface StickyNavigationProps {
  onGoToDashboard: () => void;
}

export default function StickyNavigation({ onGoToDashboard }: StickyNavigationProps) {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const t = translations[language];
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'backdrop-blur-lg bg-[#EAE7E3]/95 shadow-lg' : 'bg-transparent pointer-events-none invisible'
        }`}
        initial={{ y: -200, opacity: 0 }}
        animate={{ 
          y: isScrolled ? 0 : -200,
          opacity: isScrolled ? 1 : 0
        }}
        transition={{ 
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        <div className={`px-8 py-4 ${isScrolled ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <div className={`flex items-center gap-2 transition-opacity duration-300 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}>
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

            {/* Navigation Links */}
            <div className="hidden lg:block relative flex-1">
              <nav className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin" style={{ scrollbarWidth: 'thin', scrollbarColor: '#FB7F43 transparent' }}>
                <button
                  onClick={() => document.getElementById('unique-features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[10px] xl:text-[10.5px] font-medium transition-all whitespace-nowrap px-0.5 flex-shrink-0"
                >
                  {t.features}
                </button>
                <button
                  onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[10px] xl:text-[10.5px] font-medium transition-all whitespace-nowrap px-0.5 flex-shrink-0"
                >
                  {t.aboutUs}
                </button>
                <button
                  onClick={() => document.getElementById('partnership')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[10px] xl:text-[10.5px] font-medium transition-all whitespace-nowrap px-0.5 flex-shrink-0"
                >
                  {t.referralProgramme}
                </button>
                <button
                  onClick={() => document.getElementById('investments')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[10px] xl:text-[10.5px] font-medium transition-all whitespace-nowrap px-0.5 flex-shrink-0"
                >
                  {t.stagesOfDevelopment}
                </button>
                <button
                  onClick={() => document.getElementById('advantages')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[10px] xl:text-[10.5px] font-medium transition-all whitespace-nowrap px-0.5 flex-shrink-0"
                >
                  {t.whyChefNet}
                </button>
                <button
                  onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[10px] xl:text-[10.5px] font-medium transition-all whitespace-nowrap px-0.5 flex-shrink-0"
                >
                  {t.roadmap}
                </button>
                <button
                  onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[10px] xl:text-[10.5px] font-medium transition-all whitespace-nowrap px-0.5 flex-shrink-0"
                >
                  {t.faq}
                </button>
                <button
                  onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[10px] xl:text-[10.5px] font-medium transition-all whitespace-nowrap px-0.5 flex-shrink-0"
                >
                  {t.team}
                </button>
                <button
                  onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#3E3E3E] hover:text-[#FF6B35] text-[10px] xl:text-[10.5px] font-medium transition-all whitespace-nowrap px-0.5 flex-shrink-0"
                >
                  {t.contacts}
                </button>
              </nav>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <LanguageSwitcher variant="dark" />
              
              {/* Hamburger Menu Button - Mobile Only */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#6B4423] hover:bg-[#6B4423]/10 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Desktop Action Buttons */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:block px-3 py-1.5 bg-white text-[#D93F29] rounded-full text-[11px] font-medium transition-all whitespace-nowrap shadow-md hover:shadow-lg border"
                style={{ borderColor: '#D93F29' }}
                onClick={handleLoginClick}
              >
                {t.logIn}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:block px-3 py-1.5 text-[#D93F29] rounded-full text-[11px] font-medium hover:bg-[#D93F29]/10 transition-all whitespace-nowrap bg-white/80 backdrop-blur-sm"
                style={{ borderColor: '#D93F29', borderWidth: '1px', borderStyle: 'solid' }}
                onClick={handleSignInClick}
              >
                {t.signIn}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

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