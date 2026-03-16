import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface User {
  id: string; email: string; full_name: string; phone: string; country: string;
  email_verified: boolean; is_admin: boolean; created_at: string;
  total_shares: number; total_amount: number; kyc_status: string;
}

export default function UsersSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState<string | null>(null);

  const load = () => { setLoading(true); adminApi.users.list().then(d => { setUsers(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const toggle = async (user: User, field: 'is_admin' | 'email_verified') => {
    setSaving(user.id + field);
    try {
      await adminApi.users.update(user.id, { [field]: !user[field] });
      setUsers(u => u.map(x => x.id === user.id ? { ...x, [field]: !x[field] } : x));
    } finally { setSaving(null); }
  };

  const remove = async (id: string) => {
    if (!confirm('Удалить пользователя? Все данные будут удалены.')) return;
    await adminApi.users.remove(id);
    setUsers(u => u.filter(x => x.id !== id));
  };

  const filtered = users.filter(u => u.email?.toLowerCase().includes(search.toLowerCase()) || u.full_name?.toLowerCase().includes(search.toLowerCase()));

  const kycBadge = (s: string) => {
    const m: Record<string, string> = { verified: 'bg-green-500/20 text-green-400', pending: 'bg-yellow-500/20 text-yellow-400', rejected: 'bg-red-500/20 text-red-400' };
    return m[s] || 'bg-white/10 text-white/40';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Пользователи <span className="text-white/40 text-lg">({users.length})</span></h2>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по email / имени..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm w-64 focus:outline-none focus:border-[#D4522A]" />
      </div>

      {loading ? <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-white/50">
                <th className="text-left p-3">Email / Имя</th>
                <th className="text-left p-3">Страна</th>
                <th className="text-right p-3">Акции</th>
                <th className="text-center p-3">Email ✓</th>
                <th className="text-center p-3">KYC</th>
                <th className="text-center p-3">Админ</th>
                <th className="text-left p-3">Дата</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u.id} className={`border-t border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                  <td className="p-3">
                    <div className="text-white font-medium">{u.email}</div>
                    <div className="text-white/40 text-xs">{u.full_name || '—'}</div>
                  </td>
                  <td className="p-3 text-white/60">{u.country || '—'}</td>
                  <td className="p-3 text-right text-white font-mono">{Number(u.total_shares || 0).toLocaleString()}</td>
                  <td className="p-3 text-center">
                    <button onClick={() => toggle(u, 'email_verified')} disabled={saving === u.id + 'email_verified'} className={`px-2 py-1 rounded-lg text-xs font-medium transition ${u.email_verified ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {u.email_verified ? 'Да' : 'Нет'}
                    </button>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${kycBadge(u.kyc_status)}`}>{u.kyc_status || '—'}</span>
                  </td>
                  <td className="p-3 text-center">
                    <button onClick={() => toggle(u, 'is_admin')} disabled={saving === u.id + 'is_admin'} className={`px-2 py-1 rounded-lg text-xs font-medium transition ${u.is_admin ? 'bg-[#D4522A]/30 text-[#D4522A]' : 'bg-white/5 text-white/40'}`}>
                      {u.is_admin ? 'Да' : 'Нет'}
                    </button>
                  </td>
                  <td className="p-3 text-white/40 text-xs">{new Date(u.created_at).toLocaleDateString('ru')}</td>
                  <td className="p-3">
                    <button onClick={() => remove(u.id)} className="text-red-400/60 hover:text-red-400 transition text-xs">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center text-white/40 py-8">Нет пользователей</div>}
        </div>
      )}
    </div>
  );
}
