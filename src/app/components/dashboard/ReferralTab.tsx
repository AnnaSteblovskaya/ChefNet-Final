import { motion } from 'motion/react';
import { Users, Link2, Copy, DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { useState } from 'react';

export default function ReferralTab() {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  const [copied, setCopied] = useState(false);

  const referredInvestors = [
    { name: 'John Doe', status: 'invested', amount: '$5,000', commission: '$500' },
    { name: 'Jane Smith', status: 'registered', amount: '$0', commission: '$0' },
    { name: 'Peter Jones', status: 'invested', amount: '$10,000', commission: '$1,000' },
    { name: 'Alice Williams', status: 'invested', amount: '$2,500', commission: '$250' },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://chefinvest.com/register?ref=investor123');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.referralTitle}</h2>
        <p className="text-gray-600">{t.referralSubtitle}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">{t.referredUsers}</span>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">4</span>
          </div>
          <p className="text-sm text-gray-500">{t.totalUsersReferred}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">{t.totalCommission}</span>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">$1,750</span>
          </div>
          <p className="text-sm text-gray-500">{t.earnedFromReferrals}</p>
        </motion.div>
      </div>

      {/* Referral Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Link2 className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">{t.yourReferralLink}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">{t.linkDesc}</p>

        <div className="flex gap-3">
          <input
            type="text"
            value="https://chefinvest.com/register?ref=investor123"
            readOnly
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-700"
          />
          <button
            onClick={handleCopyLink}
            className="px-6 py-3 bg-[#D4522A] hover:bg-[#B8441F] text-white rounded-xl font-medium transition-all shadow-md flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? t.copied : t.copyLink}</span>
          </button>
        </div>
      </motion.div>

      {/* Referred Investors Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">{t.referredInvestors}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">{t.trackDesc}</p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">{t.investor}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">{t.status}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">{t.investedAmount}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">{t.yourCommission}</th>
              </tr>
            </thead>
            <tbody>
              {referredInvestors.map((investor, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-900">{investor.name}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        investor.status === 'invested'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}
                    >
                      {investor.status === 'invested' ? t.invested : t.registered}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">{investor.amount}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-green-600">{investor.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}