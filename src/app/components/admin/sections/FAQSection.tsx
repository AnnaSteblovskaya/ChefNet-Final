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
      setEditing(null);
      load();
    } finally { setSaving(false); }
  };

  const remove = async (id: number) => {
    if (!confirm('Удалить вопрос?')) return;
    await adminApi.faq.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const filtered = items.filter(f =>
    (f.question_en + f.question_ru).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-white">Вопросы и ответы</h2>
        <button onClick={openNew} className="bg-[#D4522A] hover:bg-[#c04520] text-white px-4 py-2 rounded-xl text-sm font-medium transition">+ Новый вопрос</button>
      </div>
      <div className="mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm w-64 focus:outline-none focus:border-[#D4522A]" />
      </div>

      {loading ? (
        <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-white/10">
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Вопрос</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Ответ</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Активен</th>
              <th className="px-4 py-3" />
            </tr></thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-white text-sm max-w-xs truncate">{f.question_en || f.question_ru || '—'}</td>
                  <td className="px-4 py-3 text-white/50 text-sm max-w-xs truncate">{f.answer_en || f.answer_ru || '—'}</td>
                  <td className="px-4 py-3">
                    {f.is_active
                      ? <span className="text-green-400 text-lg">✓</span>
                      : <span className="text-red-400 text-lg">✕</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(f)} className="text-white/50 hover:text-white text-xs px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition">Изменить</button>
                      <button onClick={() => remove(f.id)} className="text-red-400 hover:text-red-300 text-xs px-3 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition">Удалить</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="text-center text-white/40 py-8">Нет вопросов</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">{isNew ? 'Новый вопрос' : 'Изменить вопрос'}</h3>
            <div className="flex gap-2 mb-4 flex-wrap">
              {LANGS.map(l => (
                <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${lang === l ? 'bg-[#D4522A] text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>{LANG_LABELS[l]}</button>
              ))}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-white/50 text-xs mb-1 block">Вопрос ({LANG_LABELS[lang]})</label>
                <textarea rows={2} value={(editing as any)[`question_${lang}`] || ''} onChange={e => setEditing(v => ({ ...v!, [`question_${lang}`]: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A]" />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Ответ ({LANG_LABELS[lang]})</label>
                <textarea rows={5} value={(editing as any)[`answer_${lang}`] || ''} onChange={e => setEditing(v => ({ ...v!, [`answer_${lang}`]: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A]" />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div onClick={() => setEditing(v => ({ ...v!, is_active: !v!.is_active }))} className={`w-10 h-6 rounded-full transition ${editing.is_active ? 'bg-[#D4522A]' : 'bg-white/20'} relative`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${editing.is_active ? 'left-5' : 'left-1'}`} />
                  </div>
                  <span className="text-white text-sm">Активен</span>
                </label>
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Порядок</label>
                  <input type="number" value={editing.sort_order || 0} onChange={e => setEditing(v => ({ ...v!, sort_order: +e.target.value }))} className="w-20 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
                </div>
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
