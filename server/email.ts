import nodemailer from 'nodemailer';

const SMTP_HOST = 'smtp-pulse.com';
const SMTP_PORT = 465;
const SMTP_USER = process.env.SENDPULSE_SMTP_USERNAME!;
const SMTP_PASS = process.env.SENDPULSE_SMTP_PASSWORD!;

const SENDPULSE_API_ID = process.env.SENDPULSE_API_ID;
const SENDPULSE_API_KEY = process.env.SENDPULSE_API_KEY;

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
  return transporter;
}

let cachedApiToken: { token: string; expiresAt: number } | null = null;

async function getApiAccessToken(): Promise<string | null> {
  if (!SENDPULSE_API_ID || !SENDPULSE_API_KEY) return null;

  if (cachedApiToken && cachedApiToken.expiresAt > Date.now()) {
    return cachedApiToken.token;
  }

  try {
    const res = await fetch('https://api.sendpulse.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: SENDPULSE_API_ID,
        client_secret: SENDPULSE_API_KEY,
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    cachedApiToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 60) * 1000,
    };
    return cachedApiToken.token;
  } catch {
    return null;
  }
}

async function sendViaApi(to: string, subject: string, html: string, fromEmail: string, fromName: string): Promise<boolean> {
  const token = await getApiAccessToken();
  if (!token) return false;

  try {
    const res = await fetch('https://api.sendpulse.com/smtp/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: {
          subject,
          html,
          from: { name: fromName, email: fromEmail },
          to: [{ email: to }],
        },
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`SendPulse REST API error: ${res.status} ${errorText}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error('SendPulse REST API failed:', err);
    return false;
  }
}

async function sendViaSmtp(to: string, subject: string, html: string, fromEmail: string, fromName: string): Promise<boolean> {
  try {
    const transport = getTransporter();
    await transport.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (err) {
    console.error('SMTP send failed:', err);
    return false;
  }
}

interface EmailTemplates {
  [lang: string]: {
    subject: string;
    heading: string;
    message: string;
    buttonText: string;
    footer: string;
  };
}

const verificationTemplates: EmailTemplates = {
  ru: {
    subject: 'Подтвердите вашу регистрацию — ChefNet Invest',
    heading: 'Подтвердите вашу регистрацию',
    message: 'Перейдите по ссылке ниже, чтобы подтвердить вашу учетную запись и начать инвестировать.',
    buttonText: 'Подтвердить email',
    footer: 'Если вы не регистрировались на ChefNet Invest, проигнорируйте это письмо.',
  },
  en: {
    subject: 'Confirm your registration — ChefNet Invest',
    heading: 'Confirm your registration',
    message: 'Click the link below to verify your account and start investing.',
    buttonText: 'Confirm email',
    footer: 'If you did not register on ChefNet Invest, please ignore this email.',
  },
  de: {
    subject: 'Bestätigen Sie Ihre Registrierung — ChefNet Invest',
    heading: 'Bestätigen Sie Ihre Registrierung',
    message: 'Klicken Sie auf den Link unten, um Ihr Konto zu bestätigen und mit dem Investieren zu beginnen.',
    buttonText: 'E-Mail bestätigen',
    footer: 'Wenn Sie sich nicht bei ChefNet Invest registriert haben, ignorieren Sie diese E-Mail.',
  },
  es: {
    subject: 'Confirma tu registro — ChefNet Invest',
    heading: 'Confirma tu registro',
    message: 'Haz clic en el enlace de abajo para verificar tu cuenta y comenzar a invertir.',
    buttonText: 'Confirmar email',
    footer: 'Si no te registraste en ChefNet Invest, ignora este correo.',
  },
  tr: {
    subject: 'Kaydınızı onaylayın — ChefNet Invest',
    heading: 'Kaydınızı onaylayın',
    message: 'Hesabınızı doğrulamak ve yatırım yapmaya başlamak için aşağıdaki bağlantıya tıklayın.',
    buttonText: 'E-postayı onayla',
    footer: 'ChefNet Invest\'e kayıt olmadıysanız, bu e-postayı dikkate almayın.',
  },
};

function buildVerificationHtml(verifyUrl: string, firstName: string, lang: string = 'ru'): string {
  const t = verificationTemplates[lang] || verificationTemplates.ru;
  
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#D4522A,#E8744F);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">ChefNet Invest</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 8px;color:#1a1a1a;font-size:22px;font-weight:700;">${t.heading}</h2>
            <p style="margin:0 0 24px;color:#666;font-size:15px;line-height:1.6;">
              ${firstName ? `${firstName}, ` : ''}${t.message}
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center" style="padding:8px 0 32px;">
                <a href="${verifyUrl}" style="display:inline-block;padding:14px 40px;background:linear-gradient(135deg,#D4522A,#E8744F);color:#ffffff;text-decoration:none;border-radius:12px;font-size:16px;font-weight:600;box-shadow:0 4px 16px rgba(212,82,42,0.3);">
                  ${t.buttonText}
                </a>
              </td></tr>
            </table>
            <p style="margin:0;color:#999;font-size:13px;line-height:1.5;">${t.footer}</p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#fafafa;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
            <p style="margin:0;color:#aaa;font-size:12px;">ChefNet Invest &copy; 2026</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendVerificationEmail(
  to: string,
  firstName: string,
  verifyUrl: string,
  lang: string = 'ru'
): Promise<boolean> {
  const t = verificationTemplates[lang] || verificationTemplates.ru;
  const html = buildVerificationHtml(verifyUrl, firstName, lang);
  const fromEmail = SMTP_USER || 'no-reply@chefnet.ai';
  const fromName = 'ChefNet Invest';

  const apiSent = await sendViaApi(to, t.subject, html, fromEmail, fromName);
  if (apiSent) {
    console.log(`Verification email sent to ${to} via REST API`);
    return true;
  }

  console.log('REST API failed, falling back to SMTP...');
  const smtpSent = await sendViaSmtp(to, t.subject, html, fromEmail, fromName);
  if (smtpSent) {
    console.log(`Verification email sent to ${to} via SMTP`);
    return true;
  }

  console.error(`Failed to send verification email to ${to} via both REST API and SMTP`);
  return false;
}

export async function verifySmtpConnection(): Promise<boolean> {
  try {
    if (SMTP_USER && SMTP_PASS) {
      const transport = getTransporter();
      await transport.verify();
      console.log('SMTP connection verified successfully');
      return true;
    }

    const token = await getApiAccessToken();
    if (token) {
      console.log('SendPulse API connection verified successfully');
      return true;
    }

    console.warn('No email transport configured');
    return false;
  } catch (error) {
    console.error('Email connection verification failed:', error);
    return false;
  }
}
