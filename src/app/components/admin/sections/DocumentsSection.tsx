import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Doc {
  id: number; visible: boolean; category: string; file_url: string; created_at: string;
  title_en: string; title_ru: string; title_de: string; title_es: string; title_tr: string;
}

const emptyDoc = { title_en:'', title_ru:'', title_de:'', title_es:'', title_tr:'', file_url:'', category:'general', visible: true };
const CATEGORIES = ['general', 'legal', 'financial', 'presentation', 'other'];

const CAT_ICONS: Record<string, JSX.Element> = {
  general: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
  legal: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>,
  financial: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  presentation: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg>,
  other: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/></svg>,
};

export default function DocumentsSection() {
  const [items, setItems] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Doc> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    adminApi.documents.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) await adminApi.documents.create(editing);
      else await adminApi.documents.update(editing.id!, editing);
      setEditing(null); load();
    } finally { setSaving(false); }
  };

  const toggleVisible = async (doc: Doc) => {
    await adminApi.documents.update(doc.id, { ...doc, visible: !doc.visible });
    setItems(i => i.map(x => x.id === doc.id ? { ...x, visible: !x.visible } : x));
  };

  const remove = async (id: number) => {
    if (!confirm('Delete document?')) return;
    await adminApi.documents.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <button onClick={() => { setEditing({ ...emptyDoc }); setIsNew(true); }}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          Add document
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-2">
          {items.map(doc => (
            <div key={doc.id} className={`bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 transition ${!doc.visible ? 'opacity-50' : ''}`}>
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500 flex-shrink-0">
                {CAT_ICONS[doc.category] || CAT_ICONS.general}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{doc.title_ru || doc.title_en || 'Untitled'}</div>
                <div className="text-gray-400 text-xs mt-0.5">{doc.category} · {new Date(doc.created_at).toLocaleDateString()}</div>
              </div>
              {doc.file_url && (
                <a href={doc.file_url} target="_blank" rel="noreferrer" className="text-orange-500 text-xs hover:underline truncate max-w-[120px]">
                  Open ↗
                </a>
              )}
              <div className="flex gap-1.5 flex-shrink-0">
                <button onClick={() => { setEditing({ ...doc }); setIsNew(false); }}
                  className="text-xs text-gray-600 hover:text-gray-800 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition">Edit</button>
                <button onClick={() => toggleVisible(doc)}
                  className="text-xs text-gray-500 hover:text-gray-700 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition">
                  {doc.visible ? 'Hide' : 'Show'}
                </button>
                <button onClick={() => remove(doc.id)}
                  className="text-xs text-red-500 hover:text-red-700 px-2.5 py-1.5 rounded-lg border border-red-100 hover:border-red-200 transition">✕</button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </div>
                <p className="text-sm text-gray-500">No documents</p>
              </div>
            </div>
          )}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{isNew ? 'New document' : 'Edit document'}</h3>
            <div className="space-y-3">
              {(['ru','en','de','es','tr'] as const).map(l => (
                <div key={l}>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Title ({l.toUpperCase()})</label>
                  <input value={String((editing as any)[`title_${l}`] || '')}
                    onChange={e => setEditing(v => ({ ...v, [`title_${l}`]: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400" />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">File URL (Google Drive, Dropbox, etc.)</label>
                <input value={editing.file_url || ''} onChange={e => setEditing(v => ({ ...v, file_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Category</label>
                  <select value={editing.category || 'general'} onChange={e => setEditing(v => ({ ...v, category: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editing.visible !== false}
                      onChange={e => setEditing(v => ({ ...v, visible: e.target.checked }))}
                      className="w-4 h-4 accent-amber-500" />
                    <span className="text-gray-700 text-sm">Visible</span>
                  </label>
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
