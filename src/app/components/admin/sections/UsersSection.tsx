import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface User {
  id: string; email: string; full_name: string; phone: string; country: string;
  email_verified: boolean; is_admin: boolean; created_at: string;
  total_shares: number; total_amount: number; kyc_status: string;
}

const KYC_STYLES: Record<string, string> = {
  verified:    'bg-green-50 text-green-700 border-green-200',
  pending:     'bg-yellow-50 text-yellow-700 border-yellow-200',
  rejected:    'bg-red-50 text-red-600 border-red-200',
  not_started: 'bg-gray-50 text-gray-500 border-gray-200',
};

export default function UsersSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    adminApi.users.list().then(d => { setUsers(d); setLoading(false); }).catch(() => setLoading(false));
  };
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

  const filtered = users.filter(u =>
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Users <span className="text-gray-400 font-normal text-xl">({users.length})</span></h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-3 flex-wrap">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by email or name..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 w-64" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">User</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Country</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Shares</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Email</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">KYC</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Admin</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Joined</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-gray-900">{u.email}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{u.full_name || '—'}</div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{u.country || '—'}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-gray-900 font-mono">{Number(u.total_shares || 0).toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-center">
                      <button onClick={() => toggle(u, 'email_verified')} disabled={saving === u.id + 'email_verified'}
                        className={`px-2.5 py-1 rounded-full border text-xs font-medium transition ${u.email_verified ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                        {u.email_verified ? 'Yes' : 'No'}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${KYC_STYLES[u.kyc_status] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                        {u.kyc_status || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button onClick={() => toggle(u, 'is_admin')} disabled={saving === u.id + 'is_admin'}
                        className={`px-2.5 py-1 rounded-full border text-xs font-medium transition ${u.is_admin ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                        {u.is_admin ? 'Yes' : 'No'}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => remove(u.id)} className="text-xs text-red-500 hover:text-red-700 transition">Delete</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8}>
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                      </div>
                      <p className="text-sm text-gray-500">No users</p>
                    </div>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
            Showing {filtered.length} of {users.length} users
          </div>
        )}
      </div>
    </div>
  );
}
