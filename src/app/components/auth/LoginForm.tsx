import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
    },
    ru: {
      email: 'Email',
      password: 'Пароль',
      loginButton: 'Войти',
      noAccount: 'Нет аккаунта?',
      signUp: 'Зарегистрироваться',
      errorInvalid: 'Неверный email или пароль',
      errorFill: 'Заполните все поля',
    },
    de: {
      email: 'E-Mail',
      password: 'Passwort',
      loginButton: 'Anmelden',
      noAccount: 'Noch kein Konto?',
      signUp: 'Registrieren',
      errorInvalid: 'Ungültige E-Mail oder Passwort',
      errorFill: 'Bitte füllen Sie alle Felder aus',
    },
    es: {
      email: 'Email',
      password: 'Contraseña',
      loginButton: 'Iniciar sesión',
      noAccount: '¿No tienes cuenta?',
      signUp: 'Registrarse',
      errorInvalid: 'Email o contraseña inválidos',
      errorFill: 'Por favor complete todos los campos',
    },
    tr: {
      email: 'E-posta',
      password: 'Şifre',
      loginButton: 'Giriş yap',
      noAccount: 'Hesabınız yok mu?',
      signUp: 'Kayıt ol',
      errorInvalid: 'Geçersiz e-posta veya şifre',
      errorFill: 'Lütfen tüm alanları doldurun',
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

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      onSuccess();
    } else {
      setError(t.errorInvalid);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.email}
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all"
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
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all"
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
    </form>
  );
}
