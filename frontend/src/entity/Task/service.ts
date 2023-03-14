import { ITask, ITaskServiceAbstact, ITaskCRUDModelAbstact } from './type'

export class TaskService implements ITaskServiceAbstact {
    model: ITaskCRUDModelAbstact

    constructor(model: ITaskCRUDModelAbstact) {
        this.model = model
    }

    public async add(newData: Pick<ITask, 'name'>) {
        if (!newData.name) {
            return
        }

        const newTask: ITask = {
            ...newData,
            isDone: false,
            id: String(Date.now())
        }

        const result = await this.model.add(newTask)

        return result
    }

    public async getAll() {
        const result = await this.model.getAll()

        return result
    }

    public async getById(id: ITask['id']) {
        const result = await this.model.getById(id)

        return result
    }

    public async update(id: ITask['id'], modifiedTask: Partial<ITask>) {
        const result = await this.model.update(id, modifiedTask)

        return result
    }

    public async delete(id: ITask['id']) {
        const result = await this.model.delete(id)

        return result
    }
}
