import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { TypicalCRUDService } from 'shared/service'
import { authModel } from './auth.model'
import { AuthModelAbstract, AuthServiceAbstract, IAuth, IUserLogin, IUserSignUp } from './auth.type'
import { UserModelAbstract } from 'entity/user/type'
import { userService } from 'entity/user/user.service'
import {
    // API_URL,
    HASH_SALT,
} from 'config/env'
import { MailServiceAbstract } from 'entity/mail/mail.type'
import { mailService } from 'entity/mail/mail.service'
import { TokenServiceAbstract } from 'entity/token/type'
import { tokenService } from 'entity/token/token.service'

class AuthService extends TypicalCRUDService<IAuth> implements AuthServiceAbstract {
    constructor(
        public model: AuthModelAbstract,
        private userService: UserModelAbstract,
        private mailService: MailServiceAbstract,
        private tokenService: TokenServiceAbstract,
    ) {
        super(model)
    }

    async register({ password, login }: IUserSignUp) {
        // const isEmailExist = (await this.userService.findByEmail(email))[0]

        // if (isEmailExist) {
        //     throw Error(`The email ${email} is already exist`)
        // }

        const isLoginExist = !!(await this.userService.findByLogin(login))

        if (isLoginExist) {
            throw Error(`The login ${login} is already exist`)
        }

        const newUser = await this.userService.create({ login })

        const passwordHash = await bcrypt.hash(password, HASH_SALT)
        const activationLink = uuidv4()

        await this.model.create({
            // isActivated: false, - вернуть когда подключу сервис почты
            isActivated: true,
            activationLink: activationLink,
            password: passwordHash,
            userId: newUser.id,
        })

        // await this.mailService.sendActivationMail({
        //     to: email,
        //     link: `${API_URL}/api/auth/activate/${activationLink}`,
        // })

        const token = this.tokenService.generateTokens(newUser)
        this.tokenService.saveToken(newUser.id, token.refreshToken)

        return {
            ...newUser,
            ...token,
        }
    }

    async login(enteringUser: IUserLogin) {
        const existingUser = await this.userService.findByLogin(enteringUser.login)

        if (!existingUser) {
            throw Error(`Wrong login or password`)
        }

        const userAuth = await this.model.findByUserId(existingUser.id)

        const isCorrectPassword = await bcrypt.compare(enteringUser.password, userAuth.password)

        if (!isCorrectPassword) {
            throw Error(`Wrong login or password`)
        }

        const token = this.tokenService.generateTokens(existingUser)
        this.tokenService.saveToken(existingUser.id, token.refreshToken)

        return { ...existingUser, ...token }
    }

    async logout(userId: IAuth['userId']) {
        console.log({ userId })
        return undefined
    }

    async activate(link: IAuth['activationLink']) {
        const userAuth = (await this.model.findByActivationLink(link))[0]

        if (!userAuth) {
            throw Error('no user for the activation link')
        }

        userAuth.isActivated = true
        await this.model.update(userAuth.id, userAuth)
    }

    async refresh(userId: IAuth['userId']) {
        console.log({ userId })
        return undefined
    }
}

export const authService = new AuthService(authModel, userService, mailService, tokenService)
