import { useEffect, useState, useMemo } from 'react';
import { adminApi } from '../api';

interface ContentBlock {
  id: number; key: string; label: string;
  value_en: string; value_ru: string; value_de: string; value_es: string; value_tr: string;
}

type FieldDef = { key: string; label: string; type: 'text' | 'textarea' };
type SectionDef = { id: string; label: string; icon: string; fields: FieldDef[] };

const feat = (n: number): FieldDef[] => [
  { key: `feature${n}_title`, label: `Фича ${n}: Заголовок`, type: 'text' },
  { key: `feature${n}_subtitle`, label: `Фича ${n}: Подзаголовок`, type: 'text' },
  { key: `feature${n}_desc`, label: `Фича ${n}: Описание`, type: 'textarea' },
];

const member = (n: number, name: string): FieldDef[] => [
  { key: `member${n}_name`, label: `${name}: Имя`, type: 'text' },
  { key: `member${n}_position`, label: `${name}: Должность`, type: 'text' },
  { key: `member${n}_p1`, label: `${name}: Пункт 1`, type: 'textarea' },
  { key: `member${n}_p2`, label: `${name}: Пункт 2`, type: 'textarea' },
  { key: `member${n}_p3`, label: `${name}: Пункт 3`, type: 'textarea' },
  { key: `member${n}_summary`, label: `${name}: Роль в ChefNet`, type: 'textarea' },
];

const SECTIONS: SectionDef[] = [
  {
    id: 'hero', label: 'Hero', icon: '🎯',
    fields: [
      { key: 'hero_heading', label: 'Заголовок (строка 1)', type: 'text' },
      { key: 'hero_subtitle', label: 'Подзаголовок', type: 'text' },
      { key: 'hero_description', label: 'Описание', type: 'textarea' },
      { key: 'hero_benefit1', label: 'Преимущество 1', type: 'text' },
      { key: 'hero_benefit2', label: 'Преимущество 2', type: 'text' },
      { key: 'hero_benefit3', label: 'Преимущество 3', type: 'text' },
      { key: 'hero_cta', label: 'CTA текст', type: 'text' },
    ],
  },
  {
    id: 'features', label: 'Фичи', icon: '✨',
    fields: [
      { key: 'features_section_title', label: 'Заголовок секции', type: 'text' },
      { key: 'features_section_subtitle', label: 'Подзаголовок секции', type: 'text' },
      ...feat(1), ...feat(2), ...feat(3), ...feat(4), ...feat(5),
      ...feat(6), ...feat(7), ...feat(8), ...feat(9),
    ],
  },
  {
    id: 'team', label: 'Команда', icon: '👥',
    fields: [
      { key: 'team_section_title', label: 'Заголовок секции', type: 'text' },
      ...member(1, 'Алексей'),
      ...member(2, 'Дмитрий'),
      ...member(3, 'Владимир'),
      ...member(4, 'Юрий'),
    ],
  },
  {
    id: 'advantages', label: 'Преимущества', icon: '🏆',
    fields: [
      { key: 'adv_title', label: 'Заголовок секции', type: 'text' },
    ],
  },
  {
    id: 'opportunities', label: 'Возможности', icon: '🚀',
    fields: [
      { key: 'opp_title', label: 'Заголовок секции', type: 'text' },
    ],
  },
  {
    id: 'investments', label: 'Инвестиции', icon: '💰',
    fields: [
      { key: 'inv_title', label: 'Заголовок секции', type: 'text' },
      { key: 'inv_seed_back_title', label: 'Seed Round: Заголовок карточки', type: 'text' },
      { key: 'inv_seed_back_desc', label: 'Seed Round: Описание карточки', type: 'textarea' },
      { key: 'inv_private_back_title', label: 'Private Round: Заголовок карточки', type: 'text' },
      { key: 'inv_private_back_desc', label: 'Private Round: Описание карточки', type: 'textarea' },
      { key: 'inv_marketing_back_title', label: 'Marketing Round: Заголовок карточки', type: 'text' },
      { key: 'inv_marketing_back_desc', label: 'Marketing Round: Описание карточки', type: 'textarea' },
      { key: 'inv_public_back_title', label: 'Public Round: Заголовок карточки', type: 'text' },
      { key: 'inv_public_back_desc', label: 'Public Round: Описание карточки', type: 'textarea' },
    ],
  },
  {
    id: 'roadmap', label: 'Roadmap', icon: '🗺️',
    fields: [
      { key: 'roadmap_title', label: 'Заголовок секции', type: 'text' },
    ],
  },
  {
    id: 'partnership', label: 'Партнёрство', icon: '🤝',
    fields: [
      { key: 'partner_title', label: 'Заголовок секции', type: 'text' },
      { key: 'partner_desc', label: 'Описание', type: 'textarea' },
      { key: 'partner_stat1_value', label: 'Статистика 1: Значение', type: 'text' },
      { key: 'partner_stat1_label', label: 'Статистика 1: Подпись', type: 'text' },
      { key: 'partner_stat2_value', label: 'Статистика 2: Значение', type: 'text' },
      { key: 'partner_stat2_label', label: 'Статистика 2: Подпись', type: 'text' },
      { key: 'partner_stat3_value', label: 'Статистика 3: Значение', type: 'text' },
      { key: 'partner_stat3_label', label: 'Статистика 3: Подпись', type: 'text' },
    ],
  },
  {
    id: 'footer', label: 'Footer', icon: '🦶',
    fields: [
      { key: 'footer_tagline', label: 'Слоган (тэглайн)', type: 'textarea' },
      { key: 'footer_contacts_title', label: 'Заголовок "Контакты"', type: 'text' },
      { key: 'footer_email', label: 'Email', type: 'text' },
      { key: 'footer_phone', label: 'Телефон', type: 'text' },
      { key: 'footer_address', label: 'Адрес', type: 'textarea' },
      { key: 'footer_newsletter_title', label: 'Заголовок рассылки', type: 'text' },
      { key: 'footer_newsletter_desc', label: 'Описание рассылки', type: 'textarea' },
      { key: 'footer_copyright', label: 'Копирайт', type: 'text' },
    ],
  },
];

const ALL_SCHEMA_KEYS = new Set(SECTIONS.flatMap(s => s.fields.map(f => f.key)));

const LANGS: Array<{ field: keyof ContentBlock; flag: string; name: string }> = [
  { field: 'value_ru', flag: '🇷🇺', name: 'RU' },
  { field: 'value_en', flag: '🇬🇧', name: 'EN' },
  { field: 'value_de', flag: '🇩🇪', name: 'DE' },
  { field: 'value_es', flag: '🇪🇸', name: 'ES' },
  { field: 'value_tr', flag: '🇹🇷', name: 'TR' },
];

function emptyBlock(key: string, label: string): ContentBlock {
  return { id: 0, key, label, value_en: '', value_ru: '', value_de: '', value_es: '', value_tr: '' };
}

function FieldCard({
  fieldDef,
  dbBlock,
  onSave,
}: {
  fieldDef: FieldDef;
  dbBlock?: ContentBlock;
  onSave: (block: ContentBlock) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ContentBlock | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const current = dbBlock ?? emptyBlock(fieldDef.key, fieldDef.label);
  const preview = current.value_ru || current.value_en || '';
  const hasContent = !!(current.value_ru || current.value_en);

  const handleOpen = () => {
    setEditing({ ...current, label: fieldDef.label });
    setOpen(true);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await onSave(editing);
      setSaved(true);
      setOpen(false);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`bg-white/5 border rounded-2xl overflow-hidden transition-all ${saved ? 'border-green-500/40' : open ? 'border-[#D4522A]/50' : 'border-white/10'}`}>
      {!open ? (
        <div className="flex items-start gap-3 p-3.5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <code className="text-[#D4522A] text-xs font-mono bg-[#D4522A]/10 px-1.5 py-0.5 rounded shrink-0">{fieldDef.key}</code>
              {saved && <span className="text-green-400 text-xs">✓</span>}
            </div>
            <div className="text-white/60 text-xs mb-1">{fieldDef.label}</div>
            {hasContent ? (
              <div className="text-white/40 text-xs truncate">{preview.slice(0, 80)}{preview.length > 80 ? '…' : ''}</div>
            ) : (
              <div className="text-white/20 text-xs italic">Пусто — будет использован перевод по умолчанию</div>
            )}
          </div>
          <button
            onClick={handleOpen}
            className="shrink-0 bg-white/8 hover:bg-[#D4522A]/20 border border-white/10 hover:border-[#D4522A]/40 text-white/70 hover:text-white text-xs px-3 py-1.5 rounded-lg transition"
          >
            Изменить
          </button>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <code className="text-[#D4522A] text-sm font-mono bg-[#D4522A]/10 px-2 py-0.5 rounded">{fieldDef.key}</code>
            <span className="text-white/70 text-sm">{fieldDef.label}</span>
          </div>
          <div className="space-y-2.5">
            {LANGS.map(({ field, flag, name }) => (
              <div key={field} className="flex gap-2 items-start">
                <div className="flex items-center gap-1 w-14 pt-2 shrink-0">
                  <span className="text-base">{flag}</span>
                  <span className="text-white/50 text-xs">{name}</span>
                </div>
                {fieldDef.type === 'textarea' ? (
                  <textarea
                    value={String(editing?.[field] || '')}
                    onChange={e => setEditing(v => v ? { ...v, [field]: e.target.value } : v)}
                    rows={3}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-y focus:outline-none focus:border-[#D4522A] transition min-h-[60px]"
                    placeholder={`Текст на ${name}...`}
                  />
                ) : (
                  <input
                    value={String(editing?.[field] || '')}
                    onChange={e => setEditing(v => v ? { ...v, [field]: e.target.value } : v)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
                    placeholder={`Текст на ${name}...`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#D4522A] hover:bg-[#c04520] disabled:opacity-50 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
            >
              {saving ? 'Сохраняю…' : 'Сохранить'}
            </button>
            <button
              onClick={() => { setOpen(false); setEditing(null); }}
              className="bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-xl text-sm transition"
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContentSection() {
  const [dbItems, setDbItems] = useState<Record<string, ContentBlock>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const [showCustomNew, setShowCustomNew] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newLabel, setNewLabel] = useState('');

  const load = () => {
    setLoading(true);
    adminApi.content.list()
      .then((rows: ContentBlock[]) => {
        const map: Record<string, ContentBlock> = {};
        rows.forEach(r => { map[r.key] = r; });
        setDbItems(map);
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSave = async (block: ContentBlock) => {
    await adminApi.content.save(block.key, block);
    setDbItems(prev => ({ ...prev, [block.key]: block }));
  };

  const customKeys = useMemo(() =>
    Object.keys(dbItems).filter(k => !ALL_SCHEMA_KEYS.has(k)),
    [dbItems]
  );

  const createCustom = async () => {
    if (!newKey.trim()) return;
    const block = emptyBlock(newKey.trim(), newLabel.trim() || newKey.trim());
    await adminApi.content.save(block.key, block);
    setDbItems(prev => ({ ...prev, [block.key]: block }));
    setShowCustomNew(false);
    setNewKey('');
    setNewLabel('');
  };

  const activeSection = SECTIONS.find(s => s.id === activeTab);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Контент сайта</h2>
        <p className="text-white/40 text-sm">Редактируйте тексты всех секций лендинга. Пустые поля используют переводы по умолчанию.</p>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className={`shrink-0 px-3.5 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
              activeTab === s.id
                ? 'bg-[#D4522A] text-white'
                : 'bg-white/8 hover:bg-white/15 text-white/60 hover:text-white border border-white/10'
            }`}
          >
            <span className="mr-1.5">{s.icon}</span>{s.label}
          </button>
        ))}
        <button
          onClick={() => setActiveTab('custom')}
          className={`shrink-0 px-3.5 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
            activeTab === 'custom'
              ? 'bg-[#D4522A] text-white'
              : 'bg-white/8 hover:bg-white/15 text-white/60 hover:text-white border border-white/10'
          }`}
        >
          ⚙️ Прочее {customKeys.length > 0 && <span className="ml-1 bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">{customKeys.length}</span>}
        </button>
      </div>

      {/* Section content */}
      {activeTab !== 'custom' && activeSection && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{activeSection.icon}</span>
            <div>
              <h3 className="text-white font-semibold text-lg">{activeSection.label}</h3>
              <p className="text-white/40 text-xs">{activeSection.fields.length} полей</p>
            </div>
          </div>
          <div className="space-y-2">
            {activeSection.fields.map(field => (
              <FieldCard
                key={field.key}
                fieldDef={field}
                dbBlock={dbItems[field.key]}
                onSave={handleSave}
              />
            ))}
          </div>
        </div>
      )}

      {/* Custom section */}
      {activeTab === 'custom' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-lg">Произвольные блоки</h3>
              <p className="text-white/40 text-xs">Кастомные ключи не входящие в стандартные секции</p>
            </div>
            <button
              onClick={() => setShowCustomNew(true)}
              className="bg-[#D4522A] hover:bg-[#c04520] text-white px-4 py-2 rounded-xl text-sm font-medium transition"
            >
              + Новый блок
            </button>
          </div>

          {showCustomNew && (
            <div className="bg-white/5 border border-[#D4522A]/30 rounded-2xl p-4 mb-4">
              <h4 className="text-white font-medium mb-3 text-sm">Новый произвольный блок</h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Ключ (slug)</label>
                  <input
                    value={newKey}
                    onChange={e => setNewKey(e.target.value.replace(/\s/g, '_').toLowerCase())}
                    placeholder="my_custom_key"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Название</label>
                  <input
                    value={newLabel}
                    onChange={e => setNewLabel(e.target.value)}
                    placeholder="Название блока"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={createCustom} className="bg-[#D4522A] text-white px-4 py-2 rounded-xl text-sm transition">Создать</button>
                <button onClick={() => setShowCustomNew(false)} className="bg-white/10 text-white px-4 py-2 rounded-xl text-sm transition">Отмена</button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {customKeys.length === 0 && !showCustomNew && (
              <div className="text-center text-white/30 py-12 text-sm">
                Произвольных блоков нет.<br />
                <span className="text-white/20">Нажмите «+ Новый блок» чтобы добавить кастомный контент.</span>
              </div>
            )}
            {customKeys.map(key => {
              const block = dbItems[key];
              return (
                <FieldCard
                  key={key}
                  fieldDef={{ key, label: block?.label || key, type: 'textarea' }}
                  dbBlock={block}
                  onSave={handleSave}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
