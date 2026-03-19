import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ContentItem {
  key: string;
  value_en: string; value_ru: string; value_de: string; value_es: string; value_tr: string;
  type: string; section: string;
}

type Lang = 'en' | 'ru' | 'de' | 'es' | 'tr';

interface SiteContentContextType {
  get: (key: string, lang: Lang, fallback?: string) => string;
  content: Record<string, ContentItem>;
  ready: boolean;
}

const SiteContentContext = createContext<SiteContentContextType>({
  get: (_k, _l, f) => f || '',
  content: {},
  ready: false,
});

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Record<string, ContentItem>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch('/api/site-content')
      .then(r => r.json())
      .then((rows: ContentItem[]) => {
        const map: Record<string, ContentItem> = {};
        rows.forEach(r => { map[r.key] = r; });
        setContent(map);
        setReady(true);
      })
      .catch(() => setReady(true));
  }, []);

  const get = (key: string, lang: Lang, fallback = ''): string => {
    const item = content[key];
    if (!item) return fallback;
    const val = (item as any)[`value_${lang}`];
    return val && val.trim() ? val : fallback;
  };

  return (
    <SiteContentContext.Provider value={{ get, content, ready }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
