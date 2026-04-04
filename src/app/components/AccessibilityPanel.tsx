import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Eye,
  X,
  Type,
  Contrast,
  MousePointer,
  Link,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'extraLarge';
  highContrast: boolean;
  noAnimations: boolean;
  underlineLinks: boolean;
  largeCursor: boolean;
}

const translations = {
  en: {
    title: 'Accessibility',
    fontSize: 'Font Size',
    normal: 'Normal',
    large: 'Large',
    extraLarge: 'Extra Large',
    highContrast: 'High Contrast',
    noAnimations: 'Disable Animations',
    underlineLinks: 'Underline Links',
    largeCursor: 'Large Cursor',
    reset: 'Reset All',
    buttonLabel: 'Accessibility settings',
  },
  ru: {
    title: 'Доступность',
    fontSize: 'Размер шрифта',
    normal: 'Обычный',
    large: 'Крупный',
    extraLarge: 'Очень крупный',
    highContrast: 'Высокий контраст',
    noAnimations: 'Отключить анимации',
    underlineLinks: 'Подчеркнуть ссылки',
    largeCursor: 'Большой курсор',
    reset: 'Сбросить всё',
    buttonLabel: 'Настройки доступности',
  },
  de: {
    title: 'Barrierefreiheit',
    fontSize: 'Schriftgröße',
    normal: 'Normal',
    large: 'Groß',
    extraLarge: 'Sehr groß',
    highContrast: 'Hoher Kontrast',
    noAnimations: 'Animationen deaktivieren',
    underlineLinks: 'Links unterstreichen',
    largeCursor: 'Großer Cursor',
    reset: 'Alles zurücksetzen',
    buttonLabel: 'Barrierefreiheit-Einstellungen',
  },
  es: {
    title: 'Accesibilidad',
    fontSize: 'Tamaño de fuente',
    normal: 'Normal',
    large: 'Grande',
    extraLarge: 'Extra grande',
    highContrast: 'Alto contraste',
    noAnimations: 'Desactivar animaciones',
    underlineLinks: 'Subrayar enlaces',
    largeCursor: 'Cursor grande',
    reset: 'Restablecer todo',
    buttonLabel: 'Configuración de accesibilidad',
  },
  tr: {
    title: 'Erişilebilirlik',
    fontSize: 'Yazı Boyutu',
    normal: 'Normal',
    large: 'Büyük',
    extraLarge: 'Çok Büyük',
    highContrast: 'Yüksek Kontrast',
    noAnimations: 'Animasyonları Devre Dışı Bırak',
    underlineLinks: 'Bağlantıları Altını Çiz',
    largeCursor: 'Büyük İmleç',
    reset: 'Hepsini Sıfırla',
    buttonLabel: 'Erişilebilirlik ayarları',
  },
};

const defaultSettings: AccessibilitySettings = {
  fontSize: 'normal',
  highContrast: false,
  noAnimations: false,
  underlineLinks: false,
  largeCursor: false,
};

const fontSizeValues = {
  normal: '100%',
  large: '125%',
  extraLarge: '150%',
};

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 py-2 cursor-pointer group">
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? 'bg-[#FF6B35]' : 'bg-gray-600'
        }`}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <motion.div
          animate={{ x: checked ? 20 : 4 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"
        />
      </button>
      <span className="text-sm text-gray-300 group-hover:text-gray-100">
        {label}
      </span>
    </label>
  );
}

function FontSizeControl({
  value,
  onChange,
  translations: t,
}: {
  value: 'normal' | 'large' | 'extraLarge';
  onChange: (value: 'normal' | 'large' | 'extraLarge') => void;
  translations: typeof translations.en;
}) {
  const options: Array<{
    value: 'normal' | 'large' | 'extraLarge';
    label: string;
  }> = [
    { value: 'normal', label: t.normal },
    { value: 'large', label: t.large },
    { value: 'extraLarge', label: t.extraLarge },
  ];

  return (
    <div className="py-3">
      <label className="flex items-center gap-2 mb-2">
        <Type size={16} className="text-[#FF6B35]" />
        <span className="text-sm font-medium text-gray-100">{t.fontSize}</span>
      </label>
      <div className="flex gap-2 ml-6">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              value === option.value
                ? 'bg-[#FF6B35] text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            aria-pressed={value === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AccessibilityPanel() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];

  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(
    defaultSettings
  );
  const [isMounted, setIsMounted] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem('chefnet-accessibility');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings(parsed);
        applySettings(parsed);
      }
    } catch (error) {
      console.error('Failed to load accessibility settings:', error);
    }
  }, []);

  // Apply settings to DOM
  const applySettings = (newSettings: AccessibilitySettings) => {
    const html = document.documentElement;

    // Font size
    html.style.fontSize = fontSizeValues[newSettings.fontSize];

    // High contrast
    if (newSettings.highContrast) {
      html.classList.add('a11y-high-contrast');
    } else {
      html.classList.remove('a11y-high-contrast');
    }

    // No animations
    if (newSettings.noAnimations) {
      html.classList.add('a11y-no-animations');
    } else {
      html.classList.remove('a11y-no-animations');
    }

    // Underline links
    if (newSettings.underlineLinks) {
      html.classList.add('a11y-underline-links');
    } else {
      html.classList.remove('a11y-underline-links');
    }

    // Large cursor
    if (newSettings.largeCursor) {
      html.classList.add('a11y-large-cursor');
    } else {
      html.classList.remove('a11y-large-cursor');
    }
  };

  // Update settings and persist to localStorage
  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);
    try {
      localStorage.setItem('chefnet-accessibility', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Failed to save accessibility settings:', error);
    }
  };

  // Reset all settings
  const resetSettings = () => {
    setSettings(defaultSettings);
    applySettings(defaultSettings);
    try {
      localStorage.removeItem('chefnet-accessibility');
    } catch (error) {
      console.error('Failed to reset accessibility settings:', error);
    }
  };

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <>
      {/* Floating button - bottom left */}
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 w-12 h-12 rounded-full bg-[#FF6B35] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all z-40 flex items-center justify-center"
        aria-label={t.buttonLabel}
        aria-expanded={isOpen}
      >
        <Eye size={24} />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-6 w-80 max-w-xs bg-[#2C1810] border border-gray-700 rounded-lg shadow-2xl p-5 z-50"
            role="dialog"
            aria-label={t.title}
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#FF6B35] flex items-center gap-2">
                <Eye size={20} />
                {t.title}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-700 mb-4" />

            {/* Controls */}
            <div className="space-y-1">
              {/* Font Size */}
              <FontSizeControl
                value={settings.fontSize}
                onChange={(value) => updateSetting('fontSize', value)}
                translations={t}
              />

              {/* High Contrast Toggle */}
              <div className="flex items-center gap-2 py-3 border-t border-gray-700">
                <Contrast size={16} className="text-[#FF6B35]" />
                <div className="flex-1">
                  <ToggleSwitch
                    checked={settings.highContrast}
                    onChange={(value) => updateSetting('highContrast', value)}
                    label={t.highContrast}
                  />
                </div>
              </div>

              {/* Disable Animations Toggle */}
              <div className="flex items-center gap-2 py-3 border-t border-gray-700">
                <span className="text-[#FF6B35] text-base leading-none" aria-hidden="true">⚡</span>
                <div className="flex-1">
                  <ToggleSwitch
                    checked={settings.noAnimations}
                    onChange={(value) => updateSetting('noAnimations', value)}
                    label={t.noAnimations}
                  />
                </div>
              </div>

              {/* Underline Links Toggle */}
              <div className="flex items-center gap-2 py-3 border-t border-gray-700">
                <Link size={16} className="text-[#FF6B35]" />
                <div className="flex-1">
                  <ToggleSwitch
                    checked={settings.underlineLinks}
                    onChange={(value) => updateSetting('underlineLinks', value)}
                    label={t.underlineLinks}
                  />
                </div>
              </div>

              {/* Large Cursor Toggle */}
              <div className="flex items-center gap-2 py-3 border-t border-gray-700">
                <MousePointer size={16} className="text-[#FF6B35]" />
                <div className="flex-1">
                  <ToggleSwitch
                    checked={settings.largeCursor}
                    onChange={(value) => updateSetting('largeCursor', value)}
                    label={t.largeCursor}
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-700 my-4" />

            {/* Reset Button */}
            <button
              onClick={resetSettings}
              className="w-full py-2 px-3 text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors"
            >
              {t.reset}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
  }
