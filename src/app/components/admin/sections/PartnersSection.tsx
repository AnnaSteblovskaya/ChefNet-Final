import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Partner {
  id: number; name: string; logo_url: string; website: string;
  description_en: string; description_ru: string; status: string; sort_order: number;
}

const emptyP: Omit<Partner, 'id'> = { name: '', logo_url: '', website: '', description_en: '', description_ru: '', status: 'active', sort_order: 0 };

export default function PartnersSection() {
  const [items, setItems] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Partner> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => { setLoading(true); adminApi.partners.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) await adminApi.partners.create(editing);
      else await adminApi.partners.update(editing.id!, editing);
      setEditing(null); load();
    } finally { setSaving(false); }
  };

  const toggleStatus = async (p: Partner) => {
    const status = p.status === 'active' ? 'inactive' : 'active';
    await adminApi.partners.update(p.id, { ...p, status });
    setItems(i => i.map(x => x.id === p.id ? { ...x, status } : x));
  };

  const remove = async (id: number) => {
    if (!confirm('Удалить партнёра?')) return;
    await adminApi.partners.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const F = ({ label, field, multiline }: { label: string; field: keyof Partner; multiline?: boolean }) => (
    <div>
      <label className="text-white/50 text-xs mb-1 block">{label}</label>
      {multiline
        ? <textarea value={String(editing?.[field] || '')} onChange={e => setEditing(v => ({ ...v, [field]: e.target.value }))} rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A]" />
        : <input value={String(editing?.[field] || '')} onChange={e => setEditing(v => ({ ...v, [field]: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
      }
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Партнёры</h2>
        <button onClick={() => { setEditing({ ...emptyP }); setIsNew(true); }} className="bg-[#D4522A] hover:bg-[#c04520] text-white px-4 py-2 rounded-xl text-sm font-medium transition">+ Добавить партнёра</button>
      </div>

      {loading ? <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(p => (
            <div key={p.id} className={`bg-white/5 border rounded-2xl p-4 ${p.status === 'active' ? 'border-white/10' : 'border-white/5 opacity-50'}`}>
              <div className="flex items-start justify-between mb-3">
                {p.logo_url ? <img src={p.logo_url} alt={p.name} className="h-10 object-contain max-w-[120px] bg-white rounded-lg p-1" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} /> : <div className="h-10 w-20 bg-white/10 rounded-lg" />}
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>{p.status}</span>
              </div>
              <div className="text-white font-medium mb-1">{p.name}</div>
              <div className="text-white/40 text-xs mb-3 truncate">{p.website || '—'}</div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing({ ...p }); setIsNew(false); }} className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs py-1.5 rounded-lg transition">Изменить</button>
                <button onClick={() => toggleStatus(p)} className="flex-1 bg-white/5 hover:bg-white/10 text-white/60 text-xs py-1.5 rounded-lg transition">{p.status === 'active' ? 'Отключить' : 'Включить'}</button>
                <button onClick={() => remove(p.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs px-2 py-1.5 rounded-lg transition">✕</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="col-span-3 text-center text-white/40 py-8">Нет партнёров</div>}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">{isNew ? 'Новый партнёр' : `Изменить: ${editing.name}`}</h3>
            <div className="space-y-3">
              <F label="Название" field="name" />
              <F label="URL логотипа" field="logo_url" />
              {editing.logo_url && <img src={editing.logo_url} alt="" className="h-12 object-contain bg-white rounded-lg p-2" />}
              <F label="Сайт" field="website" />
              <F label="Описание (EN)" field="description_en" multiline />
              <F label="Описание (RU)" field="description_ru" multiline />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Статус</label>
                  <select value={editing.status} onChange={e => setEditing(v => ({ ...v, status: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none">
                    <option value="active">active</option><option value="inactive">inactive</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Порядок</label>
                  <input type="number" value={editing.sort_order || 0} onChange={e => setEditing(v => ({ ...v, sort_order: +e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none" />
                </div>
              </div>
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
