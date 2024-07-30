import { Model } from 'objection'
import { DB_TABLE_NAME } from 'data-access/tableNames'
import type { Knex } from 'knex'
import { UserModelORM } from 'entity/user/user.schema'

export class ToDoModelORM extends Model {
    static get tableName() {
        return DB_TABLE_NAME.todo
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['name', 'userId'],
            required: ['name'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                isDone: { type: 'boolean' },
                // userId: { type: 'integer' },
            },
        }
    }

    // static get relationMappings() {
    //     return {
    //         todo: {
    //             relation: Model.HasOneRelation,
    //             modelClass: UserModelORM,
    //             join: {
    //                 from: `${DB_TABLE_NAME.todo}.userId`,
    //                 to: `${DB_TABLE_NAME.user}.id`,
    //             },
    //         },
    //     }
    // }
}

export async function createTodoSchema(knex: Knex) {
    if (await knex.schema.hasTable(DB_TABLE_NAME.todo)) {
        return Promise.resolve(knex.schema)
    }

    return knex.schema.createTable(DB_TABLE_NAME.todo, (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.boolean('isDone').defaultTo(false)
        // table
        //     .integer('userId')
        //     .unsigned()
        //     .references('id')
        //     .inTable(DB_TABLE_NAME.user)
        //     .onUpdate('CASCADE')
        //     .onDelete('CASCADE')
    })
}
