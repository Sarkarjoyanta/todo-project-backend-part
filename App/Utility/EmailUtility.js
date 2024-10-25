import nodemailer from "nodemailer";
import {EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER} from "../Config/Config.js";

const SendMail = async (EmailTo, EmailText, EmailSub)=>{
    let transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: EMAIL_SECURE,
        auth:{
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
        tls:{
            rejectUnauthorized: false,
        }
    })

    let mailOptions = {
        from: EMAIL_USER,
        to: EmailTo,
        text: EmailText,
        sub: EmailSub,
    }

    return await transporter.sendMail(mailOptions)

}

export default SendMail;