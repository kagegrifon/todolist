import { Pool }  from 'pg'

export const db = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'todolist'
})
