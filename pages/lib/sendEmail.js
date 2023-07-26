import nodemailer from 'nodemailer';

export async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jjaroendecharat@gmail.com', // ใส่อีเมล Gmail ของคุณที่จะใช้ส่งอีเมล
      pass: 'pbachedsbluektlc', // รหัสผ่าน Gmail ของคุณ
    },
  });

  const mailOptions = {
    from: 'jjaroendecharat@gmail.com', // อีเมล Gmail ของคุณที่จะใช้ส่งอีเมล
    to: to, // อีเมลที่ต้องการส่งไป
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}