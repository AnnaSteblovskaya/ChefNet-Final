// Anti-spam / abuse detection utility
// Tracks request frequency per IP / identifier and scores them for spam likelihood

interface FrequencyRecord {
  count: number;
  windowStart: number;
  blocked: boolean;
  blockedUntil?: number;
}

interface SpamCheckResult {
  allowed: boolean;
  score: number;        // 0–100: higher = more suspicious
  reason?: string;
}

// ─── Spam keyword patterns (for content analysis) ──────────────────────────

const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|poker|lottery|prize|winner|congratulations)\b/i,
  /\b(click here|buy now|free money|earn money|make money fast)\b/i,
  /\b(nigerian prince|inheritance|unclaimed funds)\b/i,
  /https?:\/\/[^\s]{50,}/,                         // very long URLs
  /(.)\1{10,}/,                                      // repeated characters
];

// ─── Frequency tracker ─────────────────────────────────────────────────────

const frequencyStore = new Map<string, FrequencyRecord>();

const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 min
setInterval(() => {
  const now = Date.now();
  for (const [key, rec] of frequencyStore.entries()) {
    if (now - rec.windowStart > 30 * 60 * 1000) {
      frequencyStore.delete(key);
    }
  }
}, CLEANUP_INTERVAL);

/**
 * Check whether a given key (e.g. IP or email) is allowed to make a request
 * within the given window and max-count thresholds.
 *
 * @param key        Unique identifier (IP, email, userId …)
 * @param windowMs   Time window in ms
 * @param maxCount   Max allowed requests in the window
 * @param blockMs    How long to block after exceeding limit (default: equal to windowMs)
 */
export function checkFrequency(
  key: string,
  windowMs: number,
  maxCount: number,
  blockMs = windowMs
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  let rec = frequencyStore.get(key);

  if (!rec || now - rec.windowStart > windowMs) {
    rec = { count: 0, windowStart: now, blocked: false };
    frequencyStore.set(key, rec);
  }

  // Still within block period?
  if (rec.blocked && rec.blockedUntil && now < rec.blockedUntil) {
    return { allowed: false, remaining: 0, resetAt: rec.blockedUntil };
  }

  // Block expired — reset
  if (rec.blocked && (!rec.blockedUntil || now >= rec.blockedUntil)) {
    rec = { count: 0, windowStart: now, blocked: false };
    frequencyStore.set(key, rec);
  }

  rec.count++;

  if (rec.count > maxCount) {
    rec.blocked = true;
    rec.blockedUntil = now + blockMs;
    frequencyStore.set(key, rec);
    return { allowed: false, remaining: 0, resetAt: rec.blockedUntil };
  }

  const remaining = maxCount - rec.count;
  const resetAt = rec.windowStart + windowMs;
  return { allowed: true, remaining, resetAt };
}

/**
 * Analyse free-text content for spam signals.
 * Returns a score 0–100 (higher = more suspicious).
 */
export function scoreContent(text: string): SpamCheckResult {
  if (!text || typeof text !== 'string') return { allowed: true, score: 0 };

  let score = 0;
  const reasons: string[] = [];

  // Length check — extremely long fields are suspicious
  if (text.length > 5000) {
    score += 30;
    reasons.push('excessive length');
  }

  // Repeated characters
  if (/(.)\1{8,}/.test(text)) {
    score += 20;
    reasons.push('repeated characters');
  }

  // All-caps (shouting)
  const alphaChars = text.replace(/[^a-zA-Z]/g, '');
  if (alphaChars.length > 20 && alphaChars === alphaChars.toUpperCase()) {
    score += 15;
    reasons.push('all caps');
  }

  // Spam keywords
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(text)) {
      score += 25;
      reasons.push('spam keyword');
      break;
    }
  }

  // Many URLs
  const urlCount = (text.match(/https?:\/\//g) || []).length;
  if (urlCount > 2) {
    score += urlCount * 10;
    reasons.push('multiple URLs');
  }

  // HTML tags (potential XSS attempt)
  if (/<[a-z]/i.test(text)) {
    score += 40;
    reasons.push('HTML detected');
  }

  const finalScore = Math.min(100, score);
  return {
    allowed: finalScore < 60,
    score: finalScore,
    reason: reasons.join(', ') || undefined,
  };
}

/**
 * Combined spam check: frequency + content.
 * Returns allowed=false if either check fails.
 */
export function spamCheck(
  key: string,
  content: string,
  windowMs: number,
  maxCount: number
): SpamCheckResult {
  const freq = checkFrequency(key, windowMs, maxCount);
  if (!freq.allowed) {
    return { allowed: false, score: 100, reason: 'rate limit exceeded' };
  }

  const contentResult = scoreContent(content);
  return contentResult;
}

/**
 * Strips HTML tags and encodes the five critical characters for XSS prevention.
 * Safe to use on any user-supplied string before storing or returning it.
 */
export function sanitizeText(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '')          // strip HTML tags
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
    .slice(0, 10000);
}
