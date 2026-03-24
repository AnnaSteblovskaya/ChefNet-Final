import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, LayoutDashboard, TrendingUp, FileText, Users, ShieldCheck, MessageCircleQuestion, User, LogOut, Bell, Menu, X, Newspaper } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import DashboardTab from './DashboardTab';
import InvestmentsTab from './InvestmentsTab';
import DocumentsTab from './DocumentsTab';
import ReferralTab from './ReferralTab';
import KYCTab from './KYCTab';
import NotificationsTab from './NotificationsTab';
import ProfileTab from './ProfileTab';
import ChartVariantsDemo from './ChartVariantsDemo';
import QATab from './QATab';
import NewsTab from './NewsTab';

interface DashboardProps {
  onBackToHome: () => void;
}

export default function Dashboard({ onBackToHome }: DashboardProps) {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showChartDemo, setShowChartDemo] = useState(false);
  const mainContentRef = useRef<HTMLElement>(null);

  // Clear any legacy fake referral data that may have been stored in localStorage
  useEffect(() => {
    localStorage.removeItem('chefnet_referrals_data');
    localStorage.removeItem('chefnet_referrals_version');
  }, []);

  // Scroll to top when activeTab changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  // Предотвращаем жест "назад" браузера при горизонтальной прокрутке
  useEffect(() => {
    const preventSwipeBack = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const scrollContainer = target.closest('.mobile-scrollbar');
      
      if (scrollContainer) {
        e.stopPropagation();
      }
    };

    document.addEventListener('touchstart', preventSwipeBack, { passive: true });
    return () => document.removeEventListener('touchstart', preventSwipeBack);
  }, []);

  const handleLogout = () => {
    logout();
    onBackToHome();
  };

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard },
    { id: 'investments', icon: TrendingUp, label: t.myInvestments },
    { id: 'referral', icon: Users, label: t.referralProgram },
    { id: 'documents', icon: FileText, label: t.documents },
    { id: 'kyc', icon: ShieldCheck, label: t.kycVerification },
    { id: 'notifications', icon: Bell, label: t.notifications },
    { id: 'news', icon: Newspaper, label: t.news },
    { id: 'qa', icon: MessageCircleQuestion, label: t.faq },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'investments':
        return <InvestmentsTab setActiveTab={setActiveTab} />;
      case 'documents':
        return <DocumentsTab setActiveTab={setActiveTab} />;
      case 'referral':
        return <ReferralTab setActiveTab={setActiveTab} />;
      case 'kyc':
        return <KYCTab setActiveTab={setActiveTab} />;
      case 'notifications':
        return <NotificationsTab setActiveTab={setActiveTab} />;
      case 'news':
        return <NewsTab />;
      case 'qa':
        return <QATab />;
      case 'profile':
        return <ProfileTab setActiveTab={setActiveTab} />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F0EB] overflow-x-hidden w-full max-w-full">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex w-72 bg-[#F5F0EB] border-r border-[var(--color-border)] flex-col shadow-sm flex-shrink-0">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6"
        >
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ChefHat className="w-8 h-8 text-[#FF6B35]" />
            <div>
              <span className="font-bold text-xl text-[var(--color-text)]">ChefNet</span>{' '}
              <span className="text-xl text-[#FF6B35] font-bold">Invest</span>
            </div>
          </button>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-[#FF7A59] to-[#EB5632] text-white shadow-lg shadow-[#FF6B35]/30'
                  : 'text-[var(--color-text)] hover:bg-[#FFF5F0] hover:text-[#FF6B35]'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-[var(--color-border)]">
          {/* User Profile */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setActiveTab('profile')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text)] hover:bg-[#FFF5F0] transition-all cursor-pointer"
          >
            {/* Avatar with Initials */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF7A59] to-[#EB5632] flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-white text-sm font-bold">
                {user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : 'JD'}
              </span>
            </div>
            
            {/* Name and Email */}
            <div className="flex-1 min-w-0 text-left">
              <p className="text-base font-semibold truncate">
                {user ? `${user.firstName} ${user.lastName}` : 'John Doe'}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] truncate">
                {user?.email || 'investor@example.com'}
              </p>
            </div>
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text)] hover:bg-red-50 hover:text-red-600 transition-all mt-2"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-base font-medium">{t.logout}</span>
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#F5F0EB] pb-20 lg:pb-0" onClick={() => setShowMobileMenu(false)} ref={mainContentRef}>
        {/* Header - только для Dashboard */}
        {activeTab === 'dashboard' && (
          <header className="bg-transparent border-b border-[var(--color-border)] px-4 lg:px-8 py-4 lg:py-5">
            <div className="flex items-center justify-between">
              {/* Mobile Logo */}
              <button 
                onClick={() => window.location.href = '/'}
                className="flex lg:hidden items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ChefHat className="w-6 h-6 text-[#FF6B35]" />
                <div className="flex items-center gap-1">
                  <span className="font-bold text-base text-[var(--color-text)]">ChefNet</span>
                  <span className="text-base text-[#FF6B35] font-bold">Invest</span>
                </div>
              </button>
              
              {/* Desktop Welcome */}
              <h1 className="hidden lg:block text-2xl font-semibold text-[var(--color-text)]">
                {t.welcomePrefix} {user?.firstName || t.investor}!
              </h1>
              
              <div className="flex items-center gap-3 lg:gap-4">
                <LanguageSwitcher variant="dark" />
                
                {/* Mobile Profile Menu Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMobileMenu(!showMobileMenu);
                  }}
                  className="lg:hidden flex items-center gap-2 px-2 py-1"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A59] to-[#EB5632] flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">
                      {user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : 'JD'}
                    </span>
                  </div>
                </button>
                
                {/* Desktop Notification Bell */}
                <div className="hidden lg:block relative cursor-pointer" onClick={() => setActiveTab('notifications')}>
                  <Bell className="w-6 h-6 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-xs rounded-full flex items-center justify-center font-medium">
                    2
                  </span>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Mobile Header для других разделов */}
        {activeTab !== 'dashboard' && (
          <header className="lg:hidden bg-transparent border-b border-[var(--color-border)] px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Logo */}
              <button 
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ChefHat className="w-6 h-6 text-[#FF6B35]" />
                <div className="flex items-center gap-1">
                  <span className="font-bold text-base text-[var(--color-text)]">ChefNet</span>
                  <span className="text-base text-[#FF6B35] font-bold">Invest</span>
                </div>
              </button>
              
              <div className="flex items-center gap-3">
                <LanguageSwitcher variant="dark" />
                
                {/* Mobile Profile Menu Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMobileMenu(!showMobileMenu);
                  }}
                  className="flex items-center gap-2 px-2 py-1"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A59] to-[#EB5632] flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">
                      {user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : 'JD'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Mobile Profile Menu Dropdown */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={(e) => e.stopPropagation()}
              className="lg:hidden absolute top-16 right-4 bg-white rounded-xl shadow-xl border border-[var(--color-border)] z-50 overflow-hidden"
            >
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  setActiveTab('profile');
                }}
                className="w-full p-4 border-b border-[var(--color-border)] hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7A59] to-[#EB5632] flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : 'JD'}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-[var(--color-text)]">
                      {user ? `${user.firstName} ${user.lastName}` : 'John Doe'}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {user?.email || 'investor@example.com'}
                    </p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-[var(--color-text)] hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">{t.logout}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-8 flex-1 overflow-auto">
          {renderTabContent()}
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] shadow-lg z-50 safe-area-pb">
        <div className="flex items-end justify-around px-1 py-2.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-end gap-1 px-1.5 py-1.5 min-w-0 flex-1 rounded-lg transition-all ${
                activeTab === item.id ? 'bg-[#FFF5F0]' : ''
              }`}
            >
              <div className="flex items-center justify-center h-6">
                <item.icon 
                  className={`w-5 h-5 transition-colors flex-shrink-0 ${
                    activeTab === item.id
                      ? 'text-[#FF6B35]'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                />
              </div>
              <span 
                className={`text-[9px] font-semibold transition-colors leading-tight text-center max-w-full h-[22px] flex items-center justify-center ${
                  activeTab === item.id
                    ? 'text-[#FF6B35]'
                    : 'text-[var(--color-text-secondary)]'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Chart Variants Demo Modal */}
      {showChartDemo && <ChartVariantsDemo onClose={() => setShowChartDemo(false)} />}
    </div>
  );
}