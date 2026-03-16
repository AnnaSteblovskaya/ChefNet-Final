import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/utils/supabase/client';
import { injectToken } from './api';
import OverviewSection from './sections/OverviewSection';
import UsersSection from './sections/UsersSection';
import InvestmentsSection from './sections/InvestmentsSection';
import RoundsSection from './sections/RoundsSection';
import KYCSection from './sections/KYCSection';
import PartnersSection from './sections/PartnersSection';
import NewsSection from './sections/NewsSection';
import DocumentsSection from './sections/DocumentsSection';
import ContentSection from './sections/ContentSection';
import FAQSection from './sections/FAQSection';
import PaymentsSection from './sections/PaymentsSection';
import NotificationsSection from './sections/NotificationsSection';
import SettingsSection from './sections/SettingsSection';
import TemplatesSection from './sections/TemplatesSection';
import BonusesSection from './sections/BonusesSection';
import WalletsSection from './sections/WalletsSection';

function Icon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    dashboard: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="1.8"/></svg>,
    settings: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3" strokeWidth="1.8"/></svg>,
    bonuses: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>,
    documents: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
    notifications: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>,
    payments: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="1.8"/><path strokeLinecap="round" strokeWidth="1.8" d="M2 10h20"/></svg>,
    questions: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    rounds: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
    templates: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>,
    users: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    verifications: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
    wallets: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>,
  };
  return icons[name] || <span className="w-4 h-4 block" />;
}

function AdminLoginForm({ onSuccess, onExit }: { onSuccess: () => void; onExit: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const supabase = getSupabaseClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) { setError('Неверный email или пароль'); return; }
      onSuccess();
    } catch { setError('Ошибка соединения'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-gray-900 mb-1">Chefinvest</div>
          <div className="text-gray-500 text-sm">Войдите для доступа к панели</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <form onSubmit={submit} className="space-y-4">
            <input
              type="email" placeholder="Email" value={email}
              onChange={e => setEmail(e.target.value)} required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 text-sm"
            />
            <input
              type="password" placeholder="Пароль" value={password}
              onChange={e => setPassword(e.target.value)} required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 text-sm"
            />
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button type="submit" disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 transition text-sm">
              {loading ? 'Вход...' : 'Войти'}
            </button>
            <button type="button" onClick={onExit}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-2.5 rounded-xl text-sm transition">
              На сайт
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function BootstrapScreen({ email, onSuccess, onExit }: { email: string; onSuccess: () => void; onExit: () => void }) {
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    setLoading(true); setError('');
    try {
      const token = (window as any).__supabaseSession?.access_token;
      const res = await fetch('/api/admin-bootstrap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ secret }),
      });
      if (res.ok) { onSuccess(); }
      else { const d = await res.json(); setError(d.error || 'Неверный секрет'); }
    } catch { setError('Ошибка соединения'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-sm text-center shadow-sm">
        <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
        </div>
        <h2 className="text-gray-900 text-xl font-bold mb-1">Нет прав администратора</h2>
        <p className="text-gray-500 text-sm mb-6">Аккаунт: {email}<br />Введите секретный ключ</p>
        <input type="password" value={secret} onChange={e => setSecret(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Секретный ключ..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-orange-400 mb-3" />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button onClick={submit} disabled={loading || !secret}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-3 rounded-xl text-sm font-medium transition mb-2">
          {loading ? 'Проверка...' : 'Получить доступ'}
        </button>
        <button onClick={onExit} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-2.5 rounded-xl text-sm transition">← Вернуться на сайт</button>
      </div>
    </div>
  );
}

type Section = 'overview' | 'settings' | 'bonuses' | 'documents' | 'notifications' | 'payments' | 'faq' | 'rounds' | 'templates' | 'users' | 'kyc' | 'wallets' | 'investments' | 'partners' | 'news' | 'content';

const NAV: Array<{ id: Section; label: string; icon: string }> = [
  { id: 'overview',       label: 'Dashboard',      icon: 'dashboard' },
  { id: 'settings',       label: 'Settings',       icon: 'settings' },
  { id: 'bonuses',        label: 'Bonuses',        icon: 'bonuses' },
  { id: 'documents',      label: 'Documents',      icon: 'documents' },
  { id: 'notifications',  label: 'Notifications',  icon: 'notifications' },
  { id: 'payments',       label: 'Payments',       icon: 'payments' },
  { id: 'faq',            label: 'Questions',      icon: 'questions' },
  { id: 'rounds',         label: 'Rounds',         icon: 'rounds' },
  { id: 'templates',      label: 'Templates',      icon: 'templates' },
  { id: 'users',          label: 'Users',          icon: 'users' },
  { id: 'kyc',            label: 'Verifications',  icon: 'verifications' },
  { id: 'wallets',        label: 'Wallets',        icon: 'wallets' },
];

interface Props { onExit: () => void; }
interface SessionInfo { access_token: string; email: string; }

export default function AdminPanel({ onExit }: Props) {
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [section, setSection] = useState<Section>('overview');
  const [checking, setChecking] = useState(true);
  const [checkError, setCheckError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const checkAdmin = async () => {
    setChecking(true); setCheckError(false);
    const controller = new AbortController();
    const globalTimeout = setTimeout(() => controller.abort(), 15000);
    try {
      let token: string | null = null;
      let email = '';
      try {
        const raw = localStorage.getItem('sb-sdwlngwkeipgwelzxfai-auth-token');
        if (raw) { const stored = JSON.parse(raw); token = stored?.access_token ?? null; email = stored?.user?.email ?? ''; }
      } catch {}
      if (!token) {
        try {
          const supabase = getSupabaseClient();
          const sessionResult = await Promise.race([
            supabase.auth.getSession(),
            new Promise<never>((_, rej) => setTimeout(() => rej(new Error('timeout')), 8000)),
          ]) as Awaited<ReturnType<typeof supabase.auth.getSession>>;
          token = sessionResult?.data?.session?.access_token ?? null;
          email = sessionResult?.data?.session?.user?.email ?? '';
        } catch {}
      }
      if (!token) { setChecking(false); clearTimeout(globalTimeout); return; }
      setSession({ access_token: token, email });
      injectToken(token);
      const r = await fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal });
      setIsAdmin(r.ok);
    } catch (err) {
      console.error('[admin] check failed:', err); setCheckError(true);
    } finally {
      clearTimeout(globalTimeout); setChecking(false);
    }
  };

  useEffect(() => { checkAdmin(); }, []);

  const handleSignOut = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    onExit();
  };

  if (checking) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-9 h-9 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <div className="text-gray-400 text-sm">Проверка сессии...</div>
      </div>
    </div>
  );

  if (checkError) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
        <div className="text-gray-900 text-xl font-bold mb-2">Ошибка подключения</div>
        <div className="text-gray-500 text-sm mb-6">Сервер не отвечает. Попробуйте ещё раз.</div>
        <div className="flex gap-3 justify-center">
          <button onClick={checkAdmin} className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl text-sm transition">Повторить</button>
          <button onClick={onExit} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-2 rounded-xl text-sm transition">На сайт</button>
        </div>
      </div>
    </div>
  );

  if (!session) return <AdminLoginForm onSuccess={checkAdmin} onExit={onExit} />;
  if (!isAdmin) return <BootstrapScreen email={session?.email || ''} onSuccess={() => setIsAdmin(true)} onExit={onExit} />;

  const SectionComponent = {
    overview: OverviewSection, users: UsersSection, investments: InvestmentsSection,
    rounds: RoundsSection, kyc: KYCSection, partners: PartnersSection,
    news: NewsSection, documents: DocumentsSection, content: ContentSection,
    faq: FAQSection, payments: PaymentsSection, notifications: NotificationsSection,
    settings: SettingsSection, templates: TemplatesSection, bonuses: BonusesSection,
    wallets: WalletsSection,
  }[section];

  const activeNav = NAV.find(n => n.id === section);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-56 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="px-6 py-5 border-b border-gray-100">
          <span className="text-gray-900 font-bold text-lg tracking-tight">Chefinvest</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(item => {
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setSection(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-gray-100 text-orange-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className={active ? 'text-orange-500' : 'text-gray-400'}>
                  <Icon name={item.icon} />
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-gray-100">
          <div className="text-gray-400 text-xs mb-2 truncate">{session?.email}</div>
          <div className="flex gap-2">
            <button onClick={onExit} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs py-1.5 rounded-lg transition">← Сайт</button>
            <button onClick={handleSignOut} className="flex-1 bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-600 text-xs py-1.5 rounded-lg transition">Выйти</button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-semibold">
              {(session?.email?.[0] ?? 'A').toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-3">
            <span>{activeNav?.label ?? 'Dashboard'}</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            <span className="text-gray-600 font-medium">List</span>
          </div>

          <SectionComponent />
        </main>
      </div>
    </div>
  );
}
