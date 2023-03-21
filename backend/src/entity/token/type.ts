import { TypicalCRUDModelAbstract } from 'shared/type'

export interface IToken {
    id: string
    userId: string
    refreshToken: string
}

export type TokenModelAbstract = TypicalCRUDModelAbstract<IToken>
