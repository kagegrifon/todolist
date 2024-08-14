import { protectedAPI } from 'entity/UserAuth/protectedApi'
import { ITask, ITaskCRUDModelAbstact } from '../type'

export const taskUrl = '/todo'

export class TaskCRUDByAPI implements ITaskCRUDModelAbstact {
    public async add(newTask: ITask) {
        try {
            const request = await protectedAPI.request<ITask>({
                url: taskUrl,
                method: 'post',
                data: newTask,
            })

            return request.data
        } catch (e) {
            // alert('Something happen while adding new task, check internet connection')
            console.log(e)
        }
    }

    public async getAll() {
        try {
            const request = await protectedAPI.request<ITask[]>({
                url: taskUrl,
                method: 'get',
            })

            return request.data
        } catch (e) {
            // alert('Something happen while geting tasks, check internet connection')
            console.log(e)
            return []
        }
    }

    public async getById(id: ITask['id']) {
        try {
            const request = await protectedAPI.request<ITask>({
                url: `${taskUrl}/${id}`,
                method: 'get',
            })

            return request.data
        } catch (e) {
            // alert('Something happen while geting task, check internet connection')
            console.log(e)
        }
    }

    public async update(id: ITask['id'], modifiedTask: Partial<ITask>) {
        try {
            const request = await protectedAPI.request<ITask>({
                url: `${taskUrl}/${id}`,
                method: 'put',
                data: modifiedTask,
            })

            return request.data
        } catch (e) {
            // alert('Something happen while updating task, check internet connection')
            console.log(e)
        }
    }

    public async delete(id: ITask['id']) {
        try {
            const request = await protectedAPI.request<ITask>({
                url: `${taskUrl}/${id}`,
                method: 'delete',
            })

            return request.data
        } catch (e) {
            // alert('Something happen while updating task, check internet connection')
            console.log(e)
        }
    }
}
