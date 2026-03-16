import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface KYC {
  id: number; user_id: string; email: string; full_name: string;
  status: string; country: string; date_of_birth: string; phone: string;
  address: string; notes: string; created_at: string;
  sumsub_applicant_id?: string;
}

const STATUS_COLORS: Record<string, string> = {
  not_started: 'bg-white/10 text-white/40',
  pending:     'bg-yellow-500/20 text-yellow-400',
  verified:    'bg-green-500/20 text-green-400',
  rejected:    'bg-red-500/20 text-red-400',
};

const STATUS_LABELS: Record<string, string> = {
  not_started: 'Не начата',
  pending:     'На проверке',
  verified:    'Верифицирован',
  rejected:    'Отклонён',
};

export default function KYCSection() {
  const [items, setItems] = useState<KYC[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<KYC | null>(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    adminApi.kyc.list()
      .then(d => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(load, []);

  const open = (item: KYC) => { setSelected(item); setNotes(item.notes || ''); };

  const setStatus = async (status: string) => {
    if (!selected) return;
    setSaving(true);
    try {
      await adminApi.kyc.update(selected.id, { status, notes });
      setItems(i => i.map(x => x.id === selected.id ? { ...x, status, notes } : x));
      setSelected(null);
    } finally { setSaving(false); }
  };

  const pending = items.filter(i => i.status === 'pending').length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-white">KYC Верификация</h2>
        {pending > 0 && (
          <span className="bg-yellow-500 text-black text-sm px-2 py-0.5 rounded-full font-semibold">
            {pending} на рассмотрении
          </span>
        )}
        <span className="ml-auto text-xs text-white/30 bg-white/5 px-3 py-1 rounded-full">
          Через Sumsub
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-white/50">
                <th className="text-left p-3">Пользователь</th>
                <th className="text-left p-3">Страна</th>
                <th className="text-center p-3">Статус</th>
                <th className="text-left p-3">Applicant ID</th>
                <th className="text-left p-3">Дата заявки</th>
                <th className="p-3">Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className={`border-t border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                  <td className="p-3">
                    <div className="text-white text-xs">{item.email}</div>
                    <div className="text-white/40 text-xs">{item.full_name || '—'}</div>
                  </td>
                  <td className="p-3 text-white/60 text-xs">{item.country || '—'}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${STATUS_COLORS[item.status] || 'bg-white/10 text-white/40'}`}>
                      {STATUS_LABELS[item.status] || item.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {item.sumsub_applicant_id ? (
                      <a
                        href={`https://cockpit.sumsub.com/applicants/${item.sumsub_applicant_id}/basicInfo`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E8744F] hover:text-[#D4522A] text-xs font-mono underline"
                        title="Открыть в Sumsub"
                      >
                        {item.sumsub_applicant_id.slice(0, 12)}…
                      </a>
                    ) : (
                      <span className="text-white/20 text-xs">—</span>
                    )}
                  </td>
                  <td className="p-3 text-white/40 text-xs">
                    {new Date(item.created_at).toLocaleDateString('ru')}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => open(item)}
                      className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-lg transition"
                    >
                      Рассмотреть
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <div className="text-center text-white/40 py-8">Нет KYC заявок</div>
          )}
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-1">KYC: {selected.email}</h3>
            {selected.sumsub_applicant_id && (
              <a
                href={`https://cockpit.sumsub.com/applicants/${selected.sumsub_applicant_id}/basicInfo`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8744F] text-xs underline block mb-4"
              >
                Открыть в Sumsub Dashboard ↗
              </a>
            )}
            <div className="space-y-2 text-sm mb-4">
              {[
                ['Имя', selected.full_name],
                ['Страна', selected.country],
                ['Дата рождения', selected.date_of_birth],
                ['Телефон', selected.phone],
                ['Адрес', selected.address],
              ].map(([k, v]) => v && (
                <div key={k} className="flex gap-2">
                  <span className="text-white/40 w-32">{k}:</span>
                  <span className="text-white">{v}</span>
                </div>
              ))}
            </div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Заметки для пользователя..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm resize-none h-20 focus:outline-none focus:border-[#D4522A] mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setStatus('verified')}
                disabled={saving}
                className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 py-2 rounded-xl text-sm font-medium transition"
              >
                ✓ Одобрить
              </button>
              <button
                onClick={() => setStatus('rejected')}
                disabled={saving}
                className="flex-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 py-2 rounded-xl text-sm font-medium transition"
              >
                ✕ Отклонить
              </button>
              <button
                onClick={() => setStatus('pending')}
                disabled={saving}
                className="flex-1 bg-white/10 text-white/60 hover:bg-white/20 py-2 rounded-xl text-sm transition"
              >
                На рассмотрение
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
