import { useEffect, useState } from 'react';
import { adminApi } from '../api';

const FIELDS = [
  { group: 'Компания', fields: [
    { key: 'site_url', label: 'URL сайта', placeholder: 'https://chefnet.ai' },
    { key: 'site_name', label: 'Название сайта', placeholder: 'ChefNet' },
    { key: 'company_name', label: 'Название компании', placeholder: 'ChefNet LLC' },
    { key: 'company_email', label: 'Email компании', placeholder: 'support@chefnet.ai' },
    { key: 'company_phone', label: 'Телефон', placeholder: '+1 (917) 332-8053' },
    { key: 'company_address', label: 'Адрес', placeholder: 'The Green STE B, Dover, DE 19901', multiline: true },
  ]},
  { group: 'Банковские реквизиты — Международный (SWIFT/IBAN)', fields: [
    { key: 'bank_intl_account_holder', label: 'Получатель', placeholder: 'ChefNet LLC' },
    { key: 'bank_intl_bank_name', label: 'Банк', placeholder: 'Wise (TransferWise)' },
    { key: 'bank_intl_swift', label: 'SWIFT/BIC', placeholder: 'TRWIBEB1XXX' },
    { key: 'bank_intl_iban', label: 'IBAN', placeholder: 'BE56 9670 3661 4199' },
    { key: 'bank_intl_bank_address', label: 'Адрес банка', placeholder: 'Rue du Trône 100, 3rd floor, Brussels' },
    { key: 'bank_intl_bank_country', label: 'Страна банка', placeholder: 'Belgium' },
  ]},
  { group: 'Банковские реквизиты — США (ACH / Wire Transfer)', fields: [
    { key: 'bank_us_account_holder', label: 'Получатель', placeholder: 'ChefNet LLC' },
    { key: 'bank_us_bank_name', label: 'Банк', placeholder: 'Evolve Bank & Trust' },
    { key: 'bank_us_routing_number', label: 'Routing Number', placeholder: '084106768' },
    { key: 'bank_us_account_number', label: 'Account Number', placeholder: '123456789' },
    { key: 'bank_us_swift', label: 'SWIFT/BIC', placeholder: 'EVBKUS44' },
    { key: 'bank_us_address', label: 'Адрес банка', placeholder: '6070 Poplar Ave, Suite 200, Memphis, TN' },
  ]},
  { group: 'Крипто-кошельки USDT (адреса для приёма платежей)', fields: [
    { key: 'crypto_usdt_trc20',    label: 'TRC-20 (Tron)',    placeholder: 'TXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
    { key: 'crypto_usdt_bep20',    label: 'BEP-20 (BSC)',     placeholder: '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
    { key: 'crypto_usdt_polygon',  label: 'Polygon',          placeholder: '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
    { key: 'crypto_usdt_ton',      label: 'TON Network',      placeholder: 'UQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
    { key: 'crypto_usdt_arbitrum', label: 'Arbitrum One',     placeholder: '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
    { key: 'crypto_usdt_solana',   label: 'Solana',           placeholder: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
    { key: 'crypto_usdt_erc20',    label: 'ERC-20 (Ethereum)', placeholder: '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
  ]},
  { group: 'Социальные сети', fields: [
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

  if (loading) {
    return <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Настройки</h2>
        <button onClick={save} disabled={saving} className="bg-[#D4522A] hover:bg-[#c04520] disabled:opacity-50 text-white px-6 py-2 rounded-xl text-sm font-medium transition">
          {saving ? 'Сохранение...' : saved ? '✓ Сохранено' : 'Сохранить изменения'}
        </button>
      </div>

      <div className="space-y-6">
        {FIELDS.map(group => (
          <div key={group.group} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">{group.group}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.fields.map(f => (
                <div key={f.key} className={(f as any).multiline ? 'md:col-span-2' : ''}>
                  <label className="text-white/50 text-xs mb-1 block">{f.label}</label>
                  {(f as any).multiline ? (
                    <textarea rows={2} value={values[f.key] || ''} onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))} placeholder={f.placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A]" />
                  ) : (
                    <input value={values[f.key] || ''} onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))} placeholder={f.placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]" />
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
