import { motion } from 'motion/react';
import { TrendingUp, ShoppingCart, History, Calendar, Award, MoreVertical, ArrowRight, Bell } from 'lucide-react';
import { ScrollIndicator } from '../ScrollIndicator';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { useState, useEffect, useRef } from 'react';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

/**
 * CRITICAL INVESTMENT RULES:
 * 1. Users can ONLY buy shares from rounds with status "Активный" (Active)
 * 2. Referral partners can ONLY buy shares from rounds with status "Активный" (Active)
 * 3. Currently only "Seed" round is Active - all purchases must be from Seed
 * 4. Team shares must be tracked per round (not globally)
 * 5. Each round independently tracks: totalShares - soldShares - teamSharesForThisRound
 */

interface InvestmentsTabProps {
  setActiveTab: (tab: string) => void;
}

export default function InvestmentsTab({ setActiveTab }: InvestmentsTabProps) {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  
  // Ref for calculator section
  const calculatorRef = useRef<HTMLDivElement>(null);
  
  // Initialize state from localStorage or defaults
  const [amount, setAmount] = useState(2000);
  const [selectedRound, setSelectedRound] = useState<string | null>('seed');
  const [activeCalculatorRound, setActiveCalculatorRound] = useState('Seed');
  
  // Load roundsData from localStorage or use defaults
  const [roundsData, setRoundsData] = useState(() => {
    const saved = localStorage.getItem('chefnet_rounds_data');
    if (saved) {
      const data = JSON.parse(saved);
      // Reset Private round to initial state
      if (data.Private) {
        data.Private.soldShares = 0;
        data.Private.myShares = 0;
      }
      // Save the reset data back to localStorage
      localStorage.setItem('chefnet_rounds_data', JSON.stringify(data));
      return data;
    }
    return {
      Seed: { 
        id: 'seed',
        name: 'Раунд посева',
        price: 0.075,
        minInvestment: 2000,
        totalShares: 2000000,
        soldShares: 0,
        myShares: 0,
        status: 'Активный',
        amount: '$150,000',
        highlight: true,
      },
      Private: { 
        id: 'seriesA',
        name: 'Серия A',
        price: 0.175,
        minInvestment: 2000,
        totalShares: 2000000,
        soldShares: 0,
        myShares: 0,
        status: 'Вскоре',
        amount: '$350,000',
        highlight: false,
      },
      Marketing: { 
        id: 'seriesB',
        name: 'Серия B',
        price: 0.50,
        minInvestment: 1000,
        totalShares: 1000000,
        soldShares: 0,
        myShares: 0,
        status: 'Вскоре',
        amount: '$500,000',
        highlight: false,
      },
      'Public/IPO': { 
        id: 'seriesC',
        name: 'Серия C / IPO',
        price: 1.00,
        minInvestment: 1000,
        totalShares: 1000000,
        soldShares: 0,
        myShares: 0,
        status: 'Вскоре',
        amount: '$1,000,000',
        highlight: false,
      }
    };
  });

  // Load investments from localStorage or use defaults
  const [investments, setInvestments] = useState<Array<{
    round: string;
    shares?: number;
    amount: string;
    date: string;
    status: string;
  }>>(() => {
    const saved = localStorage.getItem('chefnet_investments');
    if (saved) {
      const data = JSON.parse(saved);
      // Remove all Private round investments
      const filtered = data.filter((inv: {round: string}) => inv.round !== 'Private');
      
      // Migrate old data: calculate shares if missing
      const migrated = filtered.map((inv: any) => {
        if (inv.shares === undefined || inv.shares === null) {
          // Parse amount to get numeric value
          const amountValue = parseFloat(inv.amount.replace(/[$,]/g, ''));
          // Get round price
          const roundKey = inv.round as keyof typeof roundsData;
          const roundPrice = roundsData[roundKey]?.price || 0.075;
          // Calculate shares
          const calculatedShares = roundPrice > 0 ? Math.floor(amountValue / roundPrice) : 0;
          return { ...inv, shares: calculatedShares };
        }
        return inv;
      });
      
      // Save the migrated data back to localStorage
      localStorage.setItem('chefnet_investments', JSON.stringify(migrated));
      return migrated;
    }
    return [];
  });

  // Save to localStorage whenever roundsData changes
  useEffect(() => {
    localStorage.setItem('chefnet_rounds_data', JSON.stringify(roundsData));
  }, [roundsData]);

  // Save to localStorage whenever investments change
  useEffect(() => {
    localStorage.setItem('chefnet_investments', JSON.stringify(investments));
  }, [investments]);

  // Listen for changes in localStorage (from other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedRounds = localStorage.getItem('chefnet_rounds_data');
      const savedInvestments = localStorage.getItem('chefnet_investments');
      
      if (savedRounds) {
        setRoundsData(JSON.parse(savedRounds));
      }
      if (savedInvestments) {
        setInvestments(JSON.parse(savedInvestments));
      }
    };

    // Check for updates every second to sync between tabs
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Load referrals data to calculate team shares
  const [referralsData, setReferralsData] = useState(() => {
    const saved = localStorage.getItem('chefnet_referrals_data');
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  // Listen for changes in referrals data
  useEffect(() => {
    const handleReferralsChange = () => {
      const saved = localStorage.getItem('chefnet_referrals_data');
      if (saved) {
        setReferralsData(JSON.parse(saved));
      }
    };

    // Check for updates every second to sync between tabs
    const interval = setInterval(handleReferralsChange, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate team shares for a specific round
  const getTeamSharesForRound = (roundName: string) => {
    // Map calculator round names to data round names
    const roundMap: { [key: string]: string } = {
      'Seed': 'seed',
      'Private': 'private',
      'Marketing': 'marketing',
      'Public/IPO': 'public'
    };
    
    const dataRoundName = roundMap[roundName] || roundName.toLowerCase();
    
    return referralsData.reduce((sum: number, ref: any) => {
      // Only count shares from the specific round
      if (ref.round === dataRoundName) {
        return sum + (ref.shares || 0);
      }
      return sum;
    }, 0);
  };

  // Update amount when active calculator round changes
  useEffect(() => {
    const currentRound = roundsData[activeCalculatorRound as keyof typeof roundsData];
    if (currentRound) {
      setAmount(currentRound.minInvestment);
    }
  }, [activeCalculatorRound]); // Removed roundsData from dependencies to prevent slider reset

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'verified':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'requested':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get current round data
  const currentRoundData = roundsData[activeCalculatorRound as keyof typeof roundsData];
  
  // Calculate available shares - subtract both my shares AND team shares
  const availableShares = currentRoundData.totalShares - currentRoundData.soldShares - getTeamSharesForRound(activeCalculatorRound);
  
  // Calculate payment amount
  const paymentAmount = (amount * currentRoundData.price).toFixed(2);

  // Handle buy shares
  const handleBuyShares = () => {
    // Check if round is active
    if (currentRoundData.status !== 'Активный') {
      alert(t.roundNotActive);
      return;
    }

    if (amount < currentRoundData.minInvestment || amount > availableShares) {
      alert(`${t.sharesRange} ${currentRoundData.minInvestment} ${t.and} ${availableShares.toLocaleString()}`);
      return;
    }

    // Update round data
    setRoundsData(prev => ({
      ...prev,
      [activeCalculatorRound]: {
        ...prev[activeCalculatorRound as keyof typeof prev],
        myShares: prev[activeCalculatorRound as keyof typeof prev].myShares + amount,
        soldShares: prev[activeCalculatorRound as keyof typeof prev].soldShares + amount
      }
    }));

    // Add to investments table
    const today = new Date().toISOString().split('T')[0];
    setInvestments(prev => [
      {
        round: activeCalculatorRound,
        shares: amount,
        amount: `$${paymentAmount}`,
        date: today,
        status: 'pending'
      },
      ...prev
    ]);

    // Reset amount
    setAmount(currentRoundData.minInvestment);
  };

  // Handle clicking "Buy Shares" button on round cards
  const handleBuySharesFromCard = (roundName: string) => {
    // Check if round is active first
    const roundMap: { [key: string]: string } = {
      'Раунд посева': 'Seed',
      'Серия A': 'Private',
      '��рия B': 'Marketing',
      'Серия C / IPO': 'Public/IPO'
    };
    
    const calculatorRoundName = roundMap[roundName] || 'Seed';
    const roundKey = calculatorRoundName as keyof typeof roundsData;
    const targetRound = roundsData[roundKey];
    
    // Check if round is active
    if (targetRound && targetRound.status !== 'Активный') {
      alert(t.roundNotActive || 'Этот раунд еще не активен. Вы можете покупать доли только в активных раундах.');
      return;
    }
    
    // Set active round first
    setActiveCalculatorRound(calculatorRoundName);
    
    // Multiple scroll strategies for maximum compatibility
    setTimeout(() => {
      const element = calculatorRef.current;
      if (element) {
        // Try smooth scroll first
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
        
        // Fallback: direct scroll with offset for mobile
        setTimeout(() => {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 80; // 80px offset for header
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 150);
      }
    }, 100);
  };

  // Convert roundsData to array for cards
  const rounds = Object.keys(roundsData).map(roundKey => {
    const round = roundsData[roundKey as keyof typeof roundsData];
    // Calculate combined shares: my shares + team shares for THIS specific round
    const combinedShares = round.soldShares + getTeamSharesForRound(roundKey);
    const progress = (combinedShares / round.totalShares) * 100;
    const soldMln = (combinedShares / 1000000).toFixed(1);
    const totalMln = (round.totalShares / 1000000).toFixed(1);
    
    // Format price without trailing zeros
    const formattedPrice = round.price >= 1 
      ? `$${round.price.toFixed(2).replace(/\\.?0+$/, '')}`
      : `$${round.price.toString()}`;
    
    // Get status translation
    let statusText = round.status;
    if (round.status === 'Активный') statusText = t.active;
    else if (round.status === 'Вскоре') statusText = t.soon;
    else if (round.status === 'Распроданный') statusText = t.soldOut;
    
    return {
      id: round.id,
      name: round.name,
      pricePerShare: formattedPrice,
      minInvestment: `${round.minInvestment.toLocaleString()} ${t.sharesLabel}`,
      progress: progress,
      progressLabel: `${soldMln} ${t.millionShort} / ${totalMln} ${t.millionShort} ${t.sharesLabel}`,
      status: statusText,
      statusOriginal: round.status, // Keep original for comparisons
      amount: round.amount,
      highlight: round.highlight,
    };
  });

  return (
    <div>
      <div className="mb-6 lg:mb-8 flex items-center justify-between">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{t.myInvestmentsTitle}</h2>
        
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

      {/* Investment Rounds Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 mb-6"
      >
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg lg:text-xl font-bold text-gray-900">{t.roundsSection}</h3>
          </div>
          <p className="text-sm lg:text-base text-gray-600">{t.myInvestmentsSubtitle}</p>
        </div>

        {/* Investment Rounds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {rounds.map((round, index) => (
            <motion.div
              key={round.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedRound(round.id)}
              className={`relative p-4 lg:p-6 rounded-3xl border-2 cursor-pointer transition-all ${
                round.highlight
                  ? "border-[#FF6B35] bg-gradient-to-br from-white to-[#FFE5DE] shadow-xl shadow-[#FF6B35]/20"
                  : round.statusOriginal === "Распроданный"
                    ? "border-gray-300 bg-gray-50 opacity-70"
                    : "border-gray-200 bg-white"
              } ${
                selectedRound === round.id
                  ? "ring-4 ring-[#FF6B35]/30"
                  : ""
              }`}
            >
              {/* Stage Label */}
              <div className="text-center mb-4">
                <div className="text-xs lg:text-sm font-semibold text-gray-600 mb-1">
                  {round.name.includes("Серия C")
                    ? "Public/IPO:"
                    : round.name.includes("посева")
                      ? "Seed:"
                      : round.name.includes("A")
                        ? "Private:"
                        : "Marketing:"}
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {round.amount}
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-center mb-4">
                <span
                  className={`inline-block px-3 lg:px-4 py-1 lg:py-1.5 rounded-full text-xs lg:text-sm font-bold ${
                    round.statusOriginal === "Активный"
                      ? "bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white"
                      : round.statusOriginal === "Вскоре"
                        ? "bg-gradient-to-r from-[#2196F3] to-[#42A5F5] text-white"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {round.status}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t.pricePerShare}
                  </span>
                  <span className="font-bold text-[#FF6B35]">
                    {round.pricePerShare}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t.minimum}
                  </span>
                  <span className="font-semibold">
                    {round.minInvestment}
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${round.progress}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.1 + 0.3,
                    }}
                    className={`h-full ${
                      round.statusOriginal === "Распроданный"
                        ? "bg-gray-400"
                        : round.statusOriginal === "Активный"
                          ? "bg-gradient-to-r from-[#FF6B35] to-[#FF8C42]"
                          : "bg-gradient-to-r from-[#2196F3] to-[#42A5F5]"
                    }`}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-2 text-center">
                  {round.progressLabel}
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                {round.statusOriginal === "Активный" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-gradient-to-r from-[#FF7A59] to-[#EB5632] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    onClick={() => handleBuySharesFromCard(round.name)}
                  >
                    {t.buyShares}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}

                {round.statusOriginal === "Распроданный" && (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-300 text-gray-600 rounded-xl font-bold cursor-not-allowed"
                  >
                    {t.soldOut}
                  </button>
                )}

                {round.statusOriginal === "Вскоре" && (
                  <button className="w-full py-3 bg-gradient-to-r from-[#2196F3] to-[#42A5F5] text-white rounded-xl font-bold hover:shadow-lg transition-all">
                    {t.notifyMe}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Income Calculators */}
      <div className="mb-6">
        {/* Investment Calculator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          ref={calculatorRef}
        >
          <div className="flex items-center gap-2 mb-6">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg lg:text-xl font-bold text-gray-900">{t.calculateIncome}</h3>
          </div>

          {/* Round tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            {['Seed', 'Private', 'Marketing', 'Public/IPO'].map((round) => (
              <button
                key={round}
                className={`px-2 lg:px-4 py-2 rounded-lg text-[10px] lg:text-sm font-medium transition-all whitespace-normal leading-[1.2] min-w-[60px] max-w-[80px] lg:min-w-0 lg:max-w-none lg:flex-shrink-0 text-center ${
                  round === activeCalculatorRound
                    ? 'bg-[#D4522A] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCalculatorRound(round)}
              >
                {round}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.minInvestment}</p>
              <p className="text-xl font-bold text-gray-900">{currentRoundData.minInvestment.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.shareCount}</p>
              <p className="text-xl font-bold text-gray-900">{currentRoundData.myShares.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.availablePrice}</p>
              <p className="text-xl font-bold text-gray-900">${(currentRoundData.minInvestment * currentRoundData.price).toFixed(0)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.availableShares}</p>
              <p className="text-xl font-bold text-gray-900">{availableShares.toLocaleString()}</p>
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-2 block">{t.investmentAmount}</label>
            <input
              type="number"
              min={currentRoundData.minInvestment}
              max={availableShares}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              disabled={currentRoundData.status !== 'Активный'}
              className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] ${
                currentRoundData.status !== 'Активный' ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
              }`}
            />
          </div>

          {/* Shares slider */}
          <div className="mb-6">
            <input
              type="range"
              min={currentRoundData.minInvestment}
              max={Math.min(2000000, availableShares)}
              step="100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              disabled={currentRoundData.status !== 'Активный'}
              className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4522A] ${
                currentRoundData.status !== 'Активный' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Result */}
          <div className="bg-[#FFF9F0] rounded-xl p-4 flex items-center justify-between mb-6">
            <span className="text-sm text-gray-700">{t.yourReferralIncome}</span>
            <span className="text-xl font-bold text-[#D4522A]">${paymentAmount}</span>
          </div>

          {/* Status message for inactive rounds */}
          {currentRoundData.status !== 'Активный' && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-center">
              <p className="text-sm text-blue-800 font-medium">
                {currentRoundData.status === 'Вскоре' 
                  ? t.roundNotStarted
                  : t.roundCompleted}
              </p>
            </div>
          )}

          <button
            className={`w-full py-3 rounded-xl font-medium transition-all shadow-md ${
              currentRoundData.status === 'Активный'
                ? 'bg-[#D4522A] hover:bg-[#B8441F] text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleBuyShares}
            disabled={currentRoundData.status !== 'Активный'}
          >
            {currentRoundData.status === 'Активный' ? t.buyMore : t.roundInactive}
          </button>
        </motion.div>
      </div>

      {/* Investment Portfolio Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-visible"
      >
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg lg:text-xl font-bold text-gray-900">{t.investmentPortfolio}</h3>
        </div>

        <ScrollIndicator className="-mx-4 lg:mx-0 px-4 lg:px-0">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-medium text-gray-600">{t.investmentRound}</th>
                <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-medium text-gray-600">{t.shares}</th>
                <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-medium text-gray-600">{t.amountUSD}</th>
                <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-medium text-gray-600">{t.date}</th>
                <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-medium text-gray-600">{t.status}</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-900">{inv.round}</td>
                  <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-900">{(inv.shares || 0).toLocaleString()}</td>
                  <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-900">{inv.amount}</td>
                  <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-900">{inv.date}</td>
                  <td className="py-3 lg:py-4 px-2 lg:px-4">
                    <span className={`inline-flex px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-[10px] lg:text-xs font-medium border ${getStatusColor(inv.status)}`}>
                      {t[inv.status as keyof typeof t]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollIndicator>
      </motion.div>
    </div>
  );
}