import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

const ADMIN_EMAIL = 'dharmotthanchaathpujasamiti@gmail.com';

// Helper function to find or create a Google Drive folder
async function findOrCreateFolder(token: string, folderName: string): Promise<string | null> {
  try {
    const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
      `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`
    )}`;
    const searchRes = await fetch(searchUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.files && searchData.files.length > 0) {
        return searchData.files[0].id;
      }
    }

    const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder'
      })
    });
    if (createRes.ok) {
      const createData = await createRes.json();
      return createData.id;
    } else {
      console.error('[Drive API] Error creating folder:', await createRes.text());
    }
  } catch (error) {
    console.error('[Drive API] Exception finding/creating folder:', error);
  }
  return null;
}

// Helper function to upload binary content to Google Drive inside a folder
async function uploadFileToDrive(
  token: string,
  filename: string,
  mimeType: string,
  fileBuffer: Buffer,
  folderId?: string
): Promise<string | null> {
  try {
    const boundary = 'foo_bar_boundary';
    const metadata: any = {
      name: filename,
      mimeType: mimeType
    };
    if (folderId) {
      metadata.parents = [folderId];
    }

    const header = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n\r\n--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`;
    const footer = `\r\n--${boundary}--`;

    const bodyBuffer = Buffer.concat([
      Buffer.from(header, 'utf-8'),
      fileBuffer,
      Buffer.from(footer, 'utf-8')
    ]);

    const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`
      },
      body: bodyBuffer
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`[Drive API] Uploaded file: ${filename} (ID: ${data.id})`);
      return data.id;
    } else {
      console.error('[Drive API] Upload failed:', await res.text());
    }
  } catch (error) {
    console.error('[Drive API] Upload exception:', error);
  }
  return null;
}

// Generate beautiful HTML for official receipts
function generateReceiptHtml(receipt: any): string {
  return `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>दान रसीद - ${receipt.receiptNo}</title>
  <style>
    body { font-family: 'Arial', sans-serif; background-color: #fcf8f2; color: #333; margin: 0; padding: 20px; }
    .receipt-container { max-width: 650px; margin: 0 auto; background: #fff; border: 4px solid #8f4e00; border-radius: 16px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); position: relative; }
    .header { text-align: center; border-bottom: 2px solid #ffd1a4; padding-bottom: 15px; margin-bottom: 20px; }
    .header h1 { color: #8f4e00; margin: 5px 0; font-size: 26px; }
    .header p { margin: 3px 0; font-size: 13px; color: #554336; font-weight: bold; }
    .title-badge { display: inline-block; background: #8f4e00; color: #fff; padding: 6px 20px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-top: 10px; text-transform: uppercase; }
    .meta-row { display: flex; justify-content: space-between; font-size: 13px; border-bottom: 1px solid #ffd1a4; padding: 10px 0; font-family: monospace; }
    .receipt-no { color: #b6171e; font-weight: bold; }
    .details-table { width: 100%; margin: 20px 0; border-collapse: collapse; }
    .details-table td { padding: 12px 10px; border-bottom: 1px dashed #ffd1a4; font-size: 14px; }
    .details-table td.label { font-weight: bold; color: #8f4e00; width: 30%; }
    .details-table td.value { font-weight: 500; }
    .amount { font-size: 20px; color: #b6171e; font-weight: bold; }
    .footer { display: flex; justify-content: space-between; align-items: center; margin-top: 30px; border-top: 2px solid #ffd1a4; padding-top: 15px; }
    .devotional { font-style: italic; color: #8f4e00; font-weight: bold; font-size: 13px; }
    .stamp { width: 110px; height: 110px; border: 2px dashed #b6171e; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: #b6171e; font-size: 9px; font-weight: bold; transform: rotate(-5deg); background: #fffcf9; }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="header">
      <div style="font-size: 11px; font-weight: bold; color: #b6171e; margin-bottom: 5px;">॥ श्री गणेशाय नमः ॥ जय छठी मैया ॥</div>
      <h1>धर्मोत्थान छठ पूजा समिति</h1>
      <p>ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क, नई दिल्ली – 110059</p>
      <div class="title-badge">आधिकारिक दान एवं सहयोग रसीद</div>
    </div>
    
    <div class="meta-row">
      <div><strong>रसीद सं. (Receipt No):</strong> <span class="receipt-no">${receipt.receiptNo}</span></div>
      <div><strong>दिनांक:</strong> ${receipt.date} ${receipt.time || ''}</div>
    </div>
    
    <table class="details-table">
      <tr>
        <td class="label">दानदाता का नाम:</td>
        <td class="value" style="font-size: 16px; font-weight: bold; text-transform: uppercase;">${receipt.name}</td>
      </tr>
      <tr>
        <td class="label">संपर्क व पता:</td>
        <td class="value">${receipt.address} (मो. ${receipt.phone})</td>
      </tr>
      <tr>
        <td class="label">सहयोग राशि:</td>
        <td class="value"><span class="amount">₹${parseFloat(receipt.amount).toLocaleString('hi-IN')}/-</span></td>
      </tr>
      <tr>
        <td class="label">भुगतान माध्यम:</td>
        <td class="value" style="font-family: monospace;">UPI | UTR/Ref: ${receipt.utr}</td>
      </tr>
      <tr>
        <td class="label">सहयोग हेतु:</td>
        <td class="value">${receipt.purpose}</td>
      </tr>
    </table>
    
    <div class="footer">
      <div class="devotional">
        <p style="margin: 0;">॥ छठी मैया की कृपा आप पर सदा बनी रहे ॥</p>
        <p style="margin: 5px 0 0 0; font-size: 10px; color: #666; font-weight: normal; font-style: normal;">यह कंप्यूटर जनित आधिकारिक दान रसीद है।</p>
      </div>
      
      <div class="stamp">
        <span style="font-size: 7px; margin-bottom: 3px;">धर्मोत्थान छठ पूजा समिति</span>
        <span style="font-size: 16px;">✓</span>
        <span style="color: #059669; font-size: 8px; margin-top: 3px;">स्वीकृत</span>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// API Route for receiving form submissions, notifying admin via Gmail, and storing files/receipts in Google Drive
app.post('/api/submissions', async (req, res) => {
  try {
    const { formType, name, phone, email, area, role, message, details, accessToken } = req.body;

    console.log(`[Form Submission Received] Type: ${formType}, Name: ${name || 'N/A'}, Contact: ${phone || email || 'N/A'}`);

    const token = accessToken || process.env.GOOGLE_ACCESS_TOKEN || process.env.GMAIL_ACCESS_TOKEN;
    let sentSuccess = false;
    let emailError = null;
    let driveFileId: string | null = null;
    let driveScreenshotId: string | null = null;

    if (token) {
      // 1. Gmail notifications
      try {
        const subject = `[छठ पूजा 2026] नया ${formType} फॉर्म: ${name || email || 'श्रद्धालु'}`;
        const bodyHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ffd1a4; padding: 20px; border-radius: 12px; background-color: #fff9f5;">
            <h2 style="color: #8f4e00; margin-top: 0;">धर्मोत्थान छठ पूजा समिति (ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क)</h2>
            <p style="font-size: 14px; color: #554336;">वेबसाइट से नया प्रपत्र संदेश प्राप्त हुआ है:</p>
            <hr style="border: 0; border-top: 1px solid #ffd1a4;" />
            <table style="width: 100%; font-size: 14px; color: #333; text-align: left;" cellPadding="6">
              <tr>
                <td style="font-weight: bold; width: 35%;">प्रकार (Type):</td>
                <td>${formType}</td>
              </tr>
              ${name ? `<tr><td style="font-weight: bold;">नाम (Name):</td><td>${name}</td></tr>` : ''}
              ${phone ? `<tr><td style="font-weight: bold;">मोबाईल (Phone):</td><td>${phone}</td></tr>` : ''}
              ${email ? `<tr><td style="font-weight: bold;">ईमेल (Email):</td><td>${email}</td></tr>` : ''}
              ${area ? `<tr><td style="font-weight: bold;">क्षेत्र (Area):</td><td>${area}</td></tr>` : ''}
              ${role ? `<tr><td style="font-weight: bold;">सेवा क्षेत्र (Role):</td><td>${role}</td></tr>` : ''}
              ${message ? `<tr><td style="font-weight: bold;">संदेश (Message):</td><td>${message}</td></tr>` : ''}
            </table>
            <hr style="border: 0; border-top: 1px solid #ffd1a4; margin-top: 20px;" />
            <p style="font-size: 11px; color: #888; margin-bottom: 0;">यह सूचना धर्मोत्थान छठ पूजा समिति वेबसाइट प्रणाली द्वारा ${ADMIN_EMAIL} पर प्रेषित की गई है।</p>
          </div>
        `;

        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        const messageParts = [
          `To: ${ADMIN_EMAIL}`,
          'Content-Type: text/html; charset=utf-8',
          'MIME-Version: 1.0',
          `Subject: ${utf8Subject}`,
          '',
          bodyHtml,
        ];

        const rawMessage = messageParts.join('\r\n');
        const base64Encoded = Buffer.from(rawMessage)
          .toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');

        const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ raw: base64Encoded }),
        });

        if (response.ok) {
          sentSuccess = true;
        } else {
          const errData = await response.json();
          console.error('Gmail API error:', errData);
          emailError = errData?.error?.message || 'Gmail API send failed';
        }
      } catch (err: any) {
        console.error('Gmail send exception:', err);
        emailError = err.message;
      }

      // 2. Google Drive storage operations
      try {
        if (formType === 'PhotoUpload' && details && details.image) {
          // Bhakt photos
          console.log('[Google Drive] Processing Bhakt photo upload...');
          const folderId = await findOrCreateFolder(token, 'Chhath Puja 2026 Photos');
          if (folderId) {
            const base64Str = details.image;
            const mimeMatch = base64Str.match(/^data:(image\/\w+);base64,/);
            const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
            const base64Data = base64Str.replace(/^data:image\/\w+;base64,/, '');
            const fileBuffer = Buffer.from(base64Data, 'base64');
            const fileName = `Bhakt_Photo_${Date.now()}.${mimeType.split('/')[1] || 'jpg'}`;

            driveFileId = await uploadFileToDrive(token, fileName, mimeType, fileBuffer, folderId);
          }
        } else if (details && details.receiptNo) {
          // Donation Receipts
          console.log('[Google Drive] Processing donation receipt upload...');
          const folderId = await findOrCreateFolder(token, 'Chhath Puja 2026 Receipts');
          if (folderId) {
            // Upload beautiful HTML Receipt
            const receiptHtml = generateReceiptHtml(details);
            const htmlBuffer = Buffer.from(receiptHtml, 'utf-8');
            const fileName = `Receipt_${details.receiptNo}.html`;

            driveFileId = await uploadFileToDrive(token, fileName, 'text/html', htmlBuffer, folderId);

            // If a screenshot was also uploaded
            if (details.screenshot) {
              console.log('[Google Drive] Processing payment screenshot upload...');
              const base64Str = details.screenshot;
              const mimeMatch = base64Str.match(/^data:(image\/\w+);base64,/);
              const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
              const base64Data = base64Str.replace(/^data:image\/\w+;base64,/, '');
              const fileBuffer = Buffer.from(base64Data, 'base64');
              const screenshotName = `Screenshot_${details.receiptNo}.${mimeType.split('/')[1] || 'jpg'}`;

              driveScreenshotId = await uploadFileToDrive(token, screenshotName, mimeType, fileBuffer, folderId);
            }
          }
        }
      } catch (driveErr: any) {
        console.error('Error during Google Drive operations:', driveErr);
      }
    }

    return res.json({
      success: true,
      emailSent: sentSuccess,
      targetEmail: ADMIN_EMAIL,
      driveFileId,
      driveScreenshotId,
      error: emailError,
      message: 'Form submission received',
    });
  } catch (error: any) {
    console.error('Server submission endpoint error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
