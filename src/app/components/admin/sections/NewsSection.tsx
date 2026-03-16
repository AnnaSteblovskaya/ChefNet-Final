import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface NewsItem {
  id: number; published: boolean; created_at: string; updated_at: string;
  title_en: string; title_ru: string; title_de: string; title_es: string; title_tr: string;
  body_en: string; body_ru: string; body_de: string; body_es: string; body_tr: string;
}

const emptyNews = { title_en:'', title_ru:'', title_de:'', title_es:'', title_tr:'', body_en:'', body_ru:'', body_de:'', body_es:'', body_tr:'', published: false };
const langs = [['ru','RU'],['en','EN'],['de','DE'],['es','ES'],['tr','TR']];

export default function NewsSection() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<NewsItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState('ru');

  const load = () => {
    setLoading(true);
    adminApi.news.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
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
    if (!confirm('Delete news?')) return;
    await adminApi.news.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const langField = (field: 'title' | 'body', lang: string) => `${field}_${lang}` as keyof NewsItem;

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">News</h1>
        <button onClick={() => { setEditing({ ...emptyNews }); setIsNew(true); setActiveLang('ru'); }}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          Write news
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-gray-900">{item.title_ru || item.title_en || 'Untitled'}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${item.published ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                      {item.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs line-clamp-2 mb-1">{item.body_ru || item.body_en || '—'}</div>
                  <div className="text-gray-300 text-xs">{new Date(item.created_at).toLocaleDateString()}</div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => { setEditing({ ...item }); setIsNew(false); setActiveLang('ru'); }}
                    className="text-xs text-gray-600 hover:text-gray-800 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition">Edit</button>
                  <button onClick={() => togglePublish(item)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border transition ${item.published ? 'text-gray-500 border-gray-200 hover:bg-gray-50' : 'text-green-700 border-green-200 bg-green-50 hover:bg-green-100'}`}>
                    {item.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => remove(item.id)} className="text-xs text-red-500 hover:text-red-700 px-2.5 py-1.5 rounded-lg border border-red-100 hover:bg-red-50 transition">✕</button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </div>
              <p className="text-sm text-gray-500">No news articles</p>
            </div>
          )}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{isNew ? 'New article' : 'Edit article'}</h3>

            <div className="flex gap-1 mb-4">
              {langs.map(([l, label]) => (
                <button key={l} onClick={() => setActiveLang(l)}
                  className={`px-3 py-1 rounded-lg text-sm transition ${activeLang === l ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Title ({activeLang.toUpperCase()})</label>
                <input value={String(editing[langField('title', activeLang)] || '')}
                  onChange={e => setEditing(v => ({ ...v, [langField('title', activeLang)]: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Body ({activeLang.toUpperCase()})</label>
                <textarea value={String(editing[langField('body', activeLang)] || '')}
                  onChange={e => setEditing(v => ({ ...v, [langField('body', activeLang)]: e.target.value }))}
                  rows={8} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm resize-none focus:outline-none focus:border-orange-400" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.published || false}
                  onChange={e => setEditing(v => ({ ...v, published: e.target.checked }))}
                  className="w-4 h-4 accent-amber-500" />
                <span className="text-gray-700 text-sm">Publish immediately</span>
              </label>
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
