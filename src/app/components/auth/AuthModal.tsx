import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'login' | 'register';
  onAuthSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, mode = 'login', onAuthSuccess }: AuthModalProps) {
  const [currentMode, setMode] = useState<'login' | 'register'>(mode);
  const { language } = useLanguage();

  const titles = {
    en: { login: 'Welcome back', register: 'Create account' },
    ru: { login: 'С возвращением', register: 'Создать аккаунт' },
    de: { login: 'Willkommen zurück', register: 'Konto erstellen' },
    es: { login: 'Bienvenido de nuevo', register: 'Crear cuenta' },
    tr: { login: 'Tekrar hoş geldiniz', register: 'Hesap oluştur' },
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[var(--color-surface)] rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-[var(--color-text)] mb-8">
                  {titles[language][currentMode]}
                </h2>

                {currentMode === 'login' ? (
                  <LoginForm onSuccess={onAuthSuccess || onClose} onSwitchToRegister={() => setMode('register')} />
                ) : (
                  <RegisterForm onSuccess={onAuthSuccess || onClose} onSwitchToLogin={() => setMode('login')} />
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}