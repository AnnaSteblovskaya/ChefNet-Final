import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Template {
  id: number; event: string; email_enabled: boolean; account_enabled: boolean;
  subject_en: string; subject_ru: string; body_en: string; body_ru: string; sort_order: number;
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
    try {
      await adminApi.templates.update(item.id, updated);
    } catch {
      setItems(prev => prev.map(i => i.id === item.id ? item : i));
    }
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Шаблоны уведомлений</h2>
      </div>

      {loading ? (
        <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-white/10">
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Шаблон (событие)</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Email-уведомление</th>
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Уведомление в аккаунте</th>
              <th className="px-4 py-3" />
            </tr></thead>
            <tbody>
              {items.map(t => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-white text-sm">{t.event}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleField(t, 'email_enabled')} className="text-lg">
                      {t.email_enabled ? <span className="text-green-400">✓</span> : <span className="text-red-400">✕</span>}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleField(t, 'account_enabled')} className="text-lg">
                      {t.account_enabled ? <span className="text-green-400">✓</span> : <span className="text-red-400">✕</span>}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => { setEditing({ ...t }); setBodyLang('en'); }} className="text-white/50 hover:text-white text-xs px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition">Изменить</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={4} className="text-center text-white/40 py-8">Нет шаблонов</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">{editing.event}</h3>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <div onClick={() => setEditing(v => v && ({ ...v, email_enabled: !v.email_enabled }))} className={`w-10 h-6 rounded-full transition ${editing.email_enabled ? 'bg-[#D4522A]' : 'bg-white/20'} relative`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${editing.email_enabled ? 'left-5' : 'left-1'}`} />
                </div>
                <span className="text-white text-sm">Email-уведомление</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <div onClick={() => setEditing(v => v && ({ ...v, account_enabled: !v.account_enabled }))} className={`w-10 h-6 rounded-full transition ${editing.account_enabled ? 'bg-[#D4522A]' : 'bg-white/20'} relative`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${editing.account_enabled ? 'left-5' : 'left-1'}`} />
                </div>
                <span className="text-white text-sm">Уведомление в аккаунте</span>
              </label>
            </div>
            <div className="flex gap-2 mb-4">
              <button onClick={() => setBodyLang('en')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${bodyLang === 'en' ? 'bg-[#D4522A] text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>English</button>
              <button onClick={() => setBodyLang('ru')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${bodyLang === 'ru' ? 'bg-[#D4522A] text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>Русский</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-white/50 text-xs mb-1 block">Тема письма</label>
                <input value={bodyLang === 'en' ? editing.subject_en || '' : editing.subject_ru || ''}
                  onChange={e => setEditing(v => v && ({ ...v, [`subject_${bodyLang}`]: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Тело письма</label>
                <textarea rows={8} value={bodyLang === 'en' ? editing.body_en || '' : editing.body_ru || ''}
                  onChange={e => setEditing(v => v && ({ ...v, [`body_${bodyLang}`]: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A] font-mono" />
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
