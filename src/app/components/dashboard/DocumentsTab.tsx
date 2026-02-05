import { motion } from 'motion/react';
import { FileText, Download, Upload } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';

export default function DocumentsTab() {
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
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.documentsTitle}</h2>
        <p className="text-gray-600">{t.documentsSubtitle}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{t.confidentialDocs}</h3>
            <p className="text-sm text-gray-600">{t.confidentialDesc}</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#FFF9F0] hover:bg-[#FFE8C5] text-gray-800 rounded-lg border border-[#FFE8C5] transition-all">
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">{t.requestDocument}</span>
          </button>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">{t.documentName}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">{t.category}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">{t.date}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">{t.action}</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 group">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-900 font-medium">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">{doc.category}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{doc.date}</td>
                  <td className="py-4 px-4">
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}