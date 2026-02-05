import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { language } = useLanguage();

  const texts = {
    en: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      registerButton: 'Create account',
      haveAccount: 'Already have an account?',
      logIn: 'Log in',
      errorFill: 'Please fill in all fields',
      errorPassword: 'Passwords do not match',
      errorPasswordLength: 'Password must be at least 6 characters',
      errorExists: 'This email is already registered',
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
      errorPasswordLength: 'Пароль должен содержать минимум 6 символов',
      errorExists: 'Этот email уже зарегистрирован',
    },
    de: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      password: 'Passwort',
      confirmPassword: 'Passwort bestätigen',
      registerButton: 'Konto erstellen',
      haveAccount: 'Haben Sie bereits ein Konto?',
      logIn: 'Anmelden',
      errorFill: 'Bitte füllen Sie alle Felder aus',
      errorPassword: 'Passwörter stimmen nicht überein',
      errorPasswordLength: 'Passwort muss mindestens 6 Zeichen lang sein',
      errorExists: 'Diese E-Mail ist bereits registriert',
    },
    es: {
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Email',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      registerButton: 'Crear cuenta',
      haveAccount: '¿Ya tienes cuenta?',
      logIn: 'Iniciar sesión',
      errorFill: 'Por favor complete todos los campos',
      errorPassword: 'Las contraseñas no coinciden',
      errorPasswordLength: 'La contraseña debe tener al menos 6 caracteres',
      errorExists: 'Este email ya está registrado',
    },
    tr: {
      firstName: 'Ad',
      lastName: 'Soyad',
      email: 'E-posta',
      password: 'Şifre',
      confirmPassword: 'Şifreyi onayla',
      registerButton: 'Hesap oluştur',
      haveAccount: 'Zaten hesabınız var mı?',
      logIn: 'Giriş yap',
      errorFill: 'Lütfen tüm alanları doldurun',
      errorPassword: 'Şifreler eşleşmiyor',
      errorPasswordLength: 'Şifre en az 6 karakter olmalıdır',
      errorExists: 'Bu e-posta zaten kayıtlı',
    },
  };

  const t = texts[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError(t.errorFill);
      return;
    }

    if (password.length < 6) {
      setError(t.errorPasswordLength);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.errorPassword);
      return;
    }

    setLoading(true);
    const success = await register(email, password, firstName, lastName);
    setLoading(false);

    if (success) {
      onSuccess();
    } else {
      setError(t.errorExists);
    }
  };

  return (
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

      {/* Name fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.firstName}
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm"
              placeholder="John"
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm"
            placeholder="••••••••"
          />
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
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm"
            placeholder="••••••••"
          />
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
    </form>
  );
}
