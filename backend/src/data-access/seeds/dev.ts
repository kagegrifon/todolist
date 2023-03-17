import { DB_TABLE_NAME } from '../tableNames'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw(`TRUNCATE TABLE "${DB_TABLE_NAME.todo}" CASCADE`)

    // Inserts seed entries
    return knex(DB_TABLE_NAME.todo).insert([
        { id: 1, name: 'eat', isDone: true },
        { id: 2, name: 'drink', isDone: false },
        { id: 3, name: 'work', isDone: false },
        { id: 4, name: 'sleep', isDone: false },
    ])
}
