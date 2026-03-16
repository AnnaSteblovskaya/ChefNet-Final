import { useEffect, useState } from 'react';
import { adminApi } from '../api';

const FIELDS = [
  { group: 'Company', fields: [
    { key: 'site_url', label: 'Site URL', placeholder: 'https://chefnet.ai' },
    { key: 'site_name', label: 'Site name', placeholder: 'ChefNet' },
    { key: 'company_name', label: 'Company name', placeholder: 'ChefNet LLC' },
    { key: 'company_email', label: 'Company email', placeholder: 'support@chefnet.ai' },
    { key: 'company_phone', label: 'Phone', placeholder: '+1 (917) 332-8053' },
    { key: 'company_address', label: 'Address', placeholder: 'The Green STE B, Dover, DE 19901', multiline: true },
  ]},
  { group: 'Social networks', fields: [
    { key: 'facebook_url', label: 'Facebook URL', placeholder: 'https://www.facebook.com/...' },
    { key: 'instagram_url', label: 'Instagram URL', placeholder: 'https://www.instagram.com/...' },
    { key: 'tiktok_url', label: 'TikTok URL', placeholder: 'https://www.tiktok.com/...' },
    { key: 'telegram_url', label: 'Telegram URL', placeholder: 'https://t.me/...' },
    { key: 'youtube_url', label: 'YouTube URL', placeholder: 'https://www.youtube.com/...' },
    { key: 'twitter_url', label: 'Twitter/X URL', placeholder: 'https://twitter.com/...' },
  ]},
];

export default function SettingsSection() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    adminApi.settings.list().then((rows: { key: string; value: string }[]) => {
      const map: Record<string, string> = {};
      rows.forEach(r => { map[r.key] = r.value; });
      setValues(map);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await adminApi.settings.save(values);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally { setSaving(false); }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
          {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save changes'}
        </button>
      </div>

      <div className="space-y-5">
        {FIELDS.map(group => (
          <div key={group.group} className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-5">{group.group}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.fields.map(f => (
                <div key={f.key} className={(f as any).multiline ? 'md:col-span-2' : ''}>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">{f.label}</label>
                  {(f as any).multiline ? (
                    <textarea rows={2} value={values[f.key] || ''} onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm resize-none focus:outline-none focus:border-orange-400" />
                  ) : (
                    <input value={values[f.key] || ''} onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
