import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Template {
  id: number; event: string; email_enabled: boolean; account_enabled: boolean;
  subject_en: string; subject_ru: string; body_en: string; body_ru: string; sort_order: number;
}

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`w-10 h-6 rounded-full transition relative ${value ? 'bg-amber-500' : 'bg-gray-200'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${value ? 'left-5' : 'left-1'}`} />
    </button>
  );
}

export default function TemplatesSection() {
  const [items, setItems] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Template | null>(null);
  const [saving, setSaving] = useState(false);
  const [bodyLang, setBodyLang] = useState<'en' | 'ru'>('en');

  const load = () => {
    setLoading(true);
    adminApi.templates.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, []);

  const toggleField = async (item: Template, field: 'email_enabled' | 'account_enabled') => {
    const updated = { ...item, [field]: !item[field] };
    setItems(prev => prev.map(i => i.id === item.id ? updated : i));
    try { await adminApi.templates.update(item.id, updated); }
    catch { setItems(prev => prev.map(i => i.id === item.id ? item : i)); }
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await adminApi.templates.update(editing.id, editing);
      setItems(prev => prev.map(i => i.id === editing.id ? editing : i));
      setEditing(null);
    } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Event</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">In-app</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {items.map(t => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{t.event}</td>
                    <td className="px-5 py-4">
                      <Toggle value={t.email_enabled} onChange={() => toggleField(t, 'email_enabled')} />
                    </td>
                    <td className="px-5 py-4">
                      <Toggle value={t.account_enabled} onChange={() => toggleField(t, 'account_enabled')} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => { setEditing({ ...t }); setBodyLang('en'); }}
                        className="text-xs text-gray-500 hover:text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200 hover:border-gray-300 transition">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan={4}>
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                      </div>
                      <p className="text-sm text-gray-500">No templates</p>
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
            <h3 className="text-lg font-bold text-gray-900 mb-4">{editing.event}</h3>
            <div className="flex gap-5 mb-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <Toggle value={editing.email_enabled} onChange={() => setEditing(v => v && ({ ...v, email_enabled: !v.email_enabled }))} />
                <span className="text-sm text-gray-700">Email notification</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Toggle value={editing.account_enabled} onChange={() => setEditing(v => v && ({ ...v, account_enabled: !v.account_enabled }))} />
                <span className="text-sm text-gray-700">In-app notification</span>
              </label>
            </div>
            <div className="flex gap-1.5 mb-4">
              {(['en', 'ru'] as const).map(l => (
                <button key={l} onClick={() => setBodyLang(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${bodyLang === l ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {l === 'en' ? 'English' : 'Русский'}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Subject</label>
                <input value={bodyLang === 'en' ? editing.subject_en || '' : editing.subject_ru || ''}
                  onChange={e => setEditing(v => v && ({ ...v, [`subject_${bodyLang}`]: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Body</label>
                <textarea rows={8} value={bodyLang === 'en' ? editing.body_en || '' : editing.body_ru || ''}
                  onChange={e => setEditing(v => v && ({ ...v, [`body_${bodyLang}`]: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm resize-none focus:outline-none focus:border-orange-400 font-mono" />
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
