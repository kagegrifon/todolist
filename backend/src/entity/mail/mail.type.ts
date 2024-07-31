export type Email = string

export interface MailServiceAbstract {
    sendActivationMail({ to, link }: { to: Email; link: string }): Promise<void>
}
