import { useEffect, useState } from 'react';
import { adminApi } from '../api';

const LANGS = ['en', 'de', 'ru', 'es', 'tr'] as const;
type Lang = typeof LANGS[number];
const LANG_LABELS: Record<Lang, string> = { en: 'English', de: 'Deutsch', ru: 'Русский', es: 'Español', tr: 'Türkçe' };

interface Round {
  id: string; name: string; label: string;
  target_sum: number; market_cap: number; share_price: number; min_order: number;
  active: boolean; sort_order: number; sold_shares?: number;
  description_en: string; description_ru: string; description_de: string; description_es: string; description_tr: string;
  tasks_en: string; tasks_ru: string; tasks_de: string; tasks_es: string; tasks_tr: string;
}

const emptyRound: Round = {
  id: '', name: '', label: '', target_sum: 0, market_cap: 0, share_price: 0, min_order: 0,
  active: true, sort_order: 0, sold_shares: 0,
  description_en: '', description_ru: '', description_de: '', description_es: '', description_tr: '',
  tasks_en: '', tasks_ru: '', tasks_de: '', tasks_es: '', tasks_tr: '',
};

type View = { type: 'list' } | { type: 'edit'; round: Round; isNew: boolean };

function LangTabs({ active, onChange }: { active: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex gap-0 border-b border-white/10">
      {LANGS.map(l => (
        <button key={l} onClick={() => onChange(l)}
          className={`px-4 py-2 text-sm transition border-b-2 -mb-px ${active === l ? 'border-[#D4522A] text-white font-medium' : 'border-transparent text-white/40 hover:text-white/70'}`}
        >{LANG_LABELS[l]}</button>
      ))}
    </div>
  );
}

function PortfolioCardPreview({ form }: { form: Round }) {
  const label = form.label || form.name || 'Название';
  const amount = form.target_sum > 0 ? '$' + Number(form.target_sum).toLocaleString('en-US') : '$0';
  const price = form.share_price > 0 ? `$${form.share_price}` : '$0';
  const minOrder = Number(form.min_order || 0).toLocaleString();
  const totalShares = form.share_price > 0 ? Math.round(form.target_sum / form.share_price) : 0;
  const soldShares = Number(form.sold_shares || 0);
  const progress = totalShares > 0 ? Math.min(100, (soldShares / totalShares) * 100) : 0;
  const totalMln = (totalShares / 1_000_000).toFixed(1);
  const soldMln = (soldShares / 1_000_000).toFixed(1);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <p className="text-white/40 text-xs mb-3 font-medium uppercase tracking-wider">Превью карточки на сайте</p>
      <div className={`relative p-4 rounded-3xl border-2 max-w-[220px] ${form.active ? 'border-[#FF6B35] bg-gradient-to-br from-white/10 to-[#FF6B35]/10' : 'border-white/20 bg-white/5'}`}>
        <div className="text-center mb-3">
          <div className="text-xs font-semibold text-white/60 mb-0.5">{label}:</div>
          <div className="text-xl font-bold text-white">{amount}</div>
        </div>
        <div className="text-center mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${form.active ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
            {form.active ? 'Активный' : 'Скоро'}
          </span>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-white/50">Цена за долю</span>
            <span className="font-bold text-[#FF6B35]">{price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Минимум</span>
            <span className="font-semibold text-white">{minOrder} долей</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-[10px] text-white/40 mt-1 text-center">{soldMln} / {totalMln} млн долей</div>
        </div>
        <div className="mt-3">
          <div className={`w-full py-2 rounded-xl text-xs font-bold text-center ${form.active ? 'bg-gradient-to-r from-[#FF7A59] to-[#EB5632] text-white' : 'bg-blue-500 text-white'}`}>
            {form.active ? 'Покупка долей →' : 'Уведомить меня'}
          </div>
        </div>
      </div>
    </div>
  );
}

function NumInput({ label, hint, value, onChange, step, placeholder }: {
  label: string; hint?: string; value: number; onChange: (v: number) => void; step?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-white/50 text-xs mb-0.5 block">{label}</label>
      {hint && <p className="text-white/25 text-[10px] mb-1.5">{hint}</p>}
      <input
        type="number"
        step={step}
        value={value || ''}
        onChange={e => onChange(+e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
      />
    </div>
  );
}

function EditView({ initial, isNew, onSave, onCancel, onDelete, saving }: {
  initial: Round; isNew: boolean;
  onSave: (r: Round) => void; onCancel: () => void; onDelete: (id: string) => void; saving: boolean;
}) {
  const [form, setForm] = useState<Round>({ ...initial });
  const [descLang, setDescLang] = useState<Lang>('en');
  const [tasksLang, setTasksLang] = useState<Lang>('en');

  const set = (field: keyof Round, val: any) => setForm(p => ({ ...p, [field]: val }));

  const computedTotalShares = form.share_price > 0 ? Math.round(form.target_sum / form.share_price) : 0;
  const minPurchaseAmount = form.share_price > 0 ? (form.min_order * form.share_price).toFixed(2) : '0';

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-2">
            <span>Раунды</span><span>›</span>
            <span>{isNew ? 'Новый раунд' : (form.name || form.id)}</span><span>›</span>
            <span className="text-white/70">{isNew ? 'Создать' : 'Изменить'}</span>
          </nav>
          <h2 className="text-2xl font-bold text-white">{isNew ? 'Новый раунд' : 'Изменить раунд'}</h2>
        </div>
        {!isNew && (
          <button onClick={() => { if (confirm('Удалить раунд?')) onDelete(form.id); }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition">
            Удалить
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <div className="flex flex-col gap-5 flex-1 min-w-0">
          {/* Identity */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="text-white/70 text-sm font-semibold">Идентификация</h3>
            <div>
              <label className="text-white/50 text-xs mb-0.5 block">Название (для администраторов) <span className="text-[#D4522A]">*</span></label>
              <p className="text-white/25 text-[10px] mb-1.5">Внутреннее название, видно только в панели</p>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Seed Round"
                className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4522A] transition" />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-0.5 block">Ярлык карточки <span className="text-[#D4522A]">*</span></label>
              <p className="text-white/25 text-[10px] mb-1.5">Отображается на карточке в «Мой портфель» (напр.: Seed, Private, Marketing, Public/IPO)</p>
              <input value={form.label} onChange={e => set('label', e.target.value)} placeholder="Seed"
                className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4522A] transition" />
            </div>
            {isNew && (
              <div>
                <label className="text-white/50 text-xs mb-0.5 block">ID раунда (slug) <span className="text-[#D4522A]">*</span></label>
                <p className="text-white/25 text-[10px] mb-1.5">Уникальный идентификатор, только латинские буквы/цифры (напр.: seed, private, marketing, ipo)</p>
                <input value={form.id} onChange={e => set('id', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} placeholder="seed"
                  className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4522A] transition" />
              </div>
            )}
            {!isNew && (
              <div>
                <label className="text-white/50 text-xs mb-1 block">ID раунда</label>
                <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-white/40 text-sm font-mono">{form.id}</div>
              </div>
            )}
          </div>

          {/* Financial */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="text-white/70 text-sm font-semibold">Финансовые параметры</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumInput
                label="Целевая сумма раунда ($) *"
                hint="Показывается как основная сумма на карточке (напр. $150,000)"
                value={form.target_sum}
                onChange={v => set('target_sum', v)}
                placeholder="150000"
              />
              <NumInput
                label="Цена одной доли ($) *"
                hint="Цена за каждую долю (напр. $0.075)"
                value={form.share_price}
                onChange={v => set('share_price', v)}
                step="0.001"
                placeholder="0.075"
              />
              <NumInput
                label="Мин. количество долей для покупки *"
                hint="Минимум долей которые нужно купить за раз (напр. 2000)"
                value={form.min_order}
                onChange={v => set('min_order', v)}
                placeholder="2000"
              />
              <NumInput
                label="Рыночная капитализация ($)"
                hint="Оценочная стоимость компании на этом раунде"
                value={form.market_cap}
                onChange={v => set('market_cap', v)}
                placeholder="3000000"
              />
            </div>
            {/* Computed info */}
            {computedTotalShares > 0 && (
              <div className="bg-white/5 rounded-xl p-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-white/40 text-xs">Всего долей в раунде</p>
                  <p className="text-white font-bold text-sm mt-0.5">{computedTotalShares.toLocaleString()}</p>
                  <p className="text-white/25 text-[10px]">= target_sum ÷ share_price</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Мин. сумма покупки</p>
                  <p className="text-white font-bold text-sm mt-0.5">${minPurchaseAmount}</p>
                  <p className="text-white/25 text-[10px]">= min_order × share_price</p>
                </div>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="text-white/70 text-sm font-semibold">Статус и порядок</h3>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => set('active', !form.active)}
                className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${form.active ? 'bg-[#D4522A]' : 'bg-white/20'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.active ? 'left-6' : 'left-1'}`} />
              </button>
              <div>
                <span className="text-white text-sm font-medium">{form.active ? '✓ Активный' : '⌛ Скоро'}</span>
                <p className="text-white/30 text-xs">{form.active ? 'Отображается как «Активный» — покупка долей открыта' : 'Отображается как «Скоро» — кнопка «Уведомить меня»'}</p>
              </div>
            </div>
            <NumInput
              label="Порядок сортировки"
              hint="Меньшее число = раньше в списке (0 = первый)"
              value={form.sort_order}
              onChange={v => set('sort_order', v)}
              placeholder="0"
            />
          </div>

          {/* Description */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 pt-4 pb-0">
              <h3 className="text-white/70 text-sm font-semibold mb-3">Описание раунда</h3>
              <LangTabs active={descLang} onChange={setDescLang} />
            </div>
            <div className="p-5 pt-4">
              <textarea rows={4} value={(form as any)[`description_${descLang}`] || ''}
                onChange={e => set(`description_${descLang}` as keyof Round, e.target.value)}
                placeholder="Подробное описание раунда для инвесторов..."
                className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A] transition" />
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 pt-4 pb-0">
              <h3 className="text-white/70 text-sm font-semibold mb-3">Задачи / Цели раунда</h3>
              <LangTabs active={tasksLang} onChange={setTasksLang} />
            </div>
            <div className="p-5 pt-4">
              <textarea rows={4} value={(form as any)[`tasks_${tasksLang}`] || ''}
                onChange={e => set(`tasks_${tasksLang}` as keyof Round, e.target.value)}
                placeholder="На что пойдут средства этого раунда..."
                className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A] transition" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => onSave(form)} disabled={saving || !form.name || (isNew && !form.id) || !form.label}
              className="px-6 py-2.5 bg-[#D4522A] hover:bg-[#c04520] text-white text-sm font-semibold rounded-xl transition disabled:opacity-50">
              {saving ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
            <button onClick={onCancel} className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-xl transition">
              Отмена
            </button>
          </div>
        </div>

        {/* Preview panel */}
        <div className="lg:w-64 shrink-0">
          <div className="sticky top-4">
            <PortfolioCardPreview form={form} />
            {!isNew && (
              <div className="mt-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-white/40 text-xs font-medium mb-2 uppercase tracking-wider">Статистика</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/40">Продано долей</span>
                    <span className="text-white">{Number(form.sold_shares || 0).toLocaleString()}</span>
                  </div>
                  {computedTotalShares > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Осталось</span>
                      <span className="text-white">{Math.max(0, computedTotalShares - Number(form.sold_shares || 0)).toLocaleString()}</span>
                    </div>
                  )}
                  {computedTotalShares > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Заполнено</span>
                      <span className="text-[#D4522A] font-medium">
                        {((Number(form.sold_shares || 0) / computedTotalShares) * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListView({ items, loading, onNew, onEdit }: {
  items: Round[]; loading: boolean; onNew: () => void; onEdit: (r: Round) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-2">
            <span>Раунды</span><span>›</span><span className="text-white/70">Список</span>
          </nav>
          <h2 className="text-2xl font-bold text-white">Раунды</h2>
          <p className="text-white/40 text-sm mt-0.5">Управление инвестиционными раундами — данные отображаются в «Мой портфель»</p>
        </div>
        <button onClick={onNew}
          className="px-4 py-2 bg-[#D4522A] hover:bg-[#c04520] text-white text-sm font-medium rounded-xl transition">
          + Новый раунд
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Порядок</th>
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Название / Ярлык</th>
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Цель ($)</th>
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Цена доли</th>
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Мин. долей</th>
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Всего долей</th>
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Продано</th>
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Статус</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map(r => {
                const sharePrice = parseFloat(String(r.share_price)) || 0;
                const targetSum = parseFloat(String(r.target_sum)) || 0;
                const totalShares = sharePrice > 0 ? Math.round(targetSum / sharePrice) : 0;
                const sold = Number(r.sold_shares || 0);
                const fillPct = totalShares > 0 ? ((sold / totalShares) * 100).toFixed(1) : '0.0';
                return (
                  <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-5 py-3 text-white/40 text-sm text-center">{r.sort_order}</td>
                    <td className="px-5 py-3">
                      <div className="text-white text-sm font-medium">{r.name}</div>
                      <div className="text-white/40 text-xs mt-0.5">
                        Ярлык: <span className="text-[#D4522A]">{r.label || '—'}</span>
                        <span className="mx-1.5">·</span>ID: <span className="font-mono">{r.id}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-white/70 text-sm">${Number(r.target_sum || 0).toLocaleString()}</td>
                    <td className="px-5 py-3 text-white/70 text-sm">${r.share_price}</td>
                    <td className="px-5 py-3 text-white/70 text-sm">{Number(r.min_order || 0).toLocaleString()}</td>
                    <td className="px-5 py-3 text-white/70 text-sm">{totalShares > 0 ? totalShares.toLocaleString() : '—'}</td>
                    <td className="px-5 py-3 text-sm">
                      <span className="text-white/70">{sold.toLocaleString()}</span>
                      {totalShares > 0 && <span className="text-white/30 text-xs ml-1">({fillPct}%)</span>}
                    </td>
                    <td className="px-5 py-3">
                      {r.active
                        ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-xs font-medium">● Активный</span>
                        : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-xs font-medium">⌛ Скоро</span>
                      }
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => onEdit(r)}
                        className="text-[#D4522A] hover:text-[#e05530] text-sm font-medium transition flex items-center gap-1 ml-auto">
                        ✎ Изменить
                      </button>
                    </td>
                  </tr>
                );
              })}
              {items.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-16 text-white/30 text-sm">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">📋</span>
                      <span>Нет раундов. Нажмите «+ Новый раунд» чтобы создать первый.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {items.length > 0 && (
            <div className="px-5 py-3 border-t border-white/5 text-xs text-white/30 flex items-center justify-between">
              <span>Показано {items.length} {items.length === 1 ? 'раунд' : items.length < 5 ? 'раунда' : 'раундов'}</span>
              <span>Активных: {items.filter(r => r.active).length}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function RoundsSection() {
  const [items, setItems] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>({ type: 'list' });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    adminApi.rounds.list()
      .then(d => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(load, []);

  const handleSave = async (form: Round, isNew: boolean) => {
    setSaving(true);
    try {
      if (isNew) await adminApi.rounds.create(form);
      else await adminApi.rounds.update(form.id, form);
      setView({ type: 'list' });
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await adminApi.rounds.remove(id);
    setView({ type: 'list' });
    load();
  };

  if (view.type === 'edit') {
    return (
      <EditView
        initial={view.round}
        isNew={view.isNew}
        saving={saving}
        onSave={form => handleSave(form, view.isNew)}
        onCancel={() => setView({ type: 'list' })}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <ListView items={items} loading={loading}
      onNew={() => setView({ type: 'edit', round: emptyRound, isNew: true })}
      onEdit={r => setView({ type: 'edit', round: r, isNew: false })}
    />
  );
}
