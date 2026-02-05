import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

export default function CTABanner() {
  const { language } = useLanguage();
  const t = translations[language];

  return null;
}