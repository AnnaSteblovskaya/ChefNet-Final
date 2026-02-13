import { motion } from 'motion/react';
import { FileText, Download, Bell } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { ScrollIndicator } from '../ScrollIndicator';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

interface DocumentsTabProps {
  setActiveTab: (tab: string) => void;
}

export default function DocumentsTab({ setActiveTab }: DocumentsTabProps) {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];

  const documents = [
    { name: 'Company Pitch Deck', category: t.presentation, date: '2024-06-15' },
    { name: 'Financials Q1 2024', category: t.financialReport, date: '2024-06-15' },
    { name: 'Term Sheet (Series A)', category: t.legal, date: '2024-06-15' },
    { name: 'Market Research Report', category: t.analysis, date: '2024-06-15' },
    { name: 'Shareholder Agreement', category: t.legal, date: '2024-06-15' },
  ];

  return (
    <div>
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{t.documentsTitle}</h2>
          
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
        <p className="text-sm lg:text-base text-gray-600">{t.documentsSubtitle}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 overflow-visible"
      >
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
              {documents.map((doc, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 group">
                  <td className="py-3 lg:py-4 px-2 lg:px-4">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500 flex-shrink-0" />
                      <span className="text-xs lg:text-sm text-gray-900 font-medium">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-700">{doc.category}</td>
                  <td className="py-3 lg:py-4 px-2 lg:px-4 text-xs lg:text-sm text-gray-700">{doc.date}</td>
                  <td className="py-3 lg:py-4 px-2 lg:px-4">
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <Download className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollIndicator>
      </motion.div>
    </div>
  );
}