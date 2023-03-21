import { TypicalCRUDService } from 'shared/service'
import { authModel } from './auth.model'
import { AuthModelAbstract, AuthServiceAbstract, IAuth, IUserLogin, IUserSignUp } from './type'

class AuthService extends TypicalCRUDService<IAuth> implements AuthServiceAbstract {
    model: AuthModelAbstract

    constructor(model: AuthModelAbstract) {
        super(model)
    }

    async registrate(data: IUserSignUp) {
        console.log({ data })
        return undefined
    }

    async login(data: IUserLogin) {
        console.log({ data })
        return undefined
    }

    async logout(userId: IAuth['userId']) {
        console.log({ userId })
        return undefined
    }

    async activate(link: IAuth['activationLink'], userId: IAuth['userId']) {
        console.log({ link, userId })
        return undefined
    }

    async refresh(userId: IAuth['userId']) {
        console.log({ userId })
        return undefined
    }
}

export const authService = new AuthService(authModel)
