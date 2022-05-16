import nodemailer from "nodemailer";
import eventemitter from "../scripts/eventEmitter";
import { password } from "../types/index";

export const eventHandler = () =>
    eventemitter.on("send_email", async ({ toEmail, subject, html }) => {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: password,
            },
        });
        try {
            const info = await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: toEmail,
                subject,
                html,
            });
            console.log("info", info);
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (err) {
            console.log("err", err);
        }
    });
