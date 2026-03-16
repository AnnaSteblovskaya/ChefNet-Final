import { useEffect, useState } from 'react';
import { adminApi } from '../api';

interface Partner {
  id: number; name: string; logo_url: string; website: string;
  description_en: string; description_ru: string; status: string; sort_order: number;
}

const emptyP: Omit<Partner, 'id'> = { name: '', logo_url: '', website: '', description_en: '', description_ru: '', status: 'active', sort_order: 0 };

export default function PartnersSection() {
  const [items, setItems] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Partner> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    adminApi.partners.list().then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) await adminApi.partners.create(editing);
      else await adminApi.partners.update(editing.id!, editing);
      setEditing(null); load();
    } finally { setSaving(false); }
  };

  const toggleStatus = async (p: Partner) => {
    const status = p.status === 'active' ? 'inactive' : 'active';
    await adminApi.partners.update(p.id, { ...p, status });
    setItems(i => i.map(x => x.id === p.id ? { ...x, status } : x));
  };

  const remove = async (id: number) => {
    if (!confirm('Delete partner?')) return;
    await adminApi.partners.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const inp = 'w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400';

  const F = ({ label, field, multiline }: { label: string; field: keyof Partner; multiline?: boolean }) => (
    <div>
      <label className="text-xs font-medium text-gray-500 mb-1.5 block">{label}</label>
      {multiline
        ? <textarea value={String(editing?.[field] || '')} onChange={e => setEditing(v => ({ ...v, [field]: e.target.value }))} rows={2} className={inp + ' resize-none'} />
        : <input value={String(editing?.[field] || '')} onChange={e => setEditing(v => ({ ...v, [field]: e.target.value }))} className={inp} />}
    </div>
  );

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Partners</h1>
        <button onClick={() => { setEditing({ ...emptyP }); setIsNew(true); }}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          Add partner
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(p => (
            <div key={p.id} className={`bg-white border rounded-xl p-4 transition ${p.status === 'active' ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
              <div className="flex items-start justify-between mb-3">
                {p.logo_url
                  ? <img src={p.logo_url} alt={p.name} className="h-10 object-contain max-w-[120px] bg-gray-50 rounded-lg p-1 border border-gray-100" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  : <div className="h-10 w-20 bg-gray-100 rounded-lg" />}
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${p.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>{p.status}</span>
              </div>
              <div className="font-medium text-gray-900 mb-0.5">{p.name}</div>
              <div className="text-gray-400 text-xs mb-4 truncate">{p.website || '—'}</div>
              <div className="flex gap-1.5">
                <button onClick={() => { setEditing({ ...p }); setIsNew(false); }}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs py-1.5 rounded-lg border border-gray-200 transition">Edit</button>
                <button onClick={() => toggleStatus(p)}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs py-1.5 rounded-lg border border-gray-200 transition">
                  {p.status === 'active' ? 'Disable' : 'Enable'}
                </button>
                <button onClick={() => remove(p.id)} className="text-xs text-red-500 hover:text-red-700 px-2.5 py-1.5 rounded-lg border border-red-100 hover:bg-red-50 transition">✕</button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-3">
              <div className="bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </div>
                <p className="text-sm text-gray-500">No partners</p>
              </div>
            </div>
          )}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{isNew ? 'New partner' : `Edit: ${editing.name}`}</h3>
            <div className="space-y-3">
              <F label="Name" field="name" />
              <F label="Logo URL" field="logo_url" />
              {editing.logo_url && <img src={editing.logo_url} alt="" className="h-12 object-contain bg-gray-50 rounded-lg p-2 border border-gray-100" />}
              <F label="Website" field="website" />
              <F label="Description (EN)" field="description_en" multiline />
              <F label="Description (RU)" field="description_ru" multiline />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Status</label>
                  <select value={editing.status} onChange={e => setEditing(v => ({ ...v, status: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400">
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Sort order</label>
                  <input type="number" value={editing.sort_order || 0} onChange={e => setEditing(v => ({ ...v, sort_order: +e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-orange-400" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={save} disabled={saving} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
              <button onClick={() => setEditing(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
