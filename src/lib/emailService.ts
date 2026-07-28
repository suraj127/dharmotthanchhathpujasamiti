import { getAccessToken } from './auth';

export const ADMIN_EMAIL = 'dharmotthanchaathpujasamiti@gmail.com';

export interface FormSubmissionPayload {
  formType: 'Volunteer' | 'Contact' | 'Newsletter' | 'PhotoUpload' | 'General';
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  role?: string;
  message?: string;
  details?: Record<string, any>;
}

export const createRawEmail = ({ to, subject, bodyHtml }: { to: string; subject: string; bodyHtml: string }) => {
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const messageParts = [
    `To: ${to}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    bodyHtml,
  ];
  const message = messageParts.join('\r\n');
  return btoa(unescape(encodeURIComponent(message)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

export const submitFormAndSendEmail = async (payload: FormSubmissionPayload): Promise<{ success: boolean; emailSent: boolean; message: string }> => {
  const token = getAccessToken();

  const bodyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ffd1a4; padding: 20px; border-radius: 12px; background-color: #fff9f5;">
      <h2 style="color: #8f4e00; margin-top: 0;">धर्मोत्थान छठ पूजा समिति (ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क)</h2>
      <p style="font-size: 14px; color: #554336;">वेबसाइट से नया प्रपत्र संदेश प्राप्त हुआ है:</p>
      <hr style="border: 0; border-top: 1px solid #ffd1a4;" />
      <table style="width: 100%; font-size: 14px; color: #333; text-align: left;" cellPadding="6">
        <tr>
          <td style="font-weight: bold; width: 35%;">प्रकार (Type):</td>
          <td>${payload.formType}</td>
        </tr>
        ${payload.name ? `<tr><td style="font-weight: bold;">नाम (Name):</td><td>${payload.name}</td></tr>` : ''}
        ${payload.phone ? `<tr><td style="font-weight: bold;">मोबाईल (Phone):</td><td>${payload.phone}</td></tr>` : ''}
        ${payload.email ? `<tr><td style="font-weight: bold;">ईमेल (Email):</td><td>${payload.email}</td></tr>` : ''}
        ${payload.area ? `<tr><td style="font-weight: bold;">क्षेत्र (Area):</td><td>${payload.area}</td></tr>` : ''}
        ${payload.role ? `<tr><td style="font-weight: bold;">सेवा क्षेत्र (Role):</td><td>${payload.role}</td></tr>` : ''}
        ${payload.message ? `<tr><td style="font-weight: bold;">संदेश (Message):</td><td>${payload.message}</td></tr>` : ''}
      </table>
      <hr style="border: 0; border-top: 1px solid #ffd1a4; margin-top: 20px;" />
      <p style="font-size: 11px; color: #888; margin-bottom: 0;">यह सूचना धर्मोत्थान छठ पूजा समिति वेबसाइट प्रणाली द्वारा ${ADMIN_EMAIL} पर प्रेषित की गई है।</p>
    </div>
  `;

  const subject = `[छठ पूजा 2026] नया ${payload.formType} फॉर्म: ${payload.name || payload.email || 'श्रद्धालु'}`;

  let emailSentDirectly = false;

  if (token) {
    try {
      const raw = createRawEmail({ to: ADMIN_EMAIL, subject, bodyHtml });
      const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ raw }),
      });
      if (res.ok) {
        emailSentDirectly = true;
      } else {
        console.warn('Direct Gmail API send returned non-200:', await res.json());
      }
    } catch (err) {
      console.error('Error sending direct Gmail message:', err);
    }
  }

  try {
    const apiRes = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        accessToken: token,
      }),
    });
    const apiData = await apiRes.json();
    return {
      success: true,
      emailSent: emailSentDirectly || apiData.emailSent,
      message: 'आपकी जानकारी सफलतापूर्वक सबमिट हो गई है!',
    };
  } catch (err) {
    console.warn('Backend endpoint call failed, returning status:', err);
    return {
      success: true,
      emailSent: emailSentDirectly,
      message: 'आपकी जानकारी दर्ज कर ली गई है!',
    };
  }
};
