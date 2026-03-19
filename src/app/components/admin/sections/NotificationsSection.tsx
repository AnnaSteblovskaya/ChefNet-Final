import { useEffect, useState, useMemo } from 'react';
import { adminApi } from '../api';

interface Notification {
  id: number;
  user_email: string;
  type: string;
  message: string;
  created_at: string;
  status: string;
}

const TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  'User registered':      { label: 'Регистрация',         color: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' },
  'Email verified':       { label: 'Email подтверждён',   color: 'bg-green-500/20 text-green-300 border border-green-500/30' },
  'KYC submitted':        { label: 'KYC подан',           color: 'bg-purple-500/20 text-purple-300 border border-purple-500/30' },
  'KYC approved':         { label: 'Верифицирован ✓',     color: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
  'KYC rejected':         { label: 'Не верифицирован ✗',  color: 'bg-red-500/20 text-red-300 border border-red-500/30' },
  'Partner KYC verified': { label: 'KYC партнёра ✓',      color: 'bg-teal-500/20 text-teal-300 border border-teal-500/30' },
  'Investment created':   { label: 'Инвестиция создана',  color: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' },
  'Partner investment':   { label: 'Инвестиция партнёра', color: 'bg-orange-500/20 text-orange-300 border border-orange-500/30' },
  'Password reset':       { label: 'Сброс пароля',        color: 'bg-pink-500/20 text-pink-300 border border-pink-500/30' },
  'Profile updated':      { label: 'Профиль обновлён',    color: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' },
  'Referral joined':      { label: 'Реферал присоединился','color': 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' },
};

const STATUS_TABS = [
  { id: '',         label: 'Все' },
  { id: 'active',   label: 'Активные' },
  { id: 'archived', label: 'Архив' },
  { id: 'hidden',   label: 'Скрытые' },
];

function TypeBadge({ type }: { type: string }) {
  const cfg = TYPE_CONFIG[type];
  if (!cfg) return <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50 border border-white/10">{type || '—'}</span>;
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.color}`}>{cfg.label}</span>;
}

export default function NotificationsSection() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusTab, setStatusTab] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);

  const load = () => {
    setLoading(true);
    setSelected(new Set());
    adminApi.notifications.list()
      .then(d => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(load, []);

  const types = useMemo(() =>
    Array.from(new Set(items.map(n => n.type).filter(Boolean))).sort(),
    [items]
  );

  const filtered = useMemo(() => items.filter(n => {
    const matchSearch = (n.user_email + n.type + n.message).toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || n.type === typeFilter;
    const matchStatus = !statusTab || (n.status || 'active') === statusTab;
    return matchSearch && matchType && matchStatus;
  }), [items, search, typeFilter, statusTab]);

  const allFilteredSelected = filtered.length > 0 && filtered.every(n => selected.has(n.id));
  const someSelected = selected.size > 0;

  const toggleAll = () => {
    if (allFilteredSelected) {
      setSelected(prev => { const s = new Set(prev); filtered.forEach(n => s.delete(n.id)); return s; });
    } else {
      setSelected(prev => { const s = new Set(prev); filtered.forEach(n => s.add(n.id)); return s; });
    }
  };

  const toggleOne = (id: number) => {
    setSelected(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const bulkDelete = async () => {
    if (!confirm(`Удалить ${selected.size} уведомлений?`)) return;
    setBulkLoading(true);
    try {
      await adminApi.notifications.bulkDelete(Array.from(selected));
      setItems(prev => prev.filter(n => !selected.has(n.id)));
      setSelected(new Set());
    } finally { setBulkLoading(false); }
  };

  const bulkSetStatus = async (status: string) => {
    setBulkLoading(true);
    try {
      await adminApi.notifications.bulkStatus(Array.from(selected), status);
      setItems(prev => prev.map(n => selected.has(n.id) ? { ...n, status } : n));
      setSelected(new Set());
    } finally { setBulkLoading(false); }
  };

  const singleDelete = async (id: number) => {
    if (!confirm('Удалить уведомление?')) return;
    await adminApi.notifications.remove(id);
    setItems(prev => prev.filter(n => n.id !== id));
    setSelected(prev => { const s = new Set(prev); s.delete(id); return s; });
  };

  const singleSetStatus = async (id: number, status: string) => {
    await adminApi.notifications.setStatus(id, status);
    setItems(prev => prev.map(n => n.id === id ? { ...n, status } : n));
  };

  const counts = useMemo(() => ({
    all: items.length,
    active: items.filter(n => (n.status || 'active') === 'active').length,
    archived: items.filter(n => n.status === 'archived').length,
    hidden: items.filter(n => n.status === 'hidden').length,
  }), [items]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Уведомления</h2>
          <p className="text-white/40 text-sm mt-0.5">Системный журнал событий пользователей — регистрации, верификации, инвестиции</p>
        </div>
        <button onClick={load} className="bg-white/10 hover:bg-white/15 text-white text-sm px-4 py-2 rounded-xl transition">↻ Обновить</button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1.5 mb-4">
        {STATUS_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setStatusTab(tab.id); setSelected(new Set()); }}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition ${
              statusTab === tab.id
                ? 'bg-[#D4522A] text-white'
                : 'bg-white/8 hover:bg-white/15 text-white/60 hover:text-white border border-white/10'
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs opacity-60">
              {tab.id === '' ? counts.all : tab.id === 'active' ? counts.active : tab.id === 'archived' ? counts.archived : counts.hidden}
            </span>
          </button>
        ))}
      </div>

      {/* Search + Type filter */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Поиск по email..."
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm w-64 focus:outline-none focus:border-[#D4522A]"
        />
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A] min-w-[160px]"
        >
          <option value="">Все типы</option>
          {types.map(t => (
            <option key={t} value={t}>{TYPE_CONFIG[t]?.label || t}</option>
          ))}
        </select>
      </div>

      {/* Bulk action bar */}
      {someSelected && (
        <div className="flex items-center gap-3 mb-4 bg-[#D4522A]/10 border border-[#D4522A]/30 rounded-2xl px-4 py-3 flex-wrap">
          <span className="text-white/80 text-sm font-medium">Выбрано: <strong className="text-white">{selected.size}</strong></span>
          <div className="flex gap-2 ml-auto flex-wrap">
            <button
              onClick={bulkDelete}
              disabled={bulkLoading}
              className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-sm px-4 py-1.5 rounded-xl transition disabled:opacity-50"
            >
              🗑 Удалить
            </button>
            <button
              onClick={() => bulkSetStatus('archived')}
              disabled={bulkLoading}
              className="bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-yellow-300 text-sm px-4 py-1.5 rounded-xl transition disabled:opacity-50"
            >
              📦 В архив
            </button>
            <button
              onClick={() => bulkSetStatus('hidden')}
              disabled={bulkLoading}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white/60 hover:text-white text-sm px-4 py-1.5 rounded-xl transition disabled:opacity-50"
            >
              🙈 Скрыть
            </button>
            {(statusTab === 'archived' || statusTab === 'hidden') && (
              <button
                onClick={() => bulkSetStatus('active')}
                disabled={bulkLoading}
                className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 text-green-300 text-sm px-4 py-1.5 rounded-xl transition disabled:opacity-50"
              >
                ✓ Восстановить
              </button>
            )}
            <button
              onClick={() => setSelected(new Set())}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/40 hover:text-white/60 text-sm px-3 py-1.5 rounded-xl transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allFilteredSelected}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[#D4522A] cursor-pointer"
                  />
                </th>
                <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Создано</th>
                <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Пользователь</th>
                <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Тип</th>
                <th className="text-left px-4 py-3 text-white/50 text-xs font-medium">Статус</th>
                <th className="px-4 py-3 w-40" />
              </tr>
            </thead>
            <tbody>
              {filtered.map(n => {
                const isSelected = selected.has(n.id);
                const nStatus = n.status || 'active';
                return (
                  <tr
                    key={n.id}
                    className={`border-b border-white/5 transition-colors ${
                      isSelected ? 'bg-[#D4522A]/8' : 'hover:bg-white/5'
                    } ${nStatus === 'hidden' ? 'opacity-40' : nStatus === 'archived' ? 'opacity-60' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(n.id)}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[#D4522A] cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 text-white/50 text-sm whitespace-nowrap">
                      {new Date(n.created_at).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3 text-white text-sm">{n.user_email || '—'}</td>
                    <td className="px-4 py-3">
                      <TypeBadge type={n.type} />
                    </td>
                    <td className="px-4 py-3">
                      {nStatus === 'archived' && <span className="text-xs text-yellow-400/70">📦 Архив</span>}
                      {nStatus === 'hidden' && <span className="text-xs text-white/30">🙈 Скрыто</span>}
                      {nStatus === 'active' && <span className="text-xs text-green-400/60">● Активно</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 justify-end">
                        {nStatus !== 'active' && (
                          <button
                            onClick={() => singleSetStatus(n.id, 'active')}
                            title="Восстановить"
                            className="text-green-400 hover:text-green-300 text-xs px-2 py-1 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition"
                          >✓</button>
                        )}
                        {nStatus !== 'archived' && (
                          <button
                            onClick={() => singleSetStatus(n.id, 'archived')}
                            title="В архив"
                            className="text-yellow-400 hover:text-yellow-300 text-xs px-2 py-1 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 transition"
                          >📦</button>
                        )}
                        {nStatus !== 'hidden' && (
                          <button
                            onClick={() => singleSetStatus(n.id, 'hidden')}
                            title="Скрыть"
                            className="text-white/40 hover:text-white/60 text-xs px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition"
                          >🙈</button>
                        )}
                        <button
                          onClick={() => singleDelete(n.id)}
                          title="Удалить"
                          className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition"
                        >✕</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-white/40 py-12">
                    {search || typeFilter ? 'Нет уведомлений по фильтру' : 'Уведомлений нет'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {filtered.length > 0 && (
            <div className="px-4 py-3 text-white/40 text-xs border-t border-white/10 flex items-center justify-between">
              <span>Показано {filtered.length} из {items.length}</span>
              {someSelected && <span className="text-[#D4522A]">Выбрано {selected.size}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
