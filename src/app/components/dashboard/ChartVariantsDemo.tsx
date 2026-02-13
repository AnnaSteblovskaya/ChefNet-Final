import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import ChartVariants from './ChartVariants';

interface ChartVariantsDemoProps {
  onClose: () => void;
}

export default function ChartVariantsDemo({ onClose }: ChartVariantsDemoProps) {
  const [roundsData, setRoundsData] = useState(() => {
    const saved = localStorage.getItem('chefnet_rounds_data');
    if (saved) {
      return JSON.parse(saved);
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

  const totalMyShares = Object.values(roundsData).reduce((sum: number, round: any) => sum + round.myShares, 0);
  const totalSpent = Object.values(roundsData).reduce((sum: number, round: any) => sum + (round.myShares * round.price), 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
                  Демонстрация вариантов круговых диаграмм
                </h1>
                <p className="text-[var(--color-text-secondary)]">
                  Выберите наиболее подходящий вариант для вашей панели управления
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-[var(--color-text-secondary)]" />
              </button>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-[var(--color-border)]">
            <ChartVariants 
              totalMyShares={totalMyShares}
              totalSpent={totalSpent}
              roundsData={roundsData}
            />
          </div>

          {/* Close Button */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Закрыть демонстрацию
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
