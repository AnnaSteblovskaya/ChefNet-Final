import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Doc {
  id: number; visible: boolean; category: string; file_url: string; created_at: string;
  title_en: string; title_ru: string; title_de: string; title_es: string; title_tr: string;
}

const emptyDoc = { title_en:'', title_ru:'', title_de:'', title_es:'', title_tr:'', file_url:'', category:'general', visible: true };
const CATEGORIES = ['general', 'legal', 'financial', 'presentation', 'other'];

export default function DocumentsSection() {
  const [items, setItems] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Doc> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => { setLoading(true); adminApi.documents.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); };
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
    if (!confirm('Удалить документ?')) return;
    await adminApi.documents.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const catIcon: Record<string, string> = { general:'📄', legal:'⚖️', financial:'💵', presentation:'📊', other:'📁' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Документы</h2>
        <button onClick={() => { setEditing({ ...emptyDoc }); setIsNew(true); }} className="bg-[#D4522A] hover:bg-[#c04520] text-white px-4 py-2 rounded-xl text-sm font-medium transition">+ Добавить документ</button>
      </div>

      {loading ? <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="space-y-2">
          {items.map(doc => (
            <div key={doc.id} className={`bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 ${!doc.visible ? 'opacity-50' : ''}`}>
              <span className="text-2xl flex-shrink-0">{catIcon[doc.category] || '📄'}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{doc.title_ru || doc.title_en || 'Без названия'}</div>
                <div className="text-white/40 text-xs">{doc.category} · {new Date(doc.created_at).toLocaleDateString('ru')}</div>
              </div>
              <a href={doc.file_url} target="_blank" rel="noreferrer" className="text-[#D4522A] text-xs hover:underline truncate max-w-[150px]">{doc.file_url ? 'Открыть ↗' : '—'}</a>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => { setEditing({ ...doc }); setIsNew(false); }} className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition">Изменить</button>
                <button onClick={() => toggleVisible(doc)} className="bg-white/5 hover:bg-white/10 text-white/60 text-xs px-2 py-1.5 rounded-lg transition">{doc.visible ? 'Скрыть' : 'Показать'}</button>
                <button onClick={() => remove(doc.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs px-2 py-1.5 rounded-lg transition">✕</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center text-white/40 py-8">Нет документов</div>}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">{isNew ? 'Новый документ' : 'Изменить документ'}</h3>
            <div className="space-y-3">
              {(['ru','en','de','es','tr'] as const).map(l => (
                <div key={l}>
                  <label className="text-white/50 text-xs mb-1 block">Название ({l.toUpperCase()})</label>
                  <input value={String((editing as any)[`title_${l}`] || '')} onChange={e => setEditing(v => ({ ...v, [`title_${l}`]: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
                </div>
              ))}
              <div>
                <label className="text-white/50 text-xs mb-1 block">URL файла (Google Drive, Dropbox, etc.)</label>
                <input value={editing.file_url || ''} onChange={e => setEditing(v => ({ ...v, file_url: e.target.value }))} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Категория</label>
                  <select value={editing.category || 'general'} onChange={e => setEditing(v => ({ ...v, category: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editing.visible !== false} onChange={e => setEditing(v => ({ ...v, visible: e.target.checked }))} className="w-4 h-4 accent-[#D4522A]" />
                    <span className="text-white text-sm">Видимый</span>
                  </label>
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
