import { TypicalCRUDModelAbstract } from 'shared/type'

export interface IUser {
    id: string
    name: string
    email: string
}

export interface UserModelAbstract extends TypicalCRUDModelAbstract<IUser> {
    findByEmail(email: IUser['email']): Promise<IUser[]>
}
