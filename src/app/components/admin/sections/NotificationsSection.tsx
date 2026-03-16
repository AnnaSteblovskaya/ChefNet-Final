import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Notification {
  id: number; user_email: string; type: string; message: string; created_at: string;
}

const TYPE_STYLES: Record<string, string> = {
  'User registered':    'bg-blue-50 text-blue-700 border-blue-200',
  'Email verified':     'bg-green-50 text-green-700 border-green-200',
  'KYC submitted':      'bg-purple-50 text-purple-700 border-purple-200',
  'Investment created': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Partner KYC verified': 'bg-teal-50 text-teal-700 border-teal-200',
  'Partner investment': 'bg-orange-50 text-orange-700 border-orange-200',
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
    if (!confirm('Delete notification?')) return;
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
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 w-48" />
            </div>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-orange-400 bg-white">
              <option value="">All types</option>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">User</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Type</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(n => (
                  <tr key={n.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(n.created_at).toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-900">{n.user_email || '—'}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${TYPE_STYLES[n.type] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                        {n.type || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button onClick={() => remove(n.id)} className="text-xs text-red-500 hover:text-red-700 transition">Delete</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={4}>
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                      </div>
                      <p className="text-sm text-gray-500">No notifications</p>
                    </div>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
            Showing {filtered.length} of {items.length}
          </div>
        )}
      </div>
    </div>
  );
}
