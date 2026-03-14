import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Stats {
  users: { total: number; verified: number };
  investments: { total: number; totalShares: number; pending: number };
  kyc: { total: number; pending: number };
  news: { published: number };
  partners: { active: number };
}

export default function OverviewSection() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi.stats().then(setStats).catch(e => setError(e.message));
  }, []);

  if (error) return <div className="text-red-400 p-4">{error}</div>;
  if (!stats) return <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div>;

  const cards = [
    { label: 'Пользователи', value: stats.users.total, sub: `${stats.users.verified} подтверждено`, color: 'from-blue-500/20 to-blue-600/10', icon: '👥' },
    { label: 'Инвестиции', value: stats.investments.total, sub: `${stats.investments.pending} ожидают`, color: 'from-orange-500/20 to-orange-600/10', icon: '💰' },
    { label: 'Акций продано', value: stats.investments.totalShares.toLocaleString(), sub: 'всего', color: 'from-green-500/20 to-green-600/10', icon: '📊' },
    { label: 'KYC заявки', value: stats.kyc.total, sub: `${stats.kyc.pending} на проверке`, color: 'from-purple-500/20 to-purple-600/10', icon: '🔍' },
    { label: 'Новостей', value: stats.news.published, sub: 'опубликовано', color: 'from-pink-500/20 to-pink-600/10', icon: '📰' },
    { label: 'Партнёров', value: stats.partners.active, sub: 'активных', color: 'from-cyan-500/20 to-cyan-600/10', icon: '🤝' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Обзор</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(c => (
          <div key={c.label} className={`bg-gradient-to-br ${c.color} border border-white/10 rounded-2xl p-6`}>
            <div className="text-3xl mb-2">{c.icon}</div>
            <div className="text-3xl font-bold text-white mb-1">{c.value}</div>
            <div className="text-white/70 text-sm font-medium">{c.label}</div>
            <div className="text-white/40 text-xs mt-1">{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
