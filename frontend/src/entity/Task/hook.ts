import * as React from 'react'
import { TaskCRUDByAPI } from './model/TaskCRUDByAPI'
import { TaskCRUDByLocalStorage } from './model/TaskCRUDByLocalstorage'
import { featureFlag, TaskSource } from '../../config'
import { TaskService } from './service'
import { ITaskCRUDModelAbstact, ITaskServiceAbstact } from './type'

const taskSourceServiceByFlag: Record<TaskSource, () => ITaskCRUDModelAbstact> = {
    api: () => new TaskCRUDByAPI(),
    localStorage: () => new TaskCRUDByLocalStorage(),
}
// todo make context
const taskCRUDModel = taskSourceServiceByFlag[featureFlag.taskSource]()
const taskCRUD = new TaskService(taskCRUDModel)

export const useTaskCRUD = (): ITaskServiceAbstact => {
    return React.useMemo(() => taskCRUD, [])
}
