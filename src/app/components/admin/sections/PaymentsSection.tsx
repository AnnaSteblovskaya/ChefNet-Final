import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Payment {
  id: number; user_id: string; amount: number; payment_date: string;
  contract_number: string; status: string; email: string; full_name: string;
}

const STATUS_OPTIONS = ['pending', 'paid', 'cancelled'];
const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-yellow-50 text-yellow-700 border-yellow-200',
  paid:      'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
};

const emptyNew = { user_id: '', amount: 0, payment_date: new Date().toISOString().slice(0, 16), contract_number: '', status: 'pending' };

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default function PaymentsSection() {
  const [items, setItems] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Payment> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    adminApi.payments.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, []);

  const openNew = () => { setEditing({ ...emptyNew }); setIsNew(true); };
  const openEdit = (p: Payment) => { setEditing({ ...p }); setIsNew(false); };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) await adminApi.payments.create(editing);
      else await adminApi.payments.update(editing.id!, editing);
      setEditing(null); load();
    } finally { setSaving(false); }
  };

  const remove = async (id: number) => {
    if (!confirm('Delete payment?')) return;
    await adminApi.payments.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const filtered = items.filter(p =>
    (p.email + p.full_name + p.contract_number).toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const rows = [['ID', 'Amount', 'Date', 'Contract', 'User', 'Status'],
      ...items.map(p => [p.id, p.amount, p.payment_date, p.contract_number, p.email, p.status])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'payments.csv';
    a.click();
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Export to CSV
          </button>
          <button onClick={openNew} className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            New payment
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center px-5 py-4 border-b border-gray-100 gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 w-56" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">ID</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Amount</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Contract</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">User</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-xs text-gray-400">#{p.id}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">${Number(p.amount).toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{new Date(p.payment_date).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{p.contract_number || '—'}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{p.email || p.user_id}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLES[p.status] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>{p.status}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => openEdit(p)} className="text-xs text-gray-500 hover:text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200 hover:border-gray-300 transition">Edit</button>
                        <button onClick={() => remove(p.id)} className="text-xs text-red-500 hover:text-red-700 transition">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7}>
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                      </div>
                      <p className="text-sm text-gray-500">No payments</p>
                    </div>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">Showing {filtered.length} of {items.length}</div>
        )}
      </div>

      {editing && (
        <Modal title={isNew ? 'New payment' : `Payment #${editing.id}`} onClose={() => setEditing(null)}>
          <div className="space-y-3">
            {isNew && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">User ID</label>
                <input value={editing.user_id || ''} onChange={e => setEditing(v => ({ ...v!, user_id: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400" />
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Amount ($)</label>
              <input type="number" value={editing.amount || 0} onChange={e => setEditing(v => ({ ...v!, amount: +e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Payment date</label>
              <input type="datetime-local" value={(editing.payment_date || '').slice(0, 16)} onChange={e => setEditing(v => ({ ...v!, payment_date: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Contract number</label>
              <input value={editing.contract_number || ''} onChange={e => setEditing(v => ({ ...v!, contract_number: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Status</label>
              <select value={editing.status || 'pending'} onChange={e => setEditing(v => ({ ...v!, status: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400">
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            <button onClick={save} disabled={saving} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={() => setEditing(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm transition">Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
