import { motion } from 'motion/react';
import { TrendingUp, DollarSign, Coins, Copy, CheckCircle, Users, Target, Award, BarChart3, Share2, XCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { useState, useEffect } from 'react';
import PortfolioChart from './PortfolioChart';
import { getSiteUrl } from '@/utils/siteUrl';
import { apiGet, getAuthHeaders } from '@/utils/api';

export default function DashboardTab() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = dashboardTranslations[language];
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [myChartVariant, setMyChartVariant] = useState<'ownership' | 'rounds' | 'active-round' | 'roi'>('ownership');
  const [teamChartVariant, setTeamChartVariant] = useState<'ownership' | 'rounds' | 'active-round' | 'roi'>('ownership');
  
  // KYC Verification Status
  const [kycStatus, setKycStatus] = useState<'verified' | 'not_verified'>('not_verified');

  // Rounds and user data from API
  const [roundsData, setRoundsData] = useState<Record<string, {
    id: string; name: string; price: number; minInvestment: number;
    totalShares: number; soldShares: number; myShares: number;
    status: string; amount: string; highlight: boolean;
  }>>({});

  // Listen for KYC status from localStorage
  useEffect(() => {
    const check = () => {
      const kycStatusSaved = localStorage.getItem('chefnet_kyc_status');
      setKycStatus(kycStatusSaved === 'verified' ? 'verified' : 'not_verified');
    };
    check();
    const interval = setInterval(check, 2000);
    return () => clearInterval(interval);
  }, []);

  // Fetch rounds + user investments from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const [roundsRes, invRes] = await Promise.all([
          fetch('/api/rounds'),
          getAuthHeaders().then(h => fetch('/api/investments', {
            headers: h,
            credentials: 'include',
          })),
        ]);
        const rounds: any[] = await roundsRes.json().catch(() => []);
        const invData = invRes.ok ? await invRes.json().catch(() => ({})) : {};
        const userRounds: any[] = invData.userRounds || [];
        const mySharesMap: Record<string, number> = {};
        userRounds.forEach((ur: any) => { mySharesMap[ur.round_id] = ur.my_shares || 0; });
        if (!Array.isArray(rounds) || rounds.length === 0) return;
        const next: typeof roundsData = {};
        rounds.forEach((round: any) => {
          const key = round.id;
          next[key] = {
            id: round.id,
            name: round.label || round.name,
            price: parseFloat(round.price) || 0,
            minInvestment: parseFloat(round.min_investment) || 0,
            totalShares: round.total_shares || 0,
            soldShares: round.sold_shares || 0,
            myShares: mySharesMap[round.id] || 0,
            status: round.status === 'active' ? 'Активный' : round.status === 'upcoming' ? 'Вскоре' : 'Распроданный',
            amount: round.amount || '',
            highlight: !!round.highlight,
          };
        });
        setRoundsData(next);
      } catch (e) {}
    };
    loadData();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sample data for pie chart
  const chartData = [
    { name: 'Progress', value: 15 },
    { name: 'Remaining', value: 85 }
  ];

  const referralCode = user?.id ? 'CHEF-' + user.id.replace(/-/g, '').substring(0, 6).toUpperCase() : '';
  const referralLink = referralCode ? `${getSiteUrl()}/?ref=${referralCode}` : '';

  const handleCopyReferralLink = () => {
    const textToCopy = referralLink;
    
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
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
  };

  // Convert roundsData to array for cards
  const rounds = Object.values(roundsData).map(round => {
    const progress = (round.soldShares / round.totalShares) * 100;
    const soldMln = (round.soldShares / 1000000).toFixed(1);
    const totalMln = (round.totalShares / 1000000).toFixed(1);
    
    // Format price without trailing zeros
    const formattedPrice = round.price >= 1 
      ? `$${round.price.toFixed(2).replace(/\.?0+$/, '')}`
      : `$${round.price.toString()}`;
    
    return {
      id: round.id,
      name: round.name,
      pricePerShare: formattedPrice,
      minInvestment: `${round.minInvestment.toLocaleString()} долей`,
      progress: progress,
      progressLabel: `${soldMln} млн / ${totalMln} млн долей`,
      status: round.status,
      amount: round.amount,
      highlight: round.highlight,
    };
  });

  // Calculate total shares and total spent
  const totalMyShares = Object.values(roundsData).reduce((sum, round) => sum + round.myShares, 0);
  const totalSpent = Object.values(roundsData).reduce((sum, round) => sum + (round.myShares * round.price), 0);
  
  // Fetch referrals data from API
  const [referralsData, setReferralsData] = useState<any[]>([]);

  useEffect(() => {
    apiGet<any[]>('/api/referrals')
      .then(data => setReferralsData(data))
      .catch(() => setReferralsData([]));
  }, []);

  // Calculate team stats from referrals
  const totalTeamMembers = new Set(referralsData.map((ref: any) => ref.name)).size; // Count unique partners by name
  const totalTeamShares = referralsData.reduce((sum: number, ref: any) => sum + (ref.shares || 0), 0);
  
  // Team can only buy from Seed round (Pre-Seed) - same as user
  const seedRound = Object.values(roundsData).find(r => r.status === 'Активный') || Object.values(roundsData)[0];
  const totalTeamSpent = totalTeamShares * (seedRound?.price || 0.075);

  // Calculate potential profit based on IPO price ($1.00)
  // Each share bought in any round will be worth $1.00 at IPO
  const ipoPrice = 1.00;
  const potentialValue = totalMyShares * ipoPrice; // Total value at IPO price
  const potentialProfit = potentialValue; // Display total potential value
  
  // Calculate portfolio growth percentage
  const portfolioGrowth = totalSpent > 0 ? ((potentialValue - totalSpent) / totalSpent * 100) : 0;

  return (
    <div>
      {/* Welcome Message - Mobile Only */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4 lg:hidden"
      >
        <h1 className="text-xl font-bold text-[var(--color-text)]">
          {t.welcomePrefix} {user?.firstName || t.investor}!
        </h1>
      </motion.div>

      {/* Title with KYC Status */}
      <div className="mb-6 lg:mb-8">
        {/* KYC Status - Mobile version - Above title, aligned right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex lg:hidden items-center justify-end gap-2 mb-3"
        >
          <span className="text-xs font-bold text-[var(--color-text-secondary)]">{t.kycStatusTitle}:</span>
          {kycStatus === 'verified' ? (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#7CB342] to-[#9CCC65] text-white shadow-lg shadow-[#7CB342]/30">
              <CheckCircle className="w-3 h-3 mr-1" strokeWidth={2.5} />
              {t.kycConfirmed}
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#FF7A59] to-[#EB5632] text-white shadow-lg shadow-[#FF6B35]/30">
              <XCircle className="w-3 h-3 mr-1" strokeWidth={2.5} />
              {t.notVerified}
            </span>
          )}
        </motion.div>
        
        {/* Title and KYC Status - Desktop */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-text)]">{t.dashboardTitle}</h2>
          
          {/* KYC Status Badge - Desktop version */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center gap-2"
          >
            <span className="text-sm font-bold text-[var(--color-text-secondary)]">{t.kycStatusTitle}:</span>
            {kycStatus === 'verified' ? (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#7CB342] to-[#9CCC65] text-white shadow-lg shadow-[#7CB342]/30">
                <CheckCircle className="w-4 h-4 mr-1.5" strokeWidth={2.5} />
                {t.kycConfirmed}
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#FF7A59] to-[#EB5632] text-white shadow-lg shadow-[#FF6B35]/30">
                <XCircle className="w-4 h-4 mr-1.5" strokeWidth={2.5} />
                {t.notVerified}
              </span>
            )}
          </motion.div>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">{t.subtitle}</p>
      </div>

      {/* Portfolio Performance Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-[var(--color-border)] mb-6"
      >
        {/* Section Title with Icon inside card */}
        <div className="flex items-center gap-2 mb-4 lg:mb-6">
          <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-[var(--color-text)]" />
          <div>
            <h3 className="text-xl font-bold text-[var(--color-text)]">{t.portfolioEfficiency}</h3>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {/* Total Investment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-2 lg:p-2.5 border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-1.5 lg:mb-2">
              <span className="text-[10px] lg:text-sm font-semibold text-[var(--color-text)] leading-tight">{t.totalInvestment}</span>
              <div className="min-w-[24px] min-h-[24px] w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-[#FF7A59] to-[#EB5632] flex items-center justify-center shadow-md flex-shrink-0" style={{ borderRadius: '50%' }}>
                <DollarSign className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
              </div>
            </div>
            
            {/* Количество долей */}
            <div className="mb-1 lg:mb-1.5">
              <p className="text-[9px] lg:text-xs text-[var(--color-text-secondary)] mb-0.5">{t.sharesPurchased}</p>
              <div>
                <span className="text-base lg:text-2xl font-bold text-[var(--color-text)]">{totalMyShares}</span>
              </div>
            </div>
            
            {/* Потрачено денег */}
            <div>
              <p className="text-[9px] lg:text-xs text-[var(--color-text-secondary)] mb-0.5">{t.spent}</p>
              <div>
                <span className="text-base lg:text-2xl font-bold text-[#FF6B35]">${totalSpent.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* My Team Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-2 lg:p-2.5 border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-1.5 lg:mb-2">
              <span className="text-[10px] lg:text-sm font-semibold text-[var(--color-text)] leading-tight">{t.myTeam}</span>
              <div className="min-w-[24px] min-h-[24px] w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-[#FF7A59] to-[#EB5632] flex items-center justify-center shadow-md flex-shrink-0" style={{ borderRadius: '50%' }}>
                <Users className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
              </div>
            </div>
            
            {/* Количество долей команды */}
            <div className="mb-1 lg:mb-1.5">
              <p className="text-[9px] lg:text-xs text-[var(--color-text-secondary)] mb-0.5">{t.sharesPurchased}</p>
              <div>
                <span className="text-base lg:text-2xl font-bold text-[var(--color-text)]">{totalTeamShares}</span>
              </div>
            </div>
            
            {/* Потрачено командо */}
            <div>
              <p className="text-[9px] lg:text-xs text-[var(--color-text-secondary)] mb-0.5">{t.spent}</p>
              <div>
                <span className="text-base lg:text-2xl font-bold text-[#FF6B35]">${totalTeamSpent.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Total Shares */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-2 lg:p-2.5 border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-1.5 lg:mb-2">
              <span className="text-[10px] lg:text-sm font-semibold text-[var(--color-text)] leading-tight">{t.potentialGrowthIPO}</span>
              <div className="min-w-[24px] min-h-[24px] w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-[#FF7A59] to-[#EB5632] flex items-center justify-center shadow-md flex-shrink-0" style={{ borderRadius: '50%' }}>
                <Coins className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
              </div>
            </div>
            
            {/* Возможная прибыль */}
            <div>
              <div>
                <span className="text-base lg:text-2xl font-bold text-[var(--color-text)]">${potentialProfit.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Referrals - Growth Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-2 lg:p-2.5 border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-1.5 lg:mb-2">
              <span className="text-[10px] lg:text-sm font-semibold text-[var(--color-text)] leading-tight">{t.portfolioGrowth}</span>
              <div className="min-w-[24px] min-h-[24px] w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-[#FF7A59] to-[#EB5632] flex items-center justify-center shadow-md flex-shrink-0" style={{ borderRadius: '50%' }}>
                <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
              </div>
            </div>
            
            {/* Рост портфеля */}
            <div>
              <div>
                <span className="text-base lg:text-2xl font-bold text-[#7CB342]">+{portfolioGrowth.toFixed(2)}%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Charts and Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-[var(--color-border)] mb-6"
      >
        {/* Section Title with Icon inside card */}
        <div className="flex items-center gap-2 mb-4 lg:mb-6">
          <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-[var(--color-text)]" />
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-[var(--color-text)]">{t.portfolioResults}</h3>
            <p className="text-xs lg:text-sm text-[var(--color-text-secondary)]">{t.portfolioVisualization}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{/* My Portfolio Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-3 lg:p-6 shadow-sm border border-[var(--color-border)] flex flex-col"
        >
          <div className="flex items-start gap-2 lg:gap-3 mb-3 lg:mb-4">
            <TrendingUp className="w-4 h-4 lg:w-6 lg:h-6 text-[var(--color-text-secondary)] mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-base lg:text-xl font-bold text-[var(--color-text)] mb-0.5 lg:mb-1">{t.myPortfolioChart}</h3>
              <p className="text-xs lg:text-sm text-[var(--color-text-secondary)]">{t.myPortfolioDesc}</p>
            </div>
          </div>

          {/* Chart Type Switcher */}
          <div className="grid grid-cols-4 gap-1 lg:gap-2 mb-3 lg:mb-4">
            <button
              onClick={() => setMyChartVariant('ownership')}
              className={`p-1.5 lg:p-2 rounded-lg border transition-all ${
                myChartVariant === 'ownership'
                  ? 'bg-[#7CB342] border-[#7CB342] text-white'
                  : 'bg-white border-gray-200 text-[var(--color-text-secondary)] hover:border-[#7CB342]'
              }`}
            >
              <Target className="w-3 h-3 lg:w-4 lg:h-4 mx-auto mb-0.5 lg:mb-1" />
              <span className="text-[8px] lg:text-[10px] font-semibold leading-tight">{t.allShares}</span>
            </button>
            <button
              onClick={() => setMyChartVariant('rounds')}
              className={`p-1.5 lg:p-2 rounded-lg border transition-all ${
                myChartVariant === 'rounds'
                  ? 'bg-[#7CB342] border-[#7CB342] text-white'
                  : 'bg-white border-gray-200 text-[var(--color-text-secondary)] hover:border-[#7CB342]'
              }`}
            >
              <BarChart3 className="w-3 h-3 lg:w-4 lg:h-4 mx-auto mb-0.5 lg:mb-1" />
              <span className="text-[8px] lg:text-[10px] font-semibold leading-tight">{t.roundChart}</span>
            </button>
            <button
              onClick={() => setMyChartVariant('active-round')}
              className={`p-1.5 lg:p-2 rounded-lg border transition-all ${
                myChartVariant === 'active-round'
                  ? 'bg-[#7CB342] border-[#7CB342] text-white'
                  : 'bg-white border-gray-200 text-[var(--color-text-secondary)] hover:border-[#7CB342]'
              }`}
            >
              <Award className="w-3 h-3 lg:w-4 lg:h-4 mx-auto mb-0.5 lg:mb-1" />
              <span className="text-[8px] lg:text-[10px] font-semibold leading-tight">{t.sharesInRound}</span>
            </button>
            <button
              onClick={() => setMyChartVariant('roi')}
              className={`p-1.5 lg:p-2 rounded-lg border transition-all ${
                myChartVariant === 'roi'
                  ? 'bg-[#7CB342] border-[#7CB342] text-white'
                  : 'bg-white border-gray-200 text-[var(--color-text-secondary)] hover:border-[#7CB342]'
              }`}
            >
              <DollarSign className="w-3 h-3 lg:w-4 lg:h-4 mx-auto mb-0.5 lg:mb-1" />
              <span className="text-[8px] lg:text-[10px] font-semibold leading-tight">ROI</span>
            </button>
          </div>

          <div className="flex items-center justify-center flex-1 py-2 lg:py-4">
            <PortfolioChart
              variant={myChartVariant}
              totalShares={totalMyShares}
              totalSpent={totalSpent}
              roundsData={roundsData}
              isMobile={isMobile}
              isTeam={false}
            />
          </div>
        </motion.div>

        {/* Team Portfolio Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-3 lg:p-6 shadow-sm border border-[var(--color-border)] flex flex-col"
        >
          <div className="flex items-start gap-2 lg:gap-3 mb-3 lg:mb-4">
            <Users className="w-4 h-4 lg:w-6 lg:h-6 text-[var(--color-text-secondary)] mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-base lg:text-xl font-bold text-[var(--color-text)] mb-0.5 lg:mb-1">{t.teamPortfolioChart}</h3>
              <p className="text-xs lg:text-sm text-[var(--color-text-secondary)]">{t.teamPortfolioDesc}</p>
            </div>
          </div>

          {/* Chart Type Switcher */}
          <div className="grid grid-cols-4 gap-1 lg:gap-2 mb-3 lg:mb-4">
            <button
              onClick={() => setTeamChartVariant('ownership')}
              className={`p-1.5 lg:p-2 rounded-lg border transition-all ${
                teamChartVariant === 'ownership'
                  ? 'bg-[#FF6B35] border-[#FF6B35] text-white'
                  : 'bg-white border-gray-200 text-[var(--color-text-secondary)] hover:border-[#FF6B35]'
              }`}
            >
              <Target className="w-3 h-3 lg:w-4 lg:h-4 mx-auto mb-0.5 lg:mb-1" />
              <span className="text-[8px] lg:text-[10px] font-semibold leading-tight">{t.allShares}</span>
            </button>
            <button
              onClick={() => setTeamChartVariant('rounds')}
              className={`p-1.5 lg:p-2 rounded-lg border transition-all ${
                teamChartVariant === 'rounds'
                  ? 'bg-[#FF6B35] border-[#FF6B35] text-white'
                  : 'bg-white border-gray-200 text-[var(--color-text-secondary)] hover:border-[#FF6B35]'
              }`}
            >
              <BarChart3 className="w-3 h-3 lg:w-4 lg:h-4 mx-auto mb-0.5 lg:mb-1" />
              <span className="text-[8px] lg:text-[10px] font-semibold leading-tight">{t.roundsChart}</span>
            </button>
            <button
              onClick={() => setTeamChartVariant('active-round')}
              className={`p-1.5 lg:p-2 rounded-lg border transition-all ${
                teamChartVariant === 'active-round'
                  ? 'bg-[#FF6B35] border-[#FF6B35] text-white'
                  : 'bg-white border-gray-200 text-[var(--color-text-secondary)] hover:border-[#FF6B35]'
              }`}
            >
              <Award className="w-3 h-3 lg:w-4 lg:h-4 mx-auto mb-0.5 lg:mb-1" />
              <span className="text-[8px] lg:text-[10px] font-semibold leading-tight">{t.sharesInRound}</span>
            </button>
            <button
              onClick={() => setTeamChartVariant('roi')}
              className={`p-1.5 lg:p-2 rounded-lg border transition-all ${
                teamChartVariant === 'roi'
                  ? 'bg-[#FF6B35] border-[#FF6B35] text-white'
                  : 'bg-white border-gray-200 text-[var(--color-text-secondary)] hover:border-[#FF6B35]'
              }`}
            >
              <DollarSign className="w-3 h-3 lg:w-4 lg:h-4 mx-auto mb-0.5 lg:mb-1" />
              <span className="text-[8px] lg:text-[10px] font-semibold leading-tight">ROI</span>
            </button>
          </div>

          <div className="flex items-center justify-center flex-1 py-2 lg:py-4">
            <PortfolioChart
              variant={teamChartVariant}
              totalShares={totalTeamShares}
              totalSpent={totalTeamSpent}
              roundsData={roundsData}
              isMobile={isMobile}
              isTeam={true}
            />
          </div>
        </motion.div>
        </div>
      </motion.div>

      {/* Referral Program Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-[var(--color-border)] mb-8"
      >
        {/* Section Title with Icon inside card */}
        <div className="flex items-center gap-2 mb-4 lg:mb-6">
          <Share2 className="w-5 h-5 lg:w-6 lg:h-6 text-[var(--color-text)]" />
          <div>
            <h3 className="text-xl font-bold text-[var(--color-text)]">{t.referralTitle}</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">{t.referralSubtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Referral Code */}
          <div>
            <label className="text-sm lg:text-base font-bold text-[#FF6B35] mb-2 block">{t.yourReferralLink}</label>
            <div className="flex items-center gap-2 bg-[#F5EAE1] border border-orange-200 rounded-xl p-3 lg:p-4">
              <span className="flex-1 text-sm lg:text-base font-medium text-[var(--color-text)] break-all">{referralLink}</span>
              <button
                onClick={handleCopyReferralLink}
                className="p-2 hover:bg-white rounded-lg transition-colors flex-shrink-0"
              >
                <Copy className="w-5 h-5 text-[var(--color-text-secondary)]" />
              </button>
            </div>
            {copied && (
              <p className="text-xs text-[#7CB342] mt-1 font-medium">{t.copied}</p>
            )}
          </div>

          {/* Stats */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
              <span className="text-sm lg:text-base text-[var(--color-text-secondary)]">{t.totalReferrals}</span>
              <span className="text-lg lg:text-xl font-bold text-[var(--color-text)]">{totalTeamMembers}</span>
            </div>
            <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
              <span className="text-sm lg:text-base text-[var(--color-text-secondary)]">{t.purchasedShares}</span>
              <span className="text-lg lg:text-xl font-bold text-[var(--color-text)]">{totalTeamShares}</span>
            </div>
            <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
              <span className="text-sm lg:text-base text-[var(--color-text-secondary)]">{t.earnedShares}</span>
              <span className="text-lg lg:text-xl font-bold text-[var(--color-text)]">{Math.floor(totalTeamShares * 0.1)}</span>
            </div>
          </div>
        </div>

        {/* Referral Levels */}
        <div className="mt-6">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">{t.rewardLevels}</label>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm lg:text-base p-3 bg-gray-50 rounded-lg">
              <span className="text-[var(--color-text-secondary)]">{t.level1}</span>
              <span className="font-semibold text-[var(--color-text)]">10%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}