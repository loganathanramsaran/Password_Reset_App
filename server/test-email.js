require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendTestEmail() {
  try {
    await transporter.verify();
    const info = await transporter.sendMail({
      from: '"Test" <noreply@example.com>',
      to: 'your_actual_email@example.com', // Your real email
      subject: 'Test Email',
      text: 'Hello from Nodemailer test',
    });
    console.log('Test email sent:', info.response);
  } catch (error) {
    console.error('Error sending test email:', error);
  }
}

sendTestEmail();
