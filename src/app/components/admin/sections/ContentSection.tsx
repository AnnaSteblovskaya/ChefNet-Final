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

  const load = () => {
    setLoading(true);
    adminApi.content.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
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

  const langs: Array<[keyof ContentBlock, string]> = [['value_ru', 'RU'], ['value_en', 'EN'], ['value_de', 'DE'], ['value_es', 'ES'], ['value_tr', 'TR']];

  const inp = 'w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400';

  return (
    <div>
      <div className="flex items-start justify-between mb-2 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Content</h1>
        <button onClick={() => setShowNew(true)}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          New block
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">Editable text blocks accessible via API.</p>

      {showNew && (
        <div className="bg-white border border-orange-200 rounded-xl p-5 mb-4">
          <h4 className="font-medium text-gray-800 mb-3">New content block</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Key (slug)</label>
              <input value={newKey} onChange={e => setNewKey(e.target.value.replace(/\s/g, '_').toLowerCase())} placeholder="hero_title" className={inp} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Label</label>
              <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Hero title" className={inp} />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={createNew} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">Create</button>
            <button onClick={() => setShowNew(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(block => (
            <div key={block.key} className={`bg-white border rounded-xl p-4 transition ${saved === block.key ? 'border-green-300' : 'border-gray-200'}`}>
              {editing?.key === block.key ? (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <code className="text-orange-600 text-sm font-mono bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{block.key}</code>
                    <input value={editing.label} onChange={e => setEditing(v => v ? { ...v, label: e.target.value } : v)}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-gray-900 text-sm focus:outline-none focus:border-orange-400" placeholder="Label" />
                  </div>
                  <div className="space-y-2">
                    {langs.map(([field, label]) => (
                      <div key={field} className="flex gap-2 items-start">
                        <span className="text-gray-400 text-xs w-8 pt-2 flex-shrink-0 font-medium">{label}</span>
                        <textarea value={String(editing[field] || '')}
                          onChange={e => setEditing(v => v ? { ...v, [field]: e.target.value } : v)}
                          rows={2} className={inp + ' resize-none flex-1'} />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => saveBlock(editing)} disabled={saving === block.key}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition disabled:opacity-50">
                      {saving === block.key ? '...' : 'Save'}
                    </button>
                    <button onClick={() => setEditing(null)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm transition">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <code className="text-orange-600 text-xs font-mono bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{block.key}</code>
                      <span className="text-gray-600 text-sm">{block.label}</span>
                      {saved === block.key && <span className="text-green-600 text-xs font-medium">✓ Saved</span>}
                    </div>
                    <div className="text-gray-400 text-sm truncate">{block.value_ru || block.value_en || <span className="italic text-gray-300">Empty</span>}</div>
                  </div>
                  <button onClick={() => setEditing({ ...block })}
                    className="text-xs text-gray-600 hover:text-gray-800 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition flex-shrink-0">Edit</button>
                </div>
              )}
            </div>
          ))}
          {items.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </div>
              <p className="text-sm text-gray-500">No content blocks</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
