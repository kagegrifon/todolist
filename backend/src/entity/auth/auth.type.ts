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
    // TODO: add after fixing mailing
    // email: string
    login: string
    password: string
}

export interface IUserLogin {
    login: string
    password: string
}

export interface AuthServiceAbstract extends TypicalCRUDServiceAbstract<IAuth> {
    register(data: IUserSignUp): Promise<{ user: IUser; token: IGeneratedTokens }>
    login(data: IUserLogin): Promise<{ user: IUser; token: IGeneratedTokens }>
    logout(userId: IAuth['userId']): Promise<undefined>
    activate(link: IAuth['activationLink']): Promise<void>
    // TODO exclude from separate entity
    refresh(userId: IAuth['userId']): Promise<undefined>
}

export interface AuthModelAbstract extends TypicalCRUDModelAbstract<IAuth> {
    findByActivationLink(link: IAuth['activationLink']): Promise<IAuth[]>
    findByUserId(userId: IAuth['userId']): Promise<IAuth | undefined>
}
