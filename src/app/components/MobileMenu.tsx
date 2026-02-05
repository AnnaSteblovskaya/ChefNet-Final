import { motion, AnimatePresence } from 'motion/react';
import { X, ChefHat } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
  onSignInClick?: () => void;
  onGoToDashboard?: () => void;
  isAuthenticated?: boolean;
  handleLoginClick?: () => void;
  handleSignInClick?: () => void;
}

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  onLoginClick, 
  onSignInClick,
  handleLoginClick,
  handleSignInClick 
}: MobileMenuProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const loginClick = onLoginClick || handleLoginClick || (() => {});
  const signInClick = onSignInClick || handleSignInClick || (() => {});

  const menuItems = [
    { id: 'unique-features', label: t.features },
    { id: 'opportunities', label: t.aboutUs },
    { id: 'partnership', label: t.forPartners },
    { id: 'investments', label: t.stagesOfDevelopment },
    { id: 'advantages', label: t.whyChefNet },
    { id: 'roadmap', label: t.roadmap },
    { id: 'faq', label: t.faq },
    { id: 'team', label: t.team },
    { id: 'footer', label: t.contacts },
  ];

  const handleMenuItemClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#FF6B35]" />
                <span className="font-bold text-lg">
                  ChefNet <span className="text-[#FF6B35]">Invest</span>
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleMenuItemClick(item.id)}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-[#3E3E3E] font-medium"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3 px-4">
                <button
                  onClick={() => {
                    loginClick();
                    onClose();
                  }}
                  className="w-full py-3 px-4 bg-[#FF6B35] text-white rounded-full font-medium hover:bg-[#FF8C42] transition-colors"
                >
                  {t.logIn}
                </button>
                <button
                  onClick={() => {
                    signInClick();
                    onClose();
                  }}
                  className="w-full py-3 px-4 border-2 border-[#FF6B35] text-[#FF6B35] rounded-full font-medium hover:bg-[#FF6B35] hover:text-white transition-colors"
                >
                  {t.signIn}
                </button>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}