import { motion } from 'motion/react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '@/app/components/ThemeProvider';
import { useState } from 'react';

const navItems = [
  { id: 'home', label: 'О' },
  { id: 'advantages', label: 'Преимущества' },
  { id: 'partnership', label: 'Партнерство' },
  { id: 'roadmap', label: 'Дорожная карта' },
  { id: 'investments', label: 'Инвестиции' },
  { id: 'faq', label: 'Часто задаваемые вопросы' },
];

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-[var(--color-surface)]/95 backdrop-blur-sm border-b border-[var(--color-border)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-10 h-10 bg-gradient-to-br from-[#9a3412] to-[#D93F29] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
              style={{ willChange: 'transform' }}
            >
              C
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-lg">Chef<span className="text-[#D93F29]">Net</span></span>
              <span className="text-xs text-[#D93F29] font-semibold">Invest</span>
            </div>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-[21px] left 0 right-0 h-0.5 bg-[#D93F29]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">Английский</span>
              </motion.button>
              
              {showLangMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 bg-[var(--color-surface)] rounded-lg shadow-lg border border-[var(--color-border)] p-2 min-w-[150px]"
                >
                  {['Английский', 'Русский', 'Немецкий', 'Французский', 'Испанский', 'Türkçe'].map((lang) => (
                    <button
                      key={lang}
                      className="w-full text-left px-3 py-2 rounded hover:bg-[var(--color-surface-hover)] text-sm"
                      onClick={() => setShowLangMenu(false)}
                    >
                      {lang}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.button>

            {/* CTA Buttons */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-4 py-2 rounded-lg bg-gradient-to-r from-[#D93F29] to-[#EF6852] text-white font-semibold hover:shadow-lg transition-all"
            >
              Авторизоваться
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-4 py-2 rounded-lg border-2 border-[#D93F29] text-[#D93F29] font-semibold hover:bg-[#D93F29] hover:text-white transition-all"
            >
              Зарегистрироваться
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}