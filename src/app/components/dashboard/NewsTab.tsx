import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, ChevronDown, ChevronUp, Calendar, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { useRealtimeTable } from '@/utils/useRealtimeTable';

interface NewsItem {
  id: number;
  created_at: string;
  title_en: string; title_ru: string; title_de: string; title_es: string; title_tr: string;
  body_en: string; body_ru: string; body_de: string; body_es: string; body_tr: string;
}

type LangKey = 'en' | 'ru' | 'de' | 'es' | 'tr';

export default function NewsTab() {
  const { language } = useLanguage();
  const t = dashboardTranslations[language as LangKey] ?? dashboardTranslations.en;
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  const loadNews = useCallback(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(data => { setNews(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { loadNews(); }, [loadNews]);

  // Supabase Realtime — refresh list when news is published/updated
  useRealtimeTable({
    table: 'news',
    event: '*',
    onEvent: (payload) => {
      console.log('[Realtime] news event:', payload.eventType);
      loadNews();
    },
  });

  const getTitle = (item: NewsItem) =>
    item[`title_${language}` as keyof NewsItem] as string ||
    item.title_ru || item.title_en || t.newsNoTitle;

  const getBody = (item: NewsItem) =>
    item[`body_${language}` as keyof NewsItem] as string ||
    item.body_ru || item.body_en || '';

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString(
        language === 'ru' ? 'ru-RU' : language === 'de' ? 'de-DE' : language === 'es' ? 'es-ES' : language === 'tr' ? 'tr-TR' : 'en-US',
        { day: 'numeric', month: 'long', year: 'numeric' }
      );
    } catch { return iso; }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#D4522A]/10 flex items-center justify-center">
          <Newspaper className="w-5 h-5 text-[#D4522A]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">{t.newsTitle}</h1>
          <p className="text-sm text-[#6B7280]">{t.newsSubtitle}</p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-[#D4522A] animate-spin" />
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-20">
          <Newspaper className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
          <p className="text-[#6B7280] text-base">{t.newsEmpty}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {news.map((item, idx) => {
            const isOpen = expanded === item.id;
            const title = getTitle(item);
            const body = getBody(item);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
                  onClick={() => setExpanded(isOpen ? null : item.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1 text-xs text-[#9CA3AF]">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.created_at)}
                      </span>
                    </div>
                    <p className="font-semibold text-[#1a1a1a] text-base leading-snug">{title}</p>
                    {!isOpen && body && (
                      <p className="text-sm text-[#6B7280] mt-1 line-clamp-2">{body}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0 mt-1 text-[#D4522A]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-[var(--color-border)]">
                        <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-wrap pt-4">{body}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
