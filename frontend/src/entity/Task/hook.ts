import * as React from 'react'
import { TaskCRUDByLocalStorage } from './model/TaskCRUDByLocalstorage'
import { TaskService } from './service'
import { ITaskServiceAbstact } from './type'

// todo make context
const taskCRUD = new TaskService(new TaskCRUDByLocalStorage())

export const useTaskCRUD = (): ITaskServiceAbstact => {
    return React.useMemo(() => taskCRUD, [])
} 