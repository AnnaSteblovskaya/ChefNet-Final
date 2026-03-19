import { useEffect, useRef, useState } from 'react';
import { adminApi } from '../api';

interface Doc {
  id: number; visible: boolean; category: string; file_url: string; file_name?: string;
  created_at: string;
  title_en: string; title_ru: string; title_de: string; title_es: string; title_tr: string;
}

const emptyDoc = { title_en:'', title_ru:'', title_de:'', title_es:'', title_tr:'', file_url:'', file_name:'', category:'general', visible: true };
const CATEGORIES = ['general', 'legal', 'financial', 'presentation', 'other'];
const CATEGORY_LABELS: Record<string, string> = { general:'Общее', legal:'Юридическое', financial:'Финансовое', presentation:'Презентация', other:'Прочее' };

function fileIcon(url: string, name?: string): string {
  const target = name || url || '';
  const ext = target.split('.').pop()?.toLowerCase() || '';
  if (['pdf'].includes(ext)) return '📕';
  if (['doc','docx'].includes(ext)) return '📘';
  if (['xls','xlsx','csv'].includes(ext)) return '📗';
  if (['ppt','pptx'].includes(ext)) return '📊';
  if (['jpg','jpeg','png','gif','webp','svg'].includes(ext)) return '🖼️';
  if (['zip','rar','7z','tar','gz'].includes(ext)) return '🗜️';
  if (['mp4','avi','mov','mkv'].includes(ext)) return '🎬';
  if (['mp3','wav','ogg'].includes(ext)) return '🎵';
  return '📄';
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type FileMode = 'url' | 'upload';

export default function DocumentsSection() {
  const [items, setItems] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Doc> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fileMode, setFileMode] = useState<FileMode>('url');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = () => {
    setLoading(true);
    adminApi.documents.list()
      .then(d => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(load, []);

  const openNew = () => {
    setEditing({ ...emptyDoc });
    setIsNew(true);
    setFileMode('url');
    setUploadProgress(null);
    setUploadError(null);
  };

  const openEdit = (doc: Doc) => {
    setEditing({ ...doc });
    setIsNew(false);
    setFileMode(doc.file_url?.startsWith('/uploads/') ? 'upload' : 'url');
    setUploadProgress(null);
    setUploadError(null);
  };

  const handleFilePick = async (file: File) => {
    if (!file) return;
    setUploadError(null);
    setUploadProgress(0);
    try {
      const res = await adminApi.documents.upload(file, pct => setUploadProgress(pct));
      setEditing(v => ({ ...v, file_url: res.file_url, file_name: res.file_name }));
      setUploadProgress(100);
    } catch (err: any) {
      setUploadError(err.message || 'Ошибка загрузки');
      setUploadProgress(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFilePick(file);
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) await adminApi.documents.create(editing);
      else await adminApi.documents.update(editing.id!, editing);
      setEditing(null);
      load();
    } finally { setSaving(false); }
  };

  const toggleVisible = async (doc: Doc) => {
    await adminApi.documents.update(doc.id, { ...doc, visible: !doc.visible });
    setItems(i => i.map(x => x.id === doc.id ? { ...x, visible: !x.visible } : x));
  };

  const remove = async (id: number) => {
    if (!confirm('Удалить документ?')) return;
    await adminApi.documents.remove(id);
    setItems(i => i.filter(x => x.id !== id));
  };

  const isUploaded = (url?: string) => url?.startsWith('/uploads/');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Документы</h2>
        <button onClick={openNew} className="bg-[#D4522A] hover:bg-[#c04520] text-white px-4 py-2 rounded-xl text-sm font-medium transition">
          + Добавить документ
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-2">
          {items.map(doc => (
            <div
              key={doc.id}
              className={`bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 transition ${!doc.visible ? 'opacity-50' : ''}`}
            >
              <span className="text-2xl flex-shrink-0">{fileIcon(doc.file_url, doc.file_name)}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{doc.title_ru || doc.title_en || 'Без названия'}</div>
                <div className="text-white/40 text-xs">
                  {CATEGORY_LABELS[doc.category] || doc.category}
                  {doc.file_name ? ` · ${doc.file_name}` : ''}
                  {' · '}
                  {new Date(doc.created_at).toLocaleDateString('ru')}
                </div>
              </div>

              {doc.file_url ? (
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noreferrer"
                  download={isUploaded(doc.file_url) ? (doc.file_name || true) : undefined}
                  className="flex items-center gap-1 bg-[#D4522A]/10 hover:bg-[#D4522A]/20 text-[#D4522A] text-xs px-3 py-1.5 rounded-lg transition flex-shrink-0"
                >
                  {isUploaded(doc.file_url) ? '⬇ Скачать' : '↗ Открыть'}
                </a>
              ) : (
                <span className="text-white/20 text-xs flex-shrink-0">Нет файла</span>
              )}

              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => openEdit(doc)}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition"
                >
                  Изменить
                </button>
                <button
                  onClick={() => toggleVisible(doc)}
                  className="bg-white/5 hover:bg-white/10 text-white/60 text-xs px-2 py-1.5 rounded-lg transition"
                >
                  {doc.visible ? 'Скрыть' : 'Показать'}
                </button>
                <button
                  onClick={() => remove(doc.id)}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs px-2 py-1.5 rounded-lg transition"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center text-white/40 py-12">
              <div className="text-4xl mb-3">📂</div>
              <div>Нет документов</div>
            </div>
          )}
        </div>
      )}

      {editing && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setEditing(null)}
        >
          <div
            className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {isNew ? 'Новый документ' : 'Изменить документ'}
            </h3>

            <div className="space-y-3">
              {(['ru','en','de','es','tr'] as const).map(l => (
                <div key={l}>
                  <label className="text-white/50 text-xs mb-1 block">Название ({l.toUpperCase()})</label>
                  <input
                    value={String((editing as any)[`title_${l}`] || '')}
                    onChange={e => setEditing(v => ({ ...v, [`title_${l}`]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]"
                  />
                </div>
              ))}

              {/* File mode toggle */}
              <div>
                <label className="text-white/50 text-xs mb-2 block">Источник файла</label>
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => { setFileMode('url'); setUploadError(null); setUploadProgress(null); }}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition border ${fileMode === 'url' ? 'bg-[#D4522A] border-[#D4522A] text-white' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
                  >
                    🔗 Ссылка на файл
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFileMode('upload'); setUploadError(null); setUploadProgress(null); }}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition border ${fileMode === 'upload' ? 'bg-[#D4522A] border-[#D4522A] text-white' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
                  >
                    ⬆ Загрузить с компьютера
                  </button>
                </div>

                {fileMode === 'url' ? (
                  <input
                    value={editing.file_url || ''}
                    onChange={e => setEditing(v => ({ ...v, file_url: e.target.value, file_name: '' }))}
                    placeholder="https://drive.google.com/..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4522A]"
                  />
                ) : (
                  <div>
                    {/* Drop zone */}
                    <div
                      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${dragOver ? 'border-[#D4522A] bg-[#D4522A]/10' : 'border-white/20 hover:border-[#D4522A]/50 hover:bg-white/5'}`}
                    >
                      {uploadProgress !== null && uploadProgress < 100 ? (
                        <div>
                          <div className="text-white/60 text-sm mb-2">Загрузка... {uploadProgress}%</div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="bg-[#D4522A] h-2 rounded-full transition-all"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      ) : editing.file_url?.startsWith('/uploads/') ? (
                        <div>
                          <div className="text-3xl mb-1">{fileIcon(editing.file_url, editing.file_name)}</div>
                          <div className="text-white text-sm font-medium">{editing.file_name || 'Файл загружен'}</div>
                          <div className="text-white/40 text-xs mt-1">Нажмите, чтобы заменить</div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-3xl mb-2">📁</div>
                          <div className="text-white/60 text-sm">Перетащите файл сюда или нажмите для выбора</div>
                          <div className="text-white/30 text-xs mt-1">Любой формат, до 50 МБ</div>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={e => { if (e.target.files?.[0]) handleFilePick(e.target.files[0]); }}
                    />
                    {uploadError && (
                      <div className="mt-2 text-red-400 text-xs bg-red-500/10 px-3 py-2 rounded-lg">{uploadError}</div>
                    )}
                    {editing.file_url?.startsWith('/uploads/') && (
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-green-400">✓ Файл загружен на сервер</span>
                        <a
                          href={editing.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#D4522A] hover:underline"
                          onClick={e => e.stopPropagation()}
                        >
                          Открыть ↗
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Категория</label>
                  <select
                    value={editing.category || 'general'}
                    onChange={e => setEditing(v => ({ ...v, category: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
                  </select>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editing.visible !== false}
                      onChange={e => setEditing(v => ({ ...v, visible: e.target.checked }))}
                      className="w-4 h-4 accent-[#D4522A]"
                    />
                    <span className="text-white text-sm">Видимый</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={save}
                disabled={saving || (uploadProgress !== null && uploadProgress < 100)}
                className="flex-1 bg-[#D4522A] hover:bg-[#c04520] disabled:opacity-50 text-white py-2 rounded-xl text-sm font-medium transition"
              >
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-sm transition"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
