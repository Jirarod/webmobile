import { sendEmail } from "../lib/sendEmail";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { emailTo, subject, text,name,img} = req.body;
  
      // ส่งอีเมลผ่าน Nodemailer
      await sendEmail(emailTo, subject, text,name,img );
  
      res.status(200).json({ message: 'Email sent successfully!' });
    } else {
      res.status(405).json({ error: 'Method not allowed.' });
    }
  }