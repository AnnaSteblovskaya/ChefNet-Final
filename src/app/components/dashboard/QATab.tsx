import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircleQuestion, ChevronDown, ExternalLink, Bot, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';

interface FAQItem {
  id: number;
  question_en: string;
  question_ru: string;
  question_de: string;
  question_es: string;
  question_tr: string;
  answer_en: string;
  answer_ru: string;
  answer_de: string;
  answer_es: string;
  answer_tr: string;
  is_active: boolean;
  sort_order: number;
}

const GPT_URL = 'https://chatgpt.com/g/g-68a33ef72974819183b26378000765b3-chefnet-ai-kompanon';

export default function QATab() {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const res = await fetch('/api/admin/faq/public');
        if (res.ok) {
          const data = await res.json();
          setFaqs(data);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchFAQ();
  }, []);

  const getQuestion = (item: FAQItem) => {
    const key = `question_${language}` as keyof FAQItem;
    return (item[key] as string) || item.question_en;
  };

  const getAnswer = (item: FAQItem) => {
    const key = `answer_${language}` as keyof FAQItem;
    return (item[key] as string) || item.answer_en;
  };

  const formatAnswer = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return null;
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const formatted = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="text-[var(--color-text)] font-semibold">{part.slice(2, -2)}</strong>;
        }
        return <span key={j}>{part}</span>;
      });
      return <p key={i} className="mb-2 last:mb-0">{formatted}</p>;
    }).filter(Boolean);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7A59] to-[#EB5632] flex items-center justify-center shadow-md">
            <MessageCircleQuestion className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">{t.qaTitle}</h1>
            <p className="text-sm text-[var(--color-text-secondary)]">{t.qaSubtitle}</p>
          </div>
        </div>
      </motion.div>

      {/* AI Chat Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 mb-6 border border-[#FF6B35]/30 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B35]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF7A59] to-[#EB5632] flex items-center justify-center shadow-lg flex-shrink-0">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-white">{t.qaAiTitle}</h2>
                <span className="flex items-center gap-1 text-xs bg-[#FF6B35]/20 text-[#FF9B7A] px-2 py-0.5 rounded-full border border-[#FF6B35]/30">
                  <Sparkles className="w-3 h-3" />
                  AI
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{t.qaAiDesc}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
            {(t.qaAiFeatures || []).map((feature: string, i: number) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>

          <motion.a
            href={GPT_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#FF7A59] to-[#EB5632] text-white font-semibold rounded-xl shadow-lg shadow-[#FF6B35]/30 hover:shadow-[#FF6B35]/50 transition-all"
          >
            <Bot className="w-5 h-5" />
            {t.qaOpenChat}
            <ExternalLink className="w-4 h-4 opacity-70" />
          </motion.a>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 border border-[var(--color-border)] shadow-sm"
      >
        <h3 className="text-lg font-bold text-[var(--color-text)] mb-5 flex items-center gap-2">
          <MessageCircleQuestion className="w-5 h-5 text-[#FF6B35]" />
          {t.qaFaqTitle}
        </h3>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : faqs.length === 0 ? (
          <p className="text-[var(--color-text-secondary)] text-sm text-center py-6">{t.qaNoFaq}</p>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="border border-[var(--color-border)] rounded-xl overflow-hidden hover:border-[#FF6B35]/40 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#FFF5F0] transition-colors"
                >
                  <span className="font-medium text-sm text-[var(--color-text)] pr-3 leading-snug">
                    {getQuestion(faq)}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#FFF0EA] flex items-center justify-center"
                  >
                    <ChevronDown className="w-4 h-4 text-[#FF6B35]" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)] bg-[#FAFAF9]">
                        {formatAnswer(getAnswer(faq))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-center text-xs text-[var(--color-text-secondary)]"
      >
        {t.qaHint}
      </motion.div>
    </div>
  );
}
