import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

import { Email, MailServiceAbstract } from './mail.type'
import { APP_NAME, SMTP_APP_PASSWORD, SMTP_HOST, SMTP_PORT, SMTP_USER_NAME } from 'config/env'

class MailService implements MailServiceAbstract {
    transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

    constructor() {
        console.log({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: {
                user: SMTP_USER_NAME,
                pass: SMTP_APP_PASSWORD,
            },
        })
        this.transport = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: {
                user: SMTP_USER_NAME,
                pass: SMTP_APP_PASSWORD,
            },
        })
    }

    async sendActivationMail({ to, link }: { to: Email; link: string }) {
        this.transport.sendMail({
            from: SMTP_USER_NAME,
            to,
            subject: `Activation account in ${APP_NAME}`,
            text: '',
            html: `
                <div>
                    <h1>For activation account follow the link below</h1>
                    <a href=${link}>Activate account</a>
                </div>
            `,
        })
    }
}

export const mailService = new MailService()
