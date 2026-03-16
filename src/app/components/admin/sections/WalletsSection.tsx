import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Wallet {
  id: number;
  user_id: string;
  email: string;
  full_name: string;
  balance: number;
  currency: string;
  status: string;
  created_at: string;
}

const STATUS_STYLES: Record<string, string> = {
  active:   'bg-green-50 text-green-700 border-green-200',
  frozen:   'bg-blue-50 text-blue-700 border-blue-200',
  blocked:  'bg-red-50 text-red-600 border-red-200',
};

function SortIcon() {
  return (
    <svg className="w-3.5 h-3.5 ml-1 text-gray-400 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
    </svg>
  );
}

export default function WalletsSection() {
  const [items, setItems] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true); setError(false);
    try {
      const res = await fetch('/api/admin/wallets', {
        headers: { Authorization: `Bearer ${(window as any).__adminToken}` },
      });
      if (!res.ok) throw new Error('failed');
      const data = await res.json();
      setItems(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const filtered = items.filter(w =>
    (w.email + w.full_name + w.currency).toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const rows = [
      ['ID', 'User', 'Email', 'Balance', 'Currency', 'Status', 'Created'],
      ...items.map(w => [w.id, w.full_name, w.email, w.balance, w.currency, w.status, w.created_at]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'wallets.csv';
    a.click();
  };

  const totalBalance = items.reduce((sum, w) => sum + Number(w.balance || 0), 0);

  return (
    <div>
      {/* Page header */}
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wallets</h1>
          {!loading && !error && (
            <p className="text-sm text-gray-400 mt-0.5">{items.length} total · ${totalBalance.toFixed(2)} total balance</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Export to CSV
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Card toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-3 flex-wrap">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search"
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 w-56"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:border-gray-300 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <p className="text-sm text-gray-500 mb-4">Failed to load wallets</p>
            <button onClick={load} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg transition">Try again</button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">ID</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">User</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide cursor-pointer hover:text-gray-600 select-none">
                    Balance <SortIcon />
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Currency</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide cursor-pointer hover:text-gray-600 select-none">
                    Created <SortIcon />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(w => (
                  <tr key={w.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-xs text-gray-400">#{w.id}</td>
                    <td className="px-5 py-3.5">
                      <div className="text-sm font-medium text-gray-900">{w.full_name || '—'}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{w.email}</div>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">${Number(w.balance || 0).toFixed(2)}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600 uppercase">{w.currency || 'USD'}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLES[w.status] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                        {w.status || 'active'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">
                      {w.created_at ? new Date(w.created_at).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6}>
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </div>
                        <p className="text-sm text-gray-500">No wallets</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
            Showing {filtered.length} of {items.length} wallets
          </div>
        )}
      </div>
    </div>
  );
}
