import { ChefHat, ArrowLeft, Download, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

interface LegalLayoutProps {
  titleRu: string;
  titleEn: string;
  updatedRu: string;
  updatedEn: string;
  children: React.ReactNode;
}

export default function LegalLayout({ titleRu, titleEn, updatedRu, updatedEn, children }: LegalLayoutProps) {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#FFE5DE] print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-sm text-[#6B4423] hover:text-[#FF6B35] transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{isRu ? 'Назад' : 'Back'}</span>
            </button>
            <span className="text-[#FFE5DE]">|</span>
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <ChefHat className="w-6 h-6 text-[#FF6B35]" />
              <span className="font-bold text-[#2C1810]">ChefNet <span className="text-[#FF6B35]">Invest</span></span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="light" />
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FF6B35] text-white text-sm font-medium hover:bg-[#e55a26] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{isRu ? 'Скачать PDF' : 'Download PDF'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Document */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 print:py-4 print:px-0">
        {/* Title block */}
        <div className="mb-10 pb-8 border-b border-[#FFE5DE] print:mb-6 print:pb-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-[#FF6B35]" />
            <span className="text-xs text-[#6B4423] font-medium uppercase tracking-widest">ChefNet LLC · chefnet.ai</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2C1810] mb-2">
            {isRu ? titleRu : titleEn}
          </h1>
          <p className="text-sm text-[#B8957A]">
            {isRu ? updatedRu : updatedEn}
          </p>
        </div>

        {/* Content */}
        <div className="prose-legal">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#FFE5DE] text-center print:mt-8 print:pt-4">
          <p className="text-sm text-[#B8957A]">
            © {new Date().getFullYear()} ChefNet LLC · The Green STE B, Dover, DE 19901, USA · <a href="mailto:legal@chefnet.ai" className="hover:text-[#FF6B35] transition-colors">legal@chefnet.ai</a>
          </p>
        </div>
      </main>

      {/* Print styles */}
      <style>{`
        @media print {
          body { font-size: 12pt; }
          .prose-legal h2 { font-size: 14pt; }
          .prose-legal p, .prose-legal li { font-size: 11pt; line-height: 1.6; }
        }
        .prose-legal h2 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #2C1810;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          padding-left: 0.75rem;
          border-left: 3px solid #FF6B35;
        }
        .prose-legal h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #4A2C17;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .prose-legal p {
          color: #4A2C17;
          line-height: 1.75;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }
        .prose-legal ul {
          list-style: none;
          padding: 0;
          margin: 0.75rem 0 1rem 0;
        }
        .prose-legal ul li {
          color: #4A2C17;
          font-size: 0.95rem;
          line-height: 1.7;
          padding: 0.3rem 0 0.3rem 1.5rem;
          position: relative;
        }
        .prose-legal ul li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: #FF6B35;
          font-weight: 700;
        }
        .prose-legal .highlight {
          background: #FFF9F5;
          border: 1px solid #FFE5DE;
          border-radius: 0.75rem;
          padding: 1rem 1.25rem;
          margin: 1rem 0;
        }
        .prose-legal .highlight p { margin-bottom: 0; }
        .prose-legal a { color: #FF6B35; text-decoration: underline; }
      `}</style>
    </div>
  );
}
