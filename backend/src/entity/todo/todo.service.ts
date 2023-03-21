import { TypicalCRUDService } from 'shared/service'
import { todoModel } from './todo.model'
import { ITodo, TodoModelAbstract } from './type'

class TodoService extends TypicalCRUDService<ITodo> {
    model: TodoModelAbstract

    constructor(model: TodoModelAbstract) {
        super(model)
    }

    async create(newTodo: Omit<ITodo, 'id'>) {
        const { name } = newTodo
        const isDone = newTodo.isDone || false

        const result = await this.model.create({ name, isDone })

        return result
    }
}

export const todoService = new TodoService(todoModel)
