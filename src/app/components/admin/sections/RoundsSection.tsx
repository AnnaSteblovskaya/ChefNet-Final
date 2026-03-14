import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Round {
  id: string; name: string; price: number; min_investment: number;
  total_shares: number; sold_shares: number; status: string; amount: string; highlight: boolean; sort_order: number;
}

const empty: Round = { id: '', name: '', price: 0, min_investment: 0, total_shares: 0, sold_shares: 0, status: 'active', amount: '0', highlight: false, sort_order: 0 };

export default function RoundsSection() {
  const [items, setItems] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Round | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => { setLoading(true); adminApi.rounds.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const openNew = () => { setEditing({ ...empty }); setIsNew(true); };
  const openEdit = (r: Round) => { setEditing({ ...r }); setIsNew(false); };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) {
        await adminApi.rounds.create(editing);
      } else {
        await adminApi.rounds.update(editing.id, editing);
      }
      setEditing(null);
      load();
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Удалить раунд?')) return;
    await adminApi.rounds.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const F = ({ label, field, type = 'text' }: { label: string; field: keyof Round; type?: string }) => (
    <div>
      <label className="text-white/50 text-xs mb-1 block">{label}</label>
      {field === 'status' ? (
        <select value={String(editing![field])} onChange={e => setEditing(v => ({ ...v!, [field]: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]">
          <option value="active">active</option><option value="upcoming">upcoming</option><option value="completed">completed</option>
        </select>
      ) : type === 'checkbox' ? (
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={Boolean(editing![field])} onChange={e => setEditing(v => ({ ...v!, [field]: e.target.checked }))} className="w-4 h-4 accent-[#D4522A]" />
          <span className="text-white text-sm">Да</span>
        </label>
      ) : (
        <input type={type} value={String(editing![field])} onChange={e => setEditing(v => ({ ...v!, [field]: type === 'number' ? +e.target.value : e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Раунды инвестирования</h2>
        <button onClick={openNew} className="bg-[#D4522A] hover:bg-[#c04520] text-white px-4 py-2 rounded-xl text-sm font-medium transition">+ Новый раунд</button>
      </div>

      {loading ? <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="space-y-3">
          {items.map(r => (
            <div key={r.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold">{r.name}</span>
                  {r.highlight && <span className="bg-[#D4522A]/20 text-[#D4522A] text-xs px-2 py-0.5 rounded-full">★ Топ</span>}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>{r.status}</span>
                </div>
                <div className="flex gap-4 text-xs text-white/50">
                  <span>Цена: ${Number(r.price).toFixed(2)}</span>
                  <span>Продано: {r.sold_shares.toLocaleString()} / {r.total_shares.toLocaleString()}</span>
                  <span>Мин: ${Number(r.min_investment).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(r)} className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 rounded-lg transition">Изменить</button>
                <button onClick={() => remove(r.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm px-3 py-1.5 rounded-lg transition">Удалить</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center text-white/40 py-8">Нет раундов</div>}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">{isNew ? 'Новый раунд' : `Изменить: ${editing.name}`}</h3>
            <div className="space-y-3">
              {isNew && <F label="ID (slug)" field="id" />}
              <F label="Название" field="name" />
              <div className="grid grid-cols-2 gap-3">
                <F label="Цена за акцию ($)" field="price" type="number" />
                <F label="Мин. инвестиция ($)" field="min_investment" type="number" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <F label="Всего акций" field="total_shares" type="number" />
                <F label="Продано акций" field="sold_shares" type="number" />
              </div>
              <F label="Сумма (текст)" field="amount" />
              <div className="grid grid-cols-2 gap-3">
                <F label="Статус" field="status" />
                <F label="Порядок" field="sort_order" type="number" />
              </div>
              <F label="Выделить (топ)" field="highlight" type="checkbox" />
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={save} disabled={saving} className="flex-1 bg-[#D4522A] hover:bg-[#c04520] text-white py-2 rounded-xl text-sm font-medium transition">{saving ? 'Сохранение...' : 'Сохранить'}</button>
              <button onClick={() => setEditing(null)} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-sm transition">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
