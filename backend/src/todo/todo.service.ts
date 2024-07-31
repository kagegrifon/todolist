import { todoModel } from './todo.model'
import { TodoServiceAbstract, ITodo, TodoModelAbstract } from './type'

class TodoService implements TodoServiceAbstract {
    model: TodoModelAbstract

    constructor(model: TodoModelAbstract) {
        this.model = model

        this.create = this.create.bind(this)
        this.getById = this.getById.bind(this)
        this.getAll = this.getAll.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    async create(newTodo: Omit<ITodo, 'id'>) {
        const { name } = newTodo
        const isDone = newTodo.isDone || false

        const result = await this.model.create({ name, isDone})

        return result
    }

    async getById(id: string) {
        const result = await this.model.getById(id)

        return result
    }

    async getAll() {
        const result = await this.model.getAll()

        return result
    }

    async update(id: string, updatingTodo: Partial<ITodo>) {
        const result = await this.model.update(id, updatingTodo)

        return result
    }

    async delete(id: string) {
        const result = await this.model.delete(id)

        return result
    }
}

export const todoService = new TodoService(todoModel)
