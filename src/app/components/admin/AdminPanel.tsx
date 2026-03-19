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
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-white mb-1">ChefNet Admin</div>
          <div className="text-white/40 text-sm">Войдите для доступа к панели</div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#D4522A]"
          />
          <input
            type="password" placeholder="Пароль" value={password}
            onChange={e => setPassword(e.target.value)} required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#D4522A]"
          />
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          <button type="submit" disabled={loading}
            className="w-full bg-[#D4522A] text-white py-3 rounded-xl font-semibold disabled:opacity-50">
            {loading ? 'Вход...' : 'Войти'}
          </button>
          <button type="button" onClick={onExit}
            className="w-full bg-white/5 text-white/50 py-2 rounded-xl text-sm">
            На сайт
          </button>
        </form>
      </div>
    </div>
  );
}

function BootstrapScreen({ email, isAlreadyAdmin, onSuccess, onExit }: { email: string; isAlreadyAdmin?: boolean; onSuccess: () => void; onExit: () => void }) {
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    setLoading(true); setError('');
    try {
      const token = (window as any).__supabaseSession?.access_token ||
        (() => { try { const r = localStorage.getItem('sb-sdwlngwkeipgwelzxfai-auth-token'); return r ? JSON.parse(r)?.access_token : null; } catch { return null; } })();
      const res = await fetch('/api/admin-bootstrap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ secret }),
      });
      if (res.ok) { onSuccess(); }
      else { const d = await res.json(); setError(d.error || 'Неверный секретный ключ'); }
    } catch { setError('Ошибка соединения'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center p-4">
      <div className="bg-[#11111f] border border-white/10 rounded-2xl p-8 w-full max-w-sm text-center">
        <div className="text-5xl mb-4">🔐</div>
        <h2 className="text-white text-xl font-bold mb-1">
          {isAlreadyAdmin ? 'Подтверждение доступа' : 'Нет прав администратора'}
        </h2>
        <p className="text-white/40 text-sm mb-6">
          Аккаунт: <span className="text-white/60">{email}</span><br />
          {isAlreadyAdmin ? 'Введите секретный ключ для входа в панель' : 'Введите секретный ключ администратора'}
        </p>
        <input
          type="password"
          value={secret}
          onChange={e => setSecret(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Секретный ключ..."
          autoFocus
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4522A] mb-3"
        />
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <button onClick={submit} disabled={loading || !secret} className="w-full bg-[#D4522A] hover:bg-[#c04520] disabled:opacity-50 text-white py-3 rounded-xl text-sm font-medium transition mb-2">
          {loading ? 'Проверка...' : isAlreadyAdmin ? 'Войти в панель' : 'Получить доступ'}
        </button>
        <button onClick={onExit} className="w-full bg-white/5 hover:bg-white/10 text-white/50 py-2 rounded-xl text-sm transition">← Вернуться на сайт</button>
      </div>
    </div>
  );
}

type Section = 'overview' | 'users' | 'investments' | 'rounds' | 'kyc' | 'partners' | 'news' | 'documents' | 'content' | 'faq' | 'payments' | 'notifications' | 'settings' | 'templates' | 'bonuses';

const NAV: Array<{ id: Section; label: string; icon: string }> = [
  { id: 'overview',       label: 'Обзор',          icon: '📊' },
  { id: 'settings',       label: 'Настройки',      icon: '⚙️' },
  { id: 'bonuses',        label: 'Бонусы',         icon: '🎁' },
  { id: 'documents',      label: 'Документы',      icon: '📄' },
  { id: 'notifications',  label: 'Уведомления',    icon: '🔔' },
  { id: 'payments',       label: 'Платежи',        icon: '💳' },
  { id: 'faq',            label: 'Вопросы',        icon: '❓' },
  { id: 'rounds',         label: 'Раунды',         icon: '🎯' },
  { id: 'templates',      label: 'Шаблоны',        icon: '📝' },
  { id: 'users',          label: 'Пользователи',   icon: '👥' },
  { id: 'kyc',            label: 'Верификации',    icon: '✅' },
  { id: 'investments',    label: 'Инвестиции',     icon: '💰' },
  { id: 'partners',       label: 'Партнёры',       icon: '🤝' },
  { id: 'news',           label: 'Новости',        icon: '📰' },
  { id: 'content',        label: 'Контент',        icon: '✏️' },
];

interface Props {
  onExit: () => void;
}

interface SessionInfo {
  access_token: string;
  email: string;
}

export default function AdminPanel({ onExit }: Props) {
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [section, setSection] = useState<Section>('overview');
  const [checking, setChecking] = useState(true);
  const [checkError, setCheckError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const checkAdmin = async () => {
    setChecking(true);
    setCheckError(false);

    const controller = new AbortController();
    const globalTimeout = setTimeout(() => controller.abort(), 15000);

    try {
      // 1. Read session from localStorage — instant, no network call
      let token: string | null = null;
      let email = '';
      try {
        const raw = localStorage.getItem('sb-sdwlngwkeipgwelzxfai-auth-token');
        if (raw) {
          const stored = JSON.parse(raw);
          token = stored?.access_token ?? null;
          email = stored?.user?.email ?? '';
        }
      } catch {}

      // 2. Fallback: ask Supabase client with timeout
      if (!token) {
        try {
          const supabase = getSupabaseClient();
          const sessionResult = await Promise.race([
            supabase.auth.getSession(),
            new Promise<never>((_, rej) => setTimeout(() => rej(new Error('timeout')), 8000)),
          ]) as Awaited<ReturnType<typeof supabase.auth.getSession>>;
          token = sessionResult?.data?.session?.access_token ?? null;
          email = sessionResult?.data?.session?.user?.email ?? '';
        } catch {
          // session fetch failed or timed out — user not logged in
        }
      }

      if (!token) { setChecking(false); clearTimeout(globalTimeout); return; }

      setSession({ access_token: token, email });
      injectToken(token);

      // 3. Check admin status on server
      const r = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });
      setIsAdmin(r.ok);
    } catch (err) {
      console.error('[admin] check failed:', err);
      setCheckError(true);
    } finally {
      clearTimeout(globalTimeout);
      setChecking(false);
    }
  };

  useEffect(() => { checkAdmin(); }, []);

  const handleSignOut = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    onExit();
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-white/40 text-sm">Проверка сессии...</div>
        </div>
      </div>
    );
  }

  if (checkError) {
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl font-bold mb-2">Ошибка подключения</div>
          <div className="text-white/50 text-sm mb-6">Сервер не отвечает. Попробуйте ещё раз.</div>
          <div className="flex gap-3 justify-center">
            <button onClick={checkAdmin} className="bg-[#D4522A] text-white px-6 py-2 rounded-xl">Повторить</button>
            <button onClick={onExit} className="bg-white/10 text-white px-6 py-2 rounded-xl">На сайт</button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return <AdminLoginForm onSuccess={checkAdmin} onExit={onExit} />;
  }

  // Non-admin users must enter the secret key to gain access
  if (!isAdmin) {
    return (
      <BootstrapScreen
        email={session.email}
        isAlreadyAdmin={false}
        onSuccess={() => setIsAdmin(true)}
        onExit={onExit}
      />
    );
  }

  const SectionComponent = {
    overview: OverviewSection, users: UsersSection, investments: InvestmentsSection,
    rounds: RoundsSection, kyc: KYCSection, partners: PartnersSection,
    news: NewsSection, documents: DocumentsSection, content: ContentSection,
    faq: FAQSection, payments: PaymentsSection, notifications: NotificationsSection,
    settings: SettingsSection, templates: TemplatesSection, bonuses: BonusesSection,
  }[section];

  return (
    <div id="admin-panel" className="min-h-screen bg-[#0d0d1a] flex">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#11111f] border-r border-white/5 flex flex-col transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#D4522A] to-[#E8744F] rounded-lg flex items-center justify-center text-white text-sm font-bold">A</div>
            <div>
              <div className="text-white font-bold text-sm">ChefNet</div>
              <div className="text-white/40 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => { setSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                section === item.id
                  ? 'bg-[#D4522A]/20 text-[#E8744F]'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/5">
          <div className="text-white/40 text-xs mb-1 truncate">{session?.email}</div>
          <div className="flex gap-2">
            <button onClick={onExit} className="flex-1 bg-white/5 hover:bg-white/10 text-white/60 text-xs py-1.5 rounded-lg transition">← Сайт</button>
            <button onClick={handleSignOut} className="flex-1 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/60 text-xs py-1.5 rounded-lg transition">Выйти</button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-[#11111f] border-b border-white/5 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <span>Admin</span>
            <span>/</span>
            <span className="text-white">{NAV.find(n => n.id === section)?.label}</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <SectionComponent />
        </main>
      </div>
    </div>
  );
}
