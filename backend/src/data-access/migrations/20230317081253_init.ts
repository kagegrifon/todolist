import { DB_TABLE_NAME } from '../tableNames'
import { Knex } from 'knex'
import { createTodoSchema } from 'entity/todo/todo.schema'
import { createUserSchema } from 'entity/user/user.schema'
import { createAuthSchema } from 'entity/auth/auth.schema'
import { createTokenSchema } from 'entity/token/token.schema'

export async function up(knex: Knex): Promise<void> {
    await createUserSchema(knex)
    await createAuthSchema(knex)
    await createTokenSchema(knex)
    return createTodoSchema(knex)
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(DB_TABLE_NAME.todo)
        .dropTableIfExists(DB_TABLE_NAME.token)
        .dropTableIfExists(DB_TABLE_NAME.auth)
        .dropTableIfExists(DB_TABLE_NAME.user)
}
