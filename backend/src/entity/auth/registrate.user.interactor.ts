// import bcrypt from 'bcrypt'
// import { v4 as uuidv4 } from 'uuid'
// import { TypicalCRUDService } from 'shared/service'
// import { authModel } from './auth.model'
// import { AuthModelAbstract, AuthServiceAbstract, IAuth, IUserLogin, IUserSignUp } from './auth.type'
// import { UserModelAbstract } from 'entity/user/type'
// import { userService } from 'entity/user/user.service'
// import { HASH_SALT } from 'config/env'
// import { MailServiceAbstract } from 'entity/mail/mail.type'
// import { mailService } from 'entity/mail/mail.service'
// import { TokenServiceAbstract } from 'entity/token/type'
// import { tokenService } from 'entity/token/token.service'

import { Email } from 'entity/mail/mail.type'
import { IUser } from 'entity/user/type'
import { IAuth, IUserSignUp } from './auth.type'

interface FindByEmailInputPort {
    findByEmail: (email: Email) => Promise<IUser>
}

interface SaveUserInputPort {
    saveUser: (user: Omit<IUser, 'id'>) => Promise<IUser>
}

interface SaveAuthInfoInputPort {
    saveUser: (userId: IUser['id'], password: string) => Promise<IAuth>
}

export class RegistrateUserInteractor {
    constructor(
        private findByEmailInputPort: FindByEmailInputPort,
        private saveUserInputPort: SaveUserInputPort,
        private saveAuthInfoInputPort: SaveAuthInfoInputPort,
    ) {}

    async execute({ email, password, name }: IUserSignUp) {
        const foundEmail = await this.findByEmailInputPort.findByEmail(email)

        if (foundEmail) {
            throw Error('Email is already exist')
        }

        const user = await this.saveUserInputPort.saveUser({ email, name })

        await this.saveAuthInfoInputPort.saveUser(user.id, password)
        return user
    }
}

// async registrate({ email, password, name }: IUserSignUp) {
//     const isEmailExist = (await this.userService.findByEmail(email))[0]

//     if (isEmailExist) {
//         throw Error(`The email ${email} is already exist`)
//     }

//     const newUser = await this.userService.create({ email, name })

//     const passwordHash = await bcrypt.hash(password, HASH_SALT)
//     const activationLink = uuidv4()

//     await this.model.create({
//         isActivated: false,
//         activationLink: activationLink,
//         password: passwordHash,
//         userId: newUser.id,
//     })

//     await this.mailService.sendActivationMail({ to: email, link: activationLink })

//     const token = this.tokenService.generateTokens(newUser)
//     this.tokenService.saveToken(newUser.id, token.refreshToken)

//     return {
//         ...newUser,
//         ...token,
//     }
// }
