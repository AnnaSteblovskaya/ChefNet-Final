import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Lock, Mail, Save, Eye, EyeOff, Bell, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

interface ProfileTabProps {
  setActiveTab: (tab: string) => void;
}

export default function ProfileTab({ setActiveTab }: ProfileTabProps) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  
  // KYC Status and Profile Data
  const [kycStatus, setKycStatus] = useState<'pending' | 'verified'>('pending');
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    dateOfBirth: '',
    nationality: '',
    zipCode: '',
  });

  // Load KYC status and profile data from localStorage
  useEffect(() => {
    const status = localStorage.getItem('chefnet_kyc_status');
    if (status === 'verified') {
      setKycStatus('verified');
      // Load profile data from KYC data
      const kycData = localStorage.getItem('chefnet_kyc_data');
      const savedProfileData = localStorage.getItem('chefnet_profile_data');
      
      if (savedProfileData) {
        setProfileData(JSON.parse(savedProfileData));
      } else if (kycData) {
        // If profile data doesn't exist, use KYC data
        const kyc = JSON.parse(kycData);
        setProfileData({
          fullName: kyc.fullName || '',
          email: user?.email || '',
          phone: '',
          country: kyc.country || '',
          address: kyc.address || '',
          dateOfBirth: kyc.dateOfBirth || '',
          nationality: kyc.nationality || '',
          zipCode: kyc.zipCode || '',
        });
      }
    } else {
      setKycStatus('pending');
      // Use basic user data for pending status
      setProfileData({
        fullName: user ? `${user.firstName} ${user.lastName}` : '',
        email: user?.email || '',
        phone: '',
        country: '',
        address: '',
        dateOfBirth: '',
        nationality: '',
        zipCode: '',
      });
    }
  }, [user]);

  const translations = {
    ru: {
      profile: 'Профиль',
      yourProfile: 'Ваш профиль',
      pending: 'Ожидание',
      verified: 'Подтверждено',
      name: 'Фамилия Имя',
      email: 'Email',
      changePassword: 'Смена пароля',
      currentPassword: 'Текущий пароль',
      newPassword: 'Новый пароль',
      confirmPassword: 'Подтверждение пароля',
      changePasswordBtn: 'Сменить пароль',
      passwordChanged: 'Пароль успешно изменен!',
      passwordMismatch: 'Пароли не совпадают',
      fillAllFields: 'Заполните все поля',
    },
    en: {
      profile: 'Profile',
      yourProfile: 'Your Profile',
      pending: 'Pending',
      verified: 'Verified',
      name: 'Last Name First Name',
      email: 'Email',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      changePasswordBtn: 'Change Password',
      passwordChanged: 'Password changed successfully!',
      passwordMismatch: 'Passwords do not match',
      fillAllFields: 'Please fill in all fields',
    },
    de: {
      profile: 'Profil',
      yourProfile: 'Ihr Profil',
      pending: 'Ausstehend',
      verified: 'Verifiziert',
      name: 'Nachname Vorname',
      email: 'E-Mail',
      changePassword: 'Passwort ändern',
      currentPassword: 'Aktuelles Passwort',
      newPassword: 'Neues Passwort',
      confirmPassword: 'Passwort bestätigen',
      changePasswordBtn: 'Passwort ändern',
      passwordChanged: 'Passwort erfolgreich geändert!',
      passwordMismatch: 'Passwörter stimmen nicht überein',
      fillAllFields: 'Bitte füllen Sie alle Felder aus',
    },
    es: {
      profile: 'Perfil',
      yourProfile: 'Tu perfil',
      pending: 'Pendiente',
      verified: 'Verificado',
      name: 'Apellido Nombre',
      email: 'Correo electrónico',
      changePassword: 'Cambiar contraseña',
      currentPassword: 'Contraseña actual',
      newPassword: 'Nueva contraseña',
      confirmPassword: 'Confirmar contraseña',
      changePasswordBtn: 'Cambiar contraseña',
      passwordChanged: '¡Contraseña cambiada con éxito!',
      passwordMismatch: 'Las contraseñas no coinciden',
      fillAllFields: 'Por favor complete todos los campos',
    },
    tr: {
      profile: 'Profil',
      yourProfile: 'Profiliniz',
      pending: 'Beklemede',
      verified: 'Doğrulandı',
      name: 'Soyadı Adı',
      email: 'E-posta',
      changePassword: 'Şifre Değiştir',
      currentPassword: 'Mevcut Şifre',
      newPassword: 'Yeni Şifre',
      confirmPassword: 'Şifreyi Onayla',
      changePasswordBtn: 'Şifreyi Değiştir',
      passwordChanged: 'Şifre başarıyla değiştirildi!',
      passwordMismatch: 'Şifreler eşleşmiyor',
      fillAllFields: 'Lütfen tüm alanları doldurun',
    },
  };

  const t = translations[language];

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage(t.fillAllFields);
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage(t.passwordMismatch);
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Here you would typically make an API call to change the password
    // For now, we'll just show a success message
    setMessage(t.passwordChanged);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 lg:mb-8 flex items-center justify-between">
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-text)]">
            {t.profile}
          </h2>
          
          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher variant="dark" />
            <div className="relative cursor-pointer" onClick={() => setActiveTab('notifications')}>
              <Bell className="w-6 h-6 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-xs rounded-full flex items-center justify-center font-medium">
                2
              </span>
            </div>
          </div>
        </div>

        {/* Your Profile Section */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[var(--color-border)] mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg lg:text-xl font-bold text-[var(--color-text)]">{t.yourProfile}</h3>
            {kycStatus === 'pending' ? (
              <span className="px-3 py-1 bg-orange-50 text-[#FF6B35] text-xs font-medium rounded-full border border-orange-200 flex items-center gap-1.5">
                {t.pending}
              </span>
            ) : (
              <span className="px-3 py-1 bg-green-50 text-[#22C55E] text-xs font-medium rounded-full border border-green-200 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                {t.verified}
              </span>
            )}
          </div>

          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                {t.name}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
                <input
                  type="text"
                  value={profileData.fullName}
                  disabled
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-[var(--color-border)] rounded-xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all disabled:opacity-60"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                {t.email}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-[var(--color-border)] rounded-xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all disabled:opacity-60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[var(--color-border)]">
          <h3 className="text-lg lg:text-xl font-bold text-[var(--color-text)] mb-6">{t.changePassword}</h3>

          <form onSubmit={handleChangePassword} className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                {t.currentPassword}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white border border-[var(--color-border)] rounded-xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                {t.newPassword}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white border border-[var(--color-border)] rounded-xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                {t.confirmPassword}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white border border-[var(--color-border)] rounded-xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg text-sm font-medium ${
                  message === t.passwordChanged
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {message}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D93F29] to-[#FF6B35] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {t.changePasswordBtn}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}