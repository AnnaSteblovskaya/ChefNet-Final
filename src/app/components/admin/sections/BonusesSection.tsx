import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Bonus {
  id: number; amount: number; shares: number; created_at: string;
  referrer_email: string; referrer_name: string;
  referral_email: string; referral_name: string;
  level: number; status: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  paid: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

export default function BonusesSection() {
  const [items, setItems] = useState<Bonus[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    adminApi.bonuses.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, []);

  const updateStatus = async (id: number, status: string) => {
    await adminApi.bonuses.update(id, { status });
    setItems(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const filtered = items.filter(b =>
    (b.referrer_email + b.referral_email + b.referrer_name + b.referral_name).toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const rows = [['ID', 'Amount', 'Shares', 'Referrer', 'Referral', 'Status', 'Date'],
      ...items.map(b => [b.id, b.amount, b.shares, b.referrer_email, b.referral_email, b.status, b.created_at])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'bonuses.csv';
    a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-white">Бонусы</h2>
        <button onClick={exportCSV} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition">↓ Экспорт CSV</button>
      </div>
      <div className="mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по email..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm w-64 focus:outline-none focus:border-[#D4522A]" />
      </div>

      {loading ? (
        <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead><tr className="border-b border-white/10">
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">ID</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Сумма</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Акции</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Реферер</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Реферал</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Статус</th>
            </tr></thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-white/50 text-sm">{b.id}</td>
                  <td className="px-4 py-3 text-white text-sm font-medium">${Number(b.amount || 0).toFixed(2)}</td>
                  <td className="px-4 py-3 text-white/70 text-sm">{b.shares || 0}</td>
                  <td className="px-4 py-3 text-white/70 text-sm">{b.referrer_email || '—'}</td>
                  <td className="px-4 py-3 text-white/70 text-sm">{b.referral_email || '—'}</td>
                  <td className="px-4 py-3">
                    <select value={b.status || 'pending'} onChange={e => updateStatus(b.id, e.target.value)}
                      className={`text-xs px-2 py-0.5 rounded-full border-0 ${STATUS_COLORS[b.status] || 'bg-white/10 text-white/50'} bg-transparent cursor-pointer`}>
                      <option value="pending">pending</option>
                      <option value="paid">paid</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center text-white/40 py-8">Нет бонусов</td></tr>
              )}
            </tbody>
          </table>
          {filtered.length > 0 && <div className="px-4 py-3 text-white/40 text-xs border-t border-white/10">Показано {filtered.length} из {items.length}</div>}
        </div>
      )}
    </div>
  );
}
