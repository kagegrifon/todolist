import { ITask, ITaskCRUDAbstact } from "./type"

const TASK_LISK_LOCAL_STORAGE_KEY = 'TASK_LISK_LOCAL_STORAGE_KEY'

export class TaskCRUDByLocalStorage implements ITaskCRUDAbstact {
    private _list: ITask[]

    constructor() {
        const listFromStorage = JSON.parse(window.localStorage.getItem(TASK_LISK_LOCAL_STORAGE_KEY))

        if (Array.isArray(listFromStorage)) {
            this._list = listFromStorage
        } else {
            this._list = []
        }
    }

    public add(newData: Pick<ITask, 'name'>) {
        if (!newData.name) {
            return
        }

        const newTask: ITask = {
            ...newData,
            isDone: false,
            id: Date.now(),
        }

        this._list.push(newTask)

        this.saveToLocalStorage()

        return newTask
    }

    public getAll() {
        return this._list
    }

    public getById(id: ITask['id']): ITask | undefined {
        return this._list.find(t => t.id === id)
    }

    public update(id: ITask['id'], modifiedTask: Partial<ITask>) {
        const modifiedTaskIndex = this._list.findIndex(t => t.id === id)

        if (modifiedTaskIndex === -1) {
            throw Error(`no such task in task lisk with id, ${id}`)
        }

        const newTask: ITask = {
            ...this._list[modifiedTaskIndex],
            ...modifiedTask,
            id,
        }

        if (modifiedTask.name === '') {
            newTask.name = this._list[modifiedTaskIndex].name
        }

        this._list.splice(modifiedTaskIndex, 1, newTask)

        this.saveToLocalStorage()
    }

    public delete(id: ITask['id']) {
        const deleteTaskIndex = this._list.findIndex(t => t.id === id)

        if (deleteTaskIndex === -1) {
            throw Error(`no such task in task lisk with id, ${id}`)
        }

        this._list.splice(deleteTaskIndex, 1)

        this.saveToLocalStorage()
    }

    private saveToLocalStorage() {
        window.localStorage.setItem(TASK_LISK_LOCAL_STORAGE_KEY, JSON.stringify(this._list))
    }
} 