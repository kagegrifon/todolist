import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { TypicalCRUDService } from 'shared/service'
import { authModel } from './auth.model'
import { AuthModelAbstract, AuthServiceAbstract, IAuth, IUserLogin, IUserSignUp } from './auth.type'
import { UserModelAbstract } from 'entity/user/type'
import { userService } from 'entity/user/user.service'
import { API_URL, HASH_SALT } from 'config/env'
import { MailServiceAbstract } from 'entity/mail/mail.type'
import { mailService } from 'entity/mail/mail.service'
import { TokenServiceAbstract } from 'entity/token/type'
import { tokenService } from 'entity/token/token.service'

class AuthService extends TypicalCRUDService<IAuth> implements AuthServiceAbstract {
    model: AuthModelAbstract
    userService: UserModelAbstract
    mailService: MailServiceAbstract
    tokenService: TokenServiceAbstract

    constructor(
        model: AuthModelAbstract,
        userService: UserModelAbstract,
        mailService: MailServiceAbstract,
        tokenService: TokenServiceAbstract,
    ) {
        super(model)
        this.userService = userService
        this.mailService = mailService
        this.tokenService = tokenService
    }

    async registrate({ email, password, name }: IUserSignUp) {
        const isEmailExist = (await this.userService.findByEmail(email))[0]

        if (isEmailExist) {
            throw Error(`The email ${email} is already exist`)
        }

        const newUser = await this.userService.create({ email, name })

        const passwordHash = await bcrypt.hash(password, HASH_SALT)
        const activationLink = uuidv4()

        await this.model.create({
            isActivated: false,
            activationLink: activationLink,
            password: passwordHash,
            userId: newUser.id,
        })

        await this.mailService.sendActivationMail({
            to: email,
            link: `${API_URL}/api/auth/activate/${activationLink}`,
        })

        const token = this.tokenService.generateTokens(newUser)
        this.tokenService.saveToken(newUser.id, token.refreshToken)

        return {
            ...newUser,
            ...token,
        }
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

export const authService = new AuthService(authModel, userService, mailService, tokenService)
