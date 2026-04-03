import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, AlertCircle, Eye, EyeOff, MailWarning } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
  onSwitchToReset: () => void;
  firstFocusRef?: React.RefObject<HTMLInputElement>;
}

export default function LoginForm({ onSuccess, onSwitchToRegister, onSwitchToReset, firstFocusRef }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptedOffer, setAcceptedOffer] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const { login, authError } = useAuth();
  const { language } = useLanguage();

  const texts = {
    en: {
      email: 'Email',
      password: 'Password',
      loginButton: 'Log in',
      noAccount: "Don't have an account?",
      signUp: 'Sign up',
      errorInvalid: 'Invalid email or password',
      errorFill: 'Please fill in all fields',
      emailNotConfirmed: 'Please confirm your email first. Check your inbox for the confirmation link.',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      offerPrefix: 'I have reviewed the',
      publicOffer: 'public offer',
      googleSignIn: 'Sign in with Google',
    },
    ru: {
      email: 'Email',
      password: 'Пароль',
      loginButton: 'Войти',
      noAccount: 'Нет аккаунта?',
      signUp: 'Регистрация',
      errorInvalid: 'Неверный email или пароль',
      errorFill: 'Заполните все поля',
      emailNotConfirmed: 'Сначала подтвердите ваш email. Проверьте входящие письма для перехода по ссылке подтверждения.',
      rememberMe: 'Запомнить меня',
      forgotPassword: 'Забыли пароль?',
      offerPrefix: 'С',
      publicOffer: 'публичной офертой',
      offerSuffix: 'ознакомлен',
      googleSignIn: 'Войти через Google',
    },
    de: {
      email: 'E-Mail',
      password: 'Passwort',
      loginButton: 'Anmelden',
      noAccount: 'Noch kein Konto?',
      signUp: 'Registrieren',
      errorInvalid: 'Ungültige E-Mail oder Passwort',
      errorFill: 'Bitte füllen Sie alle Felder aus',
      emailNotConfirmed: 'Bitte bestätigen Sie zuerst Ihre E-Mail. Überprüfen Sie Ihren Posteingang.',
      rememberMe: 'Merken Sie sich mich',
      forgotPassword: 'Passwort vergessen?',
      offerPrefix: 'Ich habe das',
      publicOffer: 'öffentliche Angebot',
      offerSuffix: 'geprüft',
      googleSignIn: 'Mit Google anmelden',
    },
    es: {
      email: 'Email',
      password: 'Contraseña',
      loginButton: 'Iniciar sesión',
      noAccount: '¿No tienes cuenta?',
      signUp: 'Registrarse',
      errorInvalid: 'Email o contraseña inválidos',
      errorFill: 'Por favor complete todos los campos',
      emailNotConfirmed: 'Primero confirma tu email. Revisa tu bandeja de entrada.',
      rememberMe: 'Recuérdame',
      forgotPassword: '¿Olvidaste tu contraseña?',
      offerPrefix: 'He revisado la',
      publicOffer: 'oferta pública',
      offerSuffix: '',
      googleSignIn: 'Iniciar sesión con Google',
    },
    tr: {
      email: 'E-mail',
      password: 'Şifre',
      loginButton: 'Giriş yap',
      noAccount: 'Hesabınız yok mu?',
      signUp: 'Kayıt ol',
      errorInvalid: 'Geçersiz e-posta veya şifre',
      errorFill: 'Lütfen tüm alanları doldurun',
      emailNotConfirmed: 'Lütfen önce e-postanızı onaylayın. Gelen kutunuzu kontrol edin.',
      rememberMe: 'Beni hatırlayın',
      forgotPassword: 'Şifrenizi mi unuttunuz?',
      offerPrefix: '',
      publicOffer: 'Halka açık teklifi',
      offerSuffix: 'inceledim',
      googleSignIn: 'Google ile giriş yap',
    },
  };

  const t = texts[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(t.errorFill);
      return;
    }

    if (!acceptedOffer) {
      setError(
        language === 'ru'
          ? 'Необходимо согласиться с публичной офертой'
          : language === 'de'
          ? 'Sie müssen das öffentliche Angebot akzeptieren'
          : language === 'es'
          ? 'Debe aceptar la oferta pública'
          : language === 'tr'
          ? 'Kamu teklifini kabul etmelisiniz'
          : 'You must accept the public offer'
      );
      return;
    }

    setLoading(true);
    const success = await login(email, password, rememberMe);
    setLoading(false);

    if (success) {
      setEmailNotConfirmed(false);
      onSuccess();
    } else {
      const errorMsg = authError || '';
      if (errorMsg === 'email_not_verified' || errorMsg.toLowerCase().includes('email not confirmed') || errorMsg.toLowerCase().includes('not confirmed')) {
        setEmailNotConfirmed(true);
        setError(t.emailNotConfirmed);
      } else {
        setEmailNotConfirmed(false);
        setError(authError || t.errorInvalid);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`px-4 py-3 rounded-xl flex items-start gap-2 ${
            emailNotConfirmed
              ? 'bg-amber-50 border border-amber-200 text-amber-800'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
          role="alert"
          aria-live="assertive"
        >
          {emailNotConfirmed ? (
            <MailWarning className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.email}
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            ref={firstFocusRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all"
            placeholder="you@example.com"
            aria-required="true"
            aria-invalid={error ? true : false}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.password}
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all"
            placeholder="••••••••"
            aria-required="true"
            aria-invalid={error ? true : false}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      {/* Remember Me and Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-[#D4522A] focus:ring-[#D4522A] border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600 cursor-pointer">
            {t.rememberMe}
          </label>
        </div>
        <button
          type="button"
          onClick={onSwitchToReset}
          className="text-sm text-[#D4522A] hover:text-[#EF6852] font-medium transition-colors"
        >
          {t.forgotPassword}
        </button>
      </div>

      {/* Public Offer Checkbox */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="public-offer"
          checked={acceptedOffer}
          onChange={(e) => setAcceptedOffer(e.target.checked)}
          className="h-4 w-4 text-[#D4522A] focus:ring-[#D4522A] border-gray-300 rounded cursor-pointer mt-0.5 flex-shrink-0"
        />
        <label htmlFor="public-offer" className="text-sm text-gray-600 cursor-pointer leading-tight">
          {language === 'ru' ? (
            <>
              {t.offerPrefix}{' '}
              <a href="/terms" className="text-[#D4522A] hover:text-[#EF6852] underline font-medium">
                {t.publicOffer}
              </a>{' '}
              {t.offerSuffix}
            </>
          ) : language === 'tr' ? (
            <>
              <a href="/terms" className="text-[#D4522A] hover:text-[#EF6852] underline font-medium">
                {t.publicOffer}
              </a>{' '}
              {t.offerSuffix}
            </>
          ) : (
            <>
              {t.offerPrefix}{' '}
              <a href="/terms" className="text-[#D4522A] hover:text-[#EF6852] underline font-medium">
                {t.publicOffer}
              </a>{' '}
              {t.offerSuffix}
            </>
          )}
        </label>
      </div>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full py-3 bg-gradient-to-r from-[#D4522A] to-[#E8744F] text-white rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        aria-busy={loading}
      >
        {loading ? '...' : t.loginButton}
      </motion.button>

      {/* Switch to register */}
      <div className="text-center pt-4">
        <span className="text-gray-600 text-sm">{t.noAccount} </span>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-[#D4522A] font-medium text-sm hover:underline"
        >
          {t.signUp}
        </button>
      </div>

      {/* Google Sign In - commented out for local auth */}
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">или</span>
        </div>
      </div>

      <button
        type="button"
        onClick={loginWithGoogle}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {t.googleSignIn}
      </button> */}

      {/* Register link */}
    </form>
  );
}