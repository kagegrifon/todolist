import { TokenModelAbstract, IToken } from './type'
import { TokenModelORM } from './token.schema'
import { IUser } from 'entity/user/type'

const mapFromORMSchemaToDTO = (schemaItem: TokenModelORM): IToken => {
    const item = schemaItem.toJSON() as IToken

    return {
        id: item.id,
        refreshToken: item.refreshToken,
        userId: item.userId,
    }
}

class TokenModel implements TokenModelAbstract {
    async create(newToken: Omit<IToken, 'id'>) {
        const queryResult = await TokenModelORM.query().insert(newToken)

        return mapFromORMSchemaToDTO(queryResult)
    }

    async getById(id: string) {
        const queryResult = await TokenModelORM.query().findById(id)

        return mapFromORMSchemaToDTO(queryResult)
    }

    async getAll() {
        const queryResult = await TokenModelORM.query()

        return queryResult.map(mapFromORMSchemaToDTO)
    }

    async update(id: string, updatingToken: Partial<IToken>) {
        await TokenModelORM.query().findById(id).patch(updatingToken)
        const updated = await TokenModelORM.query().findById(id)

        return mapFromORMSchemaToDTO(updated)
    }

    async delete(id: string) {
        const deleted = await TokenModelORM.query().findById(id)
        await TokenModelORM.query().deleteById(id)

        return mapFromORMSchemaToDTO(deleted)
    }

    async getByUserId(userId: IUser['id']) {
        const queryResult = await TokenModelORM.query()
            .select('userId')
            .where('userId', '=', userId)

        return queryResult.map(mapFromORMSchemaToDTO)
    }
}

export const tokenModel = new TokenModel()
