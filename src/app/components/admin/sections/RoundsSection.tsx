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

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`w-10 h-6 rounded-full transition relative ${value ? 'bg-amber-500' : 'bg-gray-200'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${value ? 'left-5' : 'left-1'}`} />
    </button>
  );
}

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
      setEditing(null); load();
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete round?')) return;
    await adminApi.rounds.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const inp = 'w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400';

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Rounds</h1>
        <button onClick={openNew} className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          New round
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Name</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Target ($)</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Market cap ($)</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Share price ($)</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Min order ($)</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Active</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {items.map(r => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-900 text-sm">{r.name}</td>
                    <td className="px-5 py-3.5 text-right text-gray-600 text-sm">{Number(r.target_sum || 0).toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-right text-gray-600 text-sm">{Number(r.market_cap || 0).toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-right text-gray-600 text-sm">{Number(r.share_price || 0)}</td>
                    <td className="px-5 py-3.5 text-right text-gray-600 text-sm">{Number(r.min_order || 0).toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-center">
                      {r.active
                        ? <span className="text-green-600 text-lg">✓</span>
                        : <span className="text-gray-300 text-lg">✕</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => openEdit(r)} className="text-xs text-gray-500 hover:text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200 hover:border-gray-300 transition">Edit</button>
                        <button onClick={() => remove(r.id)} className="text-xs text-red-500 hover:text-red-700 transition">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan={7}>
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                      </div>
                      <p className="text-sm text-gray-500">No rounds</p>
                    </div>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setEditing(null)}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-2xl my-8 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">{isNew ? 'New round' : `Edit: ${editing.name}`}</h3>
              {!isNew && (
                <button onClick={() => { setEditing(null); remove(editing.id); }}
                  className="text-xs text-red-500 px-3 py-1 border border-red-100 rounded-lg hover:bg-red-50 transition">Delete</button>
              )}
            </div>

            <div className="space-y-4">
              {isNew && (
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">ID (slug, e.g. "pre-seed")</label>
                  <input value={editing.id} onChange={e => setEditing(v => ({ ...v!, id: e.target.value }))} className={inp} />
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Name</label>
                <input value={editing.name} onChange={e => setEditing(v => ({ ...v!, name: e.target.value }))} className={inp} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Target amount ($)</label>
                  <input type="number" value={editing.target_sum || 0} onChange={e => setEditing(v => ({ ...v!, target_sum: +e.target.value }))} className={inp} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Market cap ($)</label>
                  <input type="number" value={editing.market_cap || 0} onChange={e => setEditing(v => ({ ...v!, market_cap: +e.target.value }))} className={inp} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Share price ($)</label>
                  <input type="number" step="0.001" value={editing.share_price || 0} onChange={e => setEditing(v => ({ ...v!, share_price: +e.target.value }))} className={inp} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Min order ($)</label>
                  <input type="number" value={editing.min_order || 0} onChange={e => setEditing(v => ({ ...v!, min_order: +e.target.value }))} className={inp} />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Toggle value={editing.active} onChange={() => setEditing(v => ({ ...v!, active: !v!.active }))} />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Sort order</label>
                  <input type="number" value={editing.sort_order || 0} onChange={e => setEditing(v => ({ ...v!, sort_order: +e.target.value }))} className="w-20 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400" />
                </div>
              </div>

              <div>
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {LANGS.map(l => (
                    <button key={l} onClick={() => setLang(l)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${lang === l ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {LANG_LABELS[l]}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Description ({LANG_LABELS[lang]})</label>
                    <textarea rows={3} value={(editing as any)[`description_${lang}`] || ''}
                      onChange={e => setEditing(v => ({ ...v!, [`description_${lang}`]: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm resize-none focus:outline-none focus:border-orange-400" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Tasks ({LANG_LABELS[lang]})</label>
                    <textarea rows={3} value={(editing as any)[`tasks_${lang}`] || ''}
                      onChange={e => setEditing(v => ({ ...v!, [`tasks_${lang}`]: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm resize-none focus:outline-none focus:border-orange-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button onClick={save} disabled={saving} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
              <button onClick={() => setEditing(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
