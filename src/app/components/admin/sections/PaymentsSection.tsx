import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Payment {
  id: number; user_id: string; amount: number; payment_date: string;
  contract_number: string; status: string; email: string; full_name: string;
}

const STATUS_OPTIONS = ['pending', 'paid', 'cancelled'];
const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  paid: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

const emptyNew = { user_id: '', amount: 0, payment_date: new Date().toISOString().slice(0, 16), contract_number: '', status: 'pending' };

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
      setEditing(null);
      load();
    } finally { setSaving(false); }
  };

  const remove = async (id: number) => {
    if (!confirm('Удалить платёж?')) return;
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
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-white">Платежи</h2>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition">↓ Экспорт CSV</button>
          <button onClick={openNew} className="bg-[#D4522A] hover:bg-[#c04520] text-white px-4 py-2 rounded-xl text-sm font-medium transition">+ Новый платёж</button>
        </div>
      </div>
      <div className="mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по email или контракту..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm w-72 focus:outline-none focus:border-[#D4522A]" />
      </div>

      {loading ? (
        <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead><tr className="border-b border-white/10">
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">ID</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Сумма</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Дата платежа</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Контракт</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Пользователь</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Статус</th>
              <th className="px-4 py-3" />
            </tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-white/50 text-sm">{p.id}</td>
                  <td className="px-4 py-3 text-white text-sm font-medium">${Number(p.amount).toLocaleString()}</td>
                  <td className="px-4 py-3 text-white/70 text-sm">{new Date(p.payment_date).toLocaleString()}</td>
                  <td className="px-4 py-3 text-white/70 text-sm">{p.contract_number || '—'}</td>
                  <td className="px-4 py-3 text-white/70 text-sm">{p.email || p.user_id}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[p.status] || 'bg-white/10 text-white/50'}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(p)} className="text-white/50 hover:text-white text-xs px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition">Изменить</button>
                      <button onClick={() => remove(p.id)} className="text-red-400 hover:text-red-300 text-xs px-3 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition">Удалить</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center text-white/40 py-8">Нет платежей</td></tr>
              )}
            </tbody>
          </table>
          {filtered.length > 0 && <div className="px-4 py-3 text-white/40 text-xs border-t border-white/10">Показано {filtered.length} из {items.length}</div>}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">{isNew ? 'Новый платёж' : `Платёж #${editing.id}`}</h3>
            <div className="space-y-3">
              {isNew && (
                <div>
                  <label className="text-white/50 text-xs mb-1 block">User ID</label>
                  <input value={editing.user_id || ''} onChange={e => setEditing(v => ({ ...v!, user_id: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
                </div>
              )}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Сумма ($)</label>
                <input type="number" value={editing.amount || 0} onChange={e => setEditing(v => ({ ...v!, amount: +e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Дата платежа</label>
                <input type="datetime-local" value={(editing.payment_date || '').slice(0, 16)} onChange={e => setEditing(v => ({ ...v!, payment_date: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Номер контракта</label>
                <input value={editing.contract_number || ''} onChange={e => setEditing(v => ({ ...v!, contract_number: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Статус</label>
                <select value={editing.status || 'pending'} onChange={e => setEditing(v => ({ ...v!, status: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]">
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={save} disabled={saving} className="flex-1 bg-[#D4522A] hover:bg-[#c04520] text-white py-2 rounded-xl text-sm font-medium transition disabled:opacity-50">{saving ? 'Сохранение...' : 'Сохранить'}</button>
              <button onClick={() => setEditing(null)} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-sm transition">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
