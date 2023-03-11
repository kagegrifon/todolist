import * as React from "react"
import { TaskItem, ITaskItem } from 'features/TaskItem'
import { ITask } from "entity/Task"

export interface ITaskList {
    tasks: ITask[]
    onChange: ITaskItem['onChange']
    onDelete: ITaskItem['onDelete']
    onEdit: ITaskItem['onEdit']
}

export const TaskList: React.FC<ITaskList> = ({ tasks, onChange, onDelete, onEdit }) => {
    return <ul>
        {tasks.map((task, i) => {
            const taskItemProps: ITaskItem = {
                task, onChange, onDelete, onEdit
            }
            return <li key={task.id}><TaskItem {...taskItemProps} /></li>
        })}

    </ul>
}
