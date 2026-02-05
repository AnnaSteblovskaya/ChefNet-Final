import { motion } from 'motion/react';
import { 
  TrendingUp, 
  DollarSign, 
  UserPlus, 
  CheckCircle,
  TrendingUp as TrendingUpIcon,
  ArrowUpRight,
  Bell
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';

export default function DashboardTab() {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];

  // Sample data for pie chart
  const chartData = [
    { name: 'Progress', value: 15 },
    { name: 'Remaining', value: 85 }
  ];

  return (
    <div>
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.dashboardTitle}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Total Investment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">{t.totalInvestment}</span>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">$12,500.00</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <ArrowUpRight className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">+10%</span>
            <span className="text-gray-500">{t.fromLastMonth}</span>
          </div>
        </motion.div>

        {/* Portfolio Value */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">{t.portfolioValue}</span>
            <TrendingUpIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">$15,231.89</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <ArrowUpRight className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">+25.3%</span>
            <span className="text-gray-500">{t.overallGrowth}</span>
          </div>
        </motion.div>

        {/* Referrals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">{t.referrals}</span>
            <UserPlus className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">+5</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>$1,200 {t.earnedThisYear}</span>
          </div>
        </motion.div>

        {/* KYC Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">{t.kycStatus}</span>
            <CheckCircle className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mb-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
              {t.verified}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>{t.fullAccess}</span>
          </div>
        </motion.div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-start gap-3 mb-4">
            <TrendingUpIcon className="w-6 h-6 text-gray-700 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{t.portfolioPerformance}</h3>
              <p className="text-sm text-gray-600">{t.investmentValue}</p>
            </div>
          </div>

          <div className="flex items-center justify-center py-8">
            <div className="relative w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill="#7CB342" />
                    <Cell fill="#F5EDE4" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">123567</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-sm text-gray-500">................</span>
                </div>
                <span className="text-2xl font-bold text-gray-900 mt-1">15%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-start gap-3 mb-6">
            <Bell className="w-6 h-6 text-gray-700 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{t.recentActivity}</h3>
              <p className="text-sm text-gray-600">{t.activitySubtitle}</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {/* Notification 1 */}
            <div className="flex gap-3 p-3 bg-[#FFF9F0] rounded-lg border border-[#FFE8C5]">
              <Bell className="w-5 h-5 text-[#D4522A] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-800">{t.activitySubtitle}</p>
                <span className="text-xs text-gray-500 mt-1 block">2 {t.daysAgo}</span>
              </div>
            </div>

            {/* Notification 2 */}
            <div className="flex gap-3 p-3 bg-[#FFF9F0] rounded-lg border border-[#FFE8C5]">
              <Bell className="w-5 h-5 text-[#D4522A] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-800">Your referral John Doe has successfully invested.</p>
                <span className="text-xs text-gray-500 mt-1 block">5 {t.daysAgo}</span>
              </div>
            </div>

            {/* Notification 3 */}
            <div className="flex gap-3 p-3 bg-[#FFF9F0] rounded-lg border border-[#FFE8C5]">
              <Bell className="w-5 h-5 text-[#D4522A] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-800">Please complete your KYC verification to access all features.</p>
                <span className="text-xs text-gray-500 mt-1 block">1 {t.weekAgo}</span>
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-[#FFF9F0] hover:bg-[#FFE8C5] text-gray-800 rounded-xl font-medium transition-all border border-[#FFE8C5]">
            {t.viewAllNotifications}
          </button>
        </motion.div>
      </div>
    </div>
  );
}