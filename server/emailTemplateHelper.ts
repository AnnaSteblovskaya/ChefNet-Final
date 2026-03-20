import { getUncachableGmailClient } from './gmail.js';

function buildRawEmail(to: string, subject: string, html: string): string {
  const safeTo = to.replace(/[\r\n]/g, '');
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

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildTemplateHtml(subject: string, body: string, name: string): string {
  const escapedBody = escapeHtml(body).replace(/\n/g, '<br>');
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
            <h2 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:700;">${escapeHtml(subject)}</h2>
            <p style="margin:0 0 24px;color:#444;font-size:15px;line-height:1.7;">${escapedBody}</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center" style="padding:8px 0 24px;">
                <a href="https://chefnet.ai" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#D4522A,#E8744F);color:#ffffff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:600;box-shadow:0 4px 16px rgba(212,82,42,0.3);">
                  Открыть личный кабинет
                </a>
              </td></tr>
            </table>
            <p style="margin:0;color:#999;font-size:13px;">Вопросы? Напишите нам на <a href="mailto:support@chefnet.ai" style="color:#D4522A;">support@chefnet.ai</a></p>
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

export async function buildAndSendTemplateEmail(
  to: string,
  subject: string,
  body: string,
  name: string
): Promise<boolean> {
  try {
    const html = buildTemplateHtml(subject, body, name);
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

    console.log(`[template-email] Sent "${subject}" to ${to}`);
    return true;
  } catch (err) {
    console.error('[template-email] Failed:', err);
    return false;
  }
}
