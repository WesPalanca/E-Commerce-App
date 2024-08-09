import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS
    }
});



const sendEmail = (to, subject, html) =>{
    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to,
        subject,
        html
    };
    return transporter.sendMail(mailOptions);
}

export default sendEmail;