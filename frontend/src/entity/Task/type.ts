export type ITask = {
    id: string;
    name: string;
    isDone: boolean
}

export interface ITaskCRUDModelAbstact {
    add: (newTask: ITask) => Promise<ITask>
    getAll: () => Promise<Array<ITask>>
    getById: (id: ITask['id']) => Promise<ITask | undefined>
    update: (id: ITask['id'], modifiedTask: Partial<ITask>) => Promise<ITask>
    delete: (id: ITask['id']) => Promise<ITask>
}

export interface ITaskServiceAbstact {
    add: (newData: Pick<ITask, 'name'>) => Promise<ITask>
    getAll: () => Promise<Array<ITask>>
    getById: (id: ITask['id']) => Promise<ITask | undefined>
    update: (id: ITask['id'], modifiedTask: Partial<ITask>) => Promise<ITask>
    delete: (id: ITask['id']) => Promise<ITask>
}