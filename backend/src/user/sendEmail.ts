import nodemailer from 'nodemailer';

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

export default sendEmail