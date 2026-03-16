import { useEffect, useState } from 'react';
import { adminApi } from '../api';

const LANGS = ['en', 'ru', 'de', 'es', 'tr'] as const;
type Lang = typeof LANGS[number];
const LANG_LABELS: Record<Lang, string> = { en: 'English', ru: 'Русский', de: 'Deutsch', es: 'Español', tr: 'Türkçe' };

interface Round {
  id: string; name: string;
  target_sum: number; market_cap: number; share_price: number; min_order: number;
  active: boolean; sort_order: number;
  description_en: string; description_ru: string; description_de: string; description_es: string; description_tr: string;
  tasks_en: string; tasks_ru: string; tasks_de: string; tasks_es: string; tasks_tr: string;
}

const empty: Round = {
  id: '', name: '', target_sum: 0, market_cap: 0, share_price: 0, min_order: 0,
  active: true, sort_order: 0,
  description_en: '', description_ru: '', description_de: '', description_es: '', description_tr: '',
  tasks_en: '', tasks_ru: '', tasks_de: '', tasks_es: '', tasks_tr: '',
};

export default function RoundsSection() {
  const [items, setItems] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Round | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<Lang>('en');

  const load = () => {
    setLoading(true);
    adminApi.rounds.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, []);

  const openNew = () => { setEditing({ ...empty }); setIsNew(true); setLang('en'); };
  const openEdit = (r: Round) => { setEditing({ ...r }); setIsNew(false); setLang('en'); };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) await adminApi.rounds.create(editing);
      else await adminApi.rounds.update(editing.id, editing);
      setEditing(null);
      load();
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Удалить раунд?')) return;
    await adminApi.rounds.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Раунды инвестирования</h2>
        <button onClick={openNew} className="bg-[#D4522A] hover:bg-[#c04520] text-white px-4 py-2 rounded-xl text-sm font-medium transition">+ Новый раунд</button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead><tr className="border-b border-white/10">
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Название</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Целевая сумма</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Рыночная кап.</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Цена акции</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Мин. заказ</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Активен</th>
              <th className="px-4 py-3" />
            </tr></thead>
            <tbody>
              {items.map(r => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-white font-medium text-sm">{r.name}</td>
                  <td className="px-4 py-3 text-white/70 text-sm">{Number(r.target_sum || 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-white/70 text-sm">{Number(r.market_cap || 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-white/70 text-sm">{Number(r.share_price || 0)}</td>
                  <td className="px-4 py-3 text-white/70 text-sm">{Number(r.min_order || 0).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {r.active
                      ? <span className="text-green-400 text-lg">✓</span>
                      : <span className="text-red-400 text-lg">✕</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(r)} className="text-white/50 hover:text-white text-xs px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition">Изменить</button>
                      <button onClick={() => remove(r.id)} className="text-red-400 hover:text-red-300 text-xs px-3 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition">Удалить</button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={7} className="text-center text-white/40 py-8">Нет раундов</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setEditing(null)}>
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-2xl my-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{isNew ? 'Новый раунд' : `Изменить: ${editing.name}`}</h3>
              {!isNew && <button onClick={() => remove(editing.id)} className="text-red-400 text-sm px-3 py-1 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition">Удалить</button>}
            </div>

            <div className="space-y-4">
              {isNew && (
                <div>
                  <label className="text-white/50 text-xs mb-1 block">ID (slug, напр. "pre-seed")</label>
                  <input value={editing.id} onChange={e => setEditing(v => ({ ...v!, id: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
                </div>
              )}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Название</label>
                <input value={editing.name} onChange={e => setEditing(v => ({ ...v!, name: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Целевая сумма ($)</label>
                  <input type="number" value={editing.target_sum || 0} onChange={e => setEditing(v => ({ ...v!, target_sum: +e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Рыночная капитализация ($)</label>
                  <input type="number" value={editing.market_cap || 0} onChange={e => setEditing(v => ({ ...v!, market_cap: +e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Цена акции ($)</label>
                  <input type="number" step="0.001" value={editing.share_price || 0} onChange={e => setEditing(v => ({ ...v!, share_price: +e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Мин. заказ ($)</label>
                  <input type="number" value={editing.min_order || 0} onChange={e => setEditing(v => ({ ...v!, min_order: +e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div onClick={() => setEditing(v => ({ ...v!, active: !v!.active }))} className={`w-10 h-6 rounded-full transition ${editing.active ? 'bg-[#D4522A]' : 'bg-white/20'} relative`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${editing.active ? 'left-5' : 'left-1'}`} />
                  </div>
                  <span className="text-white text-sm">Активен</span>
                </label>
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Порядок</label>
                  <input type="number" value={editing.sort_order || 0} onChange={e => setEditing(v => ({ ...v!, sort_order: +e.target.value }))} className="w-20 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
                </div>
              </div>

              <div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {LANGS.map(l => (
                    <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${lang === l ? 'bg-[#D4522A] text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>{LANG_LABELS[l]}</button>
                  ))}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Описание ({LANG_LABELS[lang]})</label>
                    <textarea rows={3} value={(editing as any)[`description_${lang}`] || ''} onChange={e => setEditing(v => ({ ...v!, [`description_${lang}`]: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A]" />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Задачи ({LANG_LABELS[lang]})</label>
                    <textarea rows={3} value={(editing as any)[`tasks_${lang}`] || ''} onChange={e => setEditing(v => ({ ...v!, [`tasks_${lang}`]: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button onClick={save} disabled={saving} className="flex-1 bg-[#D4522A] hover:bg-[#c04520] text-white py-2 rounded-xl text-sm font-medium transition disabled:opacity-50">{saving ? 'Сохранение...' : 'Сохранить'}</button>
              <button onClick={() => setEditing(null)} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-sm transition">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
