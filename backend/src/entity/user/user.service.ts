import { userModel } from './user.model'
import { UserModelAbstract, IUser } from './type'
import { TypicalCRUDService } from 'shared/service'

class UserService extends TypicalCRUDService<IUser> {
    model: UserModelAbstract

    constructor(model: UserModelAbstract) {
        super(model)
    }

    // findByEmail(email: IUser['email']) {
    //     return this.model.findByEmail(email)
    // }
}

export const userService = new UserService(userModel)
