import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  resetToken?: string;
  onClose?: () => void;
}

export default function NewPasswordModal({ resetToken, onClose }: Props) {
  const { updatePassword, clearPasswordRecovery, authError } = useAuth();
  const { language } = useLanguage();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const texts: Record<string, Record<string, string>> = {
    ru: {
      title: 'Новый пароль',
      subtitle: 'Введите новый пароль для вашего аккаунта',
      password: 'Новый пароль',
      confirm: 'Подтвердите пароль',
      submit: 'Сохранить пароль',
      cancel: 'Отмена',
      successMsg: 'Пароль успешно изменён! Теперь вы можете войти.',
      errorMismatch: 'Пароли не совпадают',
      errorShort: 'Пароль должен содержать минимум 8 символов',
    },
    en: {
      title: 'New Password',
      subtitle: 'Enter a new password for your account',
      password: 'New password',
      confirm: 'Confirm password',
      submit: 'Save password',
      cancel: 'Cancel',
      successMsg: 'Password changed successfully! You can now log in.',
      errorMismatch: 'Passwords do not match',
      errorShort: 'Password must be at least 8 characters',
    },
    de: {
      title: 'Neues Passwort',
      subtitle: 'Geben Sie ein neues Passwort für Ihr Konto ein',
      password: 'Neues Passwort',
      confirm: 'Passwort bestätigen',
      submit: 'Passwort speichern',
      cancel: 'Abbrechen',
      successMsg: 'Passwort erfolgreich geändert! Sie können sich jetzt anmelden.',
      errorMismatch: 'Passwörter stimmen nicht überein',
      errorShort: 'Das Passwort muss mindestens 8 Zeichen lang sein',
    },
    es: {
      title: 'Nueva contraseña',
      subtitle: 'Ingresa una nueva contraseña para tu cuenta',
      password: 'Nueva contraseña',
      confirm: 'Confirmar contraseña',
      submit: 'Guardar contraseña',
      cancel: 'Cancelar',
      successMsg: '¡Contraseña cambiada con éxito! Ahora puedes iniciar sesión.',
      errorMismatch: 'Las contraseñas no coinciden',
      errorShort: 'La contraseña debe tener al menos 8 caracteres',
    },
    tr: {
      title: 'Yeni Şifre',
      subtitle: 'Hesabınız için yeni bir şifre girin',
      password: 'Yeni şifre',
      confirm: 'Şifreyi onayla',
      submit: 'Şifreyi kaydet',
      cancel: 'İptal',
      successMsg: 'Şifre başarıyla değiştirildi! Artık giriş yapabilirsiniz.',
      errorMismatch: 'Şifreler eşleşmiyor',
      errorShort: 'Şifre en az 8 karakter olmalıdır',
    },
  };

  const t = texts[language] || texts.ru;

  const handleClose = () => {
    if (resetToken) {
      onClose?.();
    } else {
      clearPasswordRecovery();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError(t.errorShort);
      return;
    }
    if (password !== confirm) {
      setError(t.errorMismatch);
      return;
    }

    setLoading(true);

    let ok = false;

    if (resetToken) {
      try {
        const response = await fetch('/api/reset-password-confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: resetToken, newPassword: password }),
        });
        const data = await response.json();
        if (response.ok) {
          ok = true;
        } else {
          const serverErr = data.error || '';
          if (serverErr.toLowerCase().includes('unavailable') || serverErr.toLowerCase().includes('temporarily')) {
            const unavailableMsg: Record<string, string> = {
              ru: 'Сервис временно недоступен. Восстановите проект Supabase и попробуйте снова.',
              en: 'Service temporarily unavailable. Please try again later.',
              de: 'Dienst vorübergehend nicht verfügbar. Bitte versuchen Sie es später erneut.',
              es: 'Servicio temporalmente no disponible. Inténtelo más tarde.',
              tr: 'Hizmet geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.',
            };
            setError(unavailableMsg[language] || unavailableMsg.ru);
          } else {
            setError(serverErr || 'Error');
          }
        }
      } catch {
        setError(language === 'en' ? 'Network error. Please try again.' : 'Ошибка сети. Пожалуйста, попробуйте снова.');
      }
    } else {
      ok = await updatePassword(password);
      if (!ok) {
        setError(authError || 'Error');
      }
    }

    setLoading(false);

    if (ok) {
      setSuccess(true);
      setTimeout(() => {
        if (resetToken) {
          window.history.replaceState({}, '', window.location.pathname);
          onClose?.();
        } else {
          clearPasswordRecovery();
        }
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{t.title}</h2>
            <p className="text-gray-500 text-sm">{t.subtitle}</p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-xl flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{t.successMsg}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.password}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.confirm}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all"
                >
                  {t.cancel}
                </button>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="flex-1 py-3 bg-gradient-to-r from-[#D4522A] to-[#E8744F] text-white rounded-xl font-medium shadow-lg shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? '...' : t.submit}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
