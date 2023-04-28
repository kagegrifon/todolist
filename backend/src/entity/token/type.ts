import { IUser } from 'entity/user/type'
import { TypicalCRUDModelAbstract, TypicalCRUDServiceAbstract } from 'shared/type'

export type RefreshToken = string
export type AccessToken = string

export interface IToken {
    id: string
    userId: string
    refreshToken: string
}

export interface IGeneratedTokens {
    accessToken: AccessToken
    refreshToken: RefreshToken
}

export interface TokenServiceAbstract extends TypicalCRUDServiceAbstract<IToken> {
    generateTokens(payload: IUser): IGeneratedTokens
    saveToken(userId: IUser['id'], refreshToken: RefreshToken): Promise<IToken>
}

export interface TokenModelAbstract extends TypicalCRUDModelAbstract<IToken> {
    getByUserId(userId: IUser['id']): Promise<IToken[]>
}
