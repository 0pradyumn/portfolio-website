const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

/**
 * Send the contact-form message to the portfolio owner.
 * Fails silently (logs) so a mail outage never breaks the API.
 */
async function sendContactEmail({ name, email, subject, message }) {
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Portfolio message: ${subject || "No subject"}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><b>From:</b> ${name} &lt;${email}&gt;</p><p><b>Subject:</b> ${subject || "-"}</p><p>${message.replace(/\n/g, "<br>")}</p>`,
    });
    return true;
  } catch (err) {
    console.error("Email send failed:", err.message);
    return false;
  }
}

module.exports = sendContactEmail;
