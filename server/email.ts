import { getUncachableGmailClient } from './gmail.js';

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
              ${firstName ? `${escapeHtml(firstName)}, ` : ''}${t.message}
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

function sanitizeEmail(email: string): string {
  return email.replace(/[\r\n]/g, '');
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildRawEmail(to: string, subject: string, html: string): string {
  const safeTo = sanitizeEmail(to);
  const boundary = 'boundary_' + Date.now().toString(36);
  const lines = [
    `To: ${safeTo}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(html).toString('base64'),
    '',
    `--${boundary}--`,
  ];
  return lines.join('\r\n');
}

const resetPasswordTemplates: EmailTemplates = {
  ru: {
    subject: 'Сброс пароля — ChefNet Invest',
    heading: 'Сброс пароля',
    message: 'Перейдите по ссылке ниже, чтобы задать новый пароль. Ссылка действительна 1 час.',
    buttonText: 'Сбросить пароль',
    footer: 'Если вы не запрашивали сброс пароля, проигнорируйте это письмо.',
  },
  en: {
    subject: 'Password Reset — ChefNet Invest',
    heading: 'Reset your password',
    message: 'Click the link below to set a new password. The link is valid for 1 hour.',
    buttonText: 'Reset password',
    footer: 'If you did not request a password reset, please ignore this email.',
  },
  de: {
    subject: 'Passwort zurücksetzen — ChefNet Invest',
    heading: 'Passwort zurücksetzen',
    message: 'Klicken Sie auf den Link unten, um ein neues Passwort festzulegen. Der Link ist 1 Stunde gültig.',
    buttonText: 'Passwort zurücksetzen',
    footer: 'Wenn Sie keine Passwortzurücksetzung angefordert haben, ignorieren Sie diese E-Mail.',
  },
  es: {
    subject: 'Restablecer contraseña — ChefNet Invest',
    heading: 'Restablecer contraseña',
    message: 'Haz clic en el enlace de abajo para establecer una nueva contraseña. El enlace es válido por 1 hora.',
    buttonText: 'Restablecer contraseña',
    footer: 'Si no solicitaste un restablecimiento de contraseña, ignora este correo.',
  },
  tr: {
    subject: 'Şifre Sıfırlama — ChefNet Invest',
    heading: 'Şifrenizi sıfırlayın',
    message: 'Yeni bir şifre belirlemek için aşağıdaki bağlantıya tıklayın. Bağlantı 1 saat geçerlidir.',
    buttonText: 'Şifreyi sıfırla',
    footer: 'Şifre sıfırlama talebinde bulunmadıysanız bu e-postayı dikkate almayın.',
  },
};

function buildResetPasswordHtml(resetUrl: string, firstName: string, lang: string = 'ru'): string {
  const t = resetPasswordTemplates[lang] || resetPasswordTemplates.ru;

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
              ${firstName ? `${escapeHtml(firstName)}, ` : ''}${t.message}
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center" style="padding:8px 0 32px;">
                <a href="${resetUrl}" style="display:inline-block;padding:14px 40px;background:linear-gradient(135deg,#D4522A,#E8744F);color:#ffffff;text-decoration:none;border-radius:12px;font-size:16px;font-weight:600;box-shadow:0 4px 16px rgba(212,82,42,0.3);">
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

export async function sendPasswordResetEmail(
  to: string,
  firstName: string,
  resetUrl: string,
  lang: string = 'ru'
): Promise<boolean> {
  const t = resetPasswordTemplates[lang] || resetPasswordTemplates.ru;
  const html = buildResetPasswordHtml(resetUrl, firstName, lang);

  try {
    const gmail = await getUncachableGmailClient();
    const raw = buildRawEmail(to, t.subject, html);
    const encodedMessage = Buffer.from(raw)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    });

    console.log(`Password reset email sent to ${to} via Gmail API`);
    return true;
  } catch (err) {
    console.error('Failed to send password reset email via Gmail:', err);
    return false;
  }
}

export async function sendVerificationEmail(
  to: string,
  firstName: string,
  verifyUrl: string,
  lang: string = 'ru'
): Promise<boolean> {
  const t = verificationTemplates[lang] || verificationTemplates.ru;
  const html = buildVerificationHtml(verifyUrl, firstName, lang);

  try {
    const gmail = await getUncachableGmailClient();
    const raw = buildRawEmail(to, t.subject, html);
    const encodedMessage = Buffer.from(raw)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    });

    console.log(`Verification email sent to ${to} via Gmail API`);
    return true;
  } catch (err) {
    console.error('Failed to send verification email via Gmail:', err);
    return false;
  }
}

export type ReferralNotificationType = 'registered' | 'kyc_approved' | 'investment';

function buildReferralNotificationHtml(
  type: ReferralNotificationType,
  partnerName: string,
  partnerEmail: string,
  extra?: { shares?: number; amount?: number; round?: string }
): string {
  const content: Record<ReferralNotificationType, { heading: string; message: string }> = {
    registered: {
      heading: 'Новый партнёр зарегистрировался по вашей ссылке!',
      message: `По вашей реферальной ссылке зарегистрировался новый партнёр:<br><br>
        <strong>${escapeHtml(partnerName || partnerEmail)}</strong>${partnerEmail ? ` (${escapeHtml(partnerEmail)})` : ''}<br><br>
        Когда партнёр пройдёт верификацию и купит доли — вы получите 10% комиссию в акциях.`,
    },
    kyc_approved: {
      heading: 'Ваш партнёр прошёл верификацию личности!',
      message: `Ваш реферальный партнёр успешно прошёл KYC-верификацию:<br><br>
        <strong>${escapeHtml(partnerName || partnerEmail)}</strong>${partnerEmail ? ` (${escapeHtml(partnerEmail)})` : ''}<br><br>
        Теперь партнёр может покупать инвестиционные доли. Как только он это сделает — вы получите 10% комиссию в акциях.`,
    },
    investment: {
      heading: 'Ваш партнёр купил доли — вы получили бонус!',
      message: `Ваш реферальный партнёр совершил инвестицию:<br><br>
        <strong>${escapeHtml(partnerName || partnerEmail)}</strong>${partnerEmail ? ` (${escapeHtml(partnerEmail)})` : ''}<br><br>
        ${extra?.shares ? `Куплено долей: <strong>${extra.shares}</strong><br>` : ''}
        ${extra?.amount ? `Сумма: <strong>$${extra.amount}</strong><br>` : ''}
        ${extra?.round ? `Раунд: <strong>${escapeHtml(extra.round)}</strong><br>` : ''}
        <br>Вы получили <strong>10% комиссию</strong> в виде акций ChefNet Invest. Проверьте ваш личный кабинет.`,
    },
  };

  const { heading, message } = content[type];

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
            <h2 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:700;">${heading}</h2>
            <p style="margin:0 0 24px;color:#444;font-size:15px;line-height:1.7;">${message}</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center" style="padding:8px 0 24px;">
                <a href="https://chefnet.replit.app" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#D4522A,#E8744F);color:#ffffff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:600;box-shadow:0 4px 16px rgba(212,82,42,0.3);">
                  Открыть личный кабинет
                </a>
              </td></tr>
            </table>
            <p style="margin:0;color:#999;font-size:13px;line-height:1.5;">Это автоматическое уведомление. Если у вас есть вопросы — напишите нам на <a href="mailto:support@chefnet.ai" style="color:#D4522A;">support@chefnet.ai</a></p>
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

export async function sendReferralNotificationEmail(
  to: string,
  type: ReferralNotificationType,
  partnerName: string,
  partnerEmail: string,
  extra?: { shares?: number; amount?: number; round?: string }
): Promise<boolean> {
  const subjects: Record<ReferralNotificationType, string> = {
    registered: '🎉 Новый партнёр зарегистрировался по вашей ссылке — ChefNet Invest',
    kyc_approved: '✅ Ваш партнёр прошёл верификацию — ChefNet Invest',
    investment: '💰 Ваш партнёр купил доли, вам начислен бонус — ChefNet Invest',
  };

  const html = buildReferralNotificationHtml(type, partnerName, partnerEmail, extra);

  try {
    const gmail = await getUncachableGmailClient();
    const raw = buildRawEmail(to, subjects[type], html);
    const encodedMessage = Buffer.from(raw)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    });

    console.log(`[referral-notify] ${type} → ${to}`);
    return true;
  } catch (err) {
    console.error(`[referral-notify] Failed to send ${type} email to ${to}:`, err);
    return false;
  }
}

export async function sendNewsNotificationEmail(
  to: string,
  newsTitle: string,
  newsBody: string,
  newsDate: string
): Promise<boolean> {
  const subject = `📰 Новость ChefNet Invest: ${newsTitle}`;

  const safeTitle = escapeHtml(newsTitle);
  const safeBody = escapeHtml(newsBody).replace(/\n/g, '<br>');
  const safeDate = escapeHtml(newsDate);

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#D4522A,#E8744F);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">ChefNet Invest</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Новость платформы</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;color:#999;font-size:13px;">${safeDate}</p>
            <h2 style="margin:0 0 20px;color:#1a1a1a;font-size:20px;font-weight:700;">${safeTitle}</h2>
            <p style="margin:0 0 28px;color:#444;font-size:15px;line-height:1.7;">${safeBody}</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center" style="padding:4px 0 24px;">
                <a href="https://chefnet.replit.app" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#D4522A,#E8744F);color:#ffffff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:600;box-shadow:0 4px 16px rgba(212,82,42,0.3);">
                  Открыть личный кабинет
                </a>
              </td></tr>
            </table>
            <p style="margin:0;color:#999;font-size:13px;line-height:1.5;">Это автоматическое уведомление. Если у вас есть вопросы — напишите нам на <a href="mailto:support@chefnet.ai" style="color:#D4522A;">support@chefnet.ai</a></p>
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

  try {
    const gmail = await getUncachableGmailClient();
    const raw = buildRawEmail(to, subject, html);
    const encodedMessage = Buffer.from(raw)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    });

    console.log(`[news-notify] sent to ${to}`);
    return true;
  } catch (err) {
    console.error(`[news-notify] Failed to send to ${to}:`, err);
    return false;
  }
}

export async function verifySmtpConnection(): Promise<boolean> {
  try {
    const gmail = await getUncachableGmailClient();
    if (gmail) {
      console.log('Gmail API connection verified successfully');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Gmail connection verification failed:', error);
    return false;
  }
}
