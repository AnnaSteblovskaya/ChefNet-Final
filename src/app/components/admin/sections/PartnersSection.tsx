import { useEffect, useState, useCallback, useMemo } from 'react';
import { adminApi } from '../api';

interface PartnerUser {
  id: string;
  source: 'profile' | 'referral';
  email: string;
  full_name: string;
  created_at: string;
  email_verified: boolean;
  is_admin: boolean;
  referred_by: string | null;
  own_ref_code: string | null;
  referrer_id: string | null;
  referrer_email: string | null;
  referrer_name: string | null;
  referrer_ref_code: string | null;
  total_shares: number;
  total_amount: number;
  pending_investments: number;
  confirmed_investments: number;
  direct_referrals_count: number;
}

interface Investment {
  id: number;
  user_id: string;
  round: string;
  round_name: string;
  shares: number;
  amount: string;
  date: string;
  status: string;
}

type ModalType = 'email' | 'sponsor' | 'delete' | 'investments' | null;

interface ModalState {
  type: ModalType;
  user: PartnerUser | null;
}

const TABS = [
  { id: 'list', label: '📋 Список партнёров' },
  { id: 'tree', label: '🌳 Дерево сети' },
  { id: 'payments', label: '💳 Платежи' },
] as const;

function buildTree(users: PartnerUser[]): PartnerUser[] {
  const byCode: Record<string, boolean> = {};
  users.forEach(u => { if (u.own_ref_code) byCode[u.own_ref_code.toUpperCase()] = true; });
  return users.filter(u => !u.referred_by || !byCode[u.referred_by.toUpperCase()]);
}

function getChildren(users: PartnerUser[], parentCode: string): PartnerUser[] {
  return users.filter(u => u.referred_by && u.referred_by.toUpperCase() === parentCode.toUpperCase());
}

function StatusBadge({ source, verified, shares, isAdmin }: { source: string; verified: boolean; shares: number; isAdmin?: boolean }) {
  if (source === 'referral') return <span className="px-2 py-0.5 text-[10px] rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">Реферал</span>;
  if (isAdmin) return <span className="px-2 py-0.5 text-[10px] rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">Администратор</span>;
  if (shares > 0) return <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">Инвестор</span>;
  if (verified) return <span className="px-2 py-0.5 text-[10px] rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Верифицирован</span>;
  return <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/10 text-white/40 border border-white/10">Зарегистрирован</span>;
}

function TreeRow({
  user, depth, allUsers, expandedIds, onToggle, onAction, pendingCount,
}: {
  user: PartnerUser;
  depth: number;
  allUsers: PartnerUser[];
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onAction: (type: ModalType, user: PartnerUser) => void;
  pendingCount: number;
}) {
  const children = useMemo(() => user.own_ref_code ? getChildren(allUsers, user.own_ref_code) : [], [allUsers, user.own_ref_code]);
  const isExpanded = expandedIds.has(user.id);
  const hasChildren = children.length > 0;
  const isLegacy = user.source === 'referral';
  const date = user.created_at ? new Date(user.created_at).toLocaleDateString('ru-RU') : '—';

  return (
    <>
      <tr className={`border-b border-white/5 hover:bg-white/3 group transition ${depth > 0 ? 'opacity-90' : ''}`}>
        <td className="py-2.5 px-2 text-xs text-white/40 whitespace-nowrap">{date}</td>
        <td className="py-2.5 px-2" style={{ paddingLeft: `${8 + depth * 20}px` }}>
          <div className="flex items-center gap-2">
            {depth > 0 && <span className="text-white/20 text-sm">└</span>}
            <button
              onClick={() => hasChildren && onToggle(user.id)}
              className={`inline-flex items-center justify-center min-w-[22px] h-5 px-1 rounded text-xs font-bold border transition ${
                hasChildren
                  ? isExpanded
                    ? 'border-orange-400/60 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 cursor-pointer'
                    : 'border-green-500/60 bg-green-500/10 text-green-400 hover:bg-green-500/20 cursor-pointer'
                  : 'border-white/10 bg-white/5 text-white/20 cursor-default'
              }`}
            >
              {hasChildren ? (isExpanded ? '−' : `+${children.length}`) : '−'}
            </button>
            <div>
              <div className="text-white text-sm font-medium leading-tight">{user.full_name || '—'}</div>
              <div className="text-white/40 text-xs leading-tight">{user.email}</div>
            </div>
          </div>
        </td>
        <td className="py-2.5 px-2">
          <StatusBadge source={user.source} verified={user.email_verified} shares={+user.total_shares} isAdmin={user.is_admin} />
        </td>
        <td className="py-2.5 px-2 text-xs text-white/50">
          {user.referrer_name ? (
            <div>
              <div className="text-white/70">{user.referrer_name}</div>
              <div className="text-white/30 font-mono text-[10px]">{user.referred_by}</div>
            </div>
          ) : (
            <span className="text-white/20">—</span>
          )}
        </td>
        <td className="py-2.5 px-2 text-center">
          <span className="text-white/70 text-sm font-semibold">{user.direct_referrals_count}</span>
        </td>
        <td className="py-2.5 px-2 text-center">
          <span className="text-white/70 text-sm">{+user.total_shares || '—'}</span>
        </td>
        <td className="py-2.5 px-2 text-center">
          {pendingCount > 0
            ? <span className="text-yellow-400 font-semibold text-sm">{pendingCount}</span>
            : <span className="text-white/20 text-sm">—</span>}
        </td>
        <td className="py-2.5 px-2">
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
            {!isLegacy && (
              <button onClick={() => onAction('investments', user)} title="Платежи"
                className={`p-1.5 rounded-lg text-xs transition ${pendingCount > 0 ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                💳
              </button>
            )}
            {!isLegacy && (
              <button onClick={() => onAction('email', user)} title="Изменить email"
                className="p-1.5 rounded-lg text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition">
                ✉️
              </button>
            )}
            {!isLegacy && (
              <button onClick={() => onAction('sponsor', user)} title="Изменить спонсора"
                className="p-1.5 rounded-lg text-xs bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition">
                🔗
              </button>
            )}
            <button onClick={() => onAction('delete', user)} title="Удалить"
              className="p-1.5 rounded-lg text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 transition">
              🗑️
            </button>
          </div>
        </td>
      </tr>
      {isExpanded && hasChildren && children.map(child => (
        <TreeRow
          key={child.id}
          user={child}
          depth={depth + 1}
          allUsers={allUsers}
          expandedIds={expandedIds}
          onToggle={onToggle}
          onAction={onAction}
          pendingCount={+child.pending_investments}
        />
      ))}
    </>
  );
}

export default function PartnersSection() {
  const [allUsers, setAllUsers] = useState<PartnerUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'list' | 'tree' | 'payments'>('list');
  const [listSearch, setListSearch] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<ModalState>({ type: null, user: null });

  const [emailInput, setEmailInput] = useState('');
  const [sponsorInput, setSponsorInput] = useState('');
  const [sponsorPreview, setSponsorPreview] = useState<{ name: string; email: string } | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  const [userInvestments, setUserInvestments] = useState<Investment[]>([]);
  const [invLoading, setInvLoading] = useState(false);

  const [pendingInvestments, setPendingInvestments] = useState<any[]>([]);

  const load = useCallback(() => {
    setLoading(true);
    adminApi.partnerUsers.list().then((data: PartnerUser[]) => {
      setAllUsers(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (activeTab === 'payments') {
      adminApi.investments.list().then((data: any[]) => {
        setPendingInvestments(data.filter(i => i.status === 'pending'));
      }).catch(() => {});
    }
  }, [activeTab]);

  const rootUsers = useMemo(() => buildTree(allUsers), [allUsers]);

  const filteredRoots = useMemo(() => {
    if (!search.trim()) return rootUsers;
    const s = search.toLowerCase();
    const matchingIds = new Set(
      allUsers.filter(u =>
        u.email?.toLowerCase().includes(s) ||
        u.full_name?.toLowerCase().includes(s) ||
        u.own_ref_code?.toLowerCase().includes(s)
      ).map(u => u.id)
    );
    return rootUsers.filter(u => matchingIds.has(u.id));
  }, [rootUsers, allUsers, search]);

  const partnersList = useMemo(() => {
    const partners = allUsers.filter(u => u.referred_by || u.source === 'referral');
    if (!listSearch.trim()) return partners;
    const s = listSearch.toLowerCase();
    return partners.filter(u =>
      u.full_name?.toLowerCase().includes(s) ||
      u.email?.toLowerCase().includes(s) ||
      u.referrer_name?.toLowerCase().includes(s)
    );
  }, [allUsers, listSearch]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const openModal = (type: ModalType, user: PartnerUser) => {
    setModal({ type, user });
    setModalMsg('');
    if (type === 'email') setEmailInput(user.email || '');
    if (type === 'sponsor') { setSponsorInput(user.referred_by || ''); setSponsorPreview(null); }
    if (type === 'investments') {
      setInvLoading(true);
      setUserInvestments([]);
      adminApi.partnerUsers.getUserInvestments(user.id).then((d: Investment[]) => {
        setUserInvestments(d);
        setInvLoading(false);
      }).catch(() => setInvLoading(false));
    }
  };

  const closeModal = () => { setModal({ type: null, user: null }); setModalMsg(''); };

  const lookupSponsor = async () => {
    const code = sponsorInput.trim().toUpperCase();
    if (!code.startsWith('CHEF-')) { setModalMsg('Формат: CHEF-XXXXXX'); return; }
    setSponsorPreview(null);
    const found = allUsers.find(u => u.own_ref_code.toUpperCase() === code);
    if (found) setSponsorPreview({ name: found.full_name || '—', email: found.email });
    else setModalMsg('Пользователь с таким кодом не найден');
  };

  const handleChangeEmail = async () => {
    if (!modal.user) return;
    setModalLoading(true); setModalMsg('');
    try {
      const res = await adminApi.partnerUsers.changeEmail(modal.user.id, emailInput.trim());
      setModalMsg(res.emailSent ? '✅ Email изменён. Письмо верификации отправлено.' : '✅ Email изменён (письмо не отправлено).');
      setAllUsers(prev => prev.map(u => u.id === modal.user!.id ? { ...u, email: emailInput.trim(), email_verified: false } : u));
    } catch (e: any) {
      setModalMsg('❌ ' + (e.message || 'Ошибка'));
    } finally { setModalLoading(false); }
  };

  const handleChangeSponsor = async () => {
    if (!modal.user) return;
    setModalLoading(true); setModalMsg('');
    try {
      const code = sponsorInput.trim().toUpperCase() || null;
      await adminApi.partnerUsers.changeSponsor(modal.user.id, code);
      setModalMsg('✅ Спонсор обновлён.');
      load();
    } catch (e: any) {
      setModalMsg('❌ ' + (e.message || 'Ошибка'));
    } finally { setModalLoading(false); }
  };

  const handleDelete = async () => {
    if (!modal.user) return;
    setModalLoading(true);
    try {
      if (modal.user.source === 'referral') {
        const refId = parseInt(modal.user.id.replace('ref_', ''), 10);
        await adminApi.partnerUsers.deleteReferral(refId);
      } else {
        await adminApi.users.remove(modal.user.id);
      }
      setAllUsers(prev => prev.filter(u => u.id !== modal.user!.id));
      closeModal();
    } catch (e: any) {
      setModalMsg('❌ ' + (e.message || 'Ошибка'));
    } finally { setModalLoading(false); }
  };

  const handleConfirmInvestment = async (inv: Investment) => {
    try {
      await adminApi.investments.update(inv.id, { status: 'confirmed' });
      setUserInvestments(prev => prev.map(i => i.id === inv.id ? { ...i, status: 'confirmed' } : i));
      setAllUsers(prev => prev.map(u => u.id === modal.user?.id ? { ...u, pending_investments: Math.max(0, +u.pending_investments - 1), confirmed_investments: +u.confirmed_investments + 1 } : u));
    } catch (e: any) {
      setModalMsg('❌ ' + (e.message || 'Ошибка'));
    }
  };

  const handleConfirmPendingInvestment = async (inv: any) => {
    try {
      await adminApi.investments.update(inv.id, { status: 'confirmed' });
      setPendingInvestments(prev => prev.filter(i => i.id !== inv.id));
    } catch (e: any) {
      alert('Ошибка: ' + e.message);
    }
  };

  const allPartners = useMemo(() => allUsers.filter(u => u.referred_by || u.source === 'referral'), [allUsers]);
  const totalUsers = allPartners.length;
  const totalInvested = allPartners.reduce((s, u) => s + +u.total_amount, 0);
  const totalPending = allPartners.reduce((s, u) => s + +u.pending_investments, 0);
  const totalShares = allPartners.reduce((s, u) => s + +u.total_shares, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Партнёрская сеть</h2>
          <p className="text-white/40 text-sm mt-0.5">Управление пользователями, платежами и реферальными связями</p>
        </div>
        <button onClick={load} className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white/60 text-sm rounded-xl transition flex items-center gap-2">
          🔄 Обновить
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Пользователей', value: totalUsers, icon: '👥', color: 'text-blue-400' },
          { label: 'Всего долей', value: totalShares, icon: '📈', color: 'text-green-400' },
          { label: 'Объём инвестиций', value: `$${(+totalInvested).toFixed(0)}`, icon: '💰', color: 'text-yellow-400' },
          { label: 'Ожидают подтверждения', value: totalPending, icon: '⏳', color: totalPending > 0 ? 'text-orange-400' : 'text-white/40' },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-xl font-bold ${s.color}`}>{loading ? '...' : s.value}</div>
            <div className="text-white/40 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === tab.id ? 'bg-[#D4522A] text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── TAB: List ─── */}
      {activeTab === 'list' && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <input
              type="text"
              placeholder="Поиск по имени, email или спонсору..."
              value={listSearch}
              onChange={e => setListSearch(e.target.value)}
              className="flex-1 bg-[#0d0d1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
            />
            <span className="text-white/30 text-xs whitespace-nowrap">
              {loading ? '...' : `${partnersList.length} партнёров`}
            </span>
          </div>
          {loading ? (
            <div className="flex justify-center py-16"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/3">
                    <th className="text-left py-3 px-3 text-xs text-white/40 font-semibold">Дата</th>
                    <th className="text-left py-3 px-3 text-xs text-white/40 font-semibold">Имя партнёра</th>
                    <th className="text-left py-3 px-3 text-xs text-white/40 font-semibold">Email</th>
                    <th className="text-left py-3 px-3 text-xs text-white/40 font-semibold">Статус</th>
                    <th className="text-left py-3 px-3 text-xs text-white/40 font-semibold">Спонсор</th>
                    <th className="text-center py-3 px-3 text-xs text-white/40 font-semibold">Доли</th>
                    <th className="text-center py-3 px-3 text-xs text-white/40 font-semibold">Сумма</th>
                    <th className="text-center py-3 px-3 text-xs text-white/40 font-semibold">Комиссия (10%)</th>
                    <th className="text-left py-3 px-3 text-xs text-white/40 font-semibold">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {partnersList.length === 0 ? (
                    <tr><td colSpan={9} className="py-12 text-center text-white/30">Нет партнёров</td></tr>
                  ) : partnersList.map(u => {
                    const isLegacy = u.source === 'referral';
                    const shares = +u.total_shares || 0;
                    const amount = +u.total_amount || 0;
                    const commission = Math.floor(shares * 0.1);
                    const date = u.created_at ? new Date(u.created_at).toLocaleDateString('ru-RU') : '—';
                    const isInvested = shares > 0;
                    return (
                      <tr key={u.id} className="border-b border-white/5 hover:bg-white/3 group transition">
                        <td className="py-2.5 px-3 text-xs text-white/40 whitespace-nowrap">{date}</td>
                        <td className="py-2.5 px-3">
                          <div className="text-white text-sm font-medium">{u.full_name || '—'}</div>
                          {isLegacy && <div className="text-purple-400/60 text-[10px]">legacy</div>}
                        </td>
                        <td className="py-2.5 px-3 text-white/50 text-xs font-mono">{u.email || '—'}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 text-[10px] rounded-full border ${
                            isInvested
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                              : 'bg-white/10 text-white/40 border-white/10'
                          }`}>
                            {isInvested ? 'Инвестор' : 'Зарегистрирован'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-xs">
                          {u.referrer_name
                            ? <div>
                                <div className="text-white/70">{u.referrer_name}</div>
                                <div className="text-white/30 font-mono text-[10px]">{u.referred_by}</div>
                              </div>
                            : <span className="text-white/20">—</span>
                          }
                        </td>
                        <td className="py-2.5 px-3 text-center text-white/80 text-sm font-semibold">{shares || '—'}</td>
                        <td className="py-2.5 px-3 text-center text-white/60 text-sm">{amount > 0 ? `$${amount.toFixed(0)}` : '—'}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`text-sm font-semibold ${commission > 0 ? 'text-green-400' : 'text-white/20'}`}>
                            {commission > 0 ? commission : '—'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                            {!isLegacy && (
                              <button onClick={() => openModal('investments', u)} title="Платежи"
                                className="p-1.5 rounded-lg text-xs bg-white/5 text-white/40 hover:bg-white/10 transition">💳</button>
                            )}
                            {!isLegacy && (
                              <button onClick={() => openModal('email', u)} title="Изменить email"
                                className="p-1.5 rounded-lg text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition">✉️</button>
                            )}
                            {!isLegacy && (
                              <button onClick={() => openModal('sponsor', u)} title="Изменить спонсора"
                                className="p-1.5 rounded-lg text-xs bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition">🔗</button>
                            )}
                            <button onClick={() => openModal('delete', u)} title="Удалить"
                              className="p-1.5 rounded-lg text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 transition">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB: Tree ─── */}
      {activeTab === 'tree' && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <input
              type="text"
              placeholder="Поиск по имени, email или коду..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-[#0d0d1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
            />
            <span className="text-white/30 text-xs whitespace-nowrap">
              {allUsers.length} пользователей
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/3">
                    <th className="text-left py-3 px-2 text-xs text-white/40 font-semibold">Дата</th>
                    <th className="text-left py-3 px-2 text-xs text-white/40 font-semibold">Пользователь</th>
                    <th className="text-left py-3 px-2 text-xs text-white/40 font-semibold">Статус</th>
                    <th className="text-left py-3 px-2 text-xs text-white/40 font-semibold">Спонсор</th>
                    <th className="text-center py-3 px-2 text-xs text-white/40 font-semibold">Рефералы</th>
                    <th className="text-center py-3 px-2 text-xs text-white/40 font-semibold">Доли</th>
                    <th className="text-center py-3 px-2 text-xs text-white/40 font-semibold">Ожидает</th>
                    <th className="text-left py-3 px-2 text-xs text-white/40 font-semibold">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoots.length === 0 ? (
                    <tr><td colSpan={8} className="py-12 text-center text-white/30">Нет пользователей</td></tr>
                  ) : filteredRoots.map(u => (
                    <TreeRow
                      key={u.id}
                      user={u}
                      depth={0}
                      allUsers={allUsers}
                      expandedIds={expandedIds}
                      onToggle={toggleExpand}
                      onAction={openModal}
                      pendingCount={+u.pending_investments}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB: Payments ─── */}
      {activeTab === 'payments' && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-semibold">Ожидающие подтверждения платежи</h3>
            <p className="text-white/40 text-xs mt-0.5">Все инвестиции со статусом «pending» от всех пользователей</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/3">
                  <th className="text-left py-3 px-4 text-xs text-white/40 font-semibold">Пользователь</th>
                  <th className="text-left py-3 px-4 text-xs text-white/40 font-semibold">Раунд</th>
                  <th className="text-center py-3 px-4 text-xs text-white/40 font-semibold">Доли</th>
                  <th className="text-center py-3 px-4 text-xs text-white/40 font-semibold">Сумма</th>
                  <th className="text-left py-3 px-4 text-xs text-white/40 font-semibold">Дата</th>
                  <th className="text-left py-3 px-4 text-xs text-white/40 font-semibold">Действие</th>
                </tr>
              </thead>
              <tbody>
                {pendingInvestments.length === 0 ? (
                  <tr><td colSpan={6} className="py-12 text-center text-white/30">Нет ожидающих платежей</td></tr>
                ) : pendingInvestments.map(inv => (
                  <tr key={inv.id} className="border-b border-white/5 hover:bg-white/3 transition">
                    <td className="py-3 px-4">
                      <div className="text-white text-sm font-medium">{inv.full_name || '—'}</div>
                      <div className="text-white/40 text-xs">{inv.email}</div>
                    </td>
                    <td className="py-3 px-4 text-white/60 text-sm capitalize">{inv.round || '—'}</td>
                    <td className="py-3 px-4 text-center text-white font-semibold">{inv.shares}</td>
                    <td className="py-3 px-4 text-center text-white/80 text-sm">{inv.amount}</td>
                    <td className="py-3 px-4 text-white/40 text-xs">{inv.date ? new Date(inv.date).toLocaleDateString('ru-RU') : '—'}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleConfirmPendingInvestment(inv)}
                        className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs font-semibold rounded-lg transition"
                      >
                        ✓ Подтвердить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════ MODALS ═══════════ */}
      {modal.type && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-[#12121e] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            
            {/* ── INVESTMENTS MODAL ── */}
            {modal.type === 'investments' && modal.user && (
              <div>
                <div className="p-5 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">Платежи: {modal.user.full_name || modal.user.email}</h3>
                  <p className="text-white/40 text-sm mt-0.5">{modal.user.email}</p>
                </div>
                <div className="p-5 max-h-[60vh] overflow-y-auto">
                  {invLoading ? (
                    <div className="flex justify-center py-8"><div className="w-6 h-6 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" /></div>
                  ) : userInvestments.length === 0 ? (
                    <p className="text-center text-white/30 py-8">Нет инвестиций</p>
                  ) : (
                    <div className="space-y-2">
                      {userInvestments.map(inv => (
                        <div key={inv.id} className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                          <div>
                            <div className="text-white text-sm font-medium capitalize">{inv.round || 'Раунд'}</div>
                            <div className="text-white/40 text-xs">{inv.shares} долей · {inv.amount} · {inv.date ? new Date(inv.date).toLocaleDateString('ru-RU') : ''}</div>
                          </div>
                          {inv.status === 'pending' ? (
                            <button onClick={() => handleConfirmInvestment(inv)}
                              className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs font-semibold rounded-lg transition">
                              ✓ Подтвердить
                            </button>
                          ) : (
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${inv.status === 'confirmed' ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/30'}`}>
                              {inv.status}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {modalMsg && <p className="text-sm mt-3 text-center">{modalMsg}</p>}
                </div>
                <div className="p-4 border-t border-white/10">
                  <button onClick={closeModal} className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-sm transition">Закрыть</button>
                </div>
              </div>
            )}

            {/* ── EMAIL MODAL ── */}
            {modal.type === 'email' && modal.user && (
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1">Изменить email</h3>
                <p className="text-white/40 text-sm mb-4">Пользователь: <span className="text-white/70">{modal.user.full_name || modal.user.email}</span></p>
                <div className="space-y-3">
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Текущий email</label>
                    <div className="text-white/60 text-sm bg-white/5 rounded-xl px-3 py-2 font-mono">{modal.user.email}</div>
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Новый email</label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={e => setEmailInput(e.target.value)}
                      className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
                      placeholder="new@example.com"
                    />
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-3 py-2 text-blue-400/80 text-xs">
                    После сохранения email будет помечен как неверифицированный и пользователю отправят письмо для подтверждения нового адреса.
                  </div>
                </div>
                {modalMsg && <p className="text-sm mt-3 text-center text-green-400">{modalMsg}</p>}
                <div className="flex gap-2 mt-4">
                  <button onClick={handleChangeEmail} disabled={modalLoading || !emailInput.includes('@')}
                    className="flex-1 bg-[#D4522A] hover:bg-[#c04520] text-white py-2 rounded-xl text-sm font-semibold transition disabled:opacity-50">
                    {modalLoading ? 'Отправка...' : 'Сохранить и отправить письмо'}
                  </button>
                  <button onClick={closeModal} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-sm transition">Отмена</button>
                </div>
              </div>
            )}

            {/* ── SPONSOR MODAL ── */}
            {modal.type === 'sponsor' && modal.user && (
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1">Изменить спонсора</h3>
                <p className="text-white/40 text-sm mb-4">Пользователь: <span className="text-white/70">{modal.user.full_name || modal.user.email}</span></p>
                <div className="space-y-3">
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Текущий спонсор</label>
                    <div className="bg-white/5 rounded-xl px-3 py-2">
                      {modal.user.referrer_name ? (
                        <div className="text-white/70 text-sm">{modal.user.referrer_name} <span className="text-white/30 font-mono text-xs">({modal.user.referred_by})</span></div>
                      ) : <div className="text-white/30 text-sm">Нет спонсора</div>}
                    </div>
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Новый код спонсора (CHEF-XXXXXX)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={sponsorInput}
                        onChange={e => { setSponsorInput(e.target.value.toUpperCase()); setSponsorPreview(null); setModalMsg(''); }}
                        className="flex-1 bg-[#0d0d1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-[#D4522A] transition"
                        placeholder="CHEF-XXXXXX"
                      />
                      <button onClick={lookupSponsor} className="px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm transition">
                        Найти
                      </button>
                    </div>
                  </div>
                  {sponsorPreview && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2">
                      <div className="text-green-400 text-sm font-medium">{sponsorPreview.name}</div>
                      <div className="text-green-400/60 text-xs">{sponsorPreview.email}</div>
                    </div>
                  )}
                  <button onClick={() => { setSponsorInput(''); setSponsorPreview(null); setModalMsg('Код очищен. После сохранения спонсор будет удалён.'); }}
                    className="text-white/30 hover:text-white/60 text-xs underline transition">
                    Убрать спонсора
                  </button>
                </div>
                {modalMsg && <p className="text-sm mt-3 text-center text-yellow-400">{modalMsg}</p>}
                <div className="flex gap-2 mt-4">
                  <button onClick={handleChangeSponsor} disabled={modalLoading}
                    className="flex-1 bg-[#D4522A] hover:bg-[#c04520] text-white py-2 rounded-xl text-sm font-semibold transition disabled:opacity-50">
                    {modalLoading ? 'Сохранение...' : 'Сохранить'}
                  </button>
                  <button onClick={closeModal} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-sm transition">Отмена</button>
                </div>
              </div>
            )}

            {/* ── DELETE MODAL ── */}
            {modal.type === 'delete' && modal.user && (
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2">Удалить пользователя?</h3>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
                  <div className="text-white font-medium">{modal.user.full_name || '—'}</div>
                  <div className="text-white/60 text-sm">{modal.user.email}</div>
                  {+modal.user.total_shares > 0 && (
                    <div className="text-red-400 text-xs mt-1">⚠️ У этого пользователя есть {modal.user.total_shares} долей</div>
                  )}
                  {+modal.user.direct_referrals_count > 0 && (
                    <div className="text-red-400 text-xs mt-0.5">⚠️ У этого пользователя {modal.user.direct_referrals_count} рефералов. Их спонсор будет сброшен.</div>
                  )}
                </div>
                <p className="text-white/40 text-sm mb-4">Это действие необратимо. Профиль и все данные пользователя будут удалены.</p>
                {modalMsg && <p className="text-sm text-red-400 mb-3">{modalMsg}</p>}
                <div className="flex gap-2">
                  <button onClick={handleDelete} disabled={modalLoading}
                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-50">
                    {modalLoading ? 'Удаление...' : 'Удалить'}
                  </button>
                  <button onClick={closeModal} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-sm transition">Отмена</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
