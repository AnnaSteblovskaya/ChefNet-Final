import { useEffect, useState, useCallback } from 'react';
import { adminApi } from '../api';

const LANGS = [
  { code: 'ru', label: 'RU 🇷🇺' },
  { code: 'en', label: 'EN 🇬🇧' },
  { code: 'de', label: 'DE 🇩🇪' },
  { code: 'es', label: 'ES 🇪🇸' },
  { code: 'tr', label: 'TR 🇹🇷' },
] as const;
type Lang = 'ru' | 'en' | 'de' | 'es' | 'tr';

interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image';
  multilingual: boolean;
}

interface SectionDef {
  id: string;
  icon: string;
  label: string;
  fields: FieldDef[];
}

const SECTIONS: SectionDef[] = [
  {
    id: 'hero',
    icon: '🌟',
    label: 'Главная (Hero)',
    fields: [
      { key: 'hero_heading', label: 'Заголовок', type: 'textarea', multilingual: true },
      { key: 'hero_subtitle', label: 'Подзаголовок', type: 'text', multilingual: true },
      { key: 'hero_description', label: 'Описание', type: 'textarea', multilingual: true },
      { key: 'hero_benefit1', label: 'Преимущество 1', type: 'text', multilingual: true },
      { key: 'hero_benefit2', label: 'Преимущество 2', type: 'text', multilingual: true },
      { key: 'hero_benefit3', label: 'Преимущество 3', type: 'text', multilingual: true },
      { key: 'hero_cta', label: 'Призыв к действию', type: 'text', multilingual: true },
      { key: 'hero_bg_image', label: 'Фоновое изображение (URL)', type: 'image', multilingual: false },
    ],
  },
  {
    id: 'advantages',
    icon: '⭐',
    label: 'Преимущества',
    fields: [
      { key: 'adv_title', label: 'Заголовок раздела', type: 'text', multilingual: true },
      { key: 'adv_subtitle', label: 'Подзаголовок', type: 'text', multilingual: true },
      { key: 'adv_card1_title', label: 'Карточка 1 — заголовок', type: 'text', multilingual: true },
      { key: 'adv_card1_desc', label: 'Карточка 1 — описание', type: 'textarea', multilingual: true },
      { key: 'adv_card2_title', label: 'Карточка 2 — заголовок', type: 'text', multilingual: true },
      { key: 'adv_card2_desc', label: 'Карточка 2 — описание', type: 'textarea', multilingual: true },
      { key: 'adv_card3_title', label: 'Карточка 3 — заголовок', type: 'text', multilingual: true },
      { key: 'adv_card3_desc', label: 'Карточка 3 — описание', type: 'textarea', multilingual: true },
    ],
  },
  {
    id: 'investments',
    icon: '💰',
    label: 'Инвестиции',
    fields: [
      { key: 'inv_title', label: 'Заголовок раздела', type: 'text', multilingual: true },
      { key: 'inv_description', label: 'Описание', type: 'textarea', multilingual: true },
      { key: 'inv_button', label: 'Текст кнопки', type: 'text', multilingual: true },
      { key: 'inv_seed_back_title', label: 'Seed — задняя сторона, заголовок', type: 'text', multilingual: true },
      { key: 'inv_seed_back_desc', label: 'Seed — задняя сторона, описание', type: 'textarea', multilingual: true },
      { key: 'inv_private_back_title', label: 'Private — задняя сторона, заголовок', type: 'text', multilingual: true },
      { key: 'inv_private_back_desc', label: 'Private — задняя сторона, описание', type: 'textarea', multilingual: true },
      { key: 'inv_marketing_back_title', label: 'Marketing — задняя сторона, заголовок', type: 'text', multilingual: true },
      { key: 'inv_marketing_back_desc', label: 'Marketing — задняя сторона, описание', type: 'textarea', multilingual: true },
      { key: 'inv_public_back_title', label: 'Public/IPO — задняя сторона, заголовок', type: 'text', multilingual: true },
      { key: 'inv_public_back_desc', label: 'Public/IPO — задняя сторона, описание', type: 'textarea', multilingual: true },
    ],
  },
  {
    id: 'opportunities',
    icon: '🚀',
    label: 'Возможности',
    fields: [
      { key: 'opp_title', label: 'Заголовок раздела', type: 'text', multilingual: true },
      { key: 'opp_item1_title', label: 'Пункт 1 — заголовок', type: 'text', multilingual: true },
      { key: 'opp_item1_desc', label: 'Пункт 1 — описание', type: 'textarea', multilingual: true },
      { key: 'opp_item2_title', label: 'Пункт 2 — заголовок', type: 'text', multilingual: true },
      { key: 'opp_item2_desc', label: 'Пункт 2 — описание', type: 'textarea', multilingual: true },
      { key: 'opp_item3_title', label: 'Пункт 3 — заголовок', type: 'text', multilingual: true },
      { key: 'opp_item3_desc', label: 'Пункт 3 — описание', type: 'textarea', multilingual: true },
    ],
  },
  {
    id: 'partnership',
    icon: '🤝',
    label: 'Партнёрство',
    fields: [
      { key: 'partner_title', label: 'Заголовок раздела', type: 'text', multilingual: true },
      { key: 'partner_desc', label: 'Описание', type: 'textarea', multilingual: true },
      { key: 'partner_stat1_label', label: 'Статистика 1 — подпись', type: 'text', multilingual: true },
      { key: 'partner_stat1_value', label: 'Статистика 1 — значение', type: 'text', multilingual: false },
      { key: 'partner_stat2_label', label: 'Статистика 2 — подпись', type: 'text', multilingual: true },
      { key: 'partner_stat2_value', label: 'Статистика 2 — значение', type: 'text', multilingual: false },
      { key: 'partner_stat3_label', label: 'Статистика 3 — подпись', type: 'text', multilingual: true },
      { key: 'partner_stat3_value', label: 'Статистика 3 — значение', type: 'text', multilingual: false },
    ],
  },
  {
    id: 'roadmap',
    icon: '🛣️',
    label: 'Дорожная карта',
    fields: [
      { key: 'roadmap_title', label: 'Заголовок раздела', type: 'text', multilingual: true },
      { key: 'roadmap_stage1_title', label: 'Этап 1 — заголовок', type: 'text', multilingual: true },
      { key: 'roadmap_stage1_desc', label: 'Этап 1 — описание', type: 'textarea', multilingual: true },
      { key: 'roadmap_stage2_title', label: 'Этап 2 — заголовок', type: 'text', multilingual: true },
      { key: 'roadmap_stage2_desc', label: 'Этап 2 — описание', type: 'textarea', multilingual: true },
      { key: 'roadmap_stage3_title', label: 'Этап 3 — заголовок', type: 'text', multilingual: true },
      { key: 'roadmap_stage3_desc', label: 'Этап 3 — описание', type: 'textarea', multilingual: true },
    ],
  },
  {
    id: 'cta',
    icon: '📢',
    label: 'CTA Баннер',
    fields: [
      { key: 'cta_title', label: 'Заголовок', type: 'text', multilingual: true },
      { key: 'cta_highlight', label: 'Выделенный текст', type: 'text', multilingual: true },
      { key: 'cta_button', label: 'Текст кнопки', type: 'text', multilingual: true },
    ],
  },
];

type ContentMap = Record<string, Record<string, string>>;

function SectionBlock({
  section,
  values,
  onSave,
}: {
  section: SectionDef;
  values: ContentMap;
  onSave: (sectionId: string, data: ContentMap) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('ru');
  const [form, setForm] = useState<ContentMap>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const init: ContentMap = {};
    section.fields.forEach(f => {
      init[f.key] = values[f.key] || {};
    });
    setForm(init);
  }, [values, section.fields]);

  const setVal = (key: string, l: string, v: string) => {
    setForm(p => ({ ...p, [key]: { ...p[key], [l]: v } }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(section.id, form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const hasContent = section.fields.some(f => {
    const v = values[f.key];
    return v && Object.values(v).some(x => x && x.trim());
  });

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{section.icon}</span>
          <span className="text-white font-medium">{section.label}</span>
          {hasContent && (
            <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">заполнено</span>
          )}
        </div>
        <span className={`text-white/40 text-lg transition-transform ${open ? 'rotate-180' : ''}`}>⌄</span>
      </button>

      {open && (
        <div className="border-t border-white/10 p-5 flex flex-col gap-5">
          <div className="flex gap-1 flex-wrap">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${lang === l.code ? 'bg-[#D4522A] text-white' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {section.fields.map(field => (
              <div key={field.key}>
                <label className="text-white/50 text-xs mb-1.5 block">
                  {field.label}
                  {!field.multilingual && <span className="ml-1 text-white/30">(общее для всех языков)</span>}
                  {field.type === 'image' && <span className="ml-1 text-[#D4522A]">📷 URL изображения</span>}
                </label>

                {field.type === 'image' ? (
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={form[field.key]?.['en'] || ''}
                      onChange={e => setVal(field.key, 'en', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 bg-[#0d0d1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
                    />
                    {form[field.key]?.['en'] && (
                      <img src={form[field.key]['en']} alt="" className="w-12 h-12 object-cover rounded-lg border border-white/10" />
                    )}
                  </div>
                ) : field.multilingual ? (
                  field.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={form[field.key]?.[lang] || ''}
                      onChange={e => setVal(field.key, lang, e.target.value)}
                      className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A] transition"
                    />
                  ) : (
                    <input
                      type="text"
                      value={form[field.key]?.[lang] || ''}
                      onChange={e => setVal(field.key, lang, e.target.value)}
                      className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
                    />
                  )
                ) : (
                  field.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={form[field.key]?.['en'] || ''}
                      onChange={e => setVal(field.key, 'en', e.target.value)}
                      className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A] transition"
                    />
                  ) : (
                    <input
                      type="text"
                      value={form[field.key]?.['en'] || ''}
                      onChange={e => setVal(field.key, 'en', e.target.value)}
                      className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
                    />
                  )
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-[#D4522A] hover:bg-[#c04520] text-white text-sm font-semibold rounded-xl transition disabled:opacity-50"
            >
              {saving ? 'Сохранение...' : 'Сохранить раздел'}
            </button>
            {saved && <span className="text-green-400 text-sm">✓ Сохранено! Изменения отобразятся на сайте.</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OverviewSection() {
  const [contentMap, setContentMap] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    adminApi.content.list()
      .then((rows: any[]) => {
        const map: ContentMap = {};
        rows.forEach(r => {
          map[r.key] = {
            en: r.value_en || '',
            ru: r.value_ru || '',
            de: r.value_de || '',
            es: r.value_es || '',
            tr: r.value_tr || '',
          };
        });
        setContentMap(map);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (sectionId: string, data: ContentMap) => {
    const sectionDef = SECTIONS.find(s => s.id === sectionId);
    if (!sectionDef) return;
    await Promise.all(
      sectionDef.fields.map(field => {
        const vals = data[field.key] || {};
        return adminApi.content.save(field.key, {
          label: field.label,
          section: sectionId,
          type: field.type === 'image' ? 'image' : 'text',
          value_en: field.multilingual ? (vals['en'] || '') : (vals['en'] || ''),
          value_ru: field.multilingual ? (vals['ru'] || '') : (vals['en'] || ''),
          value_de: field.multilingual ? (vals['de'] || '') : (vals['en'] || ''),
          value_es: field.multilingual ? (vals['es'] || '') : (vals['en'] || ''),
          value_tr: field.multilingual ? (vals['tr'] || '') : (vals['en'] || ''),
        });
      })
    );
    setContentMap(prev => {
      const next = { ...prev };
      Object.entries(data).forEach(([k, v]) => { next[k] = v; });
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-white">Обзор — Редактор лендинга</h2>
        <p className="text-white/40 text-sm mt-1">
          Управляйте текстами и изображениями каждого раздела сайта. Раскройте блок, отредактируйте содержимое и нажмите «Сохранить раздел».
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="bg-[#D4522A]/10 border border-[#D4522A]/30 rounded-xl px-4 py-3 text-sm text-[#D4522A]/90 flex items-start gap-2">
            <span className="shrink-0 mt-0.5">ℹ️</span>
            <span>
              После сохранения изменения автоматически применяются на сайте — пользователи увидят их при следующем открытии страницы (без перезагрузки сервера).
              Если поле оставить пустым — на сайте отобразится текст по умолчанию.
            </span>
          </div>

          {SECTIONS.map(section => (
            <SectionBlock
              key={section.id}
              section={section}
              values={contentMap}
              onSave={handleSave}
            />
          ))}
        </>
      )}
    </div>
  );
}
