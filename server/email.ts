import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp-pulse.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDPULSE_SMTP_USERNAME,
    pass: process.env.SENDPULSE_SMTP_PASSWORD,
  },
});

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
  
  try {
    await transporter.sendMail({
      from: '"ChefNet Invest" <no-reply@chefnet.ai>',
      to,
      subject: t.subject,
      html: buildVerificationHtml(verifyUrl, firstName, lang),
    });
    console.log(`Verification email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return false;
  }
}

export async function verifySmtpConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('SMTP connection failed:', error);
    return false;
  }
}
