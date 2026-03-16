import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Notification {
  id: number; user_email: string; type: string; message: string; created_at: string;
}

const TYPE_COLORS: Record<string, string> = {
  'User registered': 'bg-blue-500/20 text-blue-400',
  'Email verified': 'bg-green-500/20 text-green-400',
  'KYC submitted': 'bg-purple-500/20 text-purple-400',
  'Investment created': 'bg-yellow-500/20 text-yellow-400',
};

export default function NotificationsSection() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const load = () => {
    setLoading(true);
    adminApi.notifications.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, []);

  const remove = async (id: number) => {
    if (!confirm('Удалить уведомление?')) return;
    await adminApi.notifications.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const types = Array.from(new Set(items.map(n => n.type).filter(Boolean)));

  const filtered = items.filter(n => {
    const matchSearch = (n.user_email + n.type + n.message).toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || n.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-white">Уведомления</h2>
      </div>
      <div className="flex gap-3 mb-4 flex-wrap">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по email..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm w-64 focus:outline-none focus:border-[#D4522A]" />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]">
          <option value="">Все типы</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-white/10">
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Создано</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Пользователь</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Тип</th>
              <th className="px-4 py-3" />
            </tr></thead>
            <tbody>
              {filtered.map(n => (
                <tr key={n.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-white/50 text-sm">{new Date(n.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 text-white text-sm">{n.user_email || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_COLORS[n.type] || 'bg-white/10 text-white/60'}`}>{n.type || '—'}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => remove(n.id)} className="text-red-400 hover:text-red-300 text-xs px-3 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition">Удалить</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="text-center text-white/40 py-8">Нет уведомлений</td></tr>
              )}
            </tbody>
          </table>
          {filtered.length > 0 && <div className="px-4 py-3 text-white/40 text-xs border-t border-white/10">Показано {filtered.length} из {items.length}</div>}
        </div>
      )}
    </div>
  );
}
