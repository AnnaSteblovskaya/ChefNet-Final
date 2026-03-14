import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface NewsItem {
  id: number; published: boolean; created_at: string; updated_at: string;
  title_en: string; title_ru: string; title_de: string; title_es: string; title_tr: string;
  body_en: string; body_ru: string; body_de: string; body_es: string; body_tr: string;
}

const emptyNews = { title_en:'', title_ru:'', title_de:'', title_es:'', title_tr:'', body_en:'', body_ru:'', body_de:'', body_es:'', body_tr:'', published: false };
const langs = [['ru','🇷🇺 RU'],['en','🇬🇧 EN'],['de','🇩🇪 DE'],['es','🇪🇸 ES'],['tr','🇹🇷 TR']];

export default function NewsSection() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<NewsItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState('ru');

  const load = () => { setLoading(true); adminApi.news.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) await adminApi.news.create(editing);
      else await adminApi.news.update(editing.id!, editing);
      setEditing(null); load();
    } finally { setSaving(false); }
  };

  const togglePublish = async (item: NewsItem) => {
    await adminApi.news.update(item.id, { ...item, published: !item.published });
    setItems(i => i.map(x => x.id === item.id ? { ...x, published: !x.published } : x));
  };

  const remove = async (id: number) => {
    if (!confirm('Удалить новость?')) return;
    await adminApi.news.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const langField = (field: 'title' | 'body', lang: string) => `${field}_${lang}` as keyof NewsItem;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Новости</h2>
        <button onClick={() => { setEditing({ ...emptyNews }); setIsNew(true); setActiveLang('ru'); }} className="bg-[#D4522A] hover:bg-[#c04520] text-white px-4 py-2 rounded-xl text-sm font-medium transition">+ Написать новость</button>
      </div>

      {loading ? <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">{item.title_ru || item.title_en || 'Без названия'}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.published ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>{item.published ? 'Опубликовано' : 'Черновик'}</span>
                  </div>
                  <div className="text-white/40 text-xs line-clamp-2">{item.body_ru || item.body_en || '—'}</div>
                  <div className="text-white/30 text-xs mt-1">{new Date(item.created_at).toLocaleDateString('ru')}</div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => { setEditing({ ...item }); setIsNew(false); setActiveLang('ru'); }} className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition">Изменить</button>
                  <button onClick={() => togglePublish(item)} className={`text-xs px-3 py-1.5 rounded-lg transition ${item.published ? 'bg-white/5 text-white/50' : 'bg-green-500/20 text-green-400'}`}>{item.published ? 'Скрыть' : 'Опубликовать'}</button>
                  <button onClick={() => remove(item.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs px-2 py-1.5 rounded-lg transition">✕</button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center text-white/40 py-8">Нет новостей</div>}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">{isNew ? 'Новая новость' : 'Изменить новость'}</h3>

            <div className="flex gap-1 mb-4">
              {langs.map(([l, label]) => (
                <button key={l} onClick={() => setActiveLang(l)} className={`px-3 py-1 rounded-lg text-sm transition ${activeLang === l ? 'bg-[#D4522A] text-white' : 'bg-white/10 text-white/60'}`}>{label}</button>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-white/50 text-xs mb-1 block">Заголовок ({activeLang.toUpperCase()})</label>
                <input value={String(editing[langField('title', activeLang)] || '')} onChange={e => setEditing(v => ({ ...v, [langField('title', activeLang)]: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Текст ({activeLang.toUpperCase()})</label>
                <textarea value={String(editing[langField('body', activeLang)] || '')} onChange={e => setEditing(v => ({ ...v, [langField('body', activeLang)]: e.target.value }))} rows={6} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A]" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.published || false} onChange={e => setEditing(v => ({ ...v, published: e.target.checked }))} className="w-4 h-4 accent-[#D4522A]" />
                <span className="text-white text-sm">Опубликовать сразу</span>
              </label>
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
