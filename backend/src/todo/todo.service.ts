import { TodoServiceAbstract, ITodo } from './type'

const mockObject = { id: '1', name: 'asfasf', isDone: false }

class TodoService implements TodoServiceAbstract{
    async create(newTodo: Omit<ITodo, 'id'>) {
        console.log('create')

        console.log({newTodo})
        return mockObject
    }

    async getById(id: string) {
        console.log('getById')

        console.log({id})
        return mockObject
    }

    async getAll() {
        console.log('getAll')
        return [mockObject]
    }

    async update(id: string, updatingTodo: Partial<ITodo>) {
        console.log('update')

        console.log({id, updatingTodo})
        return mockObject
    }

    async delete(id: string) {
        console.log('delete')

        console.log({id})
        return mockObject
    }
}

export const todoService =  new TodoService()