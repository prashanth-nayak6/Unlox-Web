import nodemailer from "nodemailer";

// Uses standard SMTP env vars. Works with SES, SendGrid SMTP, Postmark, or Gmail app passwords.
export function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendLeadNotification(lead) {
  if (!process.env.SMTP_HOST) {
    // In local/dev environments without SMTP configured, skip silently.
    console.log("[mailer] SMTP not configured — skipping email notification.");
    return;
  }
  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.MAIL_FROM || "no-reply@outpro.india",
    to: process.env.MAIL_TO || "info_hr@unloxacademy.com",
    subject: `New website lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    text: `Name: ${lead.name}\nEmail: ${lead.email}\nCompany: ${lead.company || "-"}\n\n${lead.message}`,
  });
}
