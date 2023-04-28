import { AuthModelAbstract, IAuth } from './auth.type'
import { AuthModelORM } from './auth.schema'

const mapFromORMSchemaToDTO = (schemaItem: AuthModelORM): IAuth => {
    const item = schemaItem.toJSON() as IAuth

    return {
        id: item.id,
        password: item.password,
        isActivated: item.isActivated,
        activationLink: item.activationLink,
        userId: item.userId,
    }
}

class AuthModel implements AuthModelAbstract {
    async create(newAuth: Omit<IAuth, 'id'>) {
        const queryResult = await AuthModelORM.query().insert(newAuth)

        return mapFromORMSchemaToDTO(queryResult)
    }

    async getById(id: string) {
        const queryResult = await AuthModelORM.query().findById(id)

        return mapFromORMSchemaToDTO(queryResult)
    }

    async getAll() {
        const queryResult = await AuthModelORM.query()

        return queryResult.map(mapFromORMSchemaToDTO)
    }

    async update(id: string, updatingAuth: Partial<IAuth>) {
        await AuthModelORM.query().findById(id).patch(updatingAuth)
        const updated = await AuthModelORM.query().findById(id)

        return mapFromORMSchemaToDTO(updated)
    }

    async delete(id: string) {
        const deleted = await AuthModelORM.query().findById(id)
        await AuthModelORM.query().deleteById(id)

        return mapFromORMSchemaToDTO(deleted)
    }
}

export const authModel = new AuthModel()
