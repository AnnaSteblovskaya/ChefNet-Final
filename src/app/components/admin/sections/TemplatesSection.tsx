import { useEffect, useState } from 'react';
import { adminApi } from '../api';

type Lang = 'en' | 'ru' | 'de' | 'es' | 'tr';

interface Template {
  id: number; event: string; email_enabled: boolean; account_enabled: boolean;
  subject_en: string; subject_ru: string; subject_de: string; subject_es: string; subject_tr: string;
  body_en: string; body_ru: string; body_de: string; body_es: string; body_tr: string;
  sort_order: number;
}

const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'tr', label: 'Türkçe' },
];

export default function TemplatesSection() {
  const [items, setItems] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Template | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveOk, setSaveOk] = useState(false);
  const [bodyLang, setBodyLang] = useState<Lang>('ru');
  const [testing, setTesting] = useState<{ id: number; type: string } | null>(null);
  const [testResult, setTestResult] = useState<{ ok: boolean; msg: string } | null>(null);

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
    setSaveError('');
    setSaveOk(false);
    try {
      await adminApi.templates.update(editing.id, editing);
      setItems(prev => prev.map(i => i.id === editing.id ? editing : i));
      setSaveOk(true);
      setTimeout(() => { setSaveOk(false); setEditing(null); }, 800);
    } catch (e: any) {
      setSaveError(e?.message || 'Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const sendTest = async (id: number, type: 'email' | 'account', lang?: Lang) => {
    setTesting({ id, type });
    setTestResult(null);
    try {
      const res = await adminApi.templates.test(id, type, lang || bodyLang);
      setTestResult({ ok: res.success, msg: res.success ? `Отправлено (${(lang || bodyLang).toUpperCase()}) → ${res.sent_to}` : 'Ошибка отправки' });
    } catch (e: any) {
      setTestResult({ ok: false, msg: e?.message || 'Ошибка' });
    } finally {
      setTesting(null);
      setTimeout(() => setTestResult(null), 5000);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Шаблоны уведомлений</h2>
      </div>

      {testResult && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${testResult.ok ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
          {testResult.ok ? '✓' : '✕'} {testResult.msg}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-white/10">
              <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Шаблон (событие)</th>
              <th className="text-center px-4 py-3 text-white/50 text-xs font-medium">Email</th>
              <th className="text-center px-4 py-3 text-white/50 text-xs font-medium">В кабинет</th>
              <th className="text-center px-4 py-3 text-white/50 text-xs font-medium">Тест</th>
              <th className="px-4 py-3" />
            </tr></thead>
            <tbody>
              {items.map(t => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-white text-sm">{t.event}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleField(t, 'email_enabled')} className="text-lg">
                      {t.email_enabled ? <span className="text-green-400">✓</span> : <span className="text-red-400">✕</span>}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleField(t, 'account_enabled')} className="text-lg">
                      {t.account_enabled ? <span className="text-green-400">✓</span> : <span className="text-red-400">✕</span>}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() => sendTest(t.id, 'email')}
                        disabled={testing?.id === t.id}
                        title="Тест email"
                        className="text-xs px-2 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition disabled:opacity-50"
                      >
                        {testing?.id === t.id && testing.type === 'email' ? '...' : '✉'}
                      </button>
                      <button
                        onClick={() => sendTest(t.id, 'account')}
                        disabled={testing?.id === t.id}
                        title="Тест уведомления в кабинет"
                        className="text-xs px-2 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 transition disabled:opacity-50"
                      >
                        {testing?.id === t.id && testing.type === 'account' ? '...' : '🔔'}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => { setEditing({ ...t }); setBodyLang('ru'); setSaveError(''); setSaveOk(false); }} className="text-white/50 hover:text-white text-xs px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition">Изменить</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={5} className="text-center text-white/40 py-8">Нет шаблонов</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">{editing.event}</h3>

            <div className="flex gap-4 mb-5">
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

            <div className="flex gap-1 mb-4 flex-wrap">
              {LANGS.map(l => (
                <button key={l.code} onClick={() => setBodyLang(l.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${bodyLang === l.code ? 'bg-[#D4522A] text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                  {l.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-white/50 text-xs mb-1 block">Тема письма</label>
                <input
                  value={(editing as any)[`subject_${bodyLang}`] || ''}
                  onChange={e => setEditing(v => v && ({ ...v, [`subject_${bodyLang}`]: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Тело письма <span className="text-white/30">(поддерживает {'{{name}}'})</span></label>
                <textarea rows={9}
                  value={(editing as any)[`body_${bodyLang}`] || ''}
                  onChange={e => setEditing(v => v && ({ ...v, [`body_${bodyLang}`]: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A] font-mono"
                />
              </div>
            </div>

            {saveError && <p className="mt-2 text-red-400 text-xs">{saveError}</p>}
            {saveOk && <p className="mt-2 text-green-400 text-xs">✓ Сохранено</p>}

            <div className="flex gap-2 mt-4">
              <button onClick={save} disabled={saving} className="flex-1 bg-[#D4522A] hover:bg-[#c04520] text-white py-2 rounded-xl text-sm font-medium transition disabled:opacity-50">
                {saving ? 'Сохранение...' : saveOk ? '✓ Сохранено' : 'Сохранить'}
              </button>
              <button
                onClick={() => sendTest(editing.id, 'email')}
                disabled={!!testing}
                title="Отправить тестовое письмо себе"
                className="px-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2 rounded-xl text-sm transition disabled:opacity-50"
              >
                {testing?.id === editing.id && testing.type === 'email' ? '...' : '✉ Тест'}
              </button>
              <button
                onClick={() => sendTest(editing.id, 'account')}
                disabled={!!testing}
                title="Отправить тестовое уведомление в кабинет"
                className="px-4 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-2 rounded-xl text-sm transition disabled:opacity-50"
              >
                {testing?.id === editing.id && testing.type === 'account' ? '...' : '🔔 Тест'}
              </button>
              <button onClick={() => setEditing(null)} className="px-4 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-sm transition">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
