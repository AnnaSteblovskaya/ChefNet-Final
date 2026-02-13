import { motion } from 'motion/react';
import { Bell, UserPlus, ShieldCheck, FileText, Archive, TrendingUp, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { useState } from 'react';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

interface NotificationsTabProps {
  setActiveTab: (tab: string) => void;
}

interface Notification {
  id: number;
  icon: any;
  message: string;
  time: string;
  isRead: boolean;
  isArchived: boolean;
}

export default function NotificationsTab({ setActiveTab }: NotificationsTabProps) {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<number | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, icon: TrendingUp, message: t.notifInvestmentConfirmed, time: '2 ' + t.daysAgo, isRead: false, isArchived: false },
    { id: 2, icon: UserPlus, message: t.notifReferralJoined, time: '5 ' + t.daysAgo, isRead: false, isArchived: false },
    { id: 3, icon: ShieldCheck, message: t.notifKYCApproved, time: '1 ' + t.weekAgo, isRead: true, isArchived: false },
    { id: 4, icon: FileText, message: t.notifNewDocument, time: '1 ' + t.weekAgo, isRead: true, isArchived: false },
  ]);

  const handleDeleteClick = (notifId: number, isRead: boolean) => {
    if (!isRead) {
      // Показываем алерт если сообщение не прочитано
      alert(t.cannotDeleteUnread || 'Невозможно удалить непрочитанное сообщение. Пожалуйста, сначала прочитайте его.');
      return;
    }
    setNotificationToDelete(notifId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (notificationToDelete !== null) {
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationToDelete
            ? { ...notif, isArchived: true }
            : notif
        )
      );
    }
    setShowDeleteModal(false);
    setNotificationToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setNotificationToDelete(null);
  };

  const handleMarkAsRead = (notifId: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notifId
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'unread') return !notif.isRead && !notif.isArchived;
    if (activeFilter === 'archived') return notif.isArchived;
    if (activeFilter === 'all') return !notif.isArchived;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead && !n.isArchived).length;

  return (
    <div>
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{t.notificationsTitle}</h2>
          
          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher variant="dark" />
            <div className="relative cursor-pointer" onClick={() => setActiveTab('notifications')}>
              <Bell className="w-6 h-6 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-xs rounded-full flex items-center justify-center font-medium">
                2
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm lg:text-base text-gray-600">{t.notificationsSubtitle}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
      >
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t.yourNotifications}</h3>
          <p className="text-base text-gray-600">{t.unreadMessages}</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`pb-3 text-base font-medium transition-all relative ${
              activeFilter === 'all'
                ? 'text-[#FF6B35]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.all}
            {activeFilter === 'all' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35]" />
            )}
          </button>

          <button
            onClick={() => setActiveFilter('unread')}
            className={`pb-3 text-base font-medium transition-all relative ${
              activeFilter === 'unread'
                ? 'text-[#FF6B35]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.unread}
            {activeFilter === 'unread' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35]" />
            )}
          </button>

          <button
            onClick={() => setActiveFilter('archived')}
            className={`pb-3 text-base font-medium transition-all relative ${
              activeFilter === 'archived'
                ? 'text-[#FF6B35]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.archived}
            {activeFilter === 'archived' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35]" />
            )}
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-[#FFF9F0] border border-[#FFE8C5] hover:bg-[#FFE8C5] transition-colors group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] flex items-center justify-center">
                <notif.icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-base text-gray-800">{notif.message}</p>
                <span className="text-sm text-gray-500 mt-1 block">{notif.time}</span>
              </div>

              <div className="flex items-center gap-2">
                {!notif.isRead && !notif.isArchived && (
                  <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
                )}
                {!notif.isArchived && (
                  <button 
                    onClick={() => handleDeleteClick(notif.id, notif.isRead)}
                    className="p-2 rounded-lg hover:bg-white transition-colors"
                  >
                    <Archive className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 lg:p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{t.deleteNotification}</h3>
            </div>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {t.deleteNotificationConfirm}
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all shadow-lg"
              >
                {t.delete}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}