import { TodoModelAbstract, ITodo } from './type'
import { ToDoModelORM } from './todo.schema'

const mapFromTodoSchema = (todoSchemaItem: ToDoModelORM): ITodo => {
    const todoItem = todoSchemaItem.toJSON() as ITodo

    return {
        id: todoItem.id,
        name: todoItem.name,
        isDone: todoItem.isDone,
    }
}

class TodoModel implements TodoModelAbstract {
    async create(newTodo: Omit<ITodo, 'id'>) {
        const { name, isDone } = newTodo
        const queryResult = await ToDoModelORM.query().insert({
            name,
            isDone,
        })

        return mapFromTodoSchema(queryResult)
    }

    async getById(id: string) {
        const queryResult = await ToDoModelORM.query().findById(id)

        return mapFromTodoSchema(queryResult)
    }

    async getAll() {
        const queryResult = await ToDoModelORM.query()

        return queryResult.map(mapFromTodoSchema)
    }

    async update(id: string, updatingTodo: Partial<ITodo>) {
        await ToDoModelORM.query().findById(id).patch(updatingTodo)
        const updatedTodo = await ToDoModelORM.query().findById(id)

        return mapFromTodoSchema(updatedTodo)
    }

    async delete(id: string) {
        const deletedTodo = await ToDoModelORM.query().findById(id)
        await ToDoModelORM.query().deleteById(id)

        return mapFromTodoSchema(deletedTodo)
    }
}

export const todoModel = new TodoModel()
