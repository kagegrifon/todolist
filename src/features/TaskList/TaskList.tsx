import * as React from "react"
import { TaskItem, ITaskItem } from 'features/TaskItem'
import { ITask } from "entity/Task"

export interface ITaskList {
    tasks: ITask[]
}

export const TaskList: React.FC<ITaskList> = ({ tasks }) => {
    const onChange: ITaskItem['onChange'] = React.useCallback((modifiedTask) => {
        console.log({ modifiedTask })
    }, [])

    const onDelete: ITaskItem['onDelete'] = React.useCallback((taskId) => {
        console.log(`onDelete task`, tasks.find(t => t.id === taskId))
    }, [])

    const onEdit: ITaskItem['onEdit'] = React.useCallback((taskId) => {
        console.log(`onEdit task`, tasks.find(t => t.id === taskId))
    }, [])

    return <ul>
        {tasks.map((task, i) => {
            const taskItemProps: ITaskItem = {
                task, onChange, onDelete, onEdit
            }
            return <li key={task.id}><TaskItem {...taskItemProps} /></li>
        })}

    </ul>
}
