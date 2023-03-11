export type ITask = {
    id: number;
    name: string;
    isDone: boolean
}

export interface ITaskCRUDAbstact {
    add: (newData: Pick<ITask, 'name'>) => ITask
    getAll: () => Array<ITask>
    getById: (id: ITask['id']) => ITask | undefined
    update: (id: ITask['id'], modifiedTask: Partial<ITask>) => void
    delete: (id: ITask['id']) => void
}