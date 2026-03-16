import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface ContentBlock {
  id: number; key: string; label: string;
  value_en: string; value_ru: string; value_de: string; value_es: string; value_tr: string;
}

export default function ContentSection() {
  const [items, setItems] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ContentBlock | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [newKey, setNewKey] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [showNew, setShowNew] = useState(false);

  const load = () => { setLoading(true); adminApi.content.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const saveBlock = async (block: ContentBlock) => {
    setSaving(block.key);
    try {
      await adminApi.content.save(block.key, block);
      setSaved(block.key);
      setItems(i => i.map(x => x.key === block.key ? block : x));
      setEditing(null);
      setTimeout(() => setSaved(null), 2000);
    } finally { setSaving(null); }
  };

  const createNew = async () => {
    if (!newKey.trim()) return;
    const block: ContentBlock = { id: 0, key: newKey.trim(), label: newLabel.trim() || newKey.trim(), value_en: '', value_ru: '', value_de: '', value_es: '', value_tr: '' };
    await adminApi.content.save(block.key, block);
    setShowNew(false); setNewKey(''); setNewLabel('');
    load();
  };

  const langs: Array<[keyof ContentBlock, string]> = [['value_ru', '🇷🇺 RU'], ['value_en', '🇬🇧 EN'], ['value_de', '🇩🇪 DE'], ['value_es', '🇪🇸 ES'], ['value_tr', '🇹🇷 TR']];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-white">Контент сайта</h2>
        <button onClick={() => setShowNew(true)} className="bg-[#D4522A] hover:bg-[#c04520] text-white px-4 py-2 rounded-xl text-sm font-medium transition">+ Новый блок</button>
      </div>
      <p className="text-white/40 text-sm mb-6">Редактируемые текстовые блоки, которые можно использовать на сайте через API.</p>

      {showNew && (
        <div className="bg-white/5 border border-[#D4522A]/30 rounded-2xl p-4 mb-4">
          <h4 className="text-white font-medium mb-3">Новый блок контента</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-white/50 text-xs mb-1 block">Ключ (slug)</label>
              <input value={newKey} onChange={e => setNewKey(e.target.value.replace(/\s/g, '_').toLowerCase())} placeholder="hero_title" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">Название</label>
              <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Заголовок главного экрана" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={createNew} className="bg-[#D4522A] text-white px-4 py-2 rounded-xl text-sm transition">Создать</button>
            <button onClick={() => setShowNew(false)} className="bg-white/10 text-white px-4 py-2 rounded-xl text-sm transition">Отмена</button>
          </div>
        </div>
      )}

      {loading ? <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="space-y-3">
          {items.map(block => (
            <div key={block.key} className={`bg-white/5 border rounded-2xl p-4 transition ${saved === block.key ? 'border-green-500/50' : 'border-white/10'}`}>
              {editing?.key === block.key ? (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <code className="text-[#D4522A] text-sm font-mono bg-[#D4522A]/10 px-2 py-0.5 rounded">{block.key}</code>
                    <input value={editing.label} onChange={e => setEditing(v => v ? { ...v, label: e.target.value } : v)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-white text-sm focus:outline-none flex-1" placeholder="Название" />
                  </div>
                  <div className="space-y-2">
                    {langs.map(([field, label]) => (
                      <div key={field} className="flex gap-2 items-start">
                        <span className="text-white/40 text-xs w-8 pt-2 flex-shrink-0">{label}</span>
                        <textarea value={String(editing[field] || '')} onChange={e => setEditing(v => v ? { ...v, [field]: e.target.value } : v)} rows={2} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A]" />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => saveBlock(editing)} disabled={saving === block.key} className="bg-[#D4522A] hover:bg-[#c04520] text-white px-4 py-1.5 rounded-xl text-sm transition">{saving === block.key ? '...' : 'Сохранить'}</button>
                    <button onClick={() => setEditing(null)} className="bg-white/10 text-white px-4 py-1.5 rounded-xl text-sm transition">Отмена</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-[#D4522A] text-xs font-mono bg-[#D4522A]/10 px-2 py-0.5 rounded">{block.key}</code>
                      <span className="text-white/60 text-sm">{block.label}</span>
                      {saved === block.key && <span className="text-green-400 text-xs">✓ Сохранено</span>}
                    </div>
                    <div className="text-white/50 text-sm truncate">{block.value_ru || block.value_en || <span className="italic text-white/20">Пусто</span>}</div>
                  </div>
                  <button onClick={() => setEditing({ ...block })} className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 rounded-lg transition flex-shrink-0">Изменить</button>
                </div>
              )}
            </div>
          ))}
          {items.length === 0 && <div className="text-center text-white/40 py-8">Нет блоков контента</div>}
        </div>
      )}
    </div>
  );
}
