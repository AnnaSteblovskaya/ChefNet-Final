import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Target, Users, Award, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';

interface ChartVariantsProps {
  totalMyShares: number;
  totalSpent: number;
  roundsData: any;
}

export default function ChartVariants({ totalMyShares, totalSpent, roundsData }: ChartVariantsProps) {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  
  // Вариант 1: Ваша доля в проекте ChefNet
  const totalProjectShares = 10000000; // 10 миллионов долей в проекте
  const mySharePercentage = (totalMyShares / totalProjectShares) * 100;
  
  const variant1Data = [
    { name: 'Ваша доля', value: totalMyShares },
    { name: 'Остальные доли', value: totalProjectShares - totalMyShares }
  ];

  // Вариант 2: Распределение долей по раундам
  const variant2Data = [
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
  ].filter(item => item.value > 0);

  // Вариант 3: Прогресс инвестирования в текущем раунде
  const activeRound = Object.values(roundsData).find((r: any) => r.status === 'Активный') as any;
  const variant3Data = activeRound ? [
    { name: 'Куплено вами', value: activeRound.myShares },
    { name: 'Доступно', value: activeRound.totalShares - activeRound.soldShares }
  ] : [
    { name: 'Куплено вами', value: 0 },
    { name: 'Доступно', value: 100 }
  ];

  // Вариант 4: Портфель + Потенциал
  const potentialValue = totalSpent * 5.2; // Потенциальная стоимость при успешном выходе
  const variant4Data = [
    { name: 'Текущая стоимость', value: totalSpent },
    { name: 'Потенциальная прибыль', value: potentialValue - totalSpent }
  ];

  const COLORS_GREEN_GRAY = ['#7CB342', '#F5EDE4'];
  const COLORS_GRADIENT = ['#4A90E2', '#7CB342', '#FF9800', '#9C27B0'];
  const COLORS_BLUE = ['#4A90E2', '#E3F2FD'];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">{t.chartVariantsTitle}</h2>
      
      {/* Вариант 1: Ваша доля в проекте */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)]"
      >
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7CB342] to-[#9CCC65] flex items-center justify-center shadow-md">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">
              {t.variant1Title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {t.variant1Desc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={variant1Data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {variant1Data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_GREEN_GRAY[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[var(--color-text)]">
                  {totalMyShares.toLocaleString()}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)] mt-1">ваших долей</span>
                <div className="mt-3 px-4 py-2 bg-[#7CB342] rounded-full">
                  <span className="text-2xl font-bold text-white">
                    {mySharePercentage.toFixed(3)}%
                  </span>
                </div>
                <span className="text-xs text-[var(--color-text-secondary)] mt-1">доля в проекте</span>
              </div>
            </div>
          </div>

          {/* Legend & Info */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#7CB342]/10 to-[#9CCC65]/10 rounded-xl border border-[#7CB342]/20">
              <div className="w-4 h-4 rounded-full bg-[#7CB342]"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--color-text)]">Ваша доля</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {totalMyShares.toLocaleString()} из {totalProjectShares.toLocaleString()} долей
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-4 h-4 rounded-full bg-[#F5EDE4] border-2 border-gray-300"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--color-text)]">Остальные доли</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {(totalProjectShares - totalMyShares).toLocaleString()} долей
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-800">
                Чем больше ваша доля, тем больше ваше влияние на компанию и потенциальная прибыль при выходе
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Вариант 2: Распределение по раундам */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)]"
      >
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4A90E2] to-[#64B5F6] flex items-center justify-center shadow-md">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">
              {t.variant2Title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {t.variant2Desc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              {variant2Data.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={variant2Data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {variant2Data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-[var(--color-text)]">
                      {totalMyShares.toLocaleString()}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)] mt-1">всего долей</span>
                    <span className="text-lg font-semibold text-[#FF6B35] mt-2">
                      ${totalSpent.toFixed(2)}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">инвестировано</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-center text-[var(--color-text-secondary)]">
                    Нет данных<br/>о покупках
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col justify-center space-y-3">
            {variant2Data.length > 0 ? (
              variant2Data.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl border transition-all hover:shadow-md"
                  style={{ 
                    backgroundColor: `${item.color}10`,
                    borderColor: `${item.color}40`
                  }}
                >
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--color-text)]">{item.name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {item.value.toLocaleString()} долей
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold" style={{ color: item.color }}>
                      {((item.value / totalMyShares) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-50 rounded-xl text-center">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Купите доли в разных раундах для диверсификации портфеля
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Вариант 3: Прогресс в текущем раунде */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)]"
      >
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF9800] to-[#FFB74D] flex items-center justify-center shadow-md">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">
              {t.variant3Title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {t.variant3Desc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={variant3Data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
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

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide">
                  {activeRound?.name || 'Нет активного'}
                </span>
                <span className="text-3xl font-bold text-[var(--color-text)] mt-1">
                  {activeRound?.myShares?.toLocaleString() || 0}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)]">ваших долей</span>
                <div className="mt-2 px-3 py-1 bg-[#FF9800] rounded-full">
                  <span className="text-xl font-bold text-white">
                    {activeRound 
                      ? ((activeRound.myShares / activeRound.totalShares) * 100).toFixed(2)
                      : '0.00'
                    }%
                  </span>
                </div>
                <span className="text-xs text-[var(--color-text-secondary)] mt-1">от раунда</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-4">
            {activeRound ? (
              <>
                <div className="p-4 bg-gradient-to-r from-[#FF9800]/10 to-[#FFB74D]/10 rounded-xl border border-[#FF9800]/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--color-text)]">Ваши доли</span>
                    <span className="text-lg font-bold text-[#FF9800]">
                      {activeRound.myShares.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-secondary)]">Инвестировано</span>
                    <span className="text-sm font-semibold text-[var(--color-text)]">
                      ${(activeRound.myShares * activeRound.price).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--color-text)]">Всего в раунде</span>
                    <span className="text-lg font-bold text-[var(--color-text)]">
                      {activeRound.totalShares.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-secondary)]">Цена за долю</span>
                    <span className="text-sm font-semibold text-[var(--color-text)]">
                      ${activeRound.price}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-xs text-orange-800">
                    Вы владеете <strong>{((activeRound.myShares / activeRound.totalShares) * 100).toFixed(2)}%</strong> от текущего раунда
                  </p>
                </div>
              </>
            ) : (
              <div className="p-6 bg-gray-50 rounded-xl text-center">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Нет активного раунда для отображения
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Вариант 4: Текущая стоимость vs Потенциал */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)]"
      >
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9C27B0] to-[#BA68C8] flex items-center justify-center shadow-md">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">
              {t.variant4Title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {t.variant4Desc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={variant4Data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
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

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide">
                  Потенциал
                </span>
                <span className="text-3xl font-bold text-[#7CB342] mt-1">
                  ${potentialValue.toFixed(0)}
                </span>
                <div className="mt-3 px-4 py-2 bg-gradient-to-r from-[#7CB342] to-[#9CCC65] rounded-full">
                  <span className="text-xl font-bold text-white">
                    +{((potentialValue / totalSpent - 1) * 100).toFixed(0)}%
                  </span>
                </div>
                <span className="text-xs text-[var(--color-text-secondary)] mt-1">ROI</span>
              </div>
            </div>
          </div>

          {/* Legend & Stats */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="p-4 bg-gradient-to-r from-[#4A90E2]/10 to-[#64B5F6]/10 rounded-xl border border-[#4A90E2]/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4A90E2]"></div>
                  <span className="text-sm font-semibold text-[var(--color-text)]">Инвестировано</span>
                </div>
                <span className="text-xl font-bold text-[#4A90E2]">
                  ${totalSpent.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] ml-5">
                Текущая стоимость портфеля
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-[#7CB342]/10 to-[#9CCC65]/10 rounded-xl border border-[#7CB342]/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#7CB342]"></div>
                  <span className="text-sm font-semibold text-[var(--color-text)]">Потенциал</span>
                </div>
                <span className="text-xl font-bold text-[#7CB342]">
                  ${(potentialValue - totalSpent).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] ml-5">
                Прогнозируемая прибыль при выходе
              </p>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-purple-800">
                  Прогноз основан на средней доходности стартапов на этапе {activeRound?.name || 'роста'}. 
                  Реальная прибыль может отличаться.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Рекомендация */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-[#FF6B35]/5 to-[#FF8C42]/5 rounded-2xl p-6 border border-[#FF6B35]/20"
      >
        <h4 className="text-lg font-bold text-[var(--color-text)] mb-3">💡 Рекомендация</h4>
        <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
          <p>
            <strong className="text-[var(--color-text)]">Вариант 1</strong> — лучший выбор для показа личной доли в проекте. 
            Мотивирует инвестора и показывает его вес в компании.
          </p>
          <p>
            <strong className="text-[var(--color-text)]">Вариант 2</strong> — отлично подходит для диверсифицированного портфеля с покупками в нескольких раундах.
          </p>
          <p>
            <strong className="text-[var(--color-text)]">Вариант 3</strong> — полезен для фокуса на текущем активном раунде.
          </p>
          <p>
            <strong className="text-[var(--color-text)]">Вариант 4</strong> — мотивирует через демонстрацию потенциальной прибыли.
          </p>
        </div>
      </motion.div>
    </div>
  );
}