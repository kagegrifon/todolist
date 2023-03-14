import { ITask, ITaskCRUDModelAbstact } from '../type'

const MOCK_TASK: ITask = {
    id: '1',
    name: 'asfdsa',
    isDone: false,
}

export class TaskCRUDByAPI implements ITaskCRUDModelAbstact {
    // constructor() {}

    public add(newTask: ITask) {
        return Promise.resolve(newTask)
    }

    public getAll() {
        return Promise.resolve([])
    }

    public getById(id: ITask['id']) {
        console.log(id)
        return Promise.resolve(MOCK_TASK)
    }

    public update(id: ITask['id'], modifiedTask: Partial<ITask>) {
        console.log(id, modifiedTask)

        return Promise.resolve(MOCK_TASK)
    }

    public delete(id: ITask['id']) {
        console.log(id)

        return Promise.resolve(MOCK_TASK)
    }
}
