import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Investment {
  id: number; user_id: string; email: string; full_name: string;
  round: string; shares: number; amount: string; date: string; status: string; created_at: string;
}

const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-yellow-50 text-yellow-700 border-yellow-200',
  confirmed: 'bg-green-50 text-green-700 border-green-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  rejected:  'bg-red-50 text-red-600 border-red-200',
};

export default function InvestmentsSection() {
  const [items, setItems] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [saving, setSaving] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    adminApi.investments.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, []);

  const setStatus = async (inv: Investment, status: string) => {
    setSaving(inv.id);
    try {
      await adminApi.investments.update(inv.id, { status });
      setItems(i => i.map(x => x.id === inv.id ? { ...x, status } : x));
    } finally { setSaving(null); }
  };

  const remove = async (id: number) => {
    if (!confirm('Delete investment?')) return;
    await adminApi.investments.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter);
  const pending = items.filter(i => i.status === 'pending').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Investments</h1>
          {pending > 0 && (
            <span className="bg-yellow-400 text-yellow-900 text-xs px-2.5 py-1 rounded-full font-semibold">{pending} pending</span>
          )}
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-orange-400 bg-white">
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">User</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Round</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Shares</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Amount</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Date</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(inv => (
                  <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-gray-900">{inv.email}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{inv.full_name || '—'}</div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{inv.round}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-gray-900 font-mono">{Number(inv.shares).toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-gray-900 font-mono">${Number(inv.amount).toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLES[inv.status] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>{inv.status}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">{new Date(inv.date || inv.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1.5 justify-end">
                        {inv.status === 'pending' && (
                          <>
                            <button onClick={() => setStatus(inv, 'confirmed')} disabled={saving === inv.id}
                              className="text-xs text-green-600 hover:text-green-800 px-2 py-1 rounded border border-green-200 hover:bg-green-50 transition">Confirm</button>
                            <button onClick={() => setStatus(inv, 'rejected')} disabled={saving === inv.id}
                              className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded border border-red-100 hover:bg-red-50 transition">Reject</button>
                          </>
                        )}
                        <button onClick={() => remove(inv.id)} className="text-xs text-gray-400 hover:text-red-500 transition">✕</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </div>
                <p className="text-sm text-gray-500">No investments</p>
              </div>
            )}
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
