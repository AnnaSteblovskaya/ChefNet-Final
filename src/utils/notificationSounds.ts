// ─── Notification Sound Engine (Web Audio API) ─────────────────────────────
// Fully async — properly awaits AudioContext.resume() before scheduling notes.
// Browsers block audio until the user interacts; call unlockAudioContext() on
// the first click/touch to prime the context.

let _ctx: AudioContext | null = null;

// ─── Context management ──────────────────────────────────────────────────────

async function getCtx(): Promise<AudioContext> {
  if (!_ctx || _ctx.state === 'closed') {
    _ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (_ctx.state === 'suspended') {
    await _ctx.resume(); // ← await is critical; without it notes schedule on a dead context
  }
  return _ctx;
}

/**
 * Call this on the first user interaction (click / touch) on the page.
 * Plays a silent 1-sample buffer which permanently unlocks the context
 * in every browser that implements the autoplay policy.
 */
export async function unlockAudioContext(): Promise<void> {
  try {
    const c = await getCtx();
    const buf = c.createBuffer(1, 1, 22050);
    const src = c.createBufferSource();
    src.buffer = buf;
    src.connect(c.destination);
    src.start(0);
  } catch { /* silent */ }
}

// ─── Note playback ───────────────────────────────────────────────────────────

type WaveType = OscillatorType;
interface Note { freq: number; start: number; duration: number; gain?: number; wave?: WaveType }

async function playNotesAsync(notes: Note[]): Promise<void> {
  try {
    const c = await getCtx(); // always await — ensures context is running
    const master = c.createGain();
    master.gain.setValueAtTime(0.65, c.currentTime);
    master.connect(c.destination);

    for (const note of notes) {
      const osc = c.createOscillator();
      const g   = c.createGain();
      osc.connect(g);
      g.connect(master);

      osc.type = note.wave ?? 'sine';
      osc.frequency.setValueAtTime(note.freq, c.currentTime + note.start);

      const vol = note.gain ?? 0.25;
      const at  = c.currentTime + note.start;
      const off = at + note.duration;

      g.gain.setValueAtTime(0,   at);
      g.gain.linearRampToValueAtTime(vol, at + 0.012);
      g.gain.exponentialRampToValueAtTime(0.001, off);

      osc.start(at);
      osc.stop(off + 0.02);
    }
  } catch { /* AudioContext unavailable (SSR / blocked) */ }
}

// ─── Group sounds ────────────────────────────────────────────────────────────

/** Investment / confirmed — rising arpeggio C5→E5→G5 (success) */
export function playInvestmentSound(): void {
  playNotesAsync([
    { freq: 523.25, start: 0,    duration: 0.18, gain: 0.30 },
    { freq: 659.25, start: 0.13, duration: 0.18, gain: 0.30 },
    { freq: 783.99, start: 0.26, duration: 0.36, gain: 0.34 },
  ]).catch(() => {});
}

/** Referral / Partner — double friendly ping G5→A5 */
export function playReferralSound(): void {
  playNotesAsync([
    { freq: 783.99, start: 0,    duration: 0.14, gain: 0.26 },
    { freq: 880.00, start: 0.22, duration: 0.24, gain: 0.28 },
  ]).catch(() => {});
}

/** KYC / Verification — authoritative two-tone F5→C5 */
export function playKYCSound(): void {
  playNotesAsync([
    { freq: 698.46, start: 0,    duration: 0.22, gain: 0.28 },
    { freq: 523.25, start: 0.20, duration: 0.40, gain: 0.24 },
  ]).catch(() => {});
}

/** Document — soft triangle pop */
export function playDocumentSound(): void {
  playNotesAsync([
    { freq: 440, start: 0,    duration: 0.10, gain: 0.20, wave: 'triangle' },
    { freq: 370, start: 0.08, duration: 0.18, gain: 0.15, wave: 'triangle' },
  ]).catch(() => {});
}

/** Email / verified — classic mail chime C6→A5 */
export function playEmailSound(): void {
  playNotesAsync([
    { freq: 1046.5, start: 0,    duration: 0.16, gain: 0.22 },
    { freq:  880.0, start: 0.14, duration: 0.28, gain: 0.20 },
  ]).catch(() => {});
}

/** News — triple announcement tap E5, E5, B5 */
export function playNewsSound(): void {
  playNotesAsync([
    { freq: 659.25, start: 0,    duration: 0.10, gain: 0.22 },
    { freq: 659.25, start: 0.14, duration: 0.10, gain: 0.22 },
    { freq: 987.77, start: 0.28, duration: 0.30, gain: 0.30 },
  ]).catch(() => {});
}

/** Registration / welcome — ascending two-note welcome D5→A5 */
export function playRegistrationSound(): void {
  playNotesAsync([
    { freq: 587.33, start: 0,    duration: 0.18, gain: 0.22 },
    { freq: 880.00, start: 0.16, duration: 0.28, gain: 0.26 },
  ]).catch(() => {});
}

/** General / Info — single soft beep C5 */
export function playGeneralSound(): void {
  playNotesAsync([
    { freq: 523.25, start: 0, duration: 0.22, gain: 0.18 },
  ]).catch(() => {});
}

// ─── Type → sound mapper ─────────────────────────────────────────────────────
// Covers all types inserted by server/index.ts and server/admin.ts:
//   'User registered', 'Partner investment', 'Partner KYC verified',
//   'Email verified', 'news', 'investment', 'kyc', 'document', ...

export function getSoundForType(type: string): () => void {
  const t = (type || '').toLowerCase();
  if (t.includes('invest'))                        return playInvestmentSound;
  if (t.includes('referral') || t.includes('partner')) return playReferralSound;
  if (t.includes('kyc') || t.includes('verif'))    return playKYCSound;
  if (t.includes('document'))                      return playDocumentSound;
  if (t.includes('email'))                         return playEmailSound;
  if (t.includes('news'))                          return playNewsSound;
  if (t.includes('register') || t.includes('registered')) return playRegistrationSound;
  return playGeneralSound;
}

// ─── Mute preference ─────────────────────────────────────────────────────────

const MUTE_KEY = 'chefnet-sound-muted';

export function isMuted(): boolean {
  try { return localStorage.getItem(MUTE_KEY) === 'true'; } catch { return false; }
}

export function setMuted(value: boolean): void {
  try { localStorage.setItem(MUTE_KEY, String(value)); } catch {}
}

/** Play the sound for the given notification type, unless muted. */
export function playIfUnmuted(type: string): void {
  if (isMuted()) return;
  getSoundForType(type)();
}
