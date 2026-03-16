import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface KYC {
  id: number; user_id: string; email: string; full_name: string;
  status: string; country: string; date_of_birth: string; phone: string;
  address: string; notes: string; created_at: string;
  sumsub_applicant_id?: string;
}

const STATUS_STYLES: Record<string, string> = {
  not_started: 'bg-gray-50 text-gray-500 border-gray-200',
  pending:     'bg-yellow-50 text-yellow-700 border-yellow-200',
  verified:    'bg-green-50 text-green-700 border-green-200',
  rejected:    'bg-red-50 text-red-600 border-red-200',
};

const STATUS_LABELS: Record<string, string> = {
  not_started: 'Not started',
  pending:     'Pending',
  verified:    'Verified',
  rejected:    'Rejected',
};

export default function KYCSection() {
  const [items, setItems] = useState<KYC[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<KYC | null>(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    adminApi.kyc.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
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
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Verifications</h1>
        {pending > 0 && (
          <span className="bg-yellow-400 text-yellow-900 text-xs px-2.5 py-1 rounded-full font-semibold">
            {pending} pending
          </span>
        )}
        <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">via Sumsub</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">User</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Country</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Applicant ID</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Date</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-gray-900 text-sm">{item.email}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.full_name || '—'}</div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{item.country || '—'}</td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLES[item.status] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                        {STATUS_LABELS[item.status] || item.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {item.sumsub_applicant_id ? (
                        <a href={`https://cockpit.sumsub.com/applicants/${item.sumsub_applicant_id}/basicInfo`}
                          target="_blank" rel="noopener noreferrer"
                          className="text-orange-500 hover:text-orange-600 text-xs font-mono underline">
                          {item.sumsub_applicant_id.slice(0, 12)}…
                        </a>
                      ) : <span className="text-gray-300 text-xs">—</span>}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => open(item)}
                        className="text-xs text-gray-600 hover:text-gray-800 px-2.5 py-1 rounded-lg border border-gray-200 hover:border-gray-300 transition">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </div>
                <p className="text-sm text-gray-500">No KYC applications</p>
              </div>
            )}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-1">KYC: {selected.email}</h3>
            {selected.sumsub_applicant_id && (
              <a href={`https://cockpit.sumsub.com/applicants/${selected.sumsub_applicant_id}/basicInfo`}
                target="_blank" rel="noopener noreferrer"
                className="text-orange-500 text-xs underline block mb-4">
                Open in Sumsub Dashboard ↗
              </a>
            )}
            <div className="space-y-2 text-sm mb-4 bg-gray-50 rounded-lg p-4">
              {[['Name', selected.full_name], ['Country', selected.country], ['Date of birth', selected.date_of_birth], ['Phone', selected.phone], ['Address', selected.address]]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <span className="text-gray-400 w-32 shrink-0">{k}:</span>
                    <span className="text-gray-900">{v}</span>
                  </div>
                ))}
            </div>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes for the user..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 text-sm resize-none h-20 focus:outline-none focus:border-orange-400 mb-4" />
            <div className="flex gap-2">
              <button onClick={() => setStatus('verified')} disabled={saving}
                className="flex-1 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 py-2 rounded-lg text-sm font-medium transition">
                ✓ Approve
              </button>
              <button onClick={() => setStatus('rejected')} disabled={saving}
                className="flex-1 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 py-2 rounded-lg text-sm font-medium transition">
                ✕ Reject
              </button>
              <button onClick={() => setStatus('pending')} disabled={saving}
                className="flex-1 bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100 py-2 rounded-lg text-sm transition">
                Pending
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
