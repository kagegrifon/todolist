import { tokenModel } from './token.model'
import { TokenModelAbstract, IToken } from './type'
import { TypicalCRUDService } from 'shared/service'

class TokenService extends TypicalCRUDService<IToken> {
    model: TokenModelAbstract

    constructor(model: TokenModelAbstract) {
        super(model)
    }
}

export const tokenService = new TokenService(tokenModel)
