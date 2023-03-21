import { Model } from 'objection'
import { DB_TABLE_NAME } from 'data-access/tableNames'
import type { Knex } from 'knex'
import { UserModelORM } from 'entity/user/user.schema'

export class AuthModelORM extends Model {
    static get tableName() {
        return DB_TABLE_NAME.auth
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['password', 'isActivated', 'activationLink', 'userId'],

            properties: {
                id: { type: 'integer' },
                activationLink: { type: 'string', minLength: 1, maxLength: 255 },
                isActivated: { type: 'boolean' },
                userId: { type: 'integer' },
            },
        }
    }

    static get relationMappings() {
        return {
            todo: {
                relation: Model.HasOneRelation,
                modelClass: UserModelORM,
                join: {
                    from: `${DB_TABLE_NAME.auth}.userId`,
                    to: `${DB_TABLE_NAME.user}.id`,
                },
            },
        }
    }
}

export async function createAuthSchema(knex: Knex) {
    if (await knex.schema.hasTable(DB_TABLE_NAME.auth)) {
        return Promise.resolve(knex.schema)
    }

    return knex.schema.createTable(DB_TABLE_NAME.auth, (table) => {
        table.increments('id').primary()
        table.string('password').notNullable()
        table.string('activationLink').notNullable()
        table.boolean('isActivated').defaultTo(false)
        table
            .integer('userId')
            .unsigned()
            .references('id')
            .inTable(DB_TABLE_NAME.user)
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
}
