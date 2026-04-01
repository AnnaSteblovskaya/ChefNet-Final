import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';

// ─── Common schemas ────────────────────────────────────────────────────────

const emailSchema = z
  .string()
  .email('Invalid email address')
  .max(254)
  .transform((v) => v.toLowerCase().trim());

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password too long');

const uuidSchema = z.string().uuid('Invalid ID format');

const nameSchema = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[^<>'"&;{}()\[\]\\]+$/, 'Name contains invalid characters')
  .transform((v) => v.trim());

const phoneSchema = z
  .string()
  .max(30)
  .regex(/^[+\d\s\-().]{0,30}$/, 'Invalid phone number')
  .optional();

// ─── Auth schemas ──────────────────────────────────────────────────────────

export const registerSchema = z.object({
  email: emailSchema,
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  referralCode: z
    .string()
    .max(50)
    .regex(/^[A-Z0-9\-]{0,50}$/)
    .optional(),
  recaptchaToken: z.string().optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  recaptchaToken: z.string().optional(),
});

// Regex that blocks the five HTML-dangerous chars
const NO_HTML_RE = /^[^<>"'&]*$/;

// ─── Profile schema ────────────────────────────────────────────────────────

export const updateProfileSchema = z.object({
  email: emailSchema.optional(),
  full_name: nameSchema.optional(),
  phone: phoneSchema,
  country: z
    .string()
    .max(100)
    .regex(NO_HTML_RE, 'Country contains invalid characters')
    .transform((v) => v.trim())
    .optional(),
  address: z
    .string()
    .max(500)
    .regex(NO_HTML_RE, 'Address contains invalid characters')
    .transform((v) => v.trim())
    .optional(),
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD')
    .optional(),
  nationality: z
    .string()
    .max(100)
    .regex(NO_HTML_RE, 'Nationality contains invalid characters')
    .transform((v) => v.trim())
    .optional(),
  zip_code: z
    .string()
    .max(20)
    .regex(/^[A-Za-z0-9\s\-]{0,20}$/, 'Invalid zip code format')
    .optional(),
});

// ─── Investment schema ────────────────────────────────────────────────────

export const createInvestmentSchema = z.object({
  round: z.string().min(1).max(100),
  shares: z.number().int().positive().max(10_000_000),
  amount: z.number().positive().max(1_000_000_000),
  payment_method: z.enum(['bank', 'crypto']).default('bank'),
  crypto_network: z.string().max(50).optional(),
  bank_type: z.enum(['us', 'international']).optional(),
  tx_hash: z
    .string()
    .max(128)
    .regex(/^[a-fA-F0-9x]{0,128}$/)
    .optional(),
});

// ─── File upload schema ───────────────────────────────────────────────────

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export function validateFileUpload(
  file: Express.Multer.File | undefined,
  res: Response
): boolean {
  if (!file) {
    res.status(400).json({ error: 'No file provided' });
    return false;
  }
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    res.status(400).json({ error: 'File type not allowed' });
    return false;
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    res.status(400).json({ error: 'File size exceeds 10 MB limit' });
    return false;
  }
  // Check magic bytes for PDF
  if (file.mimetype === 'application/pdf') {
    if (!file.buffer.slice(0, 4).toString('ascii').startsWith('%PDF')) {
      res.status(400).json({ error: 'Invalid PDF file' });
      return false;
    }
  }
  return true;
}

// ─── Admin schemas ────────────────────────────────────────────────────────

export const adminInvestmentActionSchema = z.object({
  action: z.enum(['confirm', 'reject', 'complete']),
  investmentId: z.number().int().positive(),
});

export const settingSchema = z.object({
  key: z.string().min(1).max(200).regex(/^[a-z0-9_]+$/),
  value: z.string().max(5000),
});

// ─── Middleware factory ───────────────────────────────────────────────────

export function validate<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      res.status(400).json({ error: 'Validation failed', details: errors });
      return;
    }
    req.body = result.data;
    next();
  };
}

export function validateQuery<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      res.status(400).json({ error: 'Validation failed', details: errors });
      return;
    }
    req.query = result.data as any;
    next();
  };
}
