import { useEffect, useState } from 'react';
import { adminApi } from '../api';

const LANGS = ['en', 'ru', 'de', 'es', 'tr'] as const;
type Lang = typeof LANGS[number];
const LANG_LABELS: Record<Lang, string> = { en: 'EN', ru: 'RU', de: 'DE', es: 'ES', tr: 'TR' };

interface Round {
  id: string; name: string;
  target_sum: number; market_cap: number; share_price: number; min_order: number;
  active: boolean; sort_order: number;
  sold_shares?: number;
  description_en: string; description_ru: string; description_de: string; description_es: string; description_tr: string;
  tasks_en: string; tasks_ru: string; tasks_de: string; tasks_es: string; tasks_tr: string;
}

const emptyRound: Round = {
  id: '', name: '', target_sum: 0, market_cap: 0, share_price: 0, min_order: 0,
  active: true, sort_order: 0, sold_shares: 0,
  description_en: '', description_ru: '', description_de: '', description_es: '', description_tr: '',
  tasks_en: '', tasks_ru: '', tasks_de: '', tasks_es: '', tasks_tr: '',
};

function calcTotalShares(r: Round) {
  return r.share_price > 0 ? Math.round(r.target_sum / r.share_price) : 0;
}

function fmtMln(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + ' млн';
  if (n >= 1_000) return (n / 1_000).toFixed(0) + ' тыс';
  return n.toLocaleString();
}

function fmtUSD(n: number) {
  return '$' + Number(n).toLocaleString('en-US');
}

function Input({ label, value, onChange, type = 'text', step, small }: {
  label: string; value: string | number; onChange: (v: string) => void;
  type?: string; step?: string; small?: boolean;
}) {
  return (
    <div>
      <label className="text-white/50 text-xs mb-1 block">{label}</label>
      <input
        type={type}
        step={step}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`bg-[#0d0d1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A] transition ${small ? 'w-24' : 'w-full'}`}
      />
    </div>
  );
}

function RoundCard({ round, onEdit, onDelete }: {
  round: Round;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const totalShares = calcTotalShares(round);
  const sold = round.sold_shares || 0;
  const progress = totalShares > 0 ? Math.min(100, (sold / totalShares) * 100) : 0;

  return (
    <div className={`relative bg-[#0d0d1a] border rounded-2xl p-5 flex flex-col gap-3 ${round.active ? 'border-[#D4522A]/60' : 'border-white/10'}`}>
      {round.active && (
        <div className="absolute -top-px left-0 right-0 h-0.5 bg-[#D4522A] rounded-t-2xl" />
      )}

      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-white/50 text-xs font-medium uppercase tracking-wide">{round.name || round.id}:</div>
          <div className="text-2xl font-bold text-white mt-0.5">{fmtUSD(round.target_sum)}</div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${round.active ? 'bg-green-500 text-white' : 'bg-[#1e6fe0] text-white'}`}>
          {round.active ? 'Активный' : 'Скоро'}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-white/50">Цена за долю</span>
          <span className="text-[#D4522A] font-medium">${round.share_price}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/50">Минимум</span>
          <span className="text-white">{Number(round.min_order).toLocaleString()} долей</span>
        </div>
        {round.market_cap > 0 && (
          <div className="flex justify-between">
            <span className="text-white/50">Рыночная кап.</span>
            <span className="text-white">{fmtUSD(round.market_cap)}</span>
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-between text-xs text-white/40 mb-1">
          <span>{fmtMln(sold)} продано</span>
          <span>{fmtMln(totalShares)} всего</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#D4522A] rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={onEdit}
          className="flex-1 text-xs py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
        >
          Изменить
        </button>
        <button
          onClick={onDelete}
          className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

function RoundEditor({ round, isNew, onSave, onCancel, saving }: {
  round: Round;
  isNew: boolean;
  onSave: (r: Round) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Round>({ ...round });
  const [lang, setLang] = useState<Lang>('ru');

  const set = (field: keyof Round, val: any) => setForm(p => ({ ...p, [field]: val }));

  const totalShares = calcTotalShares(form);

  return (
    <div className="bg-[#0d0d1a] border border-[#D4522A]/40 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold text-base">
          {isNew ? '+ Новый раунд' : `Редактирование: ${form.name || form.id}`}
        </h3>
        <button onClick={onCancel} className="text-white/40 hover:text-white text-lg leading-none transition">×</button>
      </div>

      {isNew && (
        <Input label="ID раунда (slug, напр. «seed»)" value={form.id} onChange={v => set('id', v)} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Название" value={form.name} onChange={v => set('name', v)} />
        <Input label="Целевая сумма ($)" type="number" value={form.target_sum || ''} onChange={v => set('target_sum', +v)} />
        <Input label="Цена акции ($)" type="number" step="0.001" value={form.share_price || ''} onChange={v => set('share_price', +v)} />
        <Input label="Мин. заказ (долей)" type="number" value={form.min_order || ''} onChange={v => set('min_order', +v)} />
        <Input label="Рыночная капитализация ($)" type="number" value={form.market_cap || ''} onChange={v => set('market_cap', +v)} />
        <div>
          <label className="text-white/50 text-xs mb-1 block">Порядок сортировки</label>
          <input
            type="number"
            value={form.sort_order || 0}
            onChange={e => set('sort_order', +e.target.value)}
            className="w-24 bg-[#0d0d1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A] transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => set('active', !form.active)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-medium transition ${form.active ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-white/10 bg-white/5 text-white/50'}`}
        >
          <div className={`w-8 h-5 rounded-full relative transition-colors ${form.active ? 'bg-green-500' : 'bg-white/20'}`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${form.active ? 'left-3.5' : 'left-0.5'}`} />
          </div>
          {form.active ? 'Активный' : 'Скоро'}
        </button>
        {totalShares > 0 && (
          <span className="text-white/30 text-xs">Долей: {totalShares.toLocaleString()}</span>
        )}
      </div>

      <div className="border border-white/10 rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-xs font-medium uppercase tracking-wide">Описание и задачи</span>
          <div className="flex gap-1">
            {LANGS.map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-0.5 rounded text-xs font-medium transition ${lang === l ? 'bg-[#D4522A] text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-white/40 text-xs mb-1 block">Описание ({LANG_LABELS[lang]})</label>
          <textarea
            rows={3}
            value={(form as any)[`description_${lang}`] || ''}
            onChange={e => set(`description_${lang}` as keyof Round, e.target.value)}
            className="w-full bg-[#070712] border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A] transition"
          />
        </div>
        <div>
          <label className="text-white/40 text-xs mb-1 block">Задачи ({LANG_LABELS[lang]})</label>
          <textarea
            rows={3}
            value={(form as any)[`tasks_${lang}`] || ''}
            onChange={e => set(`tasks_${lang}` as keyof Round, e.target.value)}
            className="w-full bg-[#070712] border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#D4522A] transition"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onSave(form)}
          disabled={saving || !form.name}
          className="flex-1 bg-[#D4522A] hover:bg-[#c04520] text-white py-2.5 rounded-xl text-sm font-semibold transition disabled:opacity-50"
        >
          {saving ? 'Сохранение...' : 'Сохранить'}
        </button>
        <button
          onClick={onCancel}
          className="px-5 bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl text-sm transition"
        >
          Отмена
        </button>
      </div>
    </div>
  );
}

export default function RoundsSection() {
  const [items, setItems] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
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
      if (isNew) {
        await adminApi.rounds.create(form);
        setShowNewForm(false);
      } else {
        await adminApi.rounds.update(form.id, form);
        setEditingId(null);
      }
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить раунд?')) return;
    await adminApi.rounds.remove(id);
    setItems(i => i.filter(x => x.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Раунды инвестирования</h2>
          <p className="text-white/40 text-sm mt-1">Управление разделами "Мой портфель" → карточки раундов и покупка долей</p>
        </div>
        {!showNewForm && (
          <button
            onClick={() => { setShowNewForm(true); setEditingId(null); }}
            className="bg-[#D4522A] hover:bg-[#c04520] text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            + Новый раунд
          </button>
        )}
      </div>

      {showNewForm && (
        <RoundEditor
          round={emptyRound}
          isNew={true}
          saving={saving}
          onSave={form => handleSave(form, true)}
          onCancel={() => setShowNewForm(false)}
        />
      )}

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 && !showNewForm ? (
        <div className="text-center py-16 text-white/30 border border-white/10 rounded-2xl">
          <div className="text-4xl mb-3">🏷</div>
          <div className="text-sm">Нет раундов. Создайте первый раунд нажав «+ Новый раунд»</div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map(round => (
            <div key={round.id} className="flex flex-col gap-0">
              {editingId === round.id ? (
                <RoundEditor
                  round={round}
                  isNew={false}
                  saving={saving}
                  onSave={form => handleSave(form, false)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <RoundCard
                  round={round}
                  onEdit={() => { setEditingId(round.id); setShowNewForm(false); }}
                  onDelete={() => handleDelete(round.id)}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-4 text-xs text-white/30">
        <span className="font-medium text-white/50">Как это работает:</span>{' '}
        Изменения, сохранённые здесь, немедленно отображаются в разделе «Мой портфель» на сайте —
        в карточках раундов и в разделе «Покупка долей». Пользователи увидят актуальные цены, статусы и количество доступных долей.
      </div>
    </div>
  );
}
