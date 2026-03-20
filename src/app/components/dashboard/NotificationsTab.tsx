import { motion, AnimatePresence } from 'motion/react';
import { Bell, Archive, Trash2, RefreshCw, CheckCheck, Info, ShieldCheck, TrendingUp, UserPlus, FileText, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { useState, useEffect, useCallback } from 'react';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

interface NotificationsTabProps {
  setActiveTab: (tab: string) => void;
}

interface DbNotification {
  id: number;
  user_email: string;
  type: string;
  message: string;
  status: string;
  created_at: string;
}

function getIcon(type: string) {
  const t = (type || '').toLowerCase();
  if (t.includes('investment') || t.includes('partner investment')) return TrendingUp;
  if (t.includes('referral') || t.includes('partner')) return UserPlus;
  if (t.includes('kyc') || t.includes('verif')) return ShieldCheck;
  if (t.includes('document')) return FileText;
  if (t.includes('email')) return Mail;
  return Info;
}

function formatTime(dateStr: string, language: string): string {
  const labels: Record<string, { justNow: string; minsAgo: string; hoursAgo: string; daysAgo: string; weeksAgo: string }> = {
    en: { justNow: 'just now', minsAgo: 'min ago', hoursAgo: 'h ago', daysAgo: 'd ago', weeksAgo: 'w ago' },
    ru: { justNow: 'только что', minsAgo: 'мин назад', hoursAgo: 'ч назад', daysAgo: 'дн назад', weeksAgo: 'нед назад' },
    de: { justNow: 'gerade eben', minsAgo: 'Min. her', hoursAgo: 'Std. her', daysAgo: 'T. her', weeksAgo: 'W. her' },
    es: { justNow: 'ahora mismo', minsAgo: 'min atrás', hoursAgo: 'h atrás', daysAgo: 'd atrás', weeksAgo: 'sem atrás' },
    tr: { justNow: 'az önce', minsAgo: 'dk önce', hoursAgo: 's önce', daysAgo: 'g önce', weeksAgo: 'h önce' },
  };
  const l = labels[language] || labels.en;
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return l.justNow;
  if (diff < 3600) return `${Math.floor(diff / 60)} ${l.minsAgo}`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ${l.hoursAgo}`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} ${l.daysAgo}`;
  return `${Math.floor(diff / 604800)} ${l.weeksAgo}`;
}

function getAuthToken(): string {
  return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token') || '';
}

const UI: Record<string, Record<string, string>> = {
  title: { en: 'Notifications', ru: 'Уведомления', de: 'Benachrichtigungen', es: 'Notificaciones', tr: 'Bildirimler' },
  subtitle: { en: 'All platform notifications', ru: 'Все уведомления платформы', de: 'Alle Plattform-Benachrichtigungen', es: 'Todas las notificaciones de la plataforma', tr: 'Tüm platform bildirimleri' },
  all: { en: 'All', ru: 'Все', de: 'Alle', es: 'Todos', tr: 'Tümü' },
  unread: { en: 'Unread', ru: 'Непрочитанные', de: 'Ungelesen', es: 'No leídos', tr: 'Okunmamış' },
  archived: { en: 'Archived', ru: 'Архив', de: 'Archiviert', es: 'Archivado', tr: 'Arşivlendi' },
  markRead: { en: 'Mark as read', ru: 'Отметить прочитанным', de: 'Als gelesen markieren', es: 'Marcar como leído', tr: 'Okundu olarak işaretle' },
  archive: { en: 'Archive', ru: 'Архивировать', de: 'Archivieren', es: 'Archivar', tr: 'Arşivle' },
  empty: { en: 'No notifications', ru: 'Нет уведомлений', de: 'Keine Benachrichtigungen', es: 'Sin notificaciones', tr: 'Bildirim yok' },
  emptyDesc: { en: 'Notifications will appear here when platform events occur.', ru: 'Уведомления появятся здесь при событиях на платформе.', de: 'Benachrichtigungen erscheinen hier bei Plattformereignissen.', es: 'Las notificaciones aparecerán aquí cuando ocurran eventos.', tr: 'Platform olaylarında bildirimler burada görünecek.' },
  markAllRead: { en: 'Mark all read', ru: 'Все прочитаны', de: 'Alle gelesen', es: 'Marcar todo leído', tr: 'Tümünü okundu işaretle' },
  archiveRead: { en: 'Archive read', ru: 'Архивировать прочит.', de: 'Gelesene archivieren', es: 'Archivar leídos', tr: 'Okunanları arşivle' },
};

const t = (key: string, lang: string) => UI[key]?.[lang] || UI[key]?.en || key;

export default function NotificationsTab({ setActiveTab }: NotificationsTabProps) {
  const { language } = useLanguage();
  const tr = dashboardTranslations[language];
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const [notifications, setNotifications] = useState<DbNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/notifications', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(Array.isArray(data) ? data : []);
      }
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: number, status: string) => {
    setUpdating(id);
    try {
      const token = getAuthToken();
      await fetch(`/api/notifications/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, status } : n));
    } catch { /* silent */ }
    finally { setUpdating(null); }
  };

  const markAllRead = async () => {
    const unread = notifications.filter(n => n.status === 'active');
    for (const n of unread) await updateStatus(n.id, 'read');
  };

  const archiveAllRead = async () => {
    const read = notifications.filter(n => n.status === 'read');
    for (const n of read) await updateStatus(n.id, 'archived');
  };

  const filtered = notifications.filter(n => {
    if (activeFilter === 'unread') return n.status === 'active';
    if (activeFilter === 'archived') return n.status === 'archived';
    return n.status !== 'archived';
  });

  const unreadCount = notifications.filter(n => n.status === 'active').length;

  return (
    <div>
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{t('title', language)}</h2>
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher variant="dark" />
            <div className="relative cursor-pointer" onClick={() => setActiveTab('notifications')}>
              <Bell className="w-6 h-6 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
        <p className="text-sm lg:text-base text-gray-600">{t('subtitle', language)}</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">

        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{t('title', language)}</h3>
            {unreadCount > 0 && <p className="text-sm text-gray-500 mt-0.5">{unreadCount} {t('unread', language).toLowerCase()}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={load} title="Refresh" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#FF6B35] border border-[#FF6B35]/30 rounded-lg hover:bg-[#FF6B35]/5 transition">
                <CheckCheck className="w-3.5 h-3.5" />
                {t('markAllRead', language)}
              </button>
            )}
            {notifications.some(n => n.status === 'read') && (
              <button onClick={archiveAllRead} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <Archive className="w-3.5 h-3.5" />
                {t('archiveRead', language)}
              </button>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          {(['all', 'unread', 'archived'] as const).map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`pb-3 text-base font-medium transition-all relative ${activeFilter === f ? 'text-[#FF6B35]' : 'text-gray-600 hover:text-gray-900'}`}>
              {t(f, language)}
              {f === 'unread' && unreadCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-[#FF6B35] text-white rounded-full">{unreadCount}</span>
              )}
              {activeFilter === f && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35]" />}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">{t('empty', language)}</p>
            <p className="text-gray-400 text-sm mt-1">{t('emptyDesc', language)}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((notif, idx) => {
                const Icon = getIcon(notif.type);
                const isUnread = notif.status === 'active';
                const isUpdating = updating === notif.id;
                return (
                  <motion.div key={notif.id}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }} transition={{ delay: idx * 0.03 }}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${isUnread ? 'bg-[#FFF9F0] border-[#FFE8C5]' : 'bg-gray-50 border-gray-100'}`}>

                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isUnread ? 'bg-gradient-to-br from-[#FF7A59] to-[#EB5632]' : 'bg-gray-200'}`}>
                      <Icon className={`w-5 h-5 ${isUnread ? 'text-white' : 'text-gray-500'}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      {notif.type && <p className="text-xs font-semibold text-[#FF6B35] mb-0.5 uppercase tracking-wide">{notif.type}</p>}
                      <p className="text-sm text-gray-800 leading-relaxed">{notif.message || ''}</p>
                      <span className="text-xs text-gray-400 mt-1 block">{formatTime(notif.created_at, language)}</span>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      {isUnread && !isUpdating && (
                        <button onClick={() => updateStatus(notif.id, 'read')}
                          title={t('markRead', language)}
                          className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-[#FF6B35] transition">
                          <CheckCheck className="w-4 h-4" />
                        </button>
                      )}
                      {!isUpdating && notif.status !== 'archived' && (
                        <button onClick={() => updateStatus(notif.id, 'archived')}
                          title={t('archive', language)}
                          className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-gray-600 transition">
                          <Archive className="w-4 h-4" />
                        </button>
                      )}
                      {isUpdating && <div className="w-4 h-4 border-2 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}
