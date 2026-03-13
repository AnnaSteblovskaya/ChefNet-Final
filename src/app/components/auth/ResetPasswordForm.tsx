import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResetPasswordFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function ResetPasswordForm({ onSuccess, onBack }: ResetPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword, authError } = useAuth();
  const { language } = useLanguage();

  const texts = {
    en: {
      title: 'Reset Password',
      email: 'Email',
      resetButton: 'Send Reset Link',
      backToLogin: 'Back to Login',
      errorFill: 'Please enter your email',
      errorNotFound: 'Could not send reset email',
      successMessage: 'A password reset link has been sent to your email. Please check your inbox.',
    },
    ru: {
      title: 'Сброс пароля',
      email: 'Email',
      resetButton: 'Отправить ссылку для сброса',
      backToLogin: 'Назад к входу',
      errorFill: 'Введите ваш email',
      errorNotFound: 'Не удалось отправить письмо для сброса',
      successMessage: 'Ссылка для сброса пароля отправлена на вашу почту. Проверьте входящие.',
    },
    de: {
      title: 'Passwort zurücksetzen',
      email: 'E-Mail',
      resetButton: 'Link zum Zurücksetzen senden',
      backToLogin: 'Zurück zur Anmeldung',
      errorFill: 'Bitte geben Sie Ihre E-Mail ein',
      errorNotFound: 'Reset-E-Mail konnte nicht gesendet werden',
      successMessage: 'Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail gesendet.',
    },
    es: {
      title: 'Restablecer contraseña',
      email: 'Email',
      resetButton: 'Enviar enlace de restablecimiento',
      backToLogin: 'Volver al inicio de sesión',
      errorFill: 'Por favor ingrese su email',
      errorNotFound: 'No se pudo enviar el correo de restablecimiento',
      successMessage: 'Se ha enviado un enlace para restablecer su contraseña a su correo electrónico.',
    },
    tr: {
      title: 'Şifre sıfırlama',
      email: 'E-mail',
      resetButton: 'Sıfırlama bağlantısı gönder',
      backToLogin: 'Girişe geri dön',
      errorFill: 'Lütfen e-postanızı girin',
      errorNotFound: 'Sıfırlama e-postası gönderilemedi',
      successMessage: 'Şifre sıfırlama bağlantısı e-postanıza gönderildi.',
    },
  };

  const t = texts[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError(t.errorFill);
      return;
    }

    setLoading(true);
    const result = await resetPassword(email, '', language);
    setLoading(false);

    if (result) {
      setSuccess(t.successMessage);
      setTimeout(() => {
        onSuccess();
      }, 4000);
    } else {
      setError(authError || t.errorNotFound);
    }
  };

  return (
    <div className="space-y-4">
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

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-[#D4522A] to-[#E8744F] text-white rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '...' : t.resetButton}
        </motion.button>

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
