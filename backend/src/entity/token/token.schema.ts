import { Model } from 'objection'
import { DB_TABLE_NAME } from 'data-access/tableNames'
import type { Knex } from 'knex'
import { UserModelORM } from 'entity/user/user.schema'

export class TokenModelORM extends Model {
    static get tableName() {
        return DB_TABLE_NAME.token
    }

    static get relationMappings() {
        return {
            todo: {
                relation: Model.HasOneRelation,
                modelClass: UserModelORM,
                join: {
                    from: `${DB_TABLE_NAME.token}.userId`,
                    to: `${DB_TABLE_NAME.user}.id`,
                },
            },
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['refreshToken', 'userId'],

            properties: {
                id: { type: 'integer' },
                refreshToken: { type: 'string', minLength: 1, maxLength: 255 },
                userId: { type: 'integer' },
            },
        }
    }
}

export async function createTokenSchema(knex: Knex) {
    if (await knex.schema.hasTable(DB_TABLE_NAME.token)) {
        return Promise.resolve(knex.schema)
    }

    return knex.schema.createTable(DB_TABLE_NAME.token, (table) => {
        table.increments('id').primary()
        table.string('refreshToken').notNullable()
        table
            .integer('userId')
            .unsigned()
            .references('id')
            .inTable(DB_TABLE_NAME.user)
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
}
