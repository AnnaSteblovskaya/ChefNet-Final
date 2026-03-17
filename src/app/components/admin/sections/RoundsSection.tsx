import { useEffect, useState } from 'react';
import { adminApi } from '../api';

const LANGS = ['en', 'de', 'ru', 'es', 'tr'] as const;
type Lang = typeof LANGS[number];
const LANG_LABELS: Record<Lang, string> = { en: 'English', de: 'Deutsch', ru: 'Русский', es: 'Español', tr: 'Türkçe' };

interface Round {
  id: string; name: string;
  target_sum: number; market_cap: number; share_price: number; min_order: number;
  active: boolean; sort_order: number; sold_shares?: number;
  description_en: string; description_ru: string; description_de: string; description_es: string; description_tr: string;
  tasks_en: string; tasks_ru: string; tasks_de: string; tasks_es: string; tasks_tr: string;
}

const emptyRound: Round = {
  id: '', name: '', target_sum: 0, market_cap: 0, share_price: 0, min_order: 0,
  active: true, sort_order: 0, sold_shares: 0,
  description_en: '', description_ru: '', description_de: '', description_es: '', description_tr: '',
  tasks_en: '', tasks_ru: '', tasks_de: '', tasks_es: '', tasks_tr: '',
};

type View = { type: 'list' } | { type: 'edit'; round: Round; isNew: boolean };

function LangTabs({ active, onChange }: { active: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex gap-0 border-b border-white/10">
      {LANGS.map(l => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-4 py-2 text-sm transition border-b-2 -mb-px ${
            active === l
              ? 'border-[#D4522A] text-white font-medium'
              : 'border-transparent text-white/40 hover:text-white/70'
          }`}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );
}

function EditView({
  initial, isNew, onSave, onCancel, onDelete, saving,
}: {
  initial: Round; isNew: boolean;
  onSave: (r: Round) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Round>({ ...initial });
  const [descLang, setDescLang] = useState<Lang>('en');
  const [tasksLang, setTasksLang] = useState<Lang>('en');

  const set = (field: keyof Round, val: any) => setForm(p => ({ ...p, [field]: val }));

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-2">
            <span>Раунды</span>
            <span>›</span>
            <span>{isNew ? 'Новый раунд' : (form.name || form.id)}</span>
            <span>›</span>
            <span className="text-white/70">{isNew ? 'Создать' : 'Изменить'}</span>
          </nav>
          <h2 className="text-2xl font-bold text-white">{isNew ? 'Новый раунд' : 'Изменить раунд'}</h2>
        </div>
        {!isNew && (
          <button
            onClick={() => {
              if (confirm('Удалить раунд?')) onDelete(form.id);
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition"
          >
            Удалить
          </button>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">
              Название <span className="text-[#D4522A]">*</span>
            </label>
            <input
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Pre-Seed"
              className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
            />
          </div>
          {isNew && (
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">
                ID раунда (slug) <span className="text-[#D4522A]">*</span>
              </label>
              <input
                value={form.id}
                onChange={e => set('id', e.target.value)}
                placeholder="seed"
                className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
              />
            </div>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-5 pt-4 pb-0">
            <LangTabs active={descLang} onChange={setDescLang} />
          </div>
          <div className="p-5 pt-4">
            <label className="text-white/50 text-xs mb-1.5 block">Описание</label>
            <textarea
              rows={4}
              value={(form as any)[`description_${descLang}`] || ''}
              onChange={e => set(`description_${descLang}` as keyof Round, e.target.value)}
              className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A] transition"
            />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-5 pt-4 pb-0">
            <LangTabs active={tasksLang} onChange={setTasksLang} />
          </div>
          <div className="p-5 pt-4">
            <label className="text-white/50 text-xs mb-1.5 block">Задачи</label>
            <textarea
              rows={4}
              value={(form as any)[`tasks_${tasksLang}`] || ''}
              onChange={e => set(`tasks_${tasksLang}` as keyof Round, e.target.value)}
              className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A] transition"
            />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">
              Целевая сумма ($) <span className="text-[#D4522A]">*</span>
            </label>
            <input
              type="number"
              value={form.target_sum || ''}
              onChange={e => set('target_sum', +e.target.value)}
              placeholder="150000"
              className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
            />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">
              Рыночная капитализация ($) <span className="text-[#D4522A]">*</span>
            </label>
            <input
              type="number"
              value={form.market_cap || ''}
              onChange={e => set('market_cap', +e.target.value)}
              placeholder="150000"
              className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
            />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">
              Цена акции ($) <span className="text-[#D4522A]">*</span>
            </label>
            <input
              type="number"
              step="0.001"
              value={form.share_price || ''}
              onChange={e => set('share_price', +e.target.value)}
              placeholder="0,075"
              className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
            />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">
              Мин. заказ (долей) <span className="text-[#D4522A]">*</span>
            </label>
            <input
              type="number"
              value={form.min_order || ''}
              onChange={e => set('min_order', +e.target.value)}
              placeholder="150"
              className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
            />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <button
            type="button"
            onClick={() => set('active', !form.active)}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${form.active ? 'bg-[#D4522A]' : 'bg-white/20'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.active ? 'left-6' : 'left-1'}`} />
          </button>
          <span className="text-white text-sm">
            Активный <span className="text-[#D4522A]">*</span>
          </span>
          <span className="text-white/30 text-xs ml-auto">
            {form.active ? 'Отображается как «Активный» на сайте' : 'Отображается как «Скоро» на сайте'}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onSave(form)}
            disabled={saving || !form.name || (isNew && !form.id)}
            className="px-6 py-2.5 bg-[#D4522A] hover:bg-[#c04520] text-white text-sm font-semibold rounded-xl transition disabled:opacity-50"
          >
            {saving ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-xl transition"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

function ListView({
  items, loading, onNew, onEdit,
}: {
  items: Round[]; loading: boolean;
  onNew: () => void;
  onEdit: (r: Round) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-2">
            <span>Раунды</span>
            <span>›</span>
            <span className="text-white/70">Список</span>
          </nav>
          <h2 className="text-2xl font-bold text-white">Раунды</h2>
        </div>
        <button
          onClick={onNew}
          className="px-4 py-2 bg-[#D4522A] hover:bg-[#c04520] text-white text-sm font-medium rounded-xl transition"
        >
          + Новый раунд
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Название</th>
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Целевая сумма</th>
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Рыночная кап.</th>
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Цена акции</th>
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Мин. заказ</th>
                <th className="text-left px-5 py-3 text-white/50 text-xs font-medium">Активный</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map(r => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="px-5 py-3 text-white text-sm font-medium">{r.name}</td>
                  <td className="px-5 py-3 text-white/70 text-sm">{Number(r.target_sum || 0).toLocaleString()}</td>
                  <td className="px-5 py-3 text-white/70 text-sm">{Number(r.market_cap || 0).toLocaleString()}</td>
                  <td className="px-5 py-3 text-white/70 text-sm">{Number(r.share_price || 0)}</td>
                  <td className="px-5 py-3 text-white/70 text-sm">{Number(r.min_order || 0).toLocaleString()}</td>
                  <td className="px-5 py-3">
                    {r.active
                      ? <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-xs">✓</span>
                      : <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-xs">✕</span>
                    }
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => onEdit(r)}
                      className="text-[#D4522A] hover:text-[#e05530] text-sm font-medium transition flex items-center gap-1 ml-auto"
                    >
                      ✎ Изменить
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-white/30 py-12 text-sm">
                    Нет раундов. Нажмите «+ Новый раунд» чтобы создать первый.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {items.length > 0 && (
            <div className="px-5 py-3 border-t border-white/5 text-xs text-white/30">
              Показано {items.length} {items.length === 1 ? 'запись' : items.length < 5 ? 'записи' : 'записей'}
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
    <ListView
      items={items}
      loading={loading}
      onNew={() => setView({ type: 'edit', round: emptyRound, isNew: true })}
      onEdit={r => setView({ type: 'edit', round: r, isNew: false })}
    />
  );
}
