import { Email, MailServiceAbstract } from './mail.type'

class MailService implements MailServiceAbstract {
    async sendActivationMail({ to, link }: { to: Email; link: string }) {
        console.log({ to, link })
    }
}

export const mailService = new MailService()
