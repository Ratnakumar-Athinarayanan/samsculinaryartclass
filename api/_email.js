import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ override: true });

/**
 * Creates and returns a Nodemailer transporter.
 * Falls back to simulation mode if SMTP credentials are not configured.
 */
function getTransporter() {
  dotenv.config({ override: true });

  const host = (process.env.SMTP_HOST || '').trim();
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = (process.env.SMTP_USER || process.env.EMAIL_USER || process.env.GMAIL_USER || '').trim();
  const rawPass = (process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.GMAIL_PASS || '').trim();
  const pass = rawPass.replace(/\s+/g, ''); // Remove spaces if copied from Google App Password UI
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (user && pass) {
    // If it's Gmail or host is smtp.gmail.com
    if (user.includes('@gmail.com') || host.includes('gmail.com') || !host) {
      return {
        type: 'nodemailer',
        client: nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: { user, pass },
          tls: { rejectUnauthorized: false }
        }),
        fromUser: user
      };
    }

    // Generic SMTP server
    if (host) {
      return {
        type: 'nodemailer',
        client: nodemailer.createTransport({
          host,
          port,
          secure,
          auth: { user, pass },
          tls: { rejectUnauthorized: false }
        }),
        fromUser: user
      };
    }
  }

  return null;
}

/**
 * Generates the HTML template for Student Application Selection & Verification
 */
export function generateSelectedEmailHtml({ name, applicationNumber, purposeOfJoining, country, idProofType, idProofNumber }) {
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Application Selected - Sam's Culinary Art Classes</title>
  <style type="text/css">
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }

    /* Dark mode styling for Apple Mail, iOS Mail, and supporting clients */
    @media (prefers-color-scheme: dark) {
      .email-bg { background-color: #0c120e !important; }
      .email-card { background-color: #151e17 !important; border-color: #273b2b !important; }
      .text-primary { color: #f8fafc !important; }
      .text-secondary { color: #cbd5e1 !important; }
      .text-muted { color: #94a3b8 !important; }
      .header-title { color: #ffffff !important; }
      .header-sub { color: #d1d5db !important; }
      .highlight-box { background-color: #251d08 !important; border-left-color: #f59e0b !important; }
      .highlight-title { color: #fef08a !important; }
      .highlight-sla { color: #86efac !important; }
      .table-bg { background-color: #101912 !important; border-color: #233326 !important; }
      .table-row-border { border-bottom-color: #1e2d21 !important; }
      .table-val-primary { color: #f8fafc !important; }
      .table-val-gold { color: #fbbf24 !important; }
      .table-val-green { color: #4ade80 !important; }
      .next-steps-bg { background-color: #112216 !important; border-color: #1e3a24 !important; }
      .next-steps-title { color: #4ade80 !important; }
      .contact-bg { background-color: #0f1812 !important; border-color: #263829 !important; }
      .contact-link { color: #4ade80 !important; }
      .footer-bg { background-color: #0a0f0b !important; border-top-color: #1c2a1e !important; color: #94a3b8 !important; }
    }

    /* Outlook Dark Mode Selectors */
    [data-ogsc] .email-bg { background-color: #0c120e !important; }
    [data-ogsb] .email-bg { background-color: #0c120e !important; }
    [data-ogsc] .email-card { background-color: #151e17 !important; border-color: #273b2b !important; }
    [data-ogsb] .email-card { background-color: #151e17 !important; border-color: #273b2b !important; }
    [data-ogsc] .text-primary { color: #f8fafc !important; }
    [data-ogsc] .text-secondary { color: #cbd5e1 !important; }
    [data-ogsc] .text-muted { color: #94a3b8 !important; }
    [data-ogsc] .highlight-box { background-color: #251d08 !important; border-left-color: #f59e0b !important; }
    [data-ogsb] .highlight-box { background-color: #251d08 !important; }
    [data-ogsc] .highlight-title { color: #fef08a !important; }
    [data-ogsc] .highlight-sla { color: #86efac !important; }
    [data-ogsc] .table-bg { background-color: #101912 !important; border-color: #233326 !important; }
    [data-ogsb] .table-bg { background-color: #101912 !important; }
    [data-ogsc] .table-val-primary { color: #f8fafc !important; }
    [data-ogsc] .table-val-gold { color: #fbbf24 !important; }
    [data-ogsc] .table-val-green { color: #4ade80 !important; }
    [data-ogsc] .next-steps-bg { background-color: #112216 !important; border-color: #1e3a24 !important; }
    [data-ogsb] .next-steps-bg { background-color: #112216 !important; }
    [data-ogsc] .footer-bg { background-color: #0a0f0b !important; color: #94a3b8 !important; }
    [data-ogsb] .footer-bg { background-color: #0a0f0b !important; }

    /* Mobile Responsive Rules */
    @media only screen and (max-width: 600px) {
      .outer-table { padding: 12px 6px !important; }
      .container-table { width: 100% !important; max-width: 100% !important; border-radius: 8px !important; }
      .header-cell { padding: 24px 16px 20px !important; }
      .header-title { font-size: 20px !important; }
      .content-cell { padding: 22px 14px !important; }
      .table-cell-lbl { width: 42% !important; padding: 10px 10px !important; font-size: 12px !important; }
      .table-cell-val { width: 58% !important; padding: 10px 10px !important; font-size: 12px !important; }
      .highlight-box { padding: 14px 12px !important; }
      .whatsapp-button { display: block !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; padding: 14px 18px !important; }
    }
  </style>
</head>
<body class="email-bg" style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.6;">

  <!-- Outer wrapper table for email client alignment -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-bg outer-table" style="background-color: #f4f6f8; min-height: 100%; padding: 24px 12px;">
    <tr>
      <td align="center" valign="top">

        <!-- Main Email Container Card -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container-table email-card" style="width: 100%; max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
          
          <!-- Header Banner (Deep Emerald & Gold) -->
          <tr>
            <td align="center" class="header-cell" style="background-color: #0e2b17; background: #0e2b17; padding: 30px 24px 24px; border-bottom: 3px solid #e8a710;">
              <h1 class="header-title" style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
                Sam's Culinary Art Classes
              </h1>
              <p class="header-sub" style="margin: 6px 0 0 0; color: #cbd5e1; font-size: 13px; letter-spacing: 0.4px;">
                Professional Cookery, Baking &amp; Culinary Masterclasses
              </p>
              <div style="display: inline-block; margin-top: 14px; background-color: #14532d; border: 1px solid #22c55e; color: #86efac; padding: 5px 16px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">
                ✓ Application Selected &amp; Verified
              </div>
            </td>
          </tr>

          <!-- Email Body Content -->
          <tr>
            <td class="content-cell" style="padding: 28px 24px; background-color: transparent;">
              
              <!-- Greeting -->
              <p class="text-primary" style="margin: 0 0 14px 0; font-size: 17px; font-weight: 700; color: #0f172a;">
                Dear ${name || 'Student'},
              </p>

              <p class="text-secondary" style="margin: 0 0 18px 0; font-size: 15px; color: #334155; line-height: 1.6;">
                Warm greetings from <strong>Sam's Culinary Art Classes</strong>! We are thrilled to welcome you to our culinary family.
              </p>

              <!-- Turnaround & Selection Highlight Box (High Contrast in Light & Dark Mode) -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="highlight-box" style="background-color: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 0 8px 8px 0; margin: 18px 0 24px;">
                <tr>
                  <td style="padding: 16px 18px;">
                    <p class="highlight-title" style="margin: 0; color: #92400e; font-size: 15px; font-weight: 700; line-height: 1.5;">
                      🎉 Congratulations! Your admission application has been <strong>verified and selected</strong> for enrollment.
                    </p>
                    <p class="highlight-sla" style="margin: 8px 0 0 0; color: #166534; font-size: 14px; font-weight: 700; line-height: 1.4;">
                      ⏱️ Turnaround Promise: Our admissions coordinator will get back to you within 24 hours with your class schedule, batch allocation, and onboarding kit.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Application Summary Table (Crisp in both Light & Dark Mode) -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="table-bg" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 24px;">
                <tr class="table-row-border" style="border-bottom: 1px solid #e2e8f0;">
                  <td class="table-cell-lbl text-muted" style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #475569; width: 38%;">
                    Application No
                  </td>
                  <td class="table-cell-val table-val-gold" style="padding: 12px 16px; font-size: 13px; font-weight: 800; color: #b45309; width: 62%;">
                    ${applicationNumber || 'SAMS-ONB'}
                  </td>
                </tr>
                <tr class="table-row-border" style="border-bottom: 1px solid #e2e8f0;">
                  <td class="table-cell-lbl text-muted" style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #475569;">
                    Student Name
                  </td>
                  <td class="table-cell-val table-val-primary text-primary" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0f172a;">
                    ${name || 'Student'}
                  </td>
                </tr>
                ${purposeOfJoining ? `
                <tr class="table-row-border" style="border-bottom: 1px solid #e2e8f0;">
                  <td class="table-cell-lbl text-muted" style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #475569;">
                    Program / Goal
                  </td>
                  <td class="table-cell-val table-val-primary text-primary" style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #1e293b;">
                    ${purposeOfJoining}
                  </td>
                </tr>` : ''}
                ${country ? `
                <tr class="table-row-border" style="border-bottom: 1px solid #e2e8f0;">
                  <td class="table-cell-lbl text-muted" style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #475569;">
                    Region / Country
                  </td>
                  <td class="table-cell-val table-val-primary text-primary" style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #1e293b;">
                    ${country}
                  </td>
                </tr>` : ''}
                ${idProofType ? `
                <tr class="table-row-border" style="border-bottom: 1px solid #e2e8f0;">
                  <td class="table-cell-lbl text-muted" style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #475569;">
                    Verified ID Document
                  </td>
                  <td class="table-cell-val table-val-primary text-primary" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #1e293b;">
                    🪪 ${idProofType}${idProofNumber ? ` (${idProofNumber})` : ''}
                  </td>
                </tr>` : ''}
                <tr>
                  <td class="table-cell-lbl text-muted" style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #475569;">
                    Admission Status
                  </td>
                  <td class="table-cell-val table-val-green" style="padding: 12px 16px; font-size: 13px; font-weight: 800; color: #15803d;">
                    Verified / Enrolled
                  </td>
                </tr>
              </table>

              <!-- Next Steps Card -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="next-steps-bg" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <h4 class="next-steps-title" style="margin: 0 0 10px 0; color: #15803d; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                      What Happens Next?
                    </h4>
                    <ul class="text-secondary" style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155; line-height: 1.6;">
                      <li style="margin-bottom: 6px;"><strong>Within 24 Hours:</strong> Our admissions coordinator will reach out via WhatsApp &amp; phone call to confirm your batch dates and preferred slot.</li>
                      <li style="margin-bottom: 6px;"><strong>Pre-Class Recipe Book:</strong> You will receive our curated ingredient checklist, equipment prep guide, and masterclass instructions.</li>
                      <li><strong>Direct Chef Mentor Access:</strong> You will be connected to our mentoring team for one-on-one doubts and recipe guidance.</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- WhatsApp Quick Action Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/918939648457?text=Hi%20Chef%20Vahitha!%20My%20application%20(${applicationNumber || 'SAMS'})%20has%20been%20selected.%20I%20would%20like%20to%20confirm%20my%20class%20schedule." target="_blank" rel="noopener noreferrer" class="whatsapp-button" style="display: inline-block; background-color: #25D366; text-decoration: none; padding: 13px 26px; border-radius: 8px; box-shadow: 0 3px 10px rgba(37, 211, 102, 0.35); text-align: center;">
                      <span style="color: #ffffff !important; font-size: 14px; font-weight: 800; text-decoration: none; letter-spacing: 0.3px;">📱 Chat with Admissions on WhatsApp</span>
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Academy Contact Box -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="contact-bg" style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; text-align: center;">
                <tr>
                  <td style="padding: 16px 18px;">
                    <p class="text-primary" style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
                      Need immediate help or have questions?
                    </p>
                    <p class="text-muted" style="margin: 0 0 4px 0; font-size: 12px; color: #475569;">
                      Phone / WhatsApp: <a href="tel:+918939648457" class="contact-link" style="color: #b45309; text-decoration: none; font-weight: 700;">+91 89396 48457</a> &bull; Email: <a href="mailto:samsculinaryartclass@gmail.com" class="contact-link" style="color: #b45309; text-decoration: none; font-weight: 700;">samsculinaryartclass@gmail.com</a>
                    </p>
                    <p class="text-muted" style="margin: 0; font-size: 12px; color: #64748b;">
                      Academy Studio: Sam's Culinary Art Classes, Chennai, India
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" class="footer-bg" style="background-color: #f1f5f9; padding: 20px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; line-height: 1.5;">
              <p style="margin: 0 0 4px 0;">&copy; ${currentYear} Sam's Culinary Art Classes. All rights reserved.</p>
              <p style="margin: 0;">Official Student Onboarding Notification &bull; Delivered securely to ${name || 'Student'}</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

/**
 * Dispatches the selection email to the student
 */
export async function sendApplicationSelectedEmail(applicant) {
  const {
    name,
    email,
    applicationNumber,
    purposeOfJoining,
    country = 'India',
    idProofType = '',
    idProofNumber = ''
  } = applicant;

  if (!email) {
    throw new Error('Applicant email is required to send notification');
  }

  const subject = `Your Application is Selected! - Sam's Culinary Art Classes [Ref: ${applicationNumber || 'SAMS'}]`;
  const htmlContent = generateSelectedEmailHtml({
    name,
    applicationNumber,
    purposeOfJoining,
    country,
    idProofType,
    idProofNumber
  });

  const textContent = `
Dear ${name},

Congratulations! Your application for Sam's Culinary Art Classes has been verified and selected.

Application Number: ${applicationNumber || 'N/A'}
Status: Verified / Enrolled

We will get back to you within 24 hours with your class schedule, timing, and onboarding kit.

If you have any questions, you can contact us at:
Phone / WhatsApp: +91 89396 48457
Email: samsculinaryartclasses@gmail.com

Warm regards,
Sam's Culinary Art Classes Team
  `.trim();

  dotenv.config({ override: true });

  // 1. Support Resend API (HTTP based, zero SMTP port blocking)
  const resendApiKey = (process.env.RESEND_API_KEY || '').trim();
  if (resendApiKey) {
    try {
      const resendFrom = process.env.RESEND_FROM || '"Sam\'s Culinary Art Classes" <onboarding@resend.dev>';
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [email],
          subject: subject,
          html: htmlContent,
          text: textContent
        })
      });

      const resendData = await resendRes.json();
      if (!resendRes.ok) {
        throw new Error(resendData.message || `Resend failed with HTTP ${resendRes.status}`);
      }

      console.log(`[EMAIL DISPATCH - RESEND SUCCESS] Sent to ${email}, id: ${resendData.id}`);
      return {
        success: true,
        simulated: false,
        service: 'Resend',
        id: resendData.id,
        to: email,
        subject,
        timestamp: new Date().toISOString()
      };
    } catch (resendErr) {
      console.error('Resend API dispatch error:', resendErr);
      throw resendErr;
    }
  }

  // 2. Support Nodemailer SMTP / Gmail
  const transporterObj = getTransporter();

  if (!transporterObj) {
    // Missing credentials - Log clearly to console and inform caller
    console.log('\n======================================================');
    console.log(`[EMAIL DISPATCH - SIMULATION / NO SMTP CREDENTIALS IN .ENV]`);
    console.log(`Recipient: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Notice: To send real emails to students' inboxes, please add:`);
    console.log(`SMTP_USER=samsculinaryartclass@gmail.com`);
    console.log(`SMTP_PASS=your_16_char_google_app_password`);
    console.log(`to your .env file.`);
    console.log('======================================================\n');

    return {
      success: false,
      simulated: true,
      to: email,
      subject,
      timestamp: new Date().toISOString(),
      error: 'SMTP credentials missing in .env. Live email was not sent to inbox.',
      note: 'Please add SMTP_USER & SMTP_PASS (Gmail App Password) or RESEND_API_KEY into your .env file to send real emails to students.'
    };
  }

  try {
    const fromAddress = process.env.SMTP_FROM || `"${process.env.SMTP_FROM_NAME || "Sam's Culinary Art Classes"}" <${transporterObj.fromUser}>`;

    const info = await transporterObj.client.sendMail({
      from: fromAddress,
      to: email,
      subject: subject,
      text: textContent,
      html: htmlContent
    });

    console.log(`[EMAIL DISPATCH - SMTP SUCCESS] Sent to ${email}, messageId: ${info.messageId}`);

    return {
      success: true,
      simulated: false,
      service: 'SMTP',
      messageId: info.messageId,
      to: email,
      subject,
      timestamp: new Date().toISOString()
    };
  } catch (smtpErr) {
    console.error(`[EMAIL DISPATCH - SMTP ERROR] Failed sending to ${email}:`, smtpErr);
    throw smtpErr;
  }
}
