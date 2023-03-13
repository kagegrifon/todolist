export interface ITodo {
    id: string
    name: string
    isDone: boolean
}

export interface TodoServiceAbstract {
    create(newTodo: Omit<ITodo, 'id'>): Promise<ITodo>
    getById(id: ITodo['id']): Promise<ITodo | undefined>
    getAll(): Promise<ITodo[]>
    update(id: ITodo['id'], updatingTodo: Partial<ITodo>): Promise<ITodo>
    delete(id: ITodo['id']): Promise<ITodo>
}
