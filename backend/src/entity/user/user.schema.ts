import { Model } from 'objection'
import { DB_TABLE_NAME } from 'data-access/tableNames'
import { ToDoModelORM } from 'entity/todo/todo.schema'
import type { Knex } from 'knex'
import { TokenModelORM } from 'entity/token/token.schema'
import { AuthModelORM } from 'entity/auth/auth.schema'

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
            auth: {
                relation: Model.HasOneRelation,
                modelClass: AuthModelORM,
                join: {
                    from: `${DB_TABLE_NAME.user}.id`,
                    to: `${DB_TABLE_NAME.auth}.userId`,
                },
            },
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // TODO: add after fixing mailing
            // required: ['name', 'email'],
            required: ['login'],

            properties: {
                id: { type: 'integer' },
                login: { type: 'string', minLength: 1, maxLength: 255 },
                // TODO: add after fixing mailing
                // email: { type: 'string', minLength: 1, maxLength: 255 },
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
        table.string('login').notNullable()
        // TODO: add after fixing mailing
        // table.string('email').notNullable()
    })
}
