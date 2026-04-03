import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import IconBox from '@/app/components/IconBox';

interface DBFaqItem {
  id: number;
  question_en: string; question_ru: string; question_de: string; question_es: string; question_tr: string;
  answer_en: string;   answer_ru: string;   answer_de: string;   answer_es: string;   answer_tr: string;
  is_active: boolean;
  sort_order: number;
}

export default function FAQSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [dbFaqs, setDbFaqs] = useState<DBFaqItem[] | null>(null);

  useEffect(() => {
    fetch('/api/admin/faq/public')
      .then(r => r.ok ? r.json() : [])
      .then((data: DBFaqItem[]) => { if (data.length > 0) setDbFaqs(data); })
      .catch(() => {});
  }, []);

  // Function to make ChefNet bold in text
  const formatText = (text: string, questionText?: string) => {
    // Add safety check for undefined text
    if (!text) {
      console.warn('formatText called with undefined or empty text');
      return null;
    }
    
    // ⭐ SPECIAL HANDLING FOR TURKISH FAQ5 - MUST BE BEFORE PARAGRAPHS SPLIT!
    const isFaq5Turkish = questionText && questionText.includes('Yatırım turu yapısı ve katılım koşulları');
    
    // ⭐ SPECIAL HANDLING FOR SPANISH FAQ5
    const isFaq5Spanish = questionText && questionText.includes('Estructura de la ronda de financiación y condiciones de participación');
    
    // ⭐ SPECIAL HANDLING FOR RUSSIAN FAQ5
    const isFaq5Russian = questionText && questionText.includes('Структура раундов финансирования');
    
    // ⭐ SPECIAL HANDLING FOR ENGLISH FAQ5
    const isFaq5English = questionText && questionText.includes('Funding round structure and participation terms');
    
    // ⭐ SPECIAL HANDLING FOR GERMAN FAQ5
    const isFaq5German = questionText && questionText.includes('Struktur der Investitionsrunde');
    
    if (isFaq5Turkish || isFaq5Spanish || isFaq5Russian || isFaq5English || isFaq5German) {
      // These FAQ5 versions use single \n breaks, not double
      const lines = text.split('\n');
      
      const formattedSections: JSX.Element[] = [];
      let currentGroup: string[] = [];
      
      const flushGroup = () => {
        if (currentGroup.length > 0) {
          const groupText = currentGroup.join(' ').trim();
          
          if (groupText) {
            // Make keywords bold - All language keywords
            const parts = groupText.split(/(Mevcut odak:|Fon Dağılımı|🟢 1\. Tur:|🟡 2\. Tur:|🔵 3\. Tur:|🟣 4\. Tur:|Tutar:|Amaç:|Kullanım:|Sonuç:|Durum Güncellemesi:|Enfoque actual:|Desglose de Captación de Fondos|🟢 1\. Ronda:|🟡 2\. Ronda:|🔵 3\. Ronda:|🟣 4\. Ronda:|Monto:|Objetivo:|Uso de fondos:|Resultado:|Actualización de Estado:|Текущий фокус:|Детализация раундов:|🟢 Раунд 1:|🟡 Раунд 2:|🔵 Раунд 3:|🟣 Раунд 4:|Сумма:|Цель:|На что пойдут средства:|Результат:|Status Update:|Current focus:|Fundraising Breakdown:|🟢 Round 1:|🟡 Round 2:|🔵 Round 3:|🟣 Round 4:|Amount:|Objective:|Use of funds:|Outcome:|Status Update:|Aktueller Fokus:|Detaillierte Rundenbeschreibung:|🟢 Runde 1:|🟡 Runde 2:|🔵 Runde 3:|🟣 Runde 4:|Betrag:|Ziel:|Mittelverwendung:|Ergebnis:|Status Update:)/g);
            
            const formatted = parts.map((part, idx) => {
              // Turkish
              if (part === 'Mevcut odak:' || part === 'Fon Dağılımı' || part === '🟢 1. Tur:' || part === '🟡 2. Tur:' || part === '🔵 3. Tur:' || part === '🟣 4. Tur:' || part === 'Tutar:' || part === 'Amaç:' || part === 'Kullanım:' || part === 'Sonuç:' || part === 'Durum Güncellemesi:' ||
                  // Spanish
                  part === 'Enfoque actual:' || part === 'Desglose de Captación de Fondos' || part === '🟢 1. Ronda:' || part === '🟡 2. Ronda:' || part === '🔵 3. Ronda:' || part === '🟣 4. Ronda:' || part === 'Monto:' || part === 'Objetivo:' || part === 'Uso de fondos:' || part === 'Resultado:' || part === 'Actualización de Estado:' ||
                  // Russian
                  part === 'Текущий фокус:' || part === 'Детализация раундов:' || part === '🟢 Раунд 1:' || part === '🟡 Раунд 2:' || part === '🔵 Раунд 3:' || part === '🟣 Раунд 4:' || part === 'Сумм:' || part === 'Цель:' || part === 'На что пойдут средства:' || part === 'Результат:' || part === 'Status Update:' ||
                  // English
                  part === 'Current focus:' || part === 'Fundraising Breakdown:' || part === '🟢 Round 1:' || part === '🟡 Round 2:' || part === '🔵 Round 3:' || part === '🟣 Round 4:' || part === 'Amount:' || part === 'Objective:' || part === 'Use of funds:' || part === 'Outcome:' || part === 'Status Update:' ||
                  // German
                  part === 'Aktueller Fokus:' || part === 'Detaillierte Rundenbeschreibung:' || part === '🟢 Runde 1:' || part === '🟡 Runde 2:' || part === '🔵 Runde 3:' || part === '🟣 Runde 4:' || part === 'Betrag:' || part === 'Ziel:' || part === 'Mittelverwendung:' || part === 'Ergebnis:' || part === 'Status Update:') {
                return <strong key={`bold-${idx}`}>{part}</strong>;
              }
              return <span key={`text-${idx}`}>{part}</span>;
            });
            
            formattedSections.push(
              <div key={`section-${formattedSections.length}`} className={formattedSections.length > 0 ? 'mb-3' : ''}>
                {formatted}
              </div>
            );
          }
          currentGroup = [];
        }
      };
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (!line) {
          flushGroup();
          continue;
        }
        
        // Start new section before main headers (Turkish)
        if ((line.includes('Mevcut odak:') || line.includes('Fon Dağılımı')) && currentGroup.length > 0) {
          flushGroup();
        }
        
        // Start new section before main headers (Spanish)
        if ((line.includes('Enfoque actual:') || line.includes('Desglose de Captación de Fondos')) && currentGroup.length > 0) {
          flushGroup();
        }
        
        // Start new section before main headers (Russian)
        if ((line.includes('Текущий фокус') || line.includes('Детализация раундов:')) && currentGroup.length > 0) {
          flushGroup();
        }
        
        // Start new section before main headers (English)
        if ((line.includes('Current focus:') || line.includes('Fundraising Breakdown:')) && currentGroup.length > 0) {
          flushGroup();
        }
        
        // Start new section before main headers (German)
        if ((line.includes('Aktueller Fokus') || line.includes('Detaillierte Rundenbeschreibung:')) && currentGroup.length > 0) {
          flushGroup();
        }
        
        // Start new section before each emoji round (all languages)
        if ((line.match(/^🟢/) || line.match(/^🟡/) || line.match(/^🔵/) || line.match(/^🟣/)) && currentGroup.length > 0) {
          flushGroup();
        }
        
        // Start new section before key fields (Turkish)
        if ((line.includes('Tutar:') || line.includes('Amaç:') || line.includes('Kullanım:') || line.includes('Sonuç:') || line.includes('Durum Güncellemesi:')) && currentGroup.length > 0) {
          flushGroup();
        }
        
        // Start new section before key fields (Spanish)
        if ((line.includes('Monto:') || line.includes('Objetivo:') || line.includes('Uso de fondos:') || line.includes('Resultado:') || line.includes('Actualización de Estado:')) && currentGroup.length > 0) {
          flushGroup();
        }
        
        // Start new section before key fields (Russian)
        if ((line.includes('Сумма:') || line.includes('Цель:') || line.includes('На что пойдут средства:') || line.includes('Результат:') || line.includes('Status Update:')) && currentGroup.length > 0) {
          flushGroup();
        }
        
        // Start new section before key fields (English)
        if ((line.includes('Amount:') || line.includes('Objective:') || line.includes('Use of funds:') || line.includes('Outcome:') || line.includes('Status Update:')) && currentGroup.length > 0) {
          flushGroup();
        }
        
        // Start new section before key fields (German)
        if ((line.includes('Betrag:') || line.includes('Ziel:') || line.includes('Mittelverwendung:') || line.includes('Ergebnis:') || line.includes('Status Update:')) && currentGroup.length > 0) {
          flushGroup();
        }
        
        currentGroup.push(line);
      }
      
      // Flush remaining
      flushGroup();
      
      return formattedSections;
    }
    
    // For English and Turkish FAQ, handle **bold** markdown syntax
    const isEnglish = language === 'en';
    const isTurkish = language === 'tr';
    const isRussian = language === 'ru';
    const isGerman = language === 'de';
    const isSpanish = language === 'es';
    
    if (isEnglish || isTurkish || isRussian || isGerman || isSpanish) {
      // Check if this is English FAQ8 about IPO
      const isFaq8English = questionText && questionText.includes('When is the IPO planned');
      
      // Check if this is English FAQ9 about technologies
      const isFaq9English = questionText && questionText.includes('What technologies does ChefNet use');
      
      // Check if this is Spanish FAQ9 about technologies
      const isFaq9Spanish = questionText && questionText.includes('¿Qué tecnologías utiliza ChefNet?');
      
      // Check if this is Turkish FAQ9 about technologies
      const isFaq9Turkish = questionText && questionText.includes('ChefNet hangi teknolojileri kullanmaktadır');
      
      // Check if this is Russian FAQ9 about technologies
      const isFaq9Russian = questionText && questionText.includes('Какие технологии используются в ChefNet');
      
      // Check if this is German FAQ9 about technologies
      const isFaq9German = questionText && questionText.includes('Welche Technologien setzt ChefNet ein');
      
      // Check if this is English FAQ10 about competitive advantages
      const isFaq10English = questionText && questionText.includes('What sets ChefNet apart from competitors');
      
      // Check if this is Russian FAQ10 about competitive advantages
      const isFaq10Russian = questionText && questionText.includes('Чем ChefNet отличается от конкурентов');
      
      // Check if this is German FAQ10 about competitive advantages
      const isFaq10German = questionText && questionText.includes('Was unterscheidet ChefNet grundlegend von Wettbewerbern');
      
      // Check if this is Spanish FAQ10 about competitive advantages
      const isFaq10Spanish = questionText && questionText.includes('Qué ventajas diferenciales posicionan a ChefNet');
      
      // For English FAQ10, add extra line breaks before "Them:" and "Us:"
      if (isFaq10English) {
        // Replace all occurrences of \nThem: and \nUs: with double line breaks
        text = text.replace(/\nThem:/g, '\n\nThem:');
        text = text.replace(/\nUs:/g, '\n\nUs:');
      }
      
      // Process markdown-like **bold** syntax globally and ChefNet
      const processMarkdownBold = (str: string) => {
        const parts: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        const regex = /\*\*(.+?)\*\*|\b(ChefNet)\b/g;
        let match;
        let key = 0;
        
        while ((match = regex.exec(str)) !== null) {
          // Add text before the match
          if (match.index > lastIndex) {
            parts.push(str.substring(lastIndex, match.index));
          }
          // Add the bold text (either from **bold** or ChefNet)
          const boldText = match[1] || match[2];
          parts.push(<strong key={`bold-${key++}`}>{boldText}</strong>);
          lastIndex = match.index + match[0].length;
        }
        
        // Add remaining text
        if (lastIndex < str.length) {
          parts.push(str.substring(lastIndex));
        }
        
        return parts.length > 0 ? parts : [str];
      };
      
      // Split by double newlines to get paragraphs
      const paragraphs = text.split('\n\n');
      
      return paragraphs.map((paragraph, pIndex) => {
        // Check if this is a bullet point (both • and - markers)
        const isBullet = paragraph.startsWith('• ') || paragraph.startsWith('- ');
        
        if (isBullet) {
          // Remove the bullet and format content
          const content = paragraph.substring(2);
          
          // Check if this is Turkish FAQ2
          const isFaq2Turkish = questionText && questionText.includes("ChefNet'in iş modeli nasıl işliyor");
          
          if (isFaq2Turkish) {
            const parts = content.split(/(İşlem Ücretleri:|Abonelikler \(B2B SaaS\):|Fintech \(Ödemeler\):|Reklam:)/g);
            const formatted = parts.map((part, index) => {
              if (part === 'İşlem Ücretleri:' || part === 'Abonelikler (B2B SaaS):' || part === 'Fintech (Ödemeler):' || part === 'Reklam:') {
                return <strong key={index}>{part}</strong>;
              }
              return part;
            });
            
            return (
              <div key={pIndex} className={pIndex > 0 ? 'mt-3' : ''} style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span className="text-[#FF6B35] mr-2 flex-shrink-0">•</span>
                <span>{formatted}</span>
              </div>
            );
          }
          
          const formatted = processMarkdownBold(content);
          
          return (
            <div key={pIndex} className={pIndex > 0 ? 'mt-3' : ''} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <span className="text-[#FF6B35] mr-2 flex-shrink-0">•</span>
              <span>{formatted}</span>
            </div>
          );
        }
        
        // For English FAQ9, use special handling for technology sections
        if (isFaq9English) {
          const parts = paragraph.split(/(1\. Mobile & Frontend \(Cross-platform\)|2\. Backend & API \(Server-side\)|3\. Artificial Intelligence \(AI & Data\)|4\. Fintech & Security|5\. Infrastructure|Primary languages:|Why:|LLM Integration:|Recommendation Engine:|Payments:|Security:|Cloud:|Scalability:)/g);
          const formatted = parts.map((part, index) => {
            if (part === '1. Mobile & Frontend (Cross-platform)' || part === '2. Backend & API (Server-side)' || part === '3. Artificial Intelligence (AI & Data)' || part === '4. Fintech & Security' || part === '5. Infrastructure' || part === 'Primary languages:' || part === 'Why:' || part === 'LLM Integration:' || part === 'Recommendation Engine:' || part === 'Payments:' || part === 'Security:' || part === 'Cloud:' || part === 'Scalability:') {
              return <strong key={index}>{part}</strong>;
            }
            return part;
          });
          return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
        }
        
        // For Spanish FAQ9, use special handling for technology sections
        if (isFaq9Spanish) {
          const parts = paragraph.split(/(\*\*1\. Móvil y Frontend \(Multiplataforma\)\*\*|\*\*Razón:\*\*|\*\*2\. Backend y API \(Lado del servidor\)\*\*|\*\*3\. Inteligencia Artificial \(IA y Datos\)\*\*|\*\*Integración de LLM:\*\*|\*\*Motor de Recomendación:\*\*|\*\*4\. Fintech y Seguridad\*\*|\*\*Pagos:\*\*|\*\*Seguridad:\*\*|\*\*5\. Infraestructura\*\*|\*\*Nube:\*\*|\*\*Escalabilidad:\*\*)/g);
          const formatted = parts.map((part, index) => {
            if (part === '**1. Móvil y Frontend (Multiplataforma)**' || 
                part === '**Razón:**' || 
                part === '**2. Backend y API (Lado del servidor)**' || 
                part === '**3. Inteligencia Artificial (IA y Datos)**' || 
                part === '**Integración de LLM:**' || 
                part === '**Motor de Recomendación:**' || 
                part === '**4. Fintech y Seguridad**' || 
                part === '**Pagos:**' || 
                part === '**Seguridad:**' || 
                part === '**5. Infraestructura**' || 
                part === '**Nube:**' || 
                part === '**Escalabilidad:**') {
              return <strong key={index}>{part.replace(/\*\*/g, '')}</strong>;
            }
            return part;
          });
          return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
        }
        
        // For Turkish FAQ9, use special handling for technology sections
        if (isFaq9Turkish) {
          const parts = paragraph.split(/(\*\*1\. Mobil & Frontend \(Çapraz Platform\)\*\*|\*\*Neden:\*\*|\*\*2\. Backend & API \(Sunucu Tarafı\)\*\*|\*\*3\. Yapay Zekâ \(YZ & Veri\)\*\*|\*\*Büyük Dil Modelleri Entegrasyonu:\*\*|\*\*Öneri Motoru:\*\*|\*\*4\. Fintech & Güvenlik\*\*|\*\*Ödemeler:\*\*|\*\*Güvenlik:\*\*|\*\*5\. Altyapı\*\*|\*\*Bulut:\*\*|\*\*Ölçeklenebilirlik:\*\*)/g);
          const formatted = parts.map((part, index) => {
            if (part === '**1. Mobil & Frontend (Çapraz Platform)**' || 
                part === '**Neden:**' || 
                part === '**2. Backend & API (Sunucu Tarafı)**' || 
                part === '**3. Yapay Zekâ (YZ & Veri)**' || 
                part === '**Büyük Dil Modelleri Entegrasyonu:**' || 
                part === '**Öneri Motoru:**' || 
                part === '**4. Fintech & Güvenlik**' || 
                part === '**Ödemeler:**' || 
                part === '**Güvenlik:**' || 
                part === '**5. Altyapı**' || 
                part === '**Bulut:**' || 
                part === '**Ölçeklenebilirlik:**') {
              return <strong key={index}>{part.replace(/\*\*/g, '')}</strong>;
            }
            return part;
          });
          return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
        }
        
        // For Russian FAQ9, use special handling for technology sections
        if (isFaq9Russian) {
          const parts = paragraph.split(/(1\. Mobile & Frontend \(Кроссплатформенность\)|Зачем:|2\. Backend & API \(Серверная часть\)|Основной язык:|3\. Artificial Intelligence \(AI & Data\)|LLM Integration:|Recommendation Engine:|4\. Fintech & Security \(Безопасность\)|Платежи:|Безопасность:|5\. Infrastructure \(Инфраструктура\)|Cloud:|Scalability:)/g);
          const formatted = parts.map((part, index) => {
            if (part === '1. Mobile & Frontend (Кроссплатформенность)' || 
                part === 'Зачем:' || 
                part === '2. Backend & API (Серверная часть)' || 
                part === 'Основной язык:' || 
                part === '3. Artificial Intelligence (AI & Data)' || 
                part === 'LLM Integration:' || 
                part === 'Recommendation Engine:' || 
                part === '4. Fintech & Security (Безопасность)' || 
                part === 'Платежи:' || 
                part === 'Безопасность:' || 
                part === '5. Infrastructure (Инфраструктура)' || 
                part === 'Cloud:' || 
                part === 'Scalability:') {
              return <strong key={index}>{part}</strong>;
            }
            return part;
          });
          return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
        }
        
        // For German FAQ9, use special handling for technology sections
        if (isFaq9German) {
          const parts = paragraph.split(/(1\. Mobile & Frontend \(Plattformübergreifend\)|2\. Backend & API \(Server-seitig\)|3\. Künstliche Intelligenz \(KI & Daten\)|4\. Fintech & Sicherheit|5\. Infrastruktur|Primärsprachen:|Warum:|LLM-Integration:|Empfehlungssystem:|Zahlungsabwicklung:|Sicherheit:|Cloud:|Skalierbarkeit:)/g);
          const formatted = parts.map((part, index) => {
            if (part === '1. Mobile & Frontend (Plattformübergreifend)' || part === '2. Backend & API (Server-seitig)' || part === '3. Künstliche Intelligenz (KI & Daten)' || part === '4. Fintech & Sicherheit' || part === '5. Infrastruktur' || part === 'Primärsprachen:' || part === 'Warum:' || part === 'LLM-Integration:' || part === 'Empfehlungssystem:' || part === 'Zahlungsabwicklung:' || part === 'Sicherheit:' || part === 'Cloud:' || part === 'Skalierbarkeit:') {
              return <strong key={index}>{part}</strong>;
            }
            return part;
          });
          return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
        }
        
        // For English FAQ8, use special handling
        if (isFaq8English) {
          const parts = paragraph.split(/(\*\*Mergers & Acquisitions \(Strategic Acquisition\):\*\*|\*\*IPO \(Initial Public Offering\):\*\*)/g);
          const formatted = parts.map((part, index) => {
            if (part === '**Mergers & Acquisitions (Strategic Acquisition):**' || part === '**IPO (Initial Public Offering):**') {
              return <strong key={index}>{part.replace(/\*\*/g, '')}</strong>;
            }
            return part;
          });
          return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
        }
        
        // For English FAQ10, use special handling for competitive advantages (same as Russian version)
        if (isFaq10English) {
          // Check which section this paragraph belongs to and apply appropriate formatting
          if (paragraph.includes('Our 5 key advantages:')) {
            return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}><strong>Our 5 key advantages:</strong></div>;
          }
          
          // Handle numbered advantage titles and their content
          const parts = paragraph.split(/(1\. AI Concierge instead of filter-based search \(vs\. Yelp \/ TripAdvisor\)|2\. Seamless fintech: payment and bill splitting \(vs\. OpenTable\)|3\. Social mechanics \(vs\. Grubhub \/ Uber Eats\)|4\. A fair monetization model for restaurants|5\. A social culinary network and "live" reviews \(vs\. TripAdvisor\)|Them:|Us: Hyper-personalization\.|Us: Pay-at-Table\.|Us: Social Dining\.|Us: SaaS \+ Fintech\.|Us: Video content and trust\.|\bChefNet\b)/g);
          const formatted = parts.map((part, index) => {
            if (part === '1. AI Concierge instead of filter-based search (vs. Yelp / TripAdvisor)' || 
                part === '2. Seamless fintech: payment and bill splitting (vs. OpenTable)' || 
                part === '3. Social mechanics (vs. Grubhub / Uber Eats)' || 
                part === '4. A fair monetization model for restaurants' || 
                part === '5. A social culinary network and "live" reviews (vs. TripAdvisor)' || 
                part === 'Them:' || 
                part === 'Us: Hyper-personalization.' || 
                part === 'Us: Pay-at-Table.' || 
                part === 'Us: Social Dining.' || 
                part === 'Us: SaaS + Fintech.' || 
                part === 'Us: Video content and trust.' ||
                part === 'ChefNet') {
              return <strong key={index}>{part}</strong>;
            }
            return part;
          });
          return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
        }
        
        // For Russian FAQ10, use special handling for competitive advantages
        if (isFaq10Russian) {
          // Check which section this paragraph belongs to and apply appropriate formatting
          if (paragraph.includes('Наши 5 ключевых преимуществ:')) {
            return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}><strong>Наши 5 ключевых преимуществ:</strong></div>;
          }
          
          // Handle numbered advantage titles and their content
          const parts = paragraph.split(/(1\. AI-Консьерж вместо поиска по фильтрам \(vs Yelp\/TripAdvisor\)|2\. Бесшовный финтех: Оплата и разделение счета \(vs OpenTable\)|3\. Социальная механика \(vs Grubhub\/UberEats\)|4\. Честная модель монетизации для ресторанов|5\. Социальная кулинарная сеть и «Живые» отзывы \(vs TripAdvisor\)|У них:|У нас:|\\bChefNet\\b|Hyper-personalization\\.|Pay-at-Table\\.|Social Dining\\.|SaaS \\+ Fintech\\.|Видео-контент и Доверие\\.)/g);
          const formatted = parts.map((part, index) => {
            if (part === '1. AI-Консьерж вместо поиска по фильтрам (vs Yelp/TripAdvisor)' || 
                part === '2. Бесшовный финтех: Оплата и разделение счета (vs OpenTable)' || 
                part === '3. Социальная механика (vs Grubhub/UberEats)' || 
                part === '4. Честная модель монетизации для ресторанов' || 
                part === '5. Социальная кулинарная сеть и «Живые» отзывы (vs TripAdvisor)' || 
                part === 'У них:' || 
                part === 'У нас:' || 
                part === 'ChefNet' || 
                part === 'Hyper-personalization.' || 
                part === 'Pay-at-Table.' || 
                part === 'Social Dining.' || 
                part === 'SaaS + Fintech.' || 
                part === 'Видео-контент и Доверие.') {
              return <strong key={index}>{part}</strong>;
            }
            return part;
          });
          return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
        }
        
        // For German FAQ10, use special handling for competitive advantages
        if (isFaq10German) {
          // Check which section this paragraph belongs to and apply appropriate formatting
          if (paragraph.includes('Unsere 5 Kernvorteile:')) {
            return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}><strong>Unsere 5 Kernvorteile:</strong></div>;
          }
          
          const parts = paragraph.split(/(1\. KI-Concierge statt Filter-Suche \(vs\. Yelp\/TripAdvisor\)|2\. Nahtloses Fintech: Bezahlen & Rechnungsteilung \(vs\. OpenTable\)|3\. Sozialer Dining-Ansatz \(vs\. Grubhub\/Uber Eats\)|4\. Faires Monetarisierungsmodell|5\. Lebendige Bewertungskultur \(vs\. TripAdvisor\)|Konkurrenz:|Wir:|\bChefNet\b)/g);
          const formatted = parts.map((part, index) => {
            if (part === '1. KI-Concierge statt Filter-Suche (vs. Yelp/TripAdvisor)' || 
                part === '2. Nahtloses Fintech: Bezahlen & Rechnungsteilung (vs. OpenTable)' || 
                part === '3. Sozialer Dining-Ansatz (vs. Grubhub/Uber Eats)' || 
                part === '4. Faires Monetarisierungsmodell' || 
                part === '5. Lebendige Bewertungskultur (vs. TripAdvisor)' || 
                part === 'Konkurrenz:' ||
                part === 'Wir:' ||
                part === 'ChefNet') {
              return <strong key={index}>{part}</strong>;
            }
            return part;
          });
          return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
        }
        
        // For Spanish FAQ10, use special handling for competitive advantages
        if (isFaq10Spanish) {
          // Check which section this paragraph belongs to and apply appropriate formatting
          if (paragraph.includes('Cinco ventajas clave:')) {
            return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}><strong>Cinco ventajas clave:</strong></div>;
          }
          
          const parts = paragraph.split(/(\*\*1\. Conserje con IA vs\. búsquedas con filtros \(vs\. Yelp\/TripAdvisor\)\*\*|\*\*2\. Fintech integrado: pago y división de cuentas \(vs\. OpenTable\)\*\*|\*\*3\. Experiencia social \(vs\. Grubhub\/Uber Eats\)\*\*|\*\*4\. Modelo de ingresos justo para restaurantes\*\*|\*\*5\. Red social culinaria con reseñas en vivo \(vs\. TripAdvisor\)\*\*|\*\*Ellos:\*\*|\*\*Nosotros:\*\*|\bChefNet\b)/g);
          const formatted = parts.map((part, index) => {
            if (part === '**1. Conserje con IA vs. búsquedas con filtros (vs. Yelp/TripAdvisor)**' || 
                part === '**2. Fintech integrado: pago y división de cuentas (vs. OpenTable)**' || 
                part === '**3. Experiencia social (vs. Grubhub/Uber Eats)**' || 
                part === '**4. Modelo de ingresos justo para restaurantes**' || 
                part === '**5. Red social culinaria con reseñas en vivo (vs. TripAdvisor)**' || 
                part === '**Ellos:**' || 
                part === '**Nosotros:**') {
              return <strong key={index}>{part.replace(/\*\*/g, '')}</strong>;
            }
            if (part === 'ChefNet') {
              return <strong key={index}>{part}</strong>;
            }
            return part;
          });
          return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
        }
        
        // Regular paragraph
        const formatted = processMarkdownBold(paragraph);
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      });
    }
    
    // For Russian FAQ2, add extra line break after "Обзор финансирования"
    const isFaq2Russian = questionText && questionText.includes('Какова бизнес-модель ChefNet');
    if (isFaq2Russian) {
      text = text.replace(/Обзор финансирования\n🟢/g, 'Обзор финансирования\n\n🟢');
    }
    
    // Check if this is English FAQ2
    const isFaq2English = questionText && questionText.includes("What is ChefNet's business model");
    
    // Check if this is Turkish FAQ2
    const isFaq2Turkish = questionText && questionText.includes("ChefNet'in iş modeli nasıl işliyor");
    
    // For Russian FAQ6, add extra line break after each numbered heading
    const isFaq6Russian = questionText && questionText.includes('Какие гаранти есть у инвесторов');
    if (isFaq6Russian) {
      // Use regex to find and replace - looking for headings followed by capital letter
      text = text.replace(/(1\. Юридическая защита \(US Law\))\n([А-ЯЁ])/g, '$1\n\n$2');
      text = text.replace(/(2\. Интеллектуальная собственность \(IP Ownership\))\n([А-ЯЁ])/g, '$1\n\n$2');
      text = text.replace(/(3\. Прозрачность и отчетность \(Reporting\))\n([А-ЯЁ])/g, '$1\n\n$2');
      text = text.replace(/(4\. Мотивация основателей \(Vesting\))\n([А-ЯЁ])/g, '$1\n\n$2');
    }
    
    // Check if this is the German FAQ6 question about guarantees
    const isFaq6German = questionText && questionText.includes('Welche Sicherheiten werden Investoren gewährt');
    
    // Check if this is the English FAQ6 question about guarantees
    const isFaq6English = questionText && questionText.includes('What guarantees are provided to investors');
    
    // Check if this is the Turkish FAQ6 question about guarantees
    const isFaq6Turkish = questionText && questionText.includes('Yatırımcılara hangi güvenceler sağlanmaktadır');
    
    // Check if this is the Spanish FAQ6 question about guarantees
    const isFaq6Spanish = questionText && questionText.includes('¿Qué garantías se ofrecen a los inversores?');
    
    // Check if this is the German FAQ7 question about returns
    const isFaq7German = questionText && questionText.includes('Mit welcher Höhe der potenziellen Rendite');
    
    // Check if this is the Russian FAQ7 question about returns
    const isFaq7Russian = questionText && questionText.includes('Какую потенциальную прибыль можно ожидать');
    
    // Check if this is the German FAQ8 question about IPO
    const isFaq8German = questionText && questionText.includes('Wann ist der Börsengang geplant');
    
    // Check if this is the Russian FAQ8 question about IPO
    const isFaq8Russian = questionText && questionText.includes('Когда планируется выход на IPO');
    
    // Check if this is the English FAQ8 question about IPO
    const isFaq8English = questionText && questionText.includes('When is the IPO planned');
    
    // Split by double newlines to get paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, pIndex) => {
      // Check if this is a bullet point (both • and - markers)
      const isBullet = paragraph.startsWith('• ') || paragraph.startsWith('- ');
      if (isBullet) {
        // Remove the bullet and format content with bold for specific words
        const content = paragraph.substring(2);
        
        // For Russian FAQ2, make text before colon bold
        if (isFaq2Russian) {
          const parts = content.split(/(Комиссия \(Transactional\):|Подписка \(B2B SaaS\):|Финтех \(Payments\):|Реклаа:)/g);
          const formatted = parts.map((part, index) => {
            if (part === 'Комиссия (Transactional):' || part === 'Подписка (B2B SaaS):' || part === 'Финтех (Payments):' || part === 'Реклама:') {
              return <strong key={index}>{part}</strong>;
            }
            return part;
          });
          
          return (
            <div key={pIndex} className={pIndex > 0 ? 'mt-3' : ''} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <span className="text-[#FF6B35] mr-2 flex-shrink-0">•</span>
              <span>{formatted}</span>
            </div>
          );
        }
        
        // For English FAQ2, make text before colon bold
        if (isFaq2English) {
          const parts = content.split(/(Transaction Fees:|Subscriptions \(B2B SaaS\):|Fintech \(Payments\):|Advertising:)/g);
          const formatted = parts.map((part, index) => {
            if (part === 'Transaction Fees:' || part === 'Subscriptions (B2B SaaS):' || part === 'Fintech (Payments):' || part === 'Advertising:') {
              return <strong key={index}>{part}</strong>;
            }
            return part;
          });
          
          return (
            <div key={pIndex} className={pIndex > 0 ? 'mt-3' : ''} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <span className="text-[#FF6B35] mr-2 flex-shrink-0">•</span>
              <span>{formatted}</span>
            </div>
          );
        }
        
        // For Turkish FAQ2, make text before colon bold
        if (isFaq2Turkish) {
          const parts = content.split(/(İşlem Ücretleri:|Abonelikler \(B2B SaaS\):|Fintech \(Ödemeler\):|Reklam:)/g);
          const formatted = parts.map((part, index) => {
            if (part === 'İşlem Ücretleri:' || part === 'Abonelikler (B2B SaaS):' || part === 'Fintech (Ödemeler):' || part === 'Reklam:') {
              return <strong key={index}>{part}</strong>;
            }
            return part;
          });
          
          return (
            <div key={pIndex} className={pIndex > 0 ? 'mt-3' : ''} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <span className="text-[#FF6B35] mr-2 flex-shrink-0">•</span>
              <span>{formatted}</span>
            </div>
          );
        }
        
        // For Russian FAQ7, make text before colon bold
        if (isFaq7Russian) {
          const parts = content.split(/(M&A \(Покупка корпораций\):|Вторичный рынок:)/g);
          const formatted = parts.map((part, index) => {
            if (part === 'M&A (Покупка корпорацией):' || part === 'Вторичный рынок:') {
              return <strong key={index}>{part}</strong>;
            }
            return part;
          });
          
          return (
            <div key={pIndex} className={pIndex > 0 ? 'mt-3' : ''} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <span className="text-[#FF6B35] mr-2 flex-shrink-0">•</span>
              <span>{formatted}</span>
            </div>
          );
        }
        
        // Check if this is German FAQ7 with dash markers
        const isFaq7German = paragraph.includes('M&A (strategische Übernahme):') || paragraph.includes('Sekundärmarkt:');
        if (isFaq7German) {
          const parts = content.split(/(M&A \(strategische Übernahme\):|Sekundärmarkt:)/g);
          const formatted = parts.map((part, index) => {
            if (part === 'M&A (strategische Übernahme):' || part === 'Sekundärmarkt:') {
              return <strong key={index}>{part}</strong>;
            }
            return part;
          });
          
          return (
            <div key={pIndex} className={pIndex > 0 ? 'mt-3' : ''} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <span className="text-[#FF6B35] mr-2 flex-shrink-0">•</span>
              <span>{formatted}</span>
            </div>
          );
        }
        
        // Split content to make specific words bold (for German FAQ2)
        const parts = content.split(/(Transaktionsgebühren:|Abonnements \(B2B SaaS\):|Fintech \(Zahlungsabwicklung\):|Werbung:)/g);
        const formatted = parts.map((part, index) => {
          if (part === 'Transaktionsgebühren:' || part === 'Abonnements (B2B SaaS):' || part === 'Fintech (Zahlungsabwicklung):' || part === 'Werbung:') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        
        return (
          <div key={pIndex} className={pIndex > 0 ? 'mt-3' : ''} style={{ display: 'flex', alignItems: 'flex-start' }}>
            <span className="text-[#FF6B35] mr-2 flex-shrink-0">•</span>
            <span>{formatted}</span>
          </div>
        );
      }
      
      // Regular paragraph - no bullet points
      // For German FAQ7, use special handling for numbered headings
      if (isFaq7German) {
        const parts = paragraph.split(/(1\.Unternehmensbewertungs-Wachstum \(X-faches Kurspotenzial\)|2\. Projiziertes Umsatzwachstum|3\. Exit-Strategie|Ziel:)/g);
        const formatted = parts.map((part, index) => {
          if (part === '1.Unternehmensbewertungs-Wachstum (X-faches Kurspotenzial)' || part === '2. Projiziertes Umsatzwachstum' || part === '3. Exit-Strategie' || part === 'Ziel:') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      }
      
      // For Russian FAQ7, use special handling for numbered headings
      if (isFaq7Russian) {
        const parts = paragraph.split(/(1\. Рост оценки компании \(X-кратный ультипликатор\)|2\. Прогнозируемая выручка|3\. Стратегия выхода \(Exit Strategy\)|Цель:)/g);
        const formatted = parts.map((part, index) => {
          if (part === '1. Рост оценки компании (X-кратный мультипликатор)' || part === '2. Прогнозируемая выручка' || part === '3. Стратегия выхода (Exit Strategy)' || part === 'Цель:') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      }
      
      // For German FAQ6, use special handling for numbered headings
      if (isFaq6German) {
        const parts = paragraph.split(/(1\. Rechtlicher Schutz \(US-Recht\)|2\. Schutz des geistigen Eigentums \(IP-Eigentum\)|3\. Transparenz und Berichterstattung|4\. Gründeranreize \(Vesting\))/g);
        const formatted = parts.map((part, index) => {
          if (part === '1. Rechtlicher Schutz (US-Recht)' || part === '2. Schutz des geistigen Eigentums (IP-Eigentum)' || part === '3. Transparenz und Berichterstattung' || part === '4. Gründeranreize (Vesting)') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      }
      
      // For English FAQ6, use special handling for numbered headings
      if (isFaq6English) {
        const parts = paragraph.split(/(1\. Legal Protection \(US Law\)|2\. Intellectual Property Ownership \(IP Ownership\)|3\. Transparency and Reporting \(Reporting\)|4\. Founder Incentives \(Vesting\))/g);
        const formatted = parts.map((part, index) => {
          if (part === '1. Legal Protection (US Law)' || part === '2. Intellectual Property Ownership (IP Ownership)' || part === '3. Transparency and Reporting (Reporting)' || part === '4. Founder Incentives (Vesting)') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      }
      
      // For Turkish FAQ6, use special handling for numbered headings
      if (isFaq6Turkish) {
        const parts = paragraph.split(/(1\. Hukuki Koruma \(ABD Hukuku\)|2\. Fikri Mülkiyet Sahipliği \(IP Sahipliği\)|3\. Şeffaflık ve Raporlama|4\. Kurucu Teşvikleri \(Vesting\))/g);
        const formatted = parts.map((part, index) => {
          if (part === '1. Hukuki Koruma (ABD Hukuku)' || part === '2. Fikri Mülkiyet Sahipliği (IP Sahipliği)' || part === '3. Şeffaflık ve Raporlama' || part === '4. Kurucu Teşvikleri (Vesting)') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      }
      
      // For Spanish FAQ6, use special handling for numbered headings
      if (isFaq6Spanish) {
        const parts = paragraph.split(/(1\. Protección Jurídica \(Derecho de EE\.UU\.\)|2\. Propiedad Intelectual \(Titularidad de IP\)|3\. Transparencia e Informes \(Reporting\)|4\. Incentivos para Fundadores \(Vesting\))/g);
        const formatted = parts.map((part, index) => {
          if (part === '1. Protección Jurídica (Derecho de EE.UU.)' || part === '2. Propiedad Intelectual (Titularidad de IP)' || part === '3. Transparencia e Informes (Reporting)' || part === '4. Incentivos para Fundadores (Vesting)') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      }
      
      // For German FAQ5, use special handling
      if (isFaq5German) {
        const parts = paragraph.split(/(Aktueller Fokus:|🟢 Runde 1:|🟡 Runde 2:|🔵 Runde 3:| Runde 4:|Betrag:|Ziel:|Mittelverwendung:|Ergebnis:|Status:)/g);
        const formatted = parts.map((part, index) => {
          if (part === 'Aktueller Fokus:' || part === '🟢 Runde 1:' || part === '🟡 Runde 2:' || part === '🔵 Runde 3:' || part === '🟣 Runde 4:' || part === 'Betrag:' || part === 'Ziel:' || part === 'Mittelverwendung:' || part === 'Ergebnis:' || part === 'Status:') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      }
      
      // For English FAQ5, use special handling
      if (isFaq5English) {
        const parts = paragraph.split(/(Current focus:|Fundraising Breakdown:|🟢 Round 1:|🟡 Round 2:|🔵 Round 3:|🟣 Round 4:|Amount:|Objective:|Use of funds:|Outcome:|Status Update:)/g);
        const formatted = parts.map((part, index) => {
          if (part === 'Current focus:' || part === 'Fundraising Breakdown:' || part === '🟢 Round 1:' || part === '🟡 Round 2:' || part === '🔵 Round 3:' || part === '🟣 Round 4:' || part === 'Amount:' || part === 'Objective:' || part === 'Use of funds:' || part === 'Outcome:' || part === 'Status Update:') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      }
      
      // For Russian FAQ5, use special handling
      if (isFaq5Russian) {
        const parts = paragraph.split(/(Теущий фокус:|Обзор финансирования|🟢 Раунд 1:|🟡 Раунд 2:|🔵 Раунд 3:|🟣 Раунд 4:|Сумма:|Цель:|На что пойдут средства:|Результат:|Статус:)/g);
        const formatted = parts.map((part, index) => {
          if (part === 'Текущий фокус:' || part === 'Обзор финансирования' || part === '🟢 Раунд 1:' || part === '🟡 Ранд 2:' || part === '🔵 Раунд 3:' || part === '🟣 Раунд 4:' || part === 'Сума:' || part === 'Цель:' || part === 'На что пойдут средства:' || part === 'Результат:' || part === 'Статус:') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      }
      
      // For Russian FAQ6, use special handling for numbered headings
      if (isFaq6Russian) {
        const parts = paragraph.split(/(1\. Юридическая защита \(US Law\)|2\. Интеллектуальная собственность \(IP Ownership\)|3\. Прозрачность и отчетность \(Reporting\)|4\. Мотивация основателей \(Vesting\))/g);
        const formatted = parts.map((part, index) => {
          if (part === '1. Юридическая защита (US Law)' || part === '2. Интеллектуальная собственность (IP Ownership)' || part === '3. Прозрачность и отчетность (Reporting)' || part === '4. Мотивация основателей (Vesting)') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      }
      
      // For German FAQ8, use special handling
      if (isFaq8German) {
        const parts = paragraph.split(/(M&A \(Strategische Übernahme\):|IPO \(Börsengang\):)/g);
        const formatted = parts.map((part, index) => {
          if (part === 'M&A (Strategische Übernahme):' || part === 'IPO (Börsengang):') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      }
      
      // For Russian FAQ8, use special handling
      if (isFaq8Russian) {
        const parts = paragraph.split(/(M&A \(Покупка стратегом\):|IPO \(Публичное размщение\):)/g);
        const formatted = parts.map((part, index) => {
          if (part === 'M&A (Покупка стратегом):' || part === 'IPO (Публичное размещеие):') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      }
      
      // For English FAQ8, use special handling
      if (isFaq8English) {
        const parts = paragraph.split(/(M&A \(Strategic Acquisition\):|IPO \(Initial Public Offering\):)/g);
        const formatted = parts.map((part, index) => {
          if (part === 'M&A (Strategic Acquisition):' || part === 'IPO (Initial Public Offering):') {
            return <strong key={index}>{part}</strong>;
          }
          return part;
        });
        return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
      }
      
      // For regular paragraphs, make ChefNet bold
      const parts = paragraph.split(/(\\bChefNet\\b)/g);
      const formatted = parts.map((part, index) => {
        if (part === 'ChefNet') {
          return <strong key={index}>{part}</strong>;
        }
        return part;
      });
      return <div key={pIndex} className={pIndex > 0 ? 'mb-3' : ''}>{formatted}</div>;
    });
  };

  const staticFaqs = [
    { question: t.faq1Question,  answer: t.faq1Answer  },
    { question: t.faq2Question,  answer: t.faq2Answer  },
    { question: t.faq3Question,  answer: t.faq3Answer  },
    { question: t.faq4Question,  answer: t.faq4Answer  },
    { question: t.faq5Question,  answer: t.faq5Answer  },
    { question: t.faq6Question,  answer: t.faq6Answer  },
    { question: t.faq7Question,  answer: t.faq7Answer  },
    { question: t.faq8Question,  answer: t.faq8Answer  },
    { question: t.faq9Question,  answer: t.faq9Answer  },
    { question: t.faq10Question, answer: t.faq10Answer },
  ];

  const faqs = dbFaqs
    ? dbFaqs.map(item => ({
        question: (item[`question_${language}` as keyof DBFaqItem] as string) || item.question_en,
        answer:   (item[`answer_${language}` as keyof DBFaqItem]   as string) || item.answer_en,
      }))
    : staticFaqs;

  return (
    <section id="faq" className="py-12 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <IconBox delay={0.2}>
            <MessageCircleQuestion className="w-12 h-12 text-[#FF6B35] mx-auto relative z-10 drop-shadow-lg" />
          </IconBox>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 mt-6 sm:mt-8 bg-gradient-to-r from-[#2C1810] to-[#6B4423] bg-clip-text text-transparent leading-tight pb-2">{t.faqTitle}</h2>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-16" role="list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="border-2 border-[#FFE5DE] rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm hover:border-[#FF6B35] hover:shadow-xl hover:shadow-[#FF6B35]/10 transition-all duration-300"
              role="listitem"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-[#FFE5DE]/30 hover:to-transparent transition-all duration-300"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span className="font-bold text-base sm:text-lg pr-4 sm:pr-8 text-[#2C1810] leading-relaxed">{formatText(faq.question)}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7A59]/10 to-[#EB5632]/10 flex items-center justify-center"
                >
                  <ChevronDown className="w-5 h-5 text-[#FF6B35]" aria-hidden="true" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <motion.div
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      className="px-8 pb-6 text-[#6B4423] text-base leading-relaxed bg-gradient-to-r from-[#FFE5DE]/30 to-transparent border-t border-[#FFE5DE]"
                    >
                      {formatText(faq.answer, faq.question)}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
      </div>
    </section>
  );
}