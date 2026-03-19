import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Bell, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { ScrollIndicator } from '../ScrollIndicator';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

interface DocumentsTabProps {
  setActiveTab: (tab: string) => void;
}

interface Doc {
  id: number;
  title_en: string;
  title_ru: string;
  title_de: string;
  title_es: string;
  title_tr: string;
  file_url: string;
  file_name?: string;
  category: string;
  created_at: string;
}

const CATEGORY_MAP: Record<string, Record<string, string>> = {
  presentation: { en: 'Presentation', ru: 'Презентация', de: 'Präsentation', es: 'Presentación', tr: 'Sunum' },
  financial:    { en: 'Financial Report', ru: 'Финансовый отчет', de: 'Finanzbericht', es: 'Informe Financiero', tr: 'Mali Rapor' },
  legal:        { en: 'Legal', ru: 'Юридический', de: 'Rechtlich', es: 'Legal', tr: 'Yasal' },
  analysis:     { en: 'Analysis', ru: 'Анализ', de: 'Analyse', es: 'Análisis', tr: 'Analiz' },
  general:      { en: 'General', ru: 'Общее', de: 'Allgemein', es: 'General', tr: 'Genel' },
  other:        { en: 'Other', ru: 'Прочее', de: 'Sonstiges', es: 'Otro', tr: 'Diğer' },
};

function getCategoryLabel(category: string, language: string): string {
  return CATEGORY_MAP[category]?.[language] || CATEGORY_MAP[category]?.en || category;
}

function getTitle(doc: Doc, language: string): string {
  const titleKey = `title_${language}` as keyof Doc;
  return (doc[titleKey] as string) || doc.title_en || doc.file_name || 'Document';
}

function isUploadedFile(url: string): boolean {
  return url?.startsWith('/uploads/');
}

export default function DocumentsTab({ setActiveTab }: DocumentsTabProps) {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/documents')
      .then(r => r.json())
      .then(data => { setDocuments(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{t.documentsTitle}</h2>
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
        <p className="text-sm lg:text-base text-gray-600">{t.documentsSubtitle}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 overflow-visible"
      >
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>{language === 'ru' ? 'Документы отсутствуют' : language === 'de' ? 'Keine Dokumente' : language === 'es' ? 'Sin documentos' : language === 'tr' ? 'Belge yok' : 'No documents available'}</p>
          </div>
        ) : (
          <ScrollIndicator className="-mx-4 lg:mx-0 px-4 lg:px-0">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-medium text-gray-600">{t.documentName}</th>
                  <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-medium text-gray-600">{t.category}</th>
                  <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-medium text-gray-600">{t.date}</th>
                  <th className="text-left py-3 px-2 lg:px-4 text-xs lg:text-sm font-medium text-gray-600">{t.action}</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50 group">
                    <td className="py-3 lg:py-4 px-2 lg:px-4">
                      <div className="flex items-center gap-2 lg:gap-3">
                        <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500 flex-shrink-0" />
                        <span className="text-xs lg:text-sm text-gray-900 font-medium">{getTitle(doc, language)}</span>
                      </div>
                    </td>
                    <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-700">
                      {getCategoryLabel(doc.category, language)}
                    </td>
                    <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-700">
                      {new Date(doc.created_at).toLocaleDateString(language === 'ru' ? 'ru-RU' : language === 'de' ? 'de-DE' : language === 'es' ? 'es-ES' : language === 'tr' ? 'tr-TR' : 'en-US')}
                    </td>
                    <td className="py-3 lg:py-4 px-2 lg:px-4">
                      {doc.file_url ? (
                        <a
                          href={doc.file_url}
                          target={isUploadedFile(doc.file_url) ? '_blank' : '_blank'}
                          rel="noreferrer"
                          download={isUploadedFile(doc.file_url) ? (doc.file_name || true) : undefined}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
                          title={isUploadedFile(doc.file_url) ? 'Скачать' : 'Открыть'}
                        >
                          {isUploadedFile(doc.file_url)
                            ? <Download className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                            : <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                          }
                        </a>
                      ) : (
                        <span className="text-gray-300 px-2">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollIndicator>
        )}
      </motion.div>
    </div>
  );
}
