import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type Language = 'en' | 'ru' | 'de' | 'es' | 'tr';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'chefnet-cookie-consent';
const CONSENT_EXPIRY_MS = 6 * 30 * 24 * 60 * 60 * 1000; // 6 months

const translations: Record<Language, Record<string, string | Record<string, string>>> = {
  en: {
    title: 'Cookie Preferences',
    description: 'We use cookies to enhance your experience, analyze site usage, and serve personalized content. Please choose your preferences.',
    acceptAll: 'Accept All',
    rejectAll: 'Reject All',
    manage: 'Manage Preferences',
    save: 'Save Preferences',
    necessary: 'Necessary Cookies',
    necessaryDesc: 'Essential for site functionality, security, and session management. These cannot be disabled.',
    analytics: 'Analytics Cookies',
    analyticsDesc: 'Help us understand how you use our site to improve your experience.',
    marketing: 'Marketing Cookies',
    marketingDesc: 'Enable personalized advertising and marketing content tailored to your interests.',
    functional: 'Functional Cookies',
    functionalDesc: 'Remember your preferences, language settings, and other customizations.',
    alwaysOn: 'Always On',
    settings: 'Cookie Settings',
    privacyPolicy: 'Privacy Policy',
    learnMore: 'Learn More',
  },
  ru: {
    title: 'Настройки cookies',
    description: 'Мы используем cookies для улучшения вашего опыта, анализа использования сайта и доставки персонализированного контента. Пожалуйста, выберите ваши предпочтения.',
    acceptAll: 'Принять все',
    rejectAll: 'Отклонить все',
    manage: 'Управление предпочтениями',
    save: 'Сохранить предпочтения',
    necessary: 'Необходимые cookies',
    necessaryDesc: 'Необходимы для функциональности сайта, безопасности и управления сеансом. Их нельзя отключить.',
    analytics: 'Аналитические cookies',
    analyticsDesc: 'Помогают нам понять, как вы используете наш сайт, чтобы улучшить ваш опыт.',
    marketing: 'Маркетинговые cookies',
    marketingDesc: 'Обеспечивают персонализированную рекламу и маркетинговый контент в соответствии с вашими интересами.',
    functional: 'Функциональные cookies',
    functionalDesc: 'Запоминают ваши предпочтения, языковые настройки и другие параметры.',
    alwaysOn: 'Всегда включено',
    settings: 'Настройки cookies',
    privacyPolicy: 'Политика конфиденциальности',
    learnMore: 'Подробнее',
  },
  de: {
    title: 'Cookie-Einstellungen',
    description: 'Wir verwenden Cookies, um Ihr Erlebnis zu verbessern, die Nutzung der Website zu analysieren und personalisierte Inhalte bereitzustellen. Bitte wählen Sie Ihre Präferenzen.',
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Alle ablehnen',
    manage: 'Einstellungen verwalten',
    save: 'Einstellungen speichern',
    necessary: 'Notwendige Cookies',
    necessaryDesc: 'Essentiell für die Funktionalität, Sicherheit und Sitzungsverwaltung der Website. Diese können nicht deaktiviert werden.',
    analytics: 'Analyse-Cookies',
    analyticsDesc: 'Helfen uns zu verstehen, wie Sie unsere Website nutzen, um Ihr Erlebnis zu verbessern.',
    marketing: 'Marketing-Cookies',
    marketingDesc: 'Ermöglichen personalisierte Werbung und Marketinginhalte, die auf Ihre Interessen zugeschnitten sind.',
    functional: 'Funktionale Cookies',
    functionalDesc: 'Merken sich Ihre Einstellungen, Spracheinstellungen und andere Anpassungen.',
    alwaysOn: 'Immer aktiviert',
    settings: 'Cookie-Einstellungen',
    privacyPolicy: 'Datenschutzrichtlinie',
    learnMore: 'Mehr erfahren',
  },
  es: {
    title: 'Preferencias de Cookies',
    description: 'Utilizamos cookies para mejorar su experiencia, analizar el uso del sitio y entregar contenido personalizado. Por favor, seleccione sus preferencias.',
    acceptAll: 'Aceptar todo',
    rejectAll: 'Rechazar todo',
    manage: 'Gestionar preferencias',
    save: 'Guardar preferencias',
    necessary: 'Cookies necesarias',
    necessaryDesc: 'Esencial para la funcionalidad, seguridad y gestión de sesiones del sitio. No se pueden desactivar.',
    analytics: 'Cookies de análisis',
    analyticsDesc: 'Nos ayudan a entender cómo utiliza nuestro sitio para mejorar su experiencia.',
    marketing: 'Cookies de marketing',
    marketingDesc: 'Habilitan publicidad personalizada y contenido de marketing adaptado a sus intereses.',
    functional: 'Cookies funcionales',
    functionalDesc: 'Recuerdan sus preferencias, configuración de idioma y otras personalizaciones.',
    alwaysOn: 'Siempre activado',
    settings: 'Configuración de cookies',
    privacyPolicy: 'Política de privacidad',
    learnMore: 'Más información',
  },
  tr: {
    title: 'Çerez Tercihleri',
    description: 'Deneyiminizi geliştirmek, site kullanımını analiz etmek ve kişiselleştirilmiş içerik sunmak için çerezleri kullanıyoruz. Lütfen tercihlerinizi seçin.',
    acceptAll: 'Tümünü Kabul Et',
    rejectAll: 'Tümünü Reddet',
    manage: 'Tercihleri Yönet',
    save: 'Tercihleri Kaydet',
    necessary: 'Gerekli Çerezler',
    necessaryDesc: 'Site işlevselliği, güvenlik ve oturum yönetimi için gereklidir. Bunlar devre dışı bırakılamaz.',
    analytics: 'Analitik Çerezleri',
    analyticsDesc: 'Sitemizi nasıl kullandığınızı anlamamız ve deneyiminizi geliştirmemiz yardımcı olur.',
    marketing: 'Pazarlama Çerezleri',
    marketingDesc: 'İlgilerinize göre uyarlanmış kişiselleştirilmiş reklam ve pazarlama içeriğini etkinleştirir.',
    functional: 'İşlevsel Çerezler',
    functionalDesc: 'Tercihlerinizi, dil ayarlarınızı ve diğer özelleştirmeleri hatırlar.',
    alwaysOn: 'Her Zaman Açık',
    settings: 'Çerez Ayarları',
    privacyPolicy: 'Gizlilik Politikası',
    learnMore: 'Daha Fazla Bilgi',
  },
};

const CookieToggle = ({ enabled, onChange, disabled = false, ariaLabel }: { enabled: boolean; onChange: (v: boolean) => void; disabled?: boolean; ariaLabel?: string }) => {
  return (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-[#FF6B35]' : 'bg-gray-300'
      } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
      role="switch"
      aria-checked={enabled}
      aria-label={ariaLabel}
    >
      <motion.span
        layout
        className={`inline-block h-5 w-5 transform rounded-full bg-white ${enabled ? 'translate-x-5' : 'translate-x-1'}`}
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      />
    </button>
  );
};

export default function CookieConsent() {
  const { language } = useLanguage() as { language: Language };
  const t = translations[language];

  const [showBanner, setShowBanner] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
    timestamp: 0,
  });

  // Check if consent exists and is valid (not expired)
  useEffect(() => {
    const checkConsent = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const consent = JSON.parse(stored) as CookiePreferences;
          const age = Date.now() - consent.timestamp;

          // If consent exists and is not expired, load it and don't show banner
          if (age < CONSENT_EXPIRY_MS) {
            setPreferences(consent);
            // Apply saved preferences (trigger analytics, marketing, etc.)
            applyConsent(consent);
            return;
          } else {
            // Consent expired, remove it
            localStorage.removeItem(STORAGE_KEY);
          }
        }
        // No valid consent found, show banner
        setShowBanner(true);
      } catch (e) {
        console.error('Cookie consent read error:', e);
        setShowBanner(true);
      }
    };

    // Add small delay to ensure DOM is ready and not interfere with initial render
    const timer = setTimeout(checkConsent, 100);
    return () => clearTimeout(timer);
  }, []);

  const applyConsent = (prefs: CookiePreferences) => {
    // Dispatch custom events that other parts of the app can listen to
    window.dispatchEvent(
      new CustomEvent('cookieConsentUpdated', {
        detail: prefs,
      })
    );

    // Load analytics scripts if analytics cookies are accepted
    if (prefs.analytics) {
      loadAnalyticsScripts();
    }

    // Load marketing pixels if marketing cookies are accepted
    if (prefs.marketing) {
      loadMarketingScripts();
    }
  };

  const loadAnalyticsScripts = () => {
    // Example: Google Analytics
    // Uncomment and add your actual GA tracking code
    /*
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
    */
  };

  const loadMarketingScripts = () => {
    // Example: Facebook Pixel, LinkedIn, etc.
    // Add your actual marketing pixel code here
  };

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      const toSave: CookiePreferences = {
        ...prefs,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      setPreferences(toSave);
      applyConsent(toSave);
      setShowBanner(false);
      setExpanded(false);
    } catch (e) {
      console.error('Cookie consent save error:', e);
    }
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: Date.now(),
    });
  };

  const handleRejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: Date.now(),
    });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const openSettings = () => {
    setShowBanner(true);
    setExpanded(true);
  };

  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setExpanded(false);
    }
  };

  return (
    <>
      {/* Floating Cookie Settings Link - Always visible in bottom right */}
      <AnimatePresence>
        {!showBanner && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={openSettings}
            className="fixed bottom-6 right-6 z-40 px-4 py-2 text-xs font-semibold text-white bg-[#FF6B35] rounded-full hover:bg-[#D4522A] transition-all hover:shadow-lg"
            title={t.settings as string}
            aria-label="Open cookie settings"
          >
            🍪 {t.settings}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Cookie Banner */}
      <AnimatePresence>
        {showBanner && (
          <>
            {/* Dark overlay - only show when expanded to not block interaction in compact mode */}
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpanded(false)}
                className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
                aria-hidden="true"
              />
            )}

            {/* Banner Container */}
            <motion.div
              layout
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed z-40 left-0 right-0 ${
                expanded ? 'inset-0 flex items-center justify-center px-4' : 'bottom-0'
              }`}
              role={expanded ? "dialog" : undefined}
              aria-label={expanded ? "Cookie consent" : undefined}
              aria-modal={expanded}
              onKeyDown={expanded ? handleDialogKeyDown : undefined}
            >
              <div
                className={`w-full max-w-2xl bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] text-white rounded-t-3xl shadow-2xl border border-[#FF6B35]/20 ${
                  expanded ? 'rounded-3xl max-h-[90vh] overflow-y-auto' : 'rounded-t-3xl'
                }`}
              >
                {/* Header with close button */}
                <div className="flex items-start justify-between p-6 border-b border-[#FF6B35]/10">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{t.title}</h2>
                    {!expanded && (
                      <p className="text-sm text-gray-300 mt-2 line-clamp-2">{t.description}</p>
                    )}
                  </div>
                  {expanded && (
                    <button
                      onClick={() => setExpanded(false)}
                      className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors ml-4"
                      aria-label="Close cookie settings"
                    >
                      <X className="w-5 h-5 text-gray-300" />
                    </button>
                  )}
                </div>

                {/* Content - only show when expanded */}
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 space-y-6"
                  >
                    {/* Full description */}
                    <p className="text-gray-300 text-sm leading-relaxed">{t.description}</p>

                    {/* Cookie Categories */}
                    <div className="space-y-4">
                      {/* Necessary Cookies */}
                      <div className="p-4 rounded-lg bg-white/5 border border-[#FF6B35]/20">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white flex items-center gap-2">
                              {t.necessary}
                              <span className="inline-block px-2 py-1 text-xs bg-[#FF6B35] rounded text-white">
                                {t.alwaysOn}
                              </span>
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">{t.necessaryDesc}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <CookieToggle
                              enabled={true}
                              onChange={() => {}}
                              disabled={true}
                              ariaLabel={t.necessary as string}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="p-4 rounded-lg bg-white/5 border border-gray-600/30 hover:border-[#FF6B35]/30 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{t.analytics}</h3>
                            <p className="text-xs text-gray-400 mt-1">{t.analyticsDesc}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <CookieToggle
                              enabled={preferences.analytics}
                              onChange={(v) =>
                                setPreferences({ ...preferences, analytics: v })
                              }
                              ariaLabel={t.analytics as string}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Marketing Cookies */}
                      <div className="p-4 rounded-lg bg-white/5 border border-gray-600/30 hover:border-[#FF6B35]/30 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{t.marketing}</h3>
                            <p className="text-xs text-gray-400 mt-1">{t.marketingDesc}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <CookieToggle
                              enabled={preferences.marketing}
                              onChange={(v) =>
                                setPreferences({ ...preferences, marketing: v })
                              }
                              ariaLabel={t.marketing as string}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Functional Cookies */}
                      <div className="p-4 rounded-lg bg-white/5 border border-gray-600/30 hover:border-[#FF6B35]/30 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{t.functional}</h3>
                            <p className="text-xs text-gray-400 mt-1">{t.functionalDesc}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <CookieToggle
                              enabled={preferences.functional}
                              onChange={(v) =>
                                setPreferences({ ...preferences, functional: v })
                              }
                              ariaLabel={t.functional as string}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-2">
                      <a
                        href="/cookies"
                        className="text-xs text-[#FF6B35] hover:text-[#FFB27D] transition-colors"
                      >
                        {t.privacyPolicy}
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* Buttons */}
                <div
                  className={`p-4 border-t border-[#FF6B35]/10 flex gap-3 ${
                    expanded ? 'flex-col' : 'flex-row'
                  }`}
                >
                  <button
                    onClick={handleRejectAll}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg border border-gray-600 text-gray-200 hover:bg-white/5 transition-colors ${
                      expanded ? '' : 'min-w-[120px]'
                    }`}
                  >
                    {expanded ? t.rejectAll : t.rejectAll}
                  </button>

                  {!expanded && (
                    <button
                      onClick={() => setExpanded(true)}
                      className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 transition-colors min-w-[120px]"
                    >
                      {t.manage}
                    </button>
                  )}

                  <button
                    onClick={expanded ? handleSavePreferences : handleAcceptAll}
                    className={`flex-1 px-4 py-2 text-sm font-semibold rounded-lg text-white transition-colors ${
                      expanded
                        ? 'bg-[#FF6B35] hover:bg-[#D4522A]'
                        : 'bg-[#FF6B35] hover:bg-[#D4522A]'
                    } min-w-[120px]`}
                  >
                    {expanded ? t.save : t.acceptAll}
                  </button>
                </div>

                {/* Expand/Collapse hint in compact mode */}
                {!expanded && (
                  <motion.button
                    onClick={() => setExpanded(true)}
                    className="w-full py-2 text-xs text-gray-400 hover:text-[#FF6B35] transition-colors flex items-center justify-center gap-1"
                  >
                    {t.manage}
                    <ChevronUp className="w-3 h-3" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
