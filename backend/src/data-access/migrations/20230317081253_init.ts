import { DB_TABLE_NAME } from '../tableNames'
import { Knex } from 'knex'
import { createTodoSchema } from 'entity/todo/todo.schema'
import { createUserSchema } from 'entity/auth/user.schema'

export async function up(knex: Knex): Promise<void> {
    await createUserSchema(knex)
    return createTodoSchema(knex)
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DB_TABLE_NAME.todo).dropTableIfExists(DB_TABLE_NAME.user)
}
