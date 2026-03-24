// ─── Notification Sound Engine (Web Audio API) ─────────────────────────────
// All sounds are generated programmatically — no audio files required.

let _ctx: AudioContext | null = null;

function ctx(): AudioContext {
  if (!_ctx || _ctx.state === 'closed') {
    _ctx = new AudioContext();
  }
  if (_ctx.state === 'suspended') {
    _ctx.resume().catch(() => {});
  }
  return _ctx;
}

type WaveType = OscillatorType;

interface Note { freq: number; start: number; duration: number; gain?: number; wave?: WaveType }

function playNotes(notes: Note[]): void {
  try {
    const c = ctx();
    const master = c.createGain();
    master.gain.setValueAtTime(0.7, c.currentTime);
    master.connect(c.destination);

    for (const note of notes) {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.connect(g);
      g.connect(master);

      osc.type = note.wave ?? 'sine';
      osc.frequency.setValueAtTime(note.freq, c.currentTime + note.start);

      const vol = note.gain ?? 0.25;
      const at = c.currentTime + note.start;
      const off = at + note.duration;

      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(vol, at + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, off);

      osc.start(at);
      osc.stop(off + 0.02);
    }
  } catch {
    // AudioContext not available (e.g. server-side render)
  }
}

// ─── Group sounds ────────────────────────────────────────────────────────────

/** Investment — rising 3-note arpeggio (C5→E5→G5). Success feel. */
export function playInvestmentSound(): void {
  playNotes([
    { freq: 523.25, start: 0,    duration: 0.18, gain: 0.28 },  // C5
    { freq: 659.25, start: 0.13, duration: 0.18, gain: 0.28 },  // E5
    { freq: 783.99, start: 0.26, duration: 0.35, gain: 0.32 },  // G5
  ]);
}

/** Referral / Partner — double friendly ping (G5 G5). */
export function playReferralSound(): void {
  playNotes([
    { freq: 783.99, start: 0,    duration: 0.14, gain: 0.24 },  // G5
    { freq: 880.00, start: 0.22, duration: 0.22, gain: 0.26 },  // A5
  ]);
}

/** KYC / Verification — authoritative two-tone (F5→C5). */
export function playKYCSound(): void {
  playNotes([
    { freq: 698.46, start: 0,    duration: 0.22, gain: 0.28 },  // F5
    { freq: 523.25, start: 0.20, duration: 0.38, gain: 0.24 },  // C5
  ]);
}

/** Document — soft triangle pop (lower, paper-like). */
export function playDocumentSound(): void {
  playNotes([
    { freq: 440, start: 0,    duration: 0.10, gain: 0.20, wave: 'triangle' },  // A4
    { freq: 370, start: 0.08, duration: 0.18, gain: 0.15, wave: 'triangle' },
  ]);
}

/** Email — classic two-note mail chime (C6→A5). */
export function playEmailSound(): void {
  playNotes([
    { freq: 1046.5, start: 0,    duration: 0.16, gain: 0.22 },  // C6
    { freq:  880.0, start: 0.14, duration: 0.28, gain: 0.20 },  // A5
  ]);
}

/** News — three-tap announcement (E5, E5, B5). */
export function playNewsSound(): void {
  playNotes([
    { freq: 659.25, start: 0,    duration: 0.10, gain: 0.22 },  // E5
    { freq: 659.25, start: 0.14, duration: 0.10, gain: 0.22 },  // E5
    { freq: 987.77, start: 0.28, duration: 0.28, gain: 0.28 },  // B5
  ]);
}

/** General / Info — single soft beep. */
export function playGeneralSound(): void {
  playNotes([
    { freq: 523.25, start: 0, duration: 0.22, gain: 0.18 },  // C5
  ]);
}

// ─── Type → sound mapper ─────────────────────────────────────────────────────

export function getSoundForType(type: string): () => void {
  const t = (type || '').toLowerCase();
  if (t.includes('investment')) return playInvestmentSound;
  if (t.includes('referral') || t.includes('partner')) return playReferralSound;
  if (t.includes('kyc') || t.includes('verif')) return playKYCSound;
  if (t.includes('document')) return playDocumentSound;
  if (t.includes('email')) return playEmailSound;
  if (t.includes('news')) return playNewsSound;
  return playGeneralSound;
}

// ─── Mute preference (persisted to localStorage) ─────────────────────────────

const MUTE_KEY = 'chefnet-sound-muted';

export function isMuted(): boolean {
  try { return localStorage.getItem(MUTE_KEY) === 'true'; } catch { return false; }
}

export function setMuted(value: boolean): void {
  try { localStorage.setItem(MUTE_KEY, String(value)); } catch {}
}

export function playIfUnmuted(type: string): void {
  if (isMuted()) return;
  getSoundForType(type)();
}
