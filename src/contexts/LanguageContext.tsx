import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ru' | 'de' | 'es' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'chefnet-language';
const SUPPORTED: Language[] = ['en', 'ru', 'de', 'es', 'tr'];

const detectBrowserLanguage = (): Language => {
  try {
    const langs = Array.from(navigator.languages || [navigator.language]).filter(Boolean);
    for (const lang of langs) {
      const base = lang.split('-')[0].toLowerCase() as Language;
      if (SUPPORTED.includes(base)) return base;
    }
  } catch (_) {}
  return 'en';
};

const getInitialLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored as Language)) {
      return stored as Language;
    }
    if (stored) localStorage.removeItem(STORAGE_KEY);
  } catch (_) {}
  return detectBrowserLanguage();
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
