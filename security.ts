import type { Express, Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import hpp from 'hpp';

// ─── Rate limit stores ─────────────────────────────────────────────────────

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

const authSlowDown = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 5,
  delayMs: (used) => (used - 5) * 300,
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  // Admin endpoints now have their own limiter — no longer skipped
});

const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

const uploadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Upload rate limit exceeded.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const investmentCreateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many investment requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const profileUpdateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many profile update requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many password reset requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const verificationEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many verification email requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const kycTokenLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many KYC token requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Blocked User-Agent patterns ───────────────────────────────────────────

const BLOCKED_UA_PATTERNS = [
  /sqlmap/i, /nikto/i, /nessus/i, /masscan/i, /nmap/i,
  /zgrab/i, /dirbuster/i, /gobuster/i, /wfuzz/i, /hydra/i,
  /burpsuite/i, /acunetix/i, /appscan/i,
];

// ─── Blocked path patterns (WAF light) ────────────────────────────────────

const BLOCKED_PATH_PATTERNS = [
  /\.\.\//, /\.\.\\/, /\/etc\/passwd/, /\/proc\/self/,
  /\/wp-admin/, /\/wp-login/, /\/phpmyadmin/i, /\/admin\.php/i,
  /\.php$/, /\.asp$/, /\.aspx$/, /\.env$/,
  /<script/i, /javascript:/i, /vbscript:/i,
  /union.*select/i, /select.*from/i, /insert.*into/i,
  /drop.*table/i, /delete.*from/i,
];

// ─── Block scanning probes ─────────────────────────────────────────────────

function wafMiddleware(req: Request, res: Response, next: NextFunction): void {
  const ua = req.headers['user-agent'] || '';
  if (BLOCKED_UA_PATTERNS.some((p) => p.test(ua))) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  const fullPath = req.path + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
  if (BLOCKED_PATH_PATTERNS.some((p) => p.test(fullPath))) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  // Block prototype pollution attempts in JSON body (check own properties only)
  const body = req.body;
  if (body && typeof body === 'object') {
    const keys = Object.keys(body);
    if (keys.includes('__proto__') || keys.includes('constructor') || keys.includes('prototype')) {
      res.status(400).json({ error: 'Bad Request' });
      return;
    }
  }

  next();
}

// ─── NoSQL / $ operator blocker ────────────────────────────────────────────

function blockNoSqlInjection(obj: unknown): boolean {
  if (obj === null || typeof obj !== 'object') return false;
  for (const key of Object.keys(obj as Record<string, unknown>)) {
    if (key.startsWith('$')) return true;
    if (blockNoSqlInjection((obj as Record<string, unknown>)[key])) return true;
  }
  return false;
}

function noSqlMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (req.body && blockNoSqlInjection(req.body)) {
    res.status(400).json({ error: 'Bad Request' });
    return;
  }
  next();
}

// ─── CSP nonce middleware ──────────────────────────────────────────────────

function cspNonceMiddleware(req: Request, res: Response, next: NextFunction): void {
  res.locals.cspNonce = crypto.randomBytes(16).toString('base64');
  next();
}

// ─── Security headers (helmet) ────────────────────────────────────────────
// Uses per-request nonce instead of 'unsafe-inline' for scriptSrc.
// styleSrc keeps 'unsafe-inline' because Vite injects inline styles.

function createHelmetMiddleware() {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          // nonce is injected per-request via the callback
          ((_req: any, res: any) => `'nonce-${res.locals?.cspNonce || ''}'`),
          "'strict-dynamic'",
          'https://www.google.com',
          'https://www.gstatic.com',
          'https://api.sumsub.com',
          'https://sdwlngwkeipgwelzxfai.supabase.co',
        ],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https:', 'http:'],
        connectSrc: [
          "'self'",
          'https://sdwlngwkeipgwelzxfai.supabase.co',
          'wss://sdwlngwkeipgwelzxfai.supabase.co',
          'https://api.sumsub.com',
          'https://www.google.com',
        ],
        frameSrc: [
          "'self'",
          'https://www.google.com',
          'https://api.sumsub.com',
        ],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  });
}

// ─── CORS configuration ────────────────────────────────────────────────────

const ALLOWED_ORIGINS = [
  'https://chefnet.ai',
  'https://www.chefnet.ai',
  process.env.VITE_SITE_URL,
  process.env.NODE_ENV !== 'production' ? 'http://localhost:5173' : undefined,
  process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : undefined,
].filter(Boolean) as string[];

export function corsOptions(
  req: Request,
  callback: (err: Error | null, options?: { origin: boolean; credentials: boolean }) => void
): void {
  const origin = req.headers.origin || '';
  const allowed =
    !origin ||
    ALLOWED_ORIGINS.includes(origin) ||
    process.env.NODE_ENV !== 'production';
  callback(null, { origin: allowed, credentials: true });
}

// ─── Apply all security middleware ─────────────────────────────────────────

export function applySecurityMiddleware(app: Express): void {
  app.set('trust proxy', 1);

  app.use(cspNonceMiddleware);
  app.use(createHelmetMiddleware());
  app.use(hpp());
  app.use(noSqlMiddleware);
  app.use(wafMiddleware);

  app.use('/api/auth', authLimiter, authSlowDown);
  app.use('/api/register', authLimiter, authSlowDown);
  app.use('/api/admin', adminLimiter);
  app.use('/api/documents', uploadLimiter);
  app.use('/api/', apiLimiter);
}

export {
  authLimiter,
  apiLimiter,
  investmentCreateLimiter,
  profileUpdateLimiter,
  passwordResetLimiter,
  verificationEmailLimiter,
  kycTokenLimiter,
};
