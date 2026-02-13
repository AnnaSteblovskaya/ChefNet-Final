import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, Award, DollarSign, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';

interface PortfolioChartProps {
  variant: 'ownership' | 'rounds' | 'active-round' | 'roi';
  totalShares: number;
  totalSpent: number;
  roundsData: any;
  isMobile: boolean;
  isTeam?: boolean;
}

// Helper function to get translated round name
const getTranslatedRoundName = (roundName: string, language: string) => {
  const t = dashboardTranslations[language as keyof typeof dashboardTranslations];
  const nameLower = roundName.toLowerCase();
  
  if (nameLower.includes('посева') || nameLower === 'pre-seed') {
    return t.roundNameSeed;
  } else if (nameLower.includes('private') || nameLower === 'private') {
    return t.roundNamePrivate;
  } else if (nameLower.includes('marketing') || nameLower === 'marketing') {
    return t.roundNameMarketing;
  } else if (nameLower.includes('public') || nameLower === 'public') {
    return t.roundNamePublicIPO;
  }
  
  return roundName;  // Fallback to original name
};

export default function PortfolioChart({ 
  variant, 
  totalShares, 
  totalSpent, 
  roundsData, 
  isMobile,
  isTeam = false 
}: PortfolioChartProps) {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  
  // Вариант 1: Доля в проекте
  const totalProjectShares = 10000000;
  const ownershipPercentage = (totalShares / totalProjectShares) * 100;
  
  const ownershipData = [
    { name: 'Ваша доля', value: totalShares },
    { name: 'Остальные доли', value: totalProjectShares - totalShares }
  ];

  // Вариант 2: Распределение по раундам
  const roundsDistribution = isTeam 
    ? [
        // Team can only buy from Seed round (Pre-Seed)
        { 
          name: 'Pre-Seed', 
          value: totalShares, // All team shares are from Seed round
          color: '#4A90E2'
        }
      ].filter(item => item.value > 0)
    : [
        { 
          name: 'Pre-Seed', 
          value: roundsData.Seed?.myShares || 0,
          color: '#4A90E2'
        },
        { 
          name: 'Seed', 
          value: roundsData.Private?.myShares || 0,
          color: '#7CB342'
        },
        { 
          name: 'Private', 
          value: roundsData.Marketing?.myShares || 0,
          color: '#FF9800'
        },
        { 
          name: 'Public', 
          value: roundsData['Public/IPO']?.myShares || 0,
          color: '#9C27B0'
        }
      ].filter(item => item.value > 0).map(item => ({
        ...item,
        name: getTranslatedRoundName(item.name, language)
      }));

  // Вариант 3: Активный раунд
  const activeRound = Object.values(roundsData).find((r: any) => r.status === 'Активный') as any;
  
  // For team: use totalShares (all team shares are from active Seed round)
  // For user: use activeRound.myShares
  const teamSharesInActiveRound = isTeam ? totalShares : (activeRound?.myShares || 0);
  
  const activeRoundData = activeRound ? [
    { name: 'Куплено вами', value: teamSharesInActiveRound },
    { name: 'Доступно', value: activeRound.totalShares - activeRound.soldShares }
  ] : [
    { name: 'Куплено вами', value: 0 },
    { name: 'Доступно', value: 100 }
  ];

  // Вариант 4: ROI
  // Calculate ROI based on actual IPO price ($1.00 per share)
  const ipoPrice = 1.00;
  const potentialValue = totalShares * ipoPrice; // Total value at IPO
  const roi = totalSpent > 0 ? ((potentialValue / totalSpent - 1) * 100) : 0;
  
  const roiData = [
    { name: 'Текущая стоимость', value: totalSpent },
    { name: 'Потенциальная прибыль', value: potentialValue - totalSpent }
  ];

  const COLORS_GREEN_GRAY = ['#7CB342', '#F5EDE4'];
  const COLORS_ORANGE = ['#FF9800', '#FFE0B2'];
  const COLORS_BLUE_GREEN = ['#4A90E2', '#7CB342'];

  // Рендер в зависимости от варианта
  const renderChart = () => {
    switch (variant) {
      case 'ownership':
        return (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ownershipData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 70 : 80}
                  outerRadius={isMobile ? 105 : 115}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {ownershipData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_GREEN_GRAY[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
              <span className="text-[9px] lg:text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wide">
                {isTeam ? t.team : t.myShares}
              </span>
              <span className="text-xl lg:text-3xl font-bold text-[var(--color-text)] mt-0.5 lg:mt-1">
                {totalShares.toLocaleString()}
              </span>
              <div className="mt-1 lg:mt-2 px-2 py-1 lg:px-3 lg:py-1.5 bg-[#7CB342] rounded-full">
                <span className="text-sm lg:text-lg font-bold text-white whitespace-nowrap">
                  {ownershipPercentage.toFixed(3)}%
                </span>
              </div>
              <span className="text-[9px] lg:text-[10px] text-[var(--color-text-secondary)] mt-1 lg:mt-1.5">
                {t.projectShare}
              </span>
            </div>
          </>
        );

      case 'rounds':
        return roundsDistribution.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roundsDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 70 : 80}
                  outerRadius={isMobile ? 105 : 115}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {roundsDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
              <span className="text-[9px] lg:text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wide">
                {isTeam ? t.team : t.total}
              </span>
              <span className="text-xl lg:text-3xl font-bold text-[var(--color-text)] mt-0.5 lg:mt-1">
                {totalShares.toLocaleString()}
              </span>
              <span className="text-[9px] lg:text-[10px] text-[var(--color-text-secondary)] mt-0.5">{t.sharesWord}</span>
              <span className="text-sm lg:text-lg font-semibold text-[#FF6B35] mt-1 lg:mt-2">
                ${totalSpent.toFixed(2)}
              </span>
              <span className="text-[9px] lg:text-[10px] text-[var(--color-text-secondary)] mt-0.5">{t.investedWord}</span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <p className="text-center text-sm text-[var(--color-text-secondary)]">
              {isTeam ? t.teamNoPurchases : t.noDataPurchases}
            </p>
          </div>
        );

      case 'active-round':
        return (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activeRoundData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 70 : 80}
                  outerRadius={isMobile ? 105 : 115}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell fill="#FF9800" />
                  <Cell fill="#FFE0B2" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
              <span className="text-[9px] lg:text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wide">
                {activeRound ? getTranslatedRoundName(activeRound.name, language) : t.noActive}
              </span>
              <span className="text-xl lg:text-3xl font-bold text-[var(--color-text)] mt-0.5 lg:mt-1">
                {teamSharesInActiveRound.toLocaleString()}
              </span>
              <span className="text-[9px] lg:text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                {isTeam ? t.teamSharesWord : t.yourSharesWord}
              </span>
              <div className="mt-1 lg:mt-2 px-2 py-1 lg:px-3 lg:py-1.5 bg-[#FF9800] rounded-full">
                <span className="text-sm lg:text-lg font-bold text-white whitespace-nowrap">
                  {activeRound 
                    ? ((teamSharesInActiveRound / activeRound.totalShares) * 100).toFixed(2)
                    : '0.00'
                  }%
                </span>
              </div>
              <span className="text-[9px] lg:text-[10px] text-[var(--color-text-secondary)] mt-1 lg:mt-1.5">{t.ofRound}</span>
            </div>
          </>
        );

      case 'roi':
        return (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roiData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 70 : 80}
                  outerRadius={isMobile ? 105 : 115}
                  paddingAngle={3}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell fill="#4A90E2" />
                  <Cell fill="#7CB342" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
              <span className="text-[9px] lg:text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wide">
                {t.potential}
              </span>
              <span className="text-xl lg:text-3xl font-bold text-[#7CB342] mt-0.5 lg:mt-1">
                ${potentialValue.toFixed(0)}
              </span>
              <div className="mt-1 lg:mt-2 px-2 py-1 lg:px-3 lg:py-1.5 bg-gradient-to-r from-[#7CB342] to-[#9CCC65] rounded-full">
                <span className="text-sm lg:text-lg font-bold text-white whitespace-nowrap">
                  +{roi.toFixed(0)}%
                </span>
              </div>
              <span className="text-[9px] lg:text-[10px] text-[var(--color-text-secondary)] mt-1 lg:mt-1.5">ROI</span>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-56 h-56 lg:w-64 lg:h-64">
      {renderChart()}
    </div>
  );
}