import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from "dotenv"

dotenv.config()
const app = express();
app.use(express.json());


const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to,
    subject,
    html
  };

  await transporter.sendMail(mailOptions);
};

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async() => {
    await sendEmail("14besemsyed@seecs.edu.pk", "nothing","http://localhost:3000/")
});
