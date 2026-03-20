import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Investment {
  id: number;
  user_id: string;
  email: string;
  full_name: string;
  round: string;
  shares: number;
  amount: string;
  date: string;
  status: string;
  payment_method: string;
  crypto_network: string | null;
  bank_type: string | null;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-yellow-500/20 text-yellow-400',
  confirmed: 'bg-green-500/20 text-green-400',
  completed: 'bg-green-500/20 text-green-400',
  rejected:  'bg-red-500/20 text-red-400',
};

const STATUS_LABELS: Record<string, string> = {
  pending:   'Ожидает',
  confirmed: 'Подтверждён',
  completed: 'Завершён',
  rejected:  'Отклонён',
};

const METHOD_LABELS: Record<string, string> = {
  bank:   '🏦 Банк',
  crypto: '₿ Крипто',
};

const NETWORK_LABELS: Record<string, string> = {
  trc20:    'TRC-20',
  erc20:    'ERC-20',
  bep20:    'BEP-20',
  polygon:  'Polygon',
  solana:   'Solana',
  arbitrum: 'Arbitrum',
  ton:      'TON',
};

const BANK_LABELS: Record<string, string> = {
  intl: 'SWIFT/IBAN',
  us:   'ACH/Wire (США)',
};

export default function PaymentsSection() {
  const [items, setItems] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [saving, setSaving] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    adminApi.investments.list()
      .then(d => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(load, []);

  const setStatus = async (inv: Investment, status: string) => {
    setSaving(inv.id);
    try {
      await adminApi.investments.update(inv.id, { status });
      setItems(i => i.map(x => x.id === inv.id ? { ...x, status } : x));
    } finally { setSaving(null); }
  };

  const remove = async (id: number) => {
    if (!confirm('Удалить запись о платеже?')) return;
    await adminApi.investments.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const filtered = items.filter(i => {
    const matchStatus = filter === 'all' || i.status === filter;
    const matchMethod = methodFilter === 'all' || i.payment_method === methodFilter;
    const matchSearch = !search || (i.email + i.full_name + i.round).toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchMethod && matchSearch;
  });

  const pending   = items.filter(i => i.status === 'pending').length;
  const confirmed = items.filter(i => i.status === 'confirmed').length;

  const exportCSV = () => {
    const rows = [
      ['ID', 'Email', 'Имя', 'Раунд', 'Акций', 'Сумма', 'Метод', 'Сеть/Тип', 'Статус', 'Дата'],
      ...filtered.map(i => [
        i.id, i.email, i.full_name || '',
        i.round, i.shares, i.amount,
        i.payment_method, i.crypto_network || i.bank_type || '',
        i.status, (i.created_at || i.date || '').slice(0, 10),
      ]),
    ];
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'payments.csv';
    a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Платежи
            {pending > 0 && (
              <span className="ml-2 bg-yellow-500 text-black text-sm px-2 py-0.5 rounded-full">{pending} ожидают</span>
            )}
            {confirmed > 0 && (
              <span className="ml-2 bg-green-500/30 text-green-400 text-sm px-2 py-0.5 rounded-full">{confirmed} подтверждено</span>
            )}
          </h2>
          <p className="text-white/40 text-sm mt-1">Все заявки на покупку долей · подтверждение вручную</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={load} className="bg-white/10 hover:bg-white/15 text-white px-3 py-2 rounded-xl text-sm transition">↻ Обновить</button>
          <button onClick={exportCSV} className="bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-xl text-sm font-medium transition">↓ Экспорт CSV</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Поиск по email или раунду..."
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm w-56 focus:outline-none focus:border-[#D4522A]"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none"
        >
          <option value="all">Все статусы</option>
          <option value="pending">Ожидают</option>
          <option value="confirmed">Подтверждены</option>
          <option value="completed">Завершены</option>
          <option value="rejected">Отклонены</option>
        </select>
        <select
          value={methodFilter}
          onChange={e => setMethodFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none"
        >
          <option value="all">Все методы</option>
          <option value="bank">Банковский перевод</option>
          <option value="crypto">Криптовалюта</option>
        </select>
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
                <th className="text-left p-3">Раунд</th>
                <th className="text-right p-3">Акций</th>
                <th className="text-right p-3">Сумма</th>
                <th className="text-left p-3">Способ оплаты</th>
                <th className="text-center p-3">Статус</th>
                <th className="text-left p-3">Дата</th>
                <th className="p-3">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center p-8 text-white/30">Нет платежей</td>
                </tr>
              ) : (
                filtered.flatMap((inv, i) => {
                  const rows = [
                    <tr
                      key={inv.id}
                      className={`border-t border-white/5 cursor-pointer hover:bg-white/5 transition ${i % 2 === 0 ? 'bg-white/[0.02]' : ''} ${expanded === inv.id ? 'bg-white/[0.04]' : ''}`}
                      onClick={() => setExpanded(expanded === inv.id ? null : inv.id)}
                    >
                      <td className="p-3">
                        <div className="text-white text-xs font-medium">{inv.email}</div>
                        <div className="text-white/40 text-xs">{inv.full_name || '—'}</div>
                      </td>
                      <td className="p-3 text-white/70 text-xs">{inv.round}</td>
                      <td className="p-3 text-right text-white font-mono text-xs">{Number(inv.shares).toLocaleString()}</td>
                      <td className="p-3 text-right text-white font-mono text-xs">${Number(inv.amount).toLocaleString()}</td>
                      <td className="p-3">
                        <div className="text-white/70 text-xs">{METHOD_LABELS[inv.payment_method] || inv.payment_method}</div>
                        {inv.payment_method === 'crypto' && inv.crypto_network && (
                          <div className="text-white/40 text-xs">USDT · {NETWORK_LABELS[inv.crypto_network] || inv.crypto_network}</div>
                        )}
                        {inv.payment_method === 'bank' && inv.bank_type && (
                          <div className="text-white/40 text-xs">{BANK_LABELS[inv.bank_type] || inv.bank_type}</div>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${STATUS_COLORS[inv.status] || 'bg-white/10 text-white/40'}`}>
                          {STATUS_LABELS[inv.status] || inv.status}
                        </span>
                      </td>
                      <td className="p-3 text-white/40 text-xs whitespace-nowrap">
                        {(inv.created_at || inv.date || '').slice(0, 10)}
                      </td>
                      <td className="p-3 text-right" onClick={e => e.stopPropagation()}>
                        {saving === inv.id ? (
                          <div className="w-5 h-5 border-2 border-[#D4522A] border-t-transparent rounded-full animate-spin inline-block" />
                        ) : (
                          <div className="flex items-center gap-1 justify-end flex-wrap">
                            {inv.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => setStatus(inv, 'confirmed')}
                                  className="bg-green-500/20 hover:bg-green-500/40 text-green-400 px-2 py-1 rounded-lg text-xs transition whitespace-nowrap"
                                >
                                  ✓ Подтвердить
                                </button>
                                <button
                                  onClick={() => setStatus(inv, 'rejected')}
                                  className="bg-red-500/20 hover:bg-red-500/40 text-red-400 px-2 py-1 rounded-lg text-xs transition"
                                >
                                  ✗ Отклонить
                                </button>
                              </>
                            )}
                            {inv.status === 'confirmed' && (
                              <button
                                onClick={() => setStatus(inv, 'completed')}
                                className="bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 px-2 py-1 rounded-lg text-xs transition whitespace-nowrap"
                              >
                                ✓ Завершить
                              </button>
                            )}
                            {(inv.status === 'rejected' || inv.status === 'completed') && (
                              <button
                                onClick={() => setStatus(inv, 'pending')}
                                className="bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 px-2 py-1 rounded-lg text-xs transition"
                              >
                                ↺ Вернуть
                              </button>
                            )}
                            <button
                              onClick={() => remove(inv.id)}
                              className="bg-red-500/10 hover:bg-red-500/30 text-red-400/70 hover:text-red-400 px-2 py-1 rounded-lg text-xs transition"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>,
                  ];
                  if (expanded === inv.id) {
                    rows.push(
                      <tr key={`exp-${inv.id}`} className="border-t border-white/5 bg-white/[0.03]">
                        <td colSpan={8} className="p-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div>
                              <div className="text-white/40 mb-1">ID заявки</div>
                              <div className="text-white font-mono">#{inv.id}</div>
                            </div>
                            <div>
                              <div className="text-white/40 mb-1">User ID</div>
                              <div className="text-white font-mono text-[10px] break-all">{inv.user_id}</div>
                            </div>
                            <div>
                              <div className="text-white/40 mb-1">Метод оплаты</div>
                              <div className="text-white">
                                {inv.payment_method === 'bank'
                                  ? `Банк (${BANK_LABELS[inv.bank_type || ''] || inv.bank_type || '—'})`
                                  : `USDT ${NETWORK_LABELS[inv.crypto_network || ''] || inv.crypto_network || '—'}`}
                              </div>
                            </div>
                            <div>
                              <div className="text-white/40 mb-1">Изменить статус</div>
                              <select
                                value={inv.status}
                                onChange={e => setStatus(inv, e.target.value)}
                                disabled={saving === inv.id}
                                className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white text-xs focus:outline-none"
                              >
                                <option value="pending">Ожидает</option>
                                <option value="confirmed">Подтверждён</option>
                                <option value="completed">Завершён</option>
                                <option value="rejected">Отклонён</option>
                              </select>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                  return rows;
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
