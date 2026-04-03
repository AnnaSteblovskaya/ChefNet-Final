import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const languages = [
  { code: 'ru' as Language, name: 'Русский', flag: 'RU' },
  { code: 'en' as Language, name: 'English', flag: 'EN' },
  { code: 'de' as Language, name: 'Deutsch', flag: 'DE' },
  { code: 'tr' as Language, name: 'Türkçe', flag: 'TR' },
  { code: 'es' as Language, name: 'Español', flag: 'ES' },
];

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
}

export default function LanguageSwitcher({ variant = 'light' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Update dropdown position when opened or on scroll/resize
  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 8,
          left: rect.right - 200 // 200px is min-w of dropdown
        });
      }
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const buttonClass = variant === 'light' 
    ? 'text-white hover:text-white/80'
    : 'text-gray-700 hover:text-gray-900';

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex items-center gap-2 transition-colors ${buttonClass}`}
      >
        <Globe className="w-4 h-4" />
        <span className="text-[15px] font-medium">{currentLanguage.flag}</span>
      </button>

      {isOpen && createPortal(
        <AnimatePresence>
          <motion.div
            ref={dropdownRef}
            role="listbox"
            aria-label="Available languages"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed bg-white rounded-2xl shadow-xl overflow-hidden min-w-[200px]"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              zIndex: 99999
            }}
          >
            <div className="py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  role="option"
                  aria-selected={language === lang.code}
                  className={`w-full px-5 py-3 flex items-center gap-3 hover:bg-background transition-colors ${
                    language === lang.code ? 'bg-background' : ''
                  }`}
                >
                  <span className="text-[#8B4537] text-sm font-medium w-8">{lang.flag}</span>
                  <span className={`text-[15px] ${
                    language === lang.code ? 'font-medium text-[#5A2F23]' : 'font-normal text-[#8B4537]'
                  }`}>
                    {lang.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}