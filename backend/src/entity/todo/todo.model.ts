import { TodoModelAbstract, ITodo } from './type'
import { ToDoModelORM } from './todo.schema'

const mapFromORMSchemaToDTO = (schemaItem: ToDoModelORM): ITodo => {
    const todoItem = schemaItem.toJSON() as ITodo

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

        return mapFromORMSchemaToDTO(queryResult)
    }

    async getById(id: string) {
        const queryResult = await ToDoModelORM.query().findById(id)

        return mapFromORMSchemaToDTO(queryResult)
    }

    async getAll() {
        const queryResult = await ToDoModelORM.query()

        return queryResult.map(mapFromORMSchemaToDTO)
    }

    async update(id: string, updatingTodo: Partial<ITodo>) {
        await ToDoModelORM.query().findById(id).patch(updatingTodo)
        const updatedTodo = await ToDoModelORM.query().findById(id)

        return mapFromORMSchemaToDTO(updatedTodo)
    }

    async delete(id: string) {
        const deletedTodo = await ToDoModelORM.query().findById(id)
        await ToDoModelORM.query().deleteById(id)

        return mapFromORMSchemaToDTO(deletedTodo)
    }
}

export const todoModel = new TodoModel()
