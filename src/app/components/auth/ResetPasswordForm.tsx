import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResetPasswordFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function ResetPasswordForm({ onSuccess, onBack }: ResetPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { language } = useLanguage();

  const texts = {
    en: {
      title: 'Reset Password',
      email: 'Email',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      resetButton: 'Reset Password',
      backToLogin: 'Back to Login',
      errorFill: 'Please fill in all fields',
      errorPassword: 'Passwords do not match',
      errorPasswordLength: 'Password must be at least 6 characters',
      errorNotFound: 'Email not found',
      successMessage: 'Password reset successfully! You can now log in.',
    },
    ru: {
      title: 'Сброс пароля',
      email: 'Email',
      newPassword: 'Новый пароль',
      confirmPassword: 'Подтвердите пароль',
      resetButton: 'Сбросить пароль',
      backToLogin: 'Назад к входу',
      errorFill: 'Заполните все поля',
      errorPassword: 'Пароли не совпадают',
      errorPasswordLength: 'Пароль должен содержать минимум 6 символов',
      errorNotFound: 'Email не найден',
      successMessage: 'Пароль успешно сброшен! Теперь вы можете войти.',
    },
    de: {
      title: 'Passwort zurücksetzen',
      email: 'E-Mail',
      newPassword: 'Neues Passwort',
      confirmPassword: 'Passwort bestätigen',
      resetButton: 'Passwort zurücksetzen',
      backToLogin: 'Zurück zur Anmeldung',
      errorFill: 'Bitte füllen Sie alle Felder aus',
      errorPassword: 'Passwörter stimmen nicht überein',
      errorPasswordLength: 'Passwort muss mindestens 6 Zeichen lang sein',
      errorNotFound: 'E-Mail nicht gefunden',
      successMessage: 'Passwort erfolgreich zurückgesetzt! Sie können sich jetzt anmelden.',
    },
    es: {
      title: 'Restablecer contraseña',
      email: 'Email',
      newPassword: 'Nueva contraseña',
      confirmPassword: 'Confirmar contraseña',
      resetButton: 'Restablecer contraseña',
      backToLogin: 'Volver al inicio de sesión',
      errorFill: 'Por favor complete todos los campos',
      errorPassword: 'Las contraseñas no coinciden',
      errorPasswordLength: 'La contraseña debe tener al menos 6 caracteres',
      errorNotFound: 'Email no encontrado',
      successMessage: '¡Contraseña restablecida correctamente! Ya puedes iniciar sesión.',
    },
    tr: {
      title: 'Şifre sıfırlama',
      email: 'E-mail',
      newPassword: 'Yeni şifre',
      confirmPassword: 'Şifreyi doğrulayın',
      resetButton: 'Şifreyi sıfırla',
      backToLogin: 'Girişe geri dön',
      errorFill: 'Lütfen tüm alanları doldurun',
      errorPassword: 'Şifreler eşleşmiyor',
      errorPasswordLength: 'Şifre en az 6 karakter olmalıdır',
      errorNotFound: 'E-posta bulunamadı',
      successMessage: 'Şifre başarıyla sıfırlandı! Artık giriş yapabilirsiniz.',
    },
  };

  const t = texts[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !newPassword || !confirmPassword) {
      setError(t.errorFill);
      return;
    }

    if (newPassword.length < 6) {
      setError(t.errorPasswordLength);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t.errorPassword);
      return;
    }

    setLoading(true);
    const result = await resetPassword(email, newPassword);
    setLoading(false);

    if (result) {
      setSuccess(t.successMessage);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } else {
      setError(t.errorNotFound);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error message */}
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

        {/* Success message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{success}</span>
          </motion.div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.email}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.newPassword}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.confirmPassword}
          </label>
          <div className="relative">
            <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-[#D4522A] to-[#E8744F] text-white rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '...' : t.resetButton}
        </motion.button>

        {/* Back to login */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onBack}
            className="text-[#D4522A] font-medium text-sm hover:underline"
          >
            {t.backToLogin}
          </button>
        </div>
      </form>
    </div>
  );
}