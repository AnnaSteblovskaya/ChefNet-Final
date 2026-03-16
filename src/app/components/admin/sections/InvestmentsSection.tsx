import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Investment {
  id: number; user_id: string; email: string; full_name: string;
  round: string; shares: number; amount: string; date: string; status: string; created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  confirmed: 'bg-green-500/20 text-green-400',
  completed: 'bg-green-500/20 text-green-400',
  rejected: 'bg-red-500/20 text-red-400',
};

export default function InvestmentsSection() {
  const [items, setItems] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [saving, setSaving] = useState<number | null>(null);

  const load = () => { setLoading(true); adminApi.investments.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const setStatus = async (inv: Investment, status: string) => {
    setSaving(inv.id);
    try {
      await adminApi.investments.update(inv.id, { status });
      setItems(i => i.map(x => x.id === inv.id ? { ...x, status } : x));
    } finally { setSaving(null); }
  };

  const remove = async (id: number) => {
    if (!confirm('Удалить инвестицию?')) return;
    await adminApi.investments.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter);
  const pending = items.filter(i => i.status === 'pending').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Инвестиции {pending > 0 && <span className="ml-2 bg-yellow-500 text-black text-sm px-2 py-0.5 rounded-full">{pending} ожидают</span>}</h2>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none">
          <option value="all">Все статусы</option>
          <option value="pending">Ожидают</option>
          <option value="confirmed">Подтверждены</option>
          <option value="completed">Завершены</option>
          <option value="rejected">Отклонены</option>
        </select>
      </div>

      {loading ? <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-white/50">
                <th className="text-left p-3">Пользователь</th>
                <th className="text-left p-3">Раунд</th>
                <th className="text-right p-3">Акций</th>
                <th className="text-right p-3">Сумма</th>
                <th className="text-center p-3">Статус</th>
                <th className="text-left p-3">Дата</th>
                <th className="p-3">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => (
                <tr key={inv.id} className={`border-t border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                  <td className="p-3">
                    <div className="text-white text-xs font-medium">{inv.email}</div>
                    <div className="text-white/40 text-xs">{inv.full_name || '—'}</div>
                  </td>
                  <td className="p-3 text-white/70">{inv.round}</td>
                  <td className="p-3 text-right text-white font-mono">{Number(inv.shares).toLocaleString()}</td>
                  <td className="p-3 text-right text-white font-mono">${Number(inv.amount).toLocaleString()}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${STATUS_COLORS[inv.status] || 'bg-white/10 text-white/40'}`}>{inv.status}</span>
                  </td>
                  <td className="p-3 text-white/40 text-xs">{inv.date || new Date(inv.created_at).toLocaleDateString('ru')}</td>
                  <td className="p-3">
                    {inv.status === 'pending' && (
                      <div className="flex gap-1">
                        <button onClick={() => setStatus(inv, 'confirmed')} disabled={saving === inv.id} className="bg-green-500/20 text-green-400 hover:bg-green-500/30 px-2 py-1 rounded-lg text-xs transition">✓ Подтвердить</button>
                        <button onClick={() => setStatus(inv, 'rejected')} disabled={saving === inv.id} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-2 py-1 rounded-lg text-xs transition">✕ Отклонить</button>
                      </div>
                    )}
                    {inv.status !== 'pending' && (
                      <button onClick={() => setStatus(inv, 'pending')} className="text-white/30 hover:text-white/60 text-xs transition">↩ В ожидание</button>
                    )}
                    <button onClick={() => remove(inv.id)} className="ml-2 text-red-400/40 hover:text-red-400 text-xs transition">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center text-white/40 py-8">Нет инвестиций</div>}
        </div>
      )}
    </div>
  );
}
