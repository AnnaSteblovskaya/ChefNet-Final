import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'login' | 'register';
  onAuthSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, mode = 'login', onAuthSuccess }: AuthModalProps) {
  const [currentMode, setMode] = useState<'login' | 'register' | 'reset'>(mode);
  const { language } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLInputElement>(null);

  // Sync currentMode with mode prop when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(mode);
    }
  }, [isOpen, mode]);

  // Focus management and escape key handling
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const titles = {
    en: { login: 'Log in', register: 'Registration', reset: 'Reset Password' },
    ru: { login: 'Войти', register: 'Регистрация', reset: 'Восстановление пароля' },
    de: { login: 'Anmelden', register: 'Registrieren', reset: 'Passwort wiederherstellen' },
    es: { login: 'Acceder', register: 'Registrarse', reset: 'Restablecer contraseña' },
    tr: { login: 'Giriş yap', register: 'Kayıt ol', reset: 'Parolayı sıfırla' },
  };

  const descriptions = {
    en: { login: 'Enter your credentials to access your partner dashboard' },
    ru: { login: 'Введите свои учетные данные для доступа к панели управления партнера' },
    de: { login: 'Geben Sie Ihre Zugangsdaten ein, um auf Ihr Partner-Dashboard zuzugreifen' },
    es: { login: 'Introduce tus credenciales para acceder a tu panel de socio' },
    tr: { login: 'Ortak panelinize erişmek için kimlik bilgilerinizi girin' },
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
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[var(--color-surface)] rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleKeyDown}
              role="dialog"
              aria-modal="true"
              aria-labelledby="auth-modal-title"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="p-8">
                <h2 id="auth-modal-title" className="text-3xl font-bold text-[var(--color-text)] mb-2">
                  {titles[language][currentMode]}
                </h2>

                {currentMode === 'login' && (
                  <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                    {descriptions[language][currentMode]}
                  </p>
                )}

                {currentMode === 'login' ? (
                  <LoginForm onSuccess={onAuthSuccess || onClose} onSwitchToRegister={() => setMode('register')} onSwitchToReset={() => setMode('reset')} firstFocusRef={firstFocusableRef} />
                ) : currentMode === 'register' ? (
                  <RegisterForm onSuccess={onAuthSuccess || onClose} onSwitchToLogin={() => setMode('login')} firstFocusRef={firstFocusableRef} />
                ) : (
                  <ResetPasswordForm onSuccess={() => setMode('login')} onBack={() => setMode('login')} firstFocusRef={firstFocusableRef} />
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}