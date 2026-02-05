import { motion } from 'motion/react';
import { useState } from 'react';
import { Briefcase, MoreVertical, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';

export default function InvestmentsTab() {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  const [amount, setAmount] = useState(24000);
  const [shares, setShares] = useState(500);
  const [referrals, setReferrals] = useState(11);
  const [selectedRound, setSelectedRound] = useState<string | null>('seriesB');

  const rounds = [
    {
      id: 'seed',
      name: 'Раунд посева',
      pricePerShare: '$0.50',
      minInvestment: '100 акций',
      progress: 100,
      progressLabel: '1.0 млн / 1 млн акций',
      status: 'Распроданный',
      amount: '$150,000',
    },
    {
      id: 'seriesA',
      name: 'Серия A',
      pricePerShare: '$1.50',
      minInvestment: '50 акций',
      progress: 100,
      progressLabel: '2.0 млн / 2 млн акций',
      status: 'Распроданный',
      amount: '$350,000',
    },
    {
      id: 'seriesB',
      name: 'Серия B',
      pricePerShare: '$3.00',
      minInvestment: '25 акций',
      progress: 60,
      progressLabel: '2.5 млн / 5 млн акций',
      status: 'Активный',
      amount: '$500,000',
      highlight: true,
    },
    {
      id: 'seriesC',
      name: 'Серия C / IPO',
      pricePerShare: '$5.00',
      minInvestment: '20 акций',
      progress: 0,
      progressLabel: '0.0 млн / 10 млн акций',
      status: 'Вскоре',
      amount: '$1,000,000',
    },
  ];

  const investments = [
    { round: 'Seed', amount: '$5,000', date: '2024-06-15', status: 'confirmed' },
    { round: 'Seed', amount: '$5,000', date: '2024-06-15', status: 'verified' },
    { round: 'Seed', amount: '$5,000', date: '2024-06-15', status: 'pending' },
    { round: 'Seed', amount: '$5,000', date: '2024-06-15', status: 'requested' },
    { round: 'Seed', amount: '$5,000', date: '2024-06-15', status: 'cancelled' },
  ];

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

  const referralIncome = (referrals * 500).toFixed(0);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.myInvestmentsTitle}</h2>
        <p className="text-gray-600">{t.myInvestmentsSubtitle}</p>
      </div>

      {/* Investment Rounds Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {rounds.map((round, index) => (
          <motion.div
            key={round.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setSelectedRound(round.id)}
            className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all ${
              round.highlight
                ? "border-[#FF6B35] bg-gradient-to-br from-white to-[#FFE5DE] shadow-xl shadow-[#FF6B35]/20"
                : round.status === "Распроданный"
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
              <div className="text-sm font-semibold text-gray-600 mb-1">
                {round.name.includes("Серия C")
                  ? "Public/IPO:"
                  : round.name.includes("посева")
                    ? "Seed:"
                    : round.name.includes("A")
                      ? "Private:"
                      : "Marketing:"}
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {round.amount}
              </div>
            </div>

            {/* Status Badge */}
            <div className="text-center mb-4">
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${
                  round.status === "Активный"
                    ? "bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white"
                    : round.status === "Вскоре"
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
                  Цена/акция
                </span>
                <span className="font-bold text-[#FF6B35]">
                  {round.pricePerShare}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Минимум
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
                    round.status === "Распроданный"
                      ? "bg-gray-400"
                      : round.status === "Активный"
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
              {round.status === "Активный" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  Инвестировать
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}

              {round.status === "Распроданный" && (
                <button
                  disabled
                  className="w-full py-3 bg-gray-300 text-gray-600 rounded-xl font-bold cursor-not-allowed"
                >
                  Распроданный
                </button>
              )}

              {round.status === "Вскоре" && (
                <button className="w-full py-3 bg-gradient-to-r from-[#2196F3] to-[#42A5F5] text-white rounded-xl font-bold hover:shadow-lg transition-all">
                  Уведомить меня
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Investment Portfolio Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">{t.investmentPortfolio}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">{t.portfolioDesc}</p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">{t.investmentRound}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">{t.amountUSD}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">{t.date}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">{t.status}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-900">{inv.round}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{inv.amount}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{inv.date}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(inv.status)}`}>
                      {t[inv.status as keyof typeof t]}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Income Calculators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investment Calculator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-1">{t.calculateIncome}</h3>
          <p className="text-sm text-gray-600 mb-6">{t.calculatorDesc}</p>

          {/* Round tabs */}
          <div className="flex gap-2 mb-6">
            {['Pre-Seed', 'Seed', 'Private', 'Public'].map((round) => (
              <button
                key={round}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  round === 'Seed'
                    ? 'bg-[#D4522A] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {round}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-700 mb-6 leading-relaxed">{t.phaseDesc}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.minInvestment}</p>
              <p className="text-xl font-bold text-gray-900">$1000</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.shareCount}</p>
              <p className="text-xl font-bold text-gray-900">5000 шт</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.availablePrice}</p>
              <p className="text-xl font-bold text-gray-900">$149000</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.availableShares}</p>
              <p className="text-xl font-bold text-gray-900">50000 шт</p>
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-2 block">{t.investmentAmount}</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A]"
            />
          </div>

          {/* Shares slider */}
          <div className="mb-6">
            <input
              type="range"
              min="1000"
              max="50000"
              step="100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4522A]"
            />
          </div>

          {/* Result */}
          <div className="bg-[#FFF9F0] rounded-xl p-4 flex items-center justify-between mb-6">
            <span className="text-sm text-gray-700">{t.yourReferralIncome}</span>
            <span className="text-xl font-bold text-[#D4522A]">${(amount * 0.025).toFixed(0)}</span>
          </div>

          <button className="w-full py-3 bg-[#D4522A] hover:bg-[#B8441F] text-white rounded-xl font-medium transition-all shadow-md">
            {t.buyMore}
          </button>
        </motion.div>

        {/* Referral Calculator */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">{t.referralCalculator}</h3>

          {/* Referrals Input */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-2 block">{t.numberOfReferrals}</label>
            <input
              type="number"
              value={referrals}
              onChange={(e) => setReferrals(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A]"
            />
          </div>

          {/* Referrals slider */}
          <div className="mb-6">
            <input
              type="range"
              min="0"
              max="100"
              value={referrals}
              onChange={(e) => setReferrals(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4522A]"
            />
          </div>

          {/* Result */}
          <div className="bg-[#FFF9F0] rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm text-gray-700">{t.yourReferralIncome}</span>
            <span className="text-xl font-bold text-[#D4522A]">${referralIncome}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}