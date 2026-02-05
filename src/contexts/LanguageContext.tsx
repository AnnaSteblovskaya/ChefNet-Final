import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ru' | 'de' | 'es' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'chefnet-language';

// Helper function to get initial language
const getInitialLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['en', 'ru', 'de', 'es', 'tr'].includes(stored)) {
      return stored as Language;
    }
    // Clear invalid language from localStorage
    if (stored) {
      console.warn(`Invalid language "${stored}" found in localStorage, resetting to default`);
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error reading language from localStorage:', error);
  }
  return 'ru';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language to localStorage:', error);
      setLanguageState(lang);
    }
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
