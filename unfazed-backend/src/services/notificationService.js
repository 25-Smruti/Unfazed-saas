import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

export const sendDomainNotification = async ({ event, toEmail, toPhone, data }) => {
  console.log(`[NotificationService: WhatsApp STUB] Event ${event} to ${toPhone || 'N/A'}:`, data);
  try {
    if (process.env.SMTP_USER) {
      await transporter.sendMail({
        from: '"Unfazed Support" <notifications@unfazed.in>',
        to: toEmail,
        subject: `Session Notification: ${event}`,
        text: `Update: ${JSON.stringify(data)}`
      });
    }
  } catch (err) {
    console.error('[NotificationService Error]', err.message);
  }
};
