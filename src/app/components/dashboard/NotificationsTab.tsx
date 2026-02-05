import { motion } from 'motion/react';
import { Bell, UserPlus, AlertCircle, Archive } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { useState } from 'react';

export default function NotificationsTab() {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'archived'>('all');

  const notifications = [
    { id: 1, icon: Bell, message: t.activitySubtitle, time: '2 ' + t.daysAgo, isRead: true, isArchived: false },
    { id: 2, icon: Bell, message: t.activitySubtitle, time: '2 ' + t.daysAgo, isRead: false, isArchived: false },
    { id: 3, icon: UserPlus, message: t.activitySubtitle, time: '2 ' + t.daysAgo, isRead: false, isArchived: false },
    { id: 4, icon: Bell, message: t.activitySubtitle, time: '2 ' + t.daysAgo, isRead: true, isArchived: false },
  ];

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'unread') return !notif.isRead;
    if (activeFilter === 'archived') return notif.isArchived;
    return true;
  });

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.notificationsTitle}</h2>
        <p className="text-gray-600">{t.notificationsSubtitle}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{t.yourNotifications}</h3>
          <p className="text-sm text-gray-600">{t.unreadMessages}</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeFilter === 'all'
                ? 'text-[#D4522A]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.all}
            {activeFilter === 'all' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4522A]" />
            )}
          </button>

          <button
            onClick={() => setActiveFilter('unread')}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeFilter === 'unread'
                ? 'text-[#D4522A]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.unread}
            {activeFilter === 'unread' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4522A]" />
            )}
          </button>

          <button
            onClick={() => setActiveFilter('archived')}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeFilter === 'archived'
                ? 'text-[#D4522A]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.archived}
            {activeFilter === 'archived' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4522A]" />
            )}
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-[#FFF9F0] border border-[#FFE8C5] hover:bg-[#FFE8C5] transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <notif.icon className="w-5 h-5 text-[#D4522A]" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800">{notif.message}</p>
                <span className="text-xs text-gray-500 mt-1 block">{notif.time}</span>
              </div>

              <div className="flex items-center gap-2">
                {!notif.isRead && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4522A]" />
                )}
                <button className="p-2 rounded-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                  <Archive className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}