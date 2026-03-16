import { useEffect, useState } from 'react';
import { adminApi } from '../api';

const LANGS = ['en', 'ru', 'de', 'es', 'tr'] as const;
type Lang = typeof LANGS[number];
const LANG_LABELS: Record<Lang, string> = { en: 'English', ru: 'Русский', de: 'Deutsch', es: 'Español', tr: 'Türkçe' };

interface FAQ {
  id: number;
  question_en: string; question_ru: string; question_de: string; question_es: string; question_tr: string;
  answer_en: string; answer_ru: string; answer_de: string; answer_es: string; answer_tr: string;
  is_active: boolean; sort_order: number;
}

const empty: Omit<FAQ, 'id'> = {
  question_en: '', question_ru: '', question_de: '', question_es: '', question_tr: '',
  answer_en: '', answer_ru: '', answer_de: '', answer_es: '', answer_tr: '',
  is_active: true, sort_order: 0,
};

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`w-10 h-6 rounded-full transition relative ${value ? 'bg-amber-500' : 'bg-gray-200'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${value ? 'left-5' : 'left-1'}`} />
    </button>
  );
}

export default function FAQSection() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<FAQ> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    adminApi.faq.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, []);

  const openNew = () => { setEditing({ ...empty }); setIsNew(true); setLang('en'); };
  const openEdit = (f: FAQ) => { setEditing({ ...f }); setIsNew(false); setLang('en'); };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) await adminApi.faq.create(editing);
      else await adminApi.faq.update(editing.id!, editing);
      setEditing(null); load();
    } finally { setSaving(false); }
  };

  const remove = async (id: number) => {
    if (!confirm('Delete question?')) return;
    await adminApi.faq.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const filtered = items.filter(f =>
    (f.question_en + f.question_ru).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Questions</h1>
        <button onClick={openNew} className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          New question
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="relative w-56">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 w-full" />
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
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Question</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Answer</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Active</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(f => (
                  <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-gray-900 max-w-xs truncate">{f.question_en || f.question_ru || '—'}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500 max-w-xs truncate">{f.answer_en || f.answer_ru || '—'}</td>
                    <td className="px-5 py-3.5">
                      {f.is_active
                        ? <span className="text-green-600 text-lg">✓</span>
                        : <span className="text-gray-300 text-lg">✕</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => openEdit(f)} className="text-xs text-gray-500 hover:text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200 hover:border-gray-300 transition">Edit</button>
                        <button onClick={() => remove(f.id)} className="text-xs text-red-500 hover:text-red-700 transition">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={4}>
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                      </div>
                      <p className="text-sm text-gray-500">No questions</p>
                    </div>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{isNew ? 'New question' : 'Edit question'}</h3>
            <div className="flex gap-1.5 mb-5 flex-wrap">
              {LANGS.map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${lang === l ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Question ({LANG_LABELS[lang]})</label>
                <textarea rows={2} value={(editing as any)[`question_${lang}`] || ''}
                  onChange={e => setEditing(v => ({ ...v!, [`question_${lang}`]: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm resize-none focus:outline-none focus:border-orange-400" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Answer ({LANG_LABELS[lang]})</label>
                <textarea rows={5} value={(editing as any)[`answer_${lang}`] || ''}
                  onChange={e => setEditing(v => ({ ...v!, [`answer_${lang}`]: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm resize-none focus:outline-none focus:border-orange-400" />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Toggle value={!!editing.is_active} onChange={() => setEditing(v => ({ ...v!, is_active: !v!.is_active }))} />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Sort order</label>
                  <input type="number" value={editing.sort_order || 0} onChange={e => setEditing(v => ({ ...v!, sort_order: +e.target.value }))}
                    className="w-20 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={save} disabled={saving} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
              <button onClick={() => setEditing(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
