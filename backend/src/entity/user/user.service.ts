import { userModel } from './user.model'
import { UserModelAbstract, IUser } from './type'
import { TypicalCRUDService } from 'shared/service'

export class UserService extends TypicalCRUDService<IUser> {
    model: UserModelAbstract

    constructor(model: UserModelAbstract) {
        super(model)
    }

    findByLogin(login: IUser['login']) {
        return this.model.findByLogin(login)
    }

    // findByEmail(email: IUser['email']) {
    //     return this.model.findByEmail(email)
    // }
}

export const userService = new UserService(userModel)
