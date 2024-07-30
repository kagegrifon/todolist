import { UserModelAbstract, IUser } from './type'
import { UserModelORM } from './user.schema'

const mapFromORMSchemaToDTO = (schemaItem: UserModelORM): IUser => {
    const item = schemaItem.toJSON() as IUser

    return {
        id: item.id,
        login: item.login,

        // TODO: add after fixing mailing
        // email: item.email,
    }
}

class UserModel implements UserModelAbstract {
    async create(newUser: Omit<IUser, 'id'>) {
        const queryResult = await UserModelORM.query().insert(newUser)

        return mapFromORMSchemaToDTO(queryResult)
    }

    async getById(id: string) {
        const queryResult = await UserModelORM.query().findById(id)

        return mapFromORMSchemaToDTO(queryResult)
    }

    async getAll() {
        const queryResult = await UserModelORM.query()

        return queryResult.map(mapFromORMSchemaToDTO)
    }

    async update(id: string, updatingUser: Partial<IUser>) {
        await UserModelORM.query().findById(id).patch(updatingUser)
        const updated = await UserModelORM.query().findById(id)

        return mapFromORMSchemaToDTO(updated)
    }

    async delete(id: string) {
        const deleted = await UserModelORM.query().findById(id)
        await UserModelORM.query().deleteById(id)

        return mapFromORMSchemaToDTO(deleted)
    }

    // TODO: add after fixing mailing
    // async findByEmail(email: IUser['email']) {
    //     const foundEmail = await UserModelORM.query().select('email').where('email', '=', email)

    //     return foundEmail.map(mapFromORMSchemaToDTO)
    // }
}

export const userModel = new UserModel()
