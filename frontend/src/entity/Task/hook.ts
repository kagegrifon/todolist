import * as React from 'react'
// import { TaskCRUDByAPI } from './model/TaskCRUDByAPI'
import { TaskCRUDByLocalStorage } from './model/TaskCRUDByLocalstorage'
import { TaskService } from './service'
import { ITaskServiceAbstact } from './type'

// todo make context
const taskCRUD = new TaskService(new TaskCRUDByLocalStorage())
// const taskCRUD = new TaskService(new TaskCRUDByAPI())

export const useTaskCRUD = (): ITaskServiceAbstact => {
    return React.useMemo(() => taskCRUD, [])
} 