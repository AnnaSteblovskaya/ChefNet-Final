import { motion } from 'motion/react';
import { TrendingUp, ShoppingCart, History, Bell, ArrowRight } from 'lucide-react';
import { ScrollIndicator } from '../ScrollIndicator';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { useState, useEffect, useRef } from 'react';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import { getAuthHeaders } from '@/utils/api';

interface ApiRound {
  id: string;
  name: string;
  label: string;
  price: number;
  min_investment: number;
  total_shares: number;
  sold_shares: number;
  status: 'active' | 'upcoming' | 'soldout';
  amount: string;
  highlight: boolean;
}

interface UserRound {
  round_id: string;
  my_shares: number;
}

interface Investment {
  id: number;
  round: string;
  shares: number;
  amount: string | number;
  date: string;
  status: string;
}

interface InvestmentsTabProps {
  setActiveTab: (tab: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
    case 'verified':  return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'pending':   return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'requested': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default:          return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

function formatAmount(amount: string | number): string {
  if (typeof amount === 'number') return `$${amount.toFixed(2)}`;
  if (String(amount).startsWith('$')) return String(amount);
  return `$${amount}`;
}

export default function InvestmentsTab({ setActiveTab }: InvestmentsTabProps) {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  const calculatorRef = useRef<HTMLDivElement>(null);

  const [rounds, setRounds] = useState<ApiRound[]>([]);
  const [myRounds, setMyRounds] = useState<Record<string, number>>({});
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loadingRounds, setLoadingRounds] = useState(true);
  const [loadingInv, setLoadingInv] = useState(true);
  const [buying, setBuying] = useState(false);

  const [activeRoundId, setActiveRoundId] = useState<string>('');
  const [amount, setAmount] = useState(0);
  const [selectedRound, setSelectedRound] = useState<string | null>(null);

  // Load rounds from public API
  const loadRounds = async () => {
    try {
      const res = await fetch('/api/rounds');
      const data: ApiRound[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setRounds(data);
        const firstActive = data.find(r => r.status === 'active') || data[0];
        setActiveRoundId(prev => prev || firstActive.id);
        setSelectedRound(prev => prev || firstActive.id);
      }
    } catch (e) {}
    setLoadingRounds(false);
  };

  // Load user investments from API
  const loadInvestments = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/investments', {
        headers,
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        const invArr: Investment[] = Array.isArray(data) ? data : (data.investments || []);
        const userRoundsArr: UserRound[] = data.userRounds || [];
        setInvestments(invArr);
        const myMap: Record<string, number> = {};
        userRoundsArr.forEach(ur => { myMap[ur.round_id] = ur.my_shares; });
        setMyRounds(myMap);
      }
    } catch (e) {}
    setLoadingInv(false);
  };

  useEffect(() => {
    loadRounds();
    loadInvestments();
  }, []);

  const activeRound = rounds.find(r => r.id === activeRoundId);

  // Set initial amount when active round changes
  useEffect(() => {
    if (activeRound) setAmount(activeRound.min_investment || 0);
  }, [activeRoundId]);

  const mySharesInRound = activeRound ? (myRounds[activeRound.id] || 0) : 0;
  const availableShares = activeRound
    ? Math.max(0, activeRound.total_shares - activeRound.sold_shares)
    : 0;
  const paymentAmount = activeRound ? (amount * activeRound.price).toFixed(2) : '0.00';

  const handleBuySharesFromCard = (roundId: string) => {
    const round = rounds.find(r => r.id === roundId);
    if (!round || round.status !== 'active') {
      alert(t.roundNotActive || 'Этот раунд еще не активен.');
      return;
    }
    setActiveRoundId(roundId);
    setTimeout(() => {
      calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleBuyShares = async () => {
    if (!activeRound || activeRound.status !== 'active') {
      alert(t.roundNotActive || 'Раунд не активен');
      return;
    }
    if (amount < activeRound.min_investment || amount > availableShares) {
      alert(`${t.sharesRange || 'Количество долей должно быть от'} ${activeRound.min_investment.toLocaleString()} ${t.and || 'до'} ${availableShares.toLocaleString()}`);
      return;
    }
    setBuying(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/investments', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ round: activeRound.id, shares: amount, amount: parseFloat(paymentAmount) }),
      });
      if (res.ok) {
        await loadRounds();
        await loadInvestments();
        setAmount(activeRound.min_investment);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || 'Ошибка при покупке долей');
      }
    } catch (e) {
      alert('Ошибка сети. Попробуйте ещё раз.');
    }
    setBuying(false);
  };

  const statusLabel = (r: ApiRound) => {
    if (r.status === 'active') return t.active || 'Активный';
    if (r.status === 'upcoming') return t.soon || 'Скоро';
    return t.soldOut || 'Распродан';
  };

  const isActive = (r: ApiRound) => r.status === 'active';
  const isSoon = (r: ApiRound) => r.status === 'upcoming';

  return (
    <div>
      <div className="mb-6 lg:mb-8 flex items-center justify-between">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{t.myInvestmentsTitle}</h2>
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher variant="dark" />
          <div className="relative cursor-pointer" onClick={() => setActiveTab('notifications')}>
            <Bell className="w-6 h-6 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-xs rounded-full flex items-center justify-center font-medium">2</span>
          </div>
        </div>
      </div>

      {/* Rounds cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg lg:text-xl font-bold text-gray-900">{t.roundsSection}</h3>
          </div>
          <p className="text-sm lg:text-base text-gray-600">{t.myInvestmentsSubtitle}</p>
        </div>

        {loadingRounds ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : rounds.length === 0 ? (
          <div className="text-center py-10 text-gray-400">Раунды пока не настроены</div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 ${rounds.length >= 4 ? 'lg:grid-cols-4' : rounds.length === 3 ? 'lg:grid-cols-3' : rounds.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-xs'}`}>
            {rounds.map((round, index) => {
              const progress = round.total_shares > 0 ? Math.min(100, (round.sold_shares / round.total_shares) * 100) : 0;
              const soldMln = (round.sold_shares / 1_000_000).toFixed(1);
              const totalMln = (round.total_shares / 1_000_000).toFixed(1);
              const displayLabel = round.label || round.name;
              const formattedPrice = round.price >= 1
                ? `$${round.price.toFixed(0)}`
                : `$${round.price}`;
              const isHighlight = isActive(round);
              const isSoldOut = round.status === 'soldout';
              return (
                <motion.div key={round.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedRound(round.id)}
                  className={`relative p-4 lg:p-6 rounded-3xl border-2 cursor-pointer transition-all ${
                    isHighlight
                      ? 'border-[#FF6B35] bg-gradient-to-br from-white to-[#FFE5DE] shadow-xl shadow-[#FF6B35]/20'
                      : isSoldOut
                        ? 'border-gray-300 bg-gray-50 opacity-70'
                        : 'border-gray-200 bg-white'
                  } ${selectedRound === round.id ? 'ring-4 ring-[#FF6B35]/30' : ''}`}
                >
                  {/* Label + Amount */}
                  <div className="text-center mb-4">
                    <div className="text-xs lg:text-sm font-semibold text-gray-600 mb-1">{displayLabel}:</div>
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900">{round.amount}</div>
                  </div>

                  {/* Status */}
                  <div className="text-center mb-4">
                    <span className={`inline-block px-3 lg:px-4 py-1 lg:py-1.5 rounded-full text-xs lg:text-sm font-bold ${
                      isActive(round) ? 'bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white'
                      : isSoon(round) ? 'bg-gradient-to-r from-[#2196F3] to-[#42A5F5] text-white'
                      : 'bg-gray-300 text-gray-600'
                    }`}>{statusLabel(round)}</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t.pricePerShare}</span>
                      <span className="font-bold text-[#FF6B35]">{formattedPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t.minimum}</span>
                      <span className="font-semibold">{round.min_investment.toLocaleString()} {t.sharesLabel}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-4">
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        className={`h-full ${
                          isSoldOut ? 'bg-gray-400'
                          : isActive(round) ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C42]'
                          : 'bg-gradient-to-r from-[#2196F3] to-[#42A5F5]'
                        }`}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-2 text-center">
                      {soldMln} {t.millionShort} / {totalMln} {t.millionShort} {t.sharesLabel}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    {isActive(round) && (
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-gradient-to-r from-[#FF7A59] to-[#EB5632] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                        onClick={e => { e.stopPropagation(); handleBuySharesFromCard(round.id); }}>
                        {t.buyShares} <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    )}
                    {isSoldOut && (
                      <button disabled className="w-full py-3 bg-gray-300 text-gray-600 rounded-xl font-bold cursor-not-allowed">
                        {t.soldOut}
                      </button>
                    )}
                    {isSoon(round) && (
                      <button className="w-full py-3 bg-gradient-to-r from-[#2196F3] to-[#42A5F5] text-white rounded-xl font-bold hover:shadow-lg transition-all">
                        {t.notifyMe}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Purchase Calculator */}
      {rounds.length > 0 && (
        <div className="mb-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            ref={calculatorRef}>
            <div className="flex items-center gap-2 mb-6">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">{t.calculateIncome}</h3>
            </div>

            {/* Round tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
              {rounds.map(round => (
                <button key={round.id}
                  className={`px-2 lg:px-4 py-2 rounded-lg text-[10px] lg:text-sm font-medium transition-all whitespace-nowrap ${
                    round.id === activeRoundId ? 'bg-[#D4522A] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveRoundId(round.id)}>
                  {round.label || round.name}
                </button>
              ))}
            </div>

            {activeRound ? (
              <>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t.minInvestment}</p>
                    <p className="text-xl font-bold text-gray-900">{activeRound.min_investment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t.shareCount}</p>
                    <p className="text-xl font-bold text-gray-900">{mySharesInRound.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t.availablePrice}</p>
                    <p className="text-xl font-bold text-gray-900">${(activeRound.min_investment * activeRound.price).toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t.availableShares}</p>
                    <p className="text-xl font-bold text-gray-900">{availableShares.toLocaleString()}</p>
                  </div>
                </div>

                {/* Amount input */}
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-2 block">{t.investmentAmount}</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={amount === 0 ? '' : amount}
                    onFocus={e => e.target.select()}
                    onChange={e => {
                      const raw = e.target.value.replace(/\D/g, '');
                      setAmount(raw === '' ? 0 : parseInt(raw, 10));
                    }}
                    onBlur={() => {
                      if (amount < activeRound.min_investment) setAmount(activeRound.min_investment);
                    }}
                    disabled={!isActive(activeRound)}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] ${
                      !isActive(activeRound) ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
                    }`}
                  />
                </div>

                {/* Slider */}
                <div className="mb-6">
                  <input
                    type="range"
                    min={activeRound.min_investment}
                    max={Math.max(activeRound.min_investment, availableShares)}
                    step="100"
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    disabled={!isActive(activeRound)}
                    className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4522A] ${
                      !isActive(activeRound) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />
                </div>

                {/* Payment amount */}
                <div className="bg-[#FFF9F0] rounded-xl p-4 flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-700">{t.yourReferralIncome}</span>
                  <span className="text-xl font-bold text-[#D4522A]">${paymentAmount}</span>
                </div>

                {/* Inactive round message */}
                {!isActive(activeRound) && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-center">
                    <p className="text-sm text-blue-800 font-medium">
                      {isSoon(activeRound) ? t.roundNotStarted : t.roundCompleted}
                    </p>
                  </div>
                )}

                <button
                  className={`w-full py-3 rounded-xl font-medium transition-all shadow-md ${
                    isActive(activeRound) && !buying
                      ? 'bg-[#D4522A] hover:bg-[#B8441F] text-white cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={handleBuyShares}
                  disabled={!isActive(activeRound) || buying}
                >
                  {buying ? 'Обработка...' : isActive(activeRound) ? t.buyMore : t.roundInactive}
                </button>
              </>
            ) : null}
          </motion.div>
        </div>
      )}

      {/* Investment History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-visible">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg lg:text-xl font-bold text-gray-900">{t.investmentPortfolio}</h3>
        </div>

        {loadingInv ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
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
                {investments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400 text-sm">История покупок пуста</td>
                  </tr>
                ) : (
                  investments.map((inv, idx) => {
                    const roundLabel = rounds.find(r => r.id === inv.round)?.label || rounds.find(r => r.id === inv.round)?.name || inv.round;
                    const dateStr = inv.date ? String(inv.date).slice(0, 10) : '—';
                    return (
                      <tr key={inv.id || idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-900">{roundLabel}</td>
                        <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-900">{Number(inv.shares || 0).toLocaleString()}</td>
                        <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-900">{formatAmount(inv.amount)}</td>
                        <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-900">{dateStr}</td>
                        <td className="py-3 lg:py-4 px-2 lg:px-4">
                          <span className={`inline-flex px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-[10px] lg:text-xs font-medium border ${getStatusColor(inv.status)}`}>
                            {t[inv.status as keyof typeof t] || inv.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </ScrollIndicator>
        )}
      </motion.div>
    </div>
  );
}
