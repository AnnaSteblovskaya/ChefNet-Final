import { motion } from 'motion/react';
import { Users, Copy, Share2, TrendingUp, Bell, UserCheck } from 'lucide-react';
import { ScrollIndicator } from '../ScrollIndicator';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { useState, useEffect } from 'react';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru, enUS, de, es, tr } from 'date-fns/locale';

// Register locales for date picker
registerLocale('ru', ru);
registerLocale('en', enUS);
registerLocale('de', de);
registerLocale('es', es);
registerLocale('tr', tr);

/**
 * CRITICAL REFERRAL PURCHASE RULES:
 * 1. Referral partners can ONLY buy shares from rounds with status "Активный" (Active)
 * 2. Currently only "Seed" round is Active - all partner purchases MUST be from Seed
 * 3. Partners CANNOT buy from "Вскоре" (Coming Soon) or "Распроданный" (Sold Out) rounds
 * 4. Each partner purchase must include the 'round' field indicating which round they bought from
 * 5. Default data shows all partners buying from 'seed' round at $0.075 per share
 */

interface ReferralTabProps {
  setActiveTab: (tab: string) => void;
}

export default function ReferralTab({ setActiveTab }: ReferralTabProps) {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  const [copied, setCopied] = useState(false);

  // Search filters
  const [searchName, setSearchName] = useState('');
  const [searchStatus, setSearchStatus] = useState('all');
  const [searchAmount, setSearchAmount] = useState('');
  const [searchShares, setSearchShares] = useState('');
  const [searchCommission, setSearchCommission] = useState('');
  const [searchDate, setSearchDate] = useState('');

  // Load referrals from localStorage or use defaults
  const [referredInvestors, setReferredInvestors] = useState(() => {
    const saved = localStorage.getItem('chefnet_referrals_data');
    const version = localStorage.getItem('chefnet_referrals_version');
    const currentVersion = '6.0'; // Increment this to force data reset
    
    if (saved && version === currentVersion) {
      const data = JSON.parse(saved);
      // Check if data has old invalid share amounts (less than 1000 OR incorrect pricing OR missing round field)
      const hasInvalidData = data.some((investor: any) => {
        if (investor.shares === 0) return false; // Skip registered users
        if (!investor.round) return true; // Missing round field
        const amountNum = parseFloat(investor.amount.replace(/[$,]/g, ''));
        const pricePerShare = amountNum / investor.shares;
        // Check if price is not matching any round price (with some tolerance)
        const validPrices = [0.075, 0.175, 0.50, 1.00];
        const isValidPrice = validPrices.some(price => Math.abs(pricePerShare - price) < 0.01);
        return investor.shares > 0 && (investor.shares < 1000 || !isValidPrice);
      });
      
      // If data is invalid, reset to defaults
      if (hasInvalidData) {
        const defaultData = [
          { name: 'John Doe', status: 'invested', amount: '$150', shares: 2000, commission: '$15', date: '2026-01-15', round: 'seed' },
          { name: 'Jane Smith', status: 'registered', amount: '$0', shares: 0, commission: '$0', date: '2026-01-20', round: null },
          { name: 'Peter Jones', status: 'invested', amount: '$300', shares: 4000, commission: '$30', date: '2026-01-22', round: 'seed' },
          { name: 'Alice Williams', status: 'invested', amount: '$75', shares: 1000, commission: '$7.50', date: '2026-01-28', round: 'seed' },
          { name: 'John Doe', status: 'invested', amount: '$7500', shares: 100000, commission: '$750', date: '2026-02-09', round: 'seed' },
        ];
        localStorage.setItem('chefnet_referrals_data', JSON.stringify(defaultData));
        localStorage.setItem('chefnet_referrals_version', currentVersion);
        return defaultData;
      }
      return data;
    }
    // Reset data if version mismatch or no saved data
    const defaultData = [
      { name: 'John Doe', status: 'invested', amount: '$150', shares: 2000, commission: '$15', date: '2026-01-15', round: 'seed' },
      { name: 'Jane Smith', status: 'registered', amount: '$0', shares: 0, commission: '$0', date: '2026-01-20', round: null },
      { name: 'Peter Jones', status: 'invested', amount: '$300', shares: 4000, commission: '$30', date: '2026-01-22', round: 'seed' },
      { name: 'Alice Williams', status: 'invested', amount: '$75', shares: 1000, commission: '$7.50', date: '2026-01-28', round: 'seed' },
      { name: 'John Doe', status: 'invested', amount: '$7500', shares: 100000, commission: '$750', date: '2026-02-09', round: 'seed' },
    ];
    localStorage.setItem('chefnet_referrals_data', JSON.stringify(defaultData));
    localStorage.setItem('chefnet_referrals_version', currentVersion);
    return defaultData;
  });

  // Filter referrals based on search criteria
  const filteredInvestors = referredInvestors.filter((investor) => {
    const matchesName = investor.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesStatus = searchStatus === 'all' || investor.status === searchStatus;
    const matchesAmount = investor.amount.toLowerCase().includes(searchAmount.toLowerCase());
    const matchesShares = investor.shares.toString().includes(searchShares);
    const matchesCommission = investor.commission.toLowerCase().includes(searchCommission.toLowerCase());
    const matchesDate = !searchDate || investor.date?.includes(searchDate);
    
    return matchesName && matchesStatus && matchesAmount && matchesShares && matchesCommission && matchesDate;
  }).sort((a, b) => {
    // Sort by date descending (newest first)
    const dateA = new Date(a.date || '1970-01-01');
    const dateB = new Date(b.date || '1970-01-01');
    return dateB.getTime() - dateA.getTime();
  });

  // Format date based on language
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    
    switch (language) {
      case 'en':
        return `${month}/${day}/${year}`; // MM/DD/YYYY
      case 'de':
        return `${day}.${month}.${year}`; // TT.MM.JJJJ
      case 'es':
        return `${day}/${month}/${year}`; // DD/MM/AAAA
      case 'tr':
        return `${day}.${month}.${year}`; // GG.AA.YYYY
      case 'ru':
      default:
        return `${day}.${month}.${year}`; // ДД.ММ.ГГГГ
    }
  };

  // Save to localStorage whenever referredInvestors changes
  useEffect(() => {
    localStorage.setItem('chefnet_referrals_data', JSON.stringify(referredInvestors));
  }, [referredInvestors]);

  const handleCopyLink = () => {
    const textToCopy = 'https://chefinvest.com/register?ref=CHEF-X7K9H2';
    
    // Try modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        // Fallback if Clipboard API fails
        fallbackCopyTextToClipboard(textToCopy);
      });
    } else {
      // Use fallback for older browsers or non-secure contexts
      fallbackCopyTextToClipboard(textToCopy);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div>
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{t.referralTitle}</h2>
          
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
        <p className="text-sm lg:text-base text-gray-600">{t.referralSubtitle}</p>
      </div>

      {/* Stats Cards - Two columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 mb-6">
        {/* Общая информация о партнерах */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 lg:p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-4 lg:mb-6">
            <Users className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg lg:text-xl font-bold text-gray-900">{t.referredUsers}</h3>
          </div>
          
          {/* Три строчки без фона */}
          <div className="space-y-0">
            {/* Всего партнеров в команде */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">{t.totalPartnersInTeam}</span>
              <span className="text-lg lg:text-xl font-bold text-gray-900">
                {/* Count unique partners by name */}
                {new Set(referredInvestors.map(inv => inv.name)).size}
              </span>
            </div>
            
            {/* Купленные доли */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">{t.purchasedShares}</span>
              <span className="text-lg lg:text-xl font-bold text-gray-900">
                {referredInvestors.reduce((sum, inv) => sum + (inv.shares || 0), 0)}
              </span>
            </div>
            
            {/* Полученные доли от команды */}
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">{t.earnedShares}</span>
              <span className="text-lg lg:text-xl font-bold text-gray-900">
                {Math.floor(referredInvestors.reduce((sum, inv) => sum + (inv.shares || 0), 0) * 0.1)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Referral Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 lg:p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-3 lg:mb-4">
            <Share2 className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg lg:text-xl font-bold text-gray-900">{t.yourReferralLink}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4 lg:mb-6">{t.linkDesc}</p>

          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-col gap-3">
            <input
              type="text"
              value="https://chefinvest.com/register?ref=CHEF-X7K9H2"
              readOnly
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-700"
            />
            <button
              onClick={handleCopyLink}
              className="w-full px-6 py-3 bg-[#D4522A] hover:bg-[#B8441F] text-white rounded-xl font-medium transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? t.copied : t.copyLink}</span>
            </button>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-3">
            <div className="relative">
              <input
                type="text"
                value="https://chefinvest.com/register?ref=CHEF-X7K9H2"
                readOnly
                className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-700 pr-3"
                style={{ fontSize: '11px' }}
              />
            </div>
            <button
              onClick={handleCopyLink}
              className="w-full px-4 py-3 bg-[#FF6B35] hover:bg-[#FF8C42] text-white rounded-xl font-medium transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              <span className="text-sm">{copied ? t.copied : t.copyLink}</span>
            </button>
            {copied && (
              <p className="text-xs text-[#7CB342] font-medium text-center">{t.copied}</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Referred Investors Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 overflow-visible"
      >
        <div className="flex items-center gap-2 mb-3 lg:mb-4">
          <UserCheck className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg lg:text-xl font-bold text-gray-900">{t.referredInvestors}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4 lg:mb-6">{t.trackDesc}</p>

        <ScrollIndicator className="-mx-4 lg:mx-0 px-4 lg:px-0">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-bold text-gray-900">{t.partnerDate}</th>
                <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-bold text-gray-900">{t.partnerName}</th>
                <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-bold text-gray-900">{t.status}</th>
                <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-bold text-gray-900">{t.partnerShares}</th>
                <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-bold text-gray-900">{t.investedAmount}</th>
                <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-bold text-gray-900">{t.yourCommission}</th>
              </tr>
              {/* Search Row */}
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-2 px-2 lg:px-4">
                  <DatePicker
                    selected={searchDate ? new Date(searchDate) : null}
                    onChange={(date) => setSearchDate(date ? date.toISOString().split('T')[0] : '')}
                    locale={language}
                    dateFormat="P"
                    placeholderText={t.searchByDate}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </th>
                <th className="py-2 px-2 lg:px-4">
                  <input
                    type="text"
                    placeholder={t.searchByName}
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </th>
                <th className="py-2 px-2 lg:px-4">
                  <select
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal"
                  >
                    <option value="all">{t.searchByStatus}</option>
                    <option value="invested">{t.invested}</option>
                    <option value="registered">{t.registered}</option>
                  </select>
                </th>
                <th className="py-2 px-2 lg:px-4">
                  <input
                    type="text"
                    placeholder={t.searchByShares}
                    value={searchShares}
                    onChange={(e) => setSearchShares(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </th>
                <th className="py-2 px-2 lg:px-4">
                  <input
                    type="text"
                    placeholder={t.searchByAmount}
                    value={searchAmount}
                    onChange={(e) => setSearchAmount(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </th>
                <th className="py-2 px-2 lg:px-4">
                  <input
                    type="text"
                    placeholder={t.searchByCommission}
                    value={searchCommission}
                    onChange={(e) => setSearchCommission(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInvestors.map((investor, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-900">{formatDate(investor.date)}</td>
                  <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-900">{investor.name}</td>
                  <td className="py-3 lg:py-4 px-2 lg:px-4">
                    <span
                      className={`inline-flex px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-[10px] lg:text-xs font-medium ${
                        investor.status === 'invested'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}
                    >
                      {investor.status === 'invested' ? t.invested : t.registered}
                    </span>
                  </td>
                  <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm font-semibold text-gray-900">{investor.shares}</td>
                  <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-900">{investor.amount}</td>
                  <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm font-semibold text-green-600">{Math.floor(investor.shares * 0.1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollIndicator>
      </motion.div>
    </div>
  );
}