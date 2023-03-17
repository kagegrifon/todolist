import { DB_TABLE_NAME } from "../tableNames";
import { Knex } from "knex";
import { createTodoSchema } from "todo/todo.schema";


export async function up(knex: Knex): Promise<void> {
    return createTodoSchema(knex)
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DB_TABLE_NAME.todo)
}

