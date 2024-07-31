import { TypicalCRUDModelAbstract } from 'shared/type'

export interface IUser {
    id: string
    login: string
    // TODO: add after fixing mailing
    // email: string
}

export interface UserModelAbstract extends TypicalCRUDModelAbstract<IUser> {
    findByLogin(login: IUser['login']): Promise<IUser | undefined>
}
// TODO: add after fixing mailing
//{
// findByEmail(email: IUser['email']): Promise<IUser[]>
// }
