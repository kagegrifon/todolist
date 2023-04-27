import { Model } from 'objection'
import { DB_TABLE_NAME } from 'data-access/tableNames'
import { ToDoModelORM } from 'entity/todo/todo.schema'
import type { Knex } from 'knex'
import { TokenModelORM } from 'entity/token/token.schema'

export class UserModelORM extends Model {
    static get tableName() {
        return DB_TABLE_NAME.user
    }

    static get relationMappings() {
        return {
            todo: {
                relation: Model.HasManyRelation,
                modelClass: ToDoModelORM,
                join: {
                    from: `${DB_TABLE_NAME.user}.id`,
                    to: `${DB_TABLE_NAME.todo}.userId`,
                },
            },
            token: {
                relation: Model.HasOneRelation,
                modelClass: TokenModelORM,
                join: {
                    from: `${DB_TABLE_NAME.user}.id`,
                    to: `${DB_TABLE_NAME.token}.userId`,
                },
            },
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
            },
        }
    }
}

export async function createUserSchema(knex: Knex) {
    if (await knex.schema.hasTable(DB_TABLE_NAME.user)) {
        return Promise.resolve(knex.schema)
    }

    return knex.schema.createTable(DB_TABLE_NAME.user, (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable()
    })
}