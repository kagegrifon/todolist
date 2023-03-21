import { TypicalCRUDModelAbstract } from 'shared/type'

export interface IUser {
    id: string
    name: string
    email: string
}

export type UserModelAbstract = TypicalCRUDModelAbstract<IUser>