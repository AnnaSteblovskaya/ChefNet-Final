import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, AlertCircle, CheckCircle, Eye, EyeOff, MailCheck, RefreshCw, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
  firstFocusRef?: React.RefObject<HTMLInputElement>;
}

export default function RegisterForm({ onSuccess, onSwitchToLogin, firstFocusRef }: RegisterFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referrerName, setReferrerName] = useState<string | null>(null);
  const { register, resendConfirmationEmail, authError } = useAuth();
  const { language } = useLanguage();

  useEffect(() => {
    const storedCode = localStorage.getItem('chefnet_referral_code');
    if (storedCode && /^CHEF-[A-Z0-9]{6}$/i.test(storedCode)) {
      const code = storedCode.toUpperCase();
      setReferralCode(code);
      // Fetch the referrer's display name
      fetch(`/api/referrer-name?code=${encodeURIComponent(code)}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (data?.name) setReferrerName(data.name);
        })
        .catch(() => {});
    }
  }, []);

  const texts = {
    en: {
      firstName: 'Name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      registerButton: 'Create account',
      haveAccount: 'Already have an account?',
      logIn: 'Log in',
      errorFill: 'Please fill in all fields',
      errorPassword: 'Passwords do not match',
      errorPasswordLength: 'Password must be at least 8 characters and contain letters and numbers',
      errorExists: 'This email is already registered',
      errorTerms: 'You must agree to the terms and conditions',
      agreeText: 'I agree to',
      termsOfService: 'Terms & Conditions',
      and: ' / ',
      privacyPolicy: 'Privacy Policy',
      googleSignIn: 'Sign in with Google',
      confirmTitle: 'Check your email',
      confirmMessage: 'We sent a confirmation link to',
      confirmHint: 'Click the link in the email to activate your account. After confirmation, you can log in.',
      resendButton: 'Resend email',
      resendSuccess: 'Email sent!',
      backToLogin: 'Go to login',
      checkSpam: 'Check your spam folder if you don\'t see the email.',
    },
    ru: {
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      registerButton: 'Создать аккаунт',
      haveAccount: 'Уже есть аккаунт?',
      logIn: 'Войти',
      errorFill: 'Заполните все поля',
      errorPassword: 'Пароли не совпадают',
      errorPasswordLength: 'Пароль должен содержать минимум 8 символов, буквы и цифры',
      errorExists: 'Этот email уже зарегистрирован',
      errorTerms: 'Вы должны согласиться с условиями',
      agreeText: 'Я согласен с',
      termsOfService: 'Условиями использования',
      and: 'и',
      privacyPolicy: 'Политикой конфиденциальности',
      googleSignIn: 'Войти через Google',
      confirmTitle: 'Проверьте вашу почту',
      confirmMessage: 'Мы отправили ссылку для подтверждения на',
      confirmHint: 'Перейдите по ссылке в письме, чтобы активировать аккаунт. После подтверждения вы сможете войти.',
      resendButton: 'Отправить повторно',
      resendSuccess: 'Письмо отправлено!',
      backToLogin: 'Перейти к входу',
      checkSpam: 'Проверьте папку «Спам», если не видите письмо.',
    },
    de: {
      firstName: 'Name',
      lastName: 'Nachname',
      email: 'E-Mail',
      password: 'Passwort',
      confirmPassword: 'Passwort bestätigen',
      registerButton: 'Konto erstellen',
      haveAccount: 'Haben Sie bereits ein Konto?',
      logIn: 'Anmelden',
      errorFill: 'Bitte füllen Sie alle Felder aus',
      errorPassword: 'Passwörter stimmen nicht überein',
      errorPasswordLength: 'Passwort muss mindestens 8 Zeichen lang sein und Buchstaben und Zahlen enthalten',
      errorExists: 'Diese E-Mail ist bereits registriert',
      errorTerms: 'Sie müssen den Bedingungen zustimmen',
      agreeText: 'Ich stimme den',
      termsOfService: 'Nutzungsbedingungen',
      and: ' / ',
      privacyPolicy: 'Datenschutzbestimmungen zu',
      googleSignIn: 'Mit Google anmelden',
      confirmTitle: 'Prüfen Sie Ihre E-Mail',
      confirmMessage: 'Wir haben einen Bestätigungslink gesendet an',
      confirmHint: 'Klicken Sie auf den Link in der E-Mail, um Ihr Konto zu aktivieren. Nach der Bestätigung können Sie sich anmelden.',
      resendButton: 'E-Mail erneut senden',
      resendSuccess: 'E-Mail gesendet!',
      backToLogin: 'Zur Anmeldung',
      checkSpam: 'Überprüfen Sie Ihren Spam-Ordner, falls Sie die E-Mail nicht sehen.',
    },
    es: {
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Email',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      registerButton: 'Crear cuenta',
      haveAccount: '¿Ya tienes una cuenta?',
      logIn: 'Acceder',
      errorFill: 'Por favor complete todos los campos',
      errorPassword: 'Las contraseñas no coinciden',
      errorPasswordLength: 'La contraseña debe tener al menos 8 caracteres y contener letras y números',
      errorExists: 'Este email ya está registrado',
      errorTerms: 'Debe aceptar los términos y condiciones',
      agreeText: 'Acepto los',
      termsOfService: 'Términos de Servicio',
      and: 'y la',
      privacyPolicy: 'Política de Privacidad',
      googleSignIn: 'Iniciar sesión con Google',
      confirmTitle: 'Revisa tu correo',
      confirmMessage: 'Enviamos un enlace de confirmación a',
      confirmHint: 'Haz clic en el enlace del correo para activar tu cuenta. Después de la confirmación, podrás iniciar sesión.',
      resendButton: 'Reenviar correo',
      resendSuccess: 'Correo enviado!',
      backToLogin: 'Ir al inicio de sesión',
      checkSpam: 'Revisa tu carpeta de spam si no ves el correo.',
    },
    tr: {
      firstName: 'Ad',
      lastName: 'Soyadı',
      email: 'E-mail',
      password: 'Şifre',
      confirmPassword: 'Şifreyi doğrulayın',
      registerButton: 'Hesap oluştur',
      haveAccount: 'Zaten bir hesabınız var mı?',
      logIn: 'Giriş yap',
      errorFill: 'Lütfen tüm alanları doldurun',
      errorPassword: 'Şifreler eşleşmiyor',
      errorPasswordLength: 'Şifre en az 8 karakter olmalı ve harf ve rakam içermelidir',
      errorExists: 'Bu e-posta zaten kayıtlı',
      errorTerms: 'Şartları ve koşulları kabul etmelisiniz',
      agreeText: '',
      termsOfService: 'Kullanım Şartları\'nı',
      and: 've',
      privacyPolicy: 'Gizlilik Politikası\'nı kabul ediyorum',
      googleSignIn: 'Google ile giriş yap',
      confirmTitle: 'E-postanızı kontrol edin',
      confirmMessage: 'Onay bağlantısı gönderildi:',
      confirmHint: 'Hesabınızı etkinleştirmek için e-postadaki bağlantıya tıklayın. Onaydan sonra giriş yapabilirsiniz.',
      resendButton: 'Tekrar gönder',
      resendSuccess: 'E-posta gönderildi!',
      backToLogin: 'Girişe git',
      checkSpam: 'E-postayı görmüyorsanız spam klasörünüzü kontrol edin.',
    },
  };

  const t = texts[language];

  const handleResend = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    const success = await resendConfirmationEmail(email, language);
    setResendLoading(false);
    if (success) {
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError(t.errorFill);
      return;
    }

    const hasLetter = /[a-zA-Zа-яА-Я]/.test(password);
    const hasDigit = /\d/.test(password);
    if (password.length < 8 || !hasLetter || !hasDigit) {
      setError(t.errorPasswordLength);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.errorPassword);
      return;
    }

    if (!agreedToTerms) {
      setError(t.errorTerms);
      return;
    }

    setLoading(true);
    const result = await register(email, password, firstName, lastName, language, referralCode || undefined);
    setLoading(false);

    if (result === 'success') {
      onSuccess();
    } else if (result === 'confirmation_needed') {
      setConfirmationSent(true);
    } else {
      setError(authError || t.errorExists);
    }
  };

  if (confirmationSent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-4"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <MailCheck className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t.confirmTitle}</h3>
        <p className="text-sm text-gray-600 mb-1">{t.confirmMessage}</p>
        <p className="text-sm font-semibold text-[#D4522A] mb-4">{email}</p>
        <p className="text-sm text-gray-500 mb-6">{t.confirmHint}</p>
        <p className="text-xs text-gray-400 mb-6">{t.checkSpam}</p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading}
            className="w-full py-3 border-2 border-[#D4522A] text-[#D4522A] rounded-xl font-medium hover:bg-orange-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${resendLoading ? 'animate-spin' : ''}`} />
            {resendSuccess ? t.resendSuccess : t.resendButton}
          </button>

          <button
            type="button"
            onClick={onSwitchToLogin}
            className="w-full py-3 bg-gradient-to-r from-[#D4522A] to-[#E8744F] text-white rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
          >
            {t.backToLogin}
          </button>
        </div>
      </motion.div>
    );
  }

  const referralBannerText: Record<string, string> = {
    ru: 'Вы регистрируетесь по приглашению',
    en: 'You are registering via invitation from',
    de: 'Sie registrieren sich auf Einladung von',
    es: 'Te estás registrando por invitación de',
    tr: 'Davet eden kişi:',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Referral banner */}
      {referralCode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 border border-orange-200 px-4 py-3 rounded-xl flex items-center gap-3"
        >
          <UserPlus className="w-5 h-5 text-[#D4522A] flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500">{referralBannerText[language] || referralBannerText.en}</p>
            <p className="text-sm font-bold text-[#D4522A]">
              {referrerName || referralCode}
            </p>
          </div>
        </motion.div>
      )}

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      {/* Name fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.firstName}
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={firstFocusRef}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm"
              placeholder="John"
              aria-required="true"
              aria-invalid={error ? true : false}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.lastName}
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm"
            placeholder="Doe"
            aria-required="true"
            aria-invalid={error ? true : false}
          />
        </div>
      </div>

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
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm"
            placeholder="••••••••"
            aria-required="true"
            aria-invalid={error ? true : false}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
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
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm"
            placeholder="••••••••"
            aria-required="true"
            aria-invalid={error ? true : false}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="w-4 h-4 text-[#D4522A] bg-gray-100 border-gray-300 rounded focus:ring-[#D4522A] focus:ring-2"
          aria-required="true"
        />
        <label className="ml-2 text-sm text-gray-700">
          {t.agreeText} <a href="/terms" className="text-[#D4522A]">{t.termsOfService}</a> {t.and} <a href="/privacy" className="text-[#D4522A]">{t.privacyPolicy}</a>
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
        {loading ? '...' : t.registerButton}
      </motion.button>

      {/* Switch to login */}
      <div className="text-center pt-2">
        <span className="text-gray-600 text-sm">{t.haveAccount} </span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-[#D4522A] font-medium text-sm hover:underline"
        >
          {t.logIn}
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

      {/* Login link */}
    </form>
  );
}