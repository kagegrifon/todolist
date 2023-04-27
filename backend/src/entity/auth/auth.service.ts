import { TypicalCRUDService } from 'shared/service'
import { authModel } from './auth.model'
import { AuthModelAbstract, AuthServiceAbstract, IAuth, IUserLogin, IUserSignUp } from './type'
import { UserModelAbstract } from 'entity/user/type'
import { userService } from 'entity/user/user.service'

class AuthService extends TypicalCRUDService<IAuth> implements AuthServiceAbstract {
    model: AuthModelAbstract
    userService: UserModelAbstract

    constructor(model: AuthModelAbstract, userService: UserModelAbstract) {
        super(model)
        this.userService = userService
    }

    async registrate(data: IUserSignUp) {
        const isEmailExist = await this.userService.findByEmail(data.email)
        if (isEmailExist) {
            throw Error(`Email ${data.email} is already exist`)
        }

        const newUser = await this.userService.create({ email: data.email, name: data.name })
        const newAuth = await this.model.create({
            isActivated: false,
            activationLink: '??? TODO',
            password: data.password,
            userId: newUser.id,
        })
        // сгенерировать activationLink, захешировать пароль, отправить письмо на почту
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

export const authService = new AuthService(authModel, userService)
