import * as React from "react"
import { TaskItem, ITaskItem } from 'features/TaskItem'
import { ITask } from "entity/Task"
import List from '@mui/material/List';

export interface ITaskList {
    tasks: ITask[]
    onChange: ITaskItem['onChange']
    onDelete: ITaskItem['onDelete']
    onEdit: ITaskItem['onEdit']
}

export const TaskList: React.FC<ITaskList> = ({ tasks, onChange, onDelete, onEdit }) => {
    return <List>
        {tasks.map((task, i) => {
            const taskItemProps: ITaskItem = {
                task, onChange, onDelete, onEdit
            }
            return <TaskItem key={task.id} {...taskItemProps} />
        })}

    </List>
}
