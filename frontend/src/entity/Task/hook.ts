import * as React from "react"
import { TaskCRUDByLocalStorage } from "./TaskCRUD"
import { ITaskCRUDAbstact } from './type'

// todo make context
const taskCRUD = new TaskCRUDByLocalStorage()

export const useTaskCRUD = (): ITaskCRUDAbstact => {
    return React.useMemo(() => taskCRUD, [])
} 