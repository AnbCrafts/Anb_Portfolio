import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text, html }) => {
  // Check if SMTP details are defined in environment
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT) || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  const mailOptions = {
    from: process.env.SMTP_FROM || `"Portfolio Admin" <no-reply@portfolio.com>`,
    to,
    subject,
    text,
    html,
  };

  // If credentials are not set, print to console as fallback for testing
  if (!smtpUser || !smtpPass) {
    console.log("==================================================");
    console.log("⚠️  SMTP Configuration missing in backend/.env!");
    console.log(`✉️  Sending Email To: ${to}`);
    console.log(`📝 Subject: ${subject}`);
    console.log(`💬 Text Content:\n${text}`);
    console.log("==================================================");
    return;
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail(mailOptions);
};

export { sendEmail };
