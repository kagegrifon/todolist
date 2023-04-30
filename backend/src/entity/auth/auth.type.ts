import { IGeneratedTokens } from 'entity/token/type'
import { IUser } from 'entity/user/type'
import { TypicalCRUDModelAbstract, TypicalCRUDServiceAbstract } from 'shared/type'

export interface IAuth {
    id: string
    password: string
    isActivated: boolean
    activationLink: string
    userId: IUser['id']
}

export interface IUserSignUp {
    email: string
    name: string
    password: string
}

export interface IUserLogin {
    email: string
    password: string
}

export interface AuthServiceAbstract extends TypicalCRUDServiceAbstract<IAuth> {
    registrate(data: IUserSignUp): Promise<IUser & IGeneratedTokens>
    login(data: IUserLogin): Promise<undefined>
    logout(userId: IAuth['userId']): Promise<undefined>
    activate(link: IAuth['activationLink']): Promise<void>
    // TODO exclude from separate entity
    refresh(userId: IAuth['userId']): Promise<undefined>
}

export interface AuthModelAbstract extends TypicalCRUDModelAbstract<IAuth> {
    findByActivationLink(link: IAuth['activationLink']): Promise<IAuth[]>
}
