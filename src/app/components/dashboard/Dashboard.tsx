import { useState } from 'react';
import { ChefHat, LayoutDashboard, TrendingUp, FileText, Users, ShieldCheck, HelpCircle, User, LogOut, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import DashboardTab from './DashboardTab';
import InvestmentsTab from './InvestmentsTab';
import DocumentsTab from './DocumentsTab';
import ReferralTab from './ReferralTab';
import KYCTab from './KYCTab';

interface DashboardProps {
  onBackToHome: () => void;
}

export default function Dashboard({ onBackToHome }: DashboardProps) {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    logout();
    onBackToHome();
  };

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard },
    { id: 'investments', icon: TrendingUp, label: t.myInvestments },
    { id: 'documents', icon: FileText, label: t.documents },
    { id: 'referral', icon: Users, label: t.referralProgram },
    { id: 'kyc', icon: ShieldCheck, label: t.kycVerification },
    { id: 'faq', icon: HelpCircle, label: t.faq },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'investments':
        return <InvestmentsTab />;
      case 'documents':
        return <DocumentsTab />;
      case 'referral':
        return <ReferralTab />;
      case 'kyc':
        return <KYCTab />;
      case 'faq':
        return <div className="text-gray-500">FAQ content coming soon...</div>;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="flex h-screen bg-[var(--color-surface)]">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--color-background)] border-r border-[var(--color-border)] flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-2">
            <ChefHat className="w-7 h-7 text-[var(--color-primary)]" />
            <div>
              <span className="font-bold text-lg text-[var(--color-text)]">ChefNet</span>{' '}
              <span className="font-light text-lg text-[var(--color-primary)]">Invest</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                activeTab === item.id
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-all">
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">{t.profile}</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text)] hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">{t.logout}</span>
          </button>

          {/* ChefNet badge */}
          <div className="mt-4 flex items-center justify-center gap-2 px-4 py-2.5 border border-[var(--color-border)] rounded-full">
            <ChefHat className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="text-sm font-medium text-[var(--color-primary)]">ChefNet</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-8 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-[var(--color-text)]">{t.welcome}</h1>
            <div className="flex items-center gap-4">
              <LanguageSwitcher variant="dark" />
              <div className="relative">
                <Bell className="w-6 h-6 text-[var(--color-text-secondary)] cursor-pointer hover:text-[var(--color-text)] transition-colors" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-xs rounded-full flex items-center justify-center font-medium">
                  3
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}