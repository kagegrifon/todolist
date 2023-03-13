import { TodoModelAbstract, ITodo, TodoDBSchema } from './type'
import { db } from 'data-access/connect'
import { DB_TABLE_NAME } from 'data-access/tableNames'

const mapFromTodoSchema = (todoSchemaItem: TodoDBSchema): ITodo => {
    return ({
        id: todoSchemaItem.id,
        name: todoSchemaItem.name,
        isDone: todoSchemaItem.isdone
    })
}

const DEFAULT_TODO: Partial<ITodo> = {
    isDone: false
}

class TodoModel implements TodoModelAbstract {
    async create(newTodo: Omit<ITodo, 'id'>) {
        const { name, isDone } = { ...DEFAULT_TODO, ...newTodo }

        const queryResult = await db.query<TodoDBSchema>(
            `INSERT INTO ${DB_TABLE_NAME.todo} (name, isDone) values ($1, $2) RETURNING *`,
            [name, isDone],
        )

        return queryResult.rows.map(mapFromTodoSchema)[0]
    }

    async getById(id: string) {
        const queryResult = await db.query<TodoDBSchema>(
            `SELECT * from ${DB_TABLE_NAME.todo} where id = $1`,
            [id],
        )

        return queryResult.rows.map(mapFromTodoSchema)[0]
    }

    async getAll() {
        const queryResult = await db.query<TodoDBSchema>(`SELECT * from ${DB_TABLE_NAME.todo}`)

        return queryResult.rows.map(mapFromTodoSchema)
    }

    async update(id: string, updatingTodo: Partial<ITodo>) {
        const oldTodo = await this.getById(id)

        const { name, isDone } = {
            ...oldTodo,
            ...updatingTodo,
        }

        const queryResult = await db.query<TodoDBSchema>(
            `UPDATE ${DB_TABLE_NAME.todo} set name = $1, isDone = $2 where id = $3 RETURNING *`,
            [name, isDone, id],
        )

        return queryResult.rows.map(mapFromTodoSchema)[0]
    }

    async delete(id: string) {
        const queryResult = await db.query<TodoDBSchema>(`DELETE from ${DB_TABLE_NAME.todo} where id = $1`, [id])

        return queryResult.rows.map(mapFromTodoSchema)[0]
    }
}

export const todoModel = new TodoModel()
