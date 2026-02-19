import { motion } from 'motion/react';
import { useState, useMemo } from 'react';
import { ChefHat, Menu } from 'lucide-react';
import heroBg from 'figma:asset/ea3684a8e6ad5b9f30bbc761f606c383abcbe400.png';
import mobileBg from 'figma:asset/f6e6a7c1827ce38e56117c96836c20e4665523fd.png';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { translations } from '@/locales/translations';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import AuthModal from '@/app/components/auth/AuthModal';
import MobileMenu from '@/app/components/MobileMenu';

interface HeroSectionProps {
  onGoToDashboard: () => void;
}

export default function HeroSection({ onGoToDashboard }: HeroSectionProps) {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const t = useMemo(() => translations[language], [language]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <section id="home" className="relative bg-background px-4 pb-8 pt-6 sm:px-6 md:px-8">
      {/* Desktop Version */}
      <div 
        className="hidden md:block relative overflow-hidden"
        style={{
          height: 'auto',
          minHeight: '620px',
          borderRadius: '32px',
          background: '#5A2F23'
        }}
      >
        {/* Navigation - Inside hero section */}
        <div className="relative z-10 px-8 py-4">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 flex-shrink-0"
            >
              <ChefHat className="w-5 h-5 text-[#FF6B35] drop-shadow-[0_2px_8px_rgba(255,107,53,0.5)]" />
              <div className="whitespace-nowrap">
                <span className="font-semibold text-[15px] text-white tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]">
                  ChefNet{' '}
                </span>
                <span className="font-semibold text-[15px] tracking-tight drop-shadow-[0_2px_6px_rgba(255,107,53,0.4)]" style={{ color: '#FF6B35' }}>
                  Invest
                </span>
              </div>
            </button>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 flex-1 justify-center">
              <button
                onClick={() => document.getElementById('unique-features')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
              >
                {t.features}
              </button>
              <button
                onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
              >
                {t.aboutUs}
              </button>
              <button
                onClick={() => document.getElementById('partnership')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
              >
                {t.forPartners}
              </button>
              <button
                onClick={() => document.getElementById('investments')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
              >
                {t.stagesOfDevelopment}
              </button>
              <button
                onClick={() => document.getElementById('advantages')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
              >
                {t.whyChefNet}
              </button>
              <button
                onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
              >
                {t.roadmap}
              </button>
              <button
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
              >
                {t.faq}
              </button>
              <button
                onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
              >
                {t.team}
              </button>
              <button
                onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
              >
                {t.contacts}
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="mr-4">
                <LanguageSwitcher />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-3.5 bg-white/10 text-white rounded-full text-[12px] font-medium hover:bg-white/15 transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)]"
                style={{ borderColor: 'rgba(255, 107, 53, 0.5)', borderWidth: '1px', borderStyle: 'solid' }}
                onClick={handleLoginClick}
              >
                {t.logIn}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-3.5 bg-white/10 text-white rounded-full text-[12px] font-medium hover:bg-white/15 transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)]"
                style={{ borderColor: 'rgba(255, 107, 53, 0.5)', borderWidth: '1px', borderStyle: 'solid' }}
                onClick={handleSignInClick}
              >
                {t.signIn}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Text Content - Left side */}
        <div className="relative z-10 flex-1 flex items-center justify-start px-8 pt-20 pb-8">
          <div className="w-full max-w-[40%] pr-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white font-bold text-[42px] leading-tight mb-5"
              style={{ 
                letterSpacing: '-0.02em',
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              <span 
                className="inline-block relative"
                style={{ position: 'relative' }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: '-10px',
                    right: '-10px',
                    top: '-6px',
                    bottom: '-6px',
                    background: 'linear-gradient(135deg, #FF8B5A 0%, #FF7645 50%, #FF6B35 100%)',
                    borderRadius: '18px',
                    zIndex: -1,
                    boxShadow: '0 0 40px 15px rgba(255, 107, 53, 0.4), 0 0 80px 30px rgba(255, 107, 53, 0.2)',
                    filter: 'blur(2px)'
                  }}
                />
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {language === 'ru' ? 'Интеллект,' : 
                   language === 'en' ? 'Intelligence' :
                   language === 'de' ? 'Intelligenz,' :
                   language === 'es' ? 'Inteligencia' :
                   'Seçimi'}
                </span>
              </span>
              <br />
              {language === 'ru' ? 'превращающий' :
               language === 'en' ? 'that turns' :
               language === 'de' ? 'die Auswahl' :
               language === 'es' ? 'que convierte' :
               'değere çeviren'}
              <br />
              {language === 'ru' ? 'выбор в ценность.' :
               language === 'en' ? 'choice into value.' :
               language === 'de' ? 'in Wert verwandelt.' :
               language === 'es' ? 'la elección en valor.' :
               'zekâ.'}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white text-[14px] leading-relaxed mb-6"
            >
              <p className="font-bold mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{t.heroSubtitle}</p>
              
              <p className="font-normal opacity-90 mb-4">
                {language === 'ru' ? (
                  <>
                    которая изучает ваш ритм, запоминает ваш вкус и сохраняет вам<br />
                    время и деньги каждый день.
                  </>
                ) : (
                  t.heroDescription
                )}
              </p>
              
              <p className="font-normal opacity-90 mb-1">{t.heroBenefit1}</p>
              <p className="font-normal opacity-90 mb-1">{t.heroBenefit2}</p>
              <p className="font-normal opacity-90 mb-4">{t.heroBenefit3}</p>

              <p className="font-normal opacity-90">
                {t.heroCta}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Food Image positioned on the right - Desktop */}
        <img 
          src={heroBg} 
          alt="Food"
          className="absolute top-0 bottom-0 h-full w-full object-cover z-0"
          style={{ 
            right: '-12%',
            objectPosition: 'right center',
            opacity: 1,
            filter: 'brightness(1.1) contrast(1.2) saturate(1.15)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.3) 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.3) 85%, transparent 100%)'
          }}
        />
      </div>

      {/* Mobile Version */}
      <div 
        className="md:hidden overflow-hidden relative"
        style={{
          borderRadius: '32px',
          minHeight: '780px'
        }}
      >
        {/* Background Image for top section */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${mobileBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            filter: 'brightness(1.0) contrast(1.1) saturate(1.1)'
          }}
        />

        {/* Top section with text */}
        <div className="relative z-10">
          {/* Navigation */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              {/* Logo */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-1 flex-shrink-0"
              >
                <ChefHat className="w-4 h-4 text-[#FF6B35] drop-shadow-[0_2px_8px_rgba(255,107,53,0.5)]" />
                <div className="whitespace-nowrap">
                  <span className="font-semibold text-[13px] text-white tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]">
                    ChefNet{' '}
                  </span>
                  <span className="font-semibold text-[13px] tracking-tight drop-shadow-[0_2px_6px_rgba(255,107,53,0.4)]" style={{ color: '#FF6B35' }}>
                    Invest
                  </span>
                </div>
              </button>

              {/* Right Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <LanguageSwitcher />
                
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="relative z-10 px-4 py-8 pb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white font-bold text-[28px] sm:text-[36px] leading-tight mb-3"
              style={{ 
                letterSpacing: '-0.02em',
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              <span 
                className="inline-block relative"
                style={{ position: 'relative' }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: '-10px',
                    right: '-10px',
                    top: '-6px',
                    bottom: '-6px',
                    background: 'linear-gradient(135deg, #FF8B5A 0%, #FF7645 50%, #FF6B35 100%)',
                    borderRadius: '18px',
                    zIndex: -1,
                    boxShadow: '0 0 40px 15px rgba(255, 107, 53, 0.4), 0 0 80px 30px rgba(255, 107, 53, 0.2)',
                    filter: 'blur(2px)'
                  }}
                />
                <span style={{ position: 'relative', zIndex: 1 }}>{t.heroTitle3}</span>
              </span>
              {' '}
              {t.heroTitle4}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white text-[13px] leading-snug mb-4"
            >
              <div className="mb-2">
                <p className="font-bold mb-0.5" style={{ fontFamily: 'Nunito, sans-serif' }}>{t.heroSubtitle}</p>
                <p className="font-normal opacity-90">
                  {t.heroDescription}
                </p>
              </div>
              
              <div className="mb-2 font-normal opacity-90">
                <p className="mb-0">{t.heroBenefit1}</p>
                <p className="mb-0">{t.heroBenefit2}</p>
                <p className="mb-0">{t.heroBenefit3}</p>
              </div>

              <p className="font-normal opacity-90">
                {t.heroCta}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full max-w-xs px-6 py-3 bg-white text-[#FF6B35] rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl"
              onClick={handleSignInClick}
            >
              {t.logIn}
            </motion.button>
          </div>
        </div>
      </div>

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
        onLoginClick={handleLoginClick}
        onSignInClick={handleSignInClick}
      />
    </section>
  );
}