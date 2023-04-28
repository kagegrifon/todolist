import jwt from 'jsonwebtoken'
import { TypicalCRUDService } from 'shared/service'
import { tokenModel } from './token.model'
import { IToken, TokenModelAbstract, TokenServiceAbstract } from './type'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from 'config/env'
import { IUser } from 'entity/user/type'

class TokenService extends TypicalCRUDService<IToken> implements TokenServiceAbstract {
    model: TokenModelAbstract

    constructor(model: TokenModelAbstract) {
        super(model)
    }

    generateTokens(payload: IUser) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '5m' })
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' })

        return { accessToken, refreshToken }
    }

    async saveToken(userId: IUser['id'], refreshToken: string) {
        const curRecord = (await this.model.getByUserId(userId))[0]

        if (curRecord) {
            curRecord.refreshToken = refreshToken
            await this.model.update(curRecord.id, curRecord)

            return curRecord
        }

        const newRecord = await this.model.create({ refreshToken, userId })
        return newRecord
    }
}

export const tokenService = new TokenService(tokenModel)