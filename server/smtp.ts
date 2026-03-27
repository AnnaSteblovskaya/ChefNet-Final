import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const secure = process.env.SMTP_SECURE !== 'false';
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export function isSmtpConfigured(): boolean {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendEmailViaSMTP(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  const transport = getTransporter();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@chefnet.ai';
  await transport.sendMail({ from, to, subject, html });
  console.log(`[SMTP] Email sent to ${to} — ${subject}`);
}
