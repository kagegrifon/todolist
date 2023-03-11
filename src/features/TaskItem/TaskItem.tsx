import * as React from "react"
import type { ITask } from 'entity/Task'

export interface ITaskItem {
    task: ITask
    onChange: (modifiedTask: Partial<ITask>) => void
    onDelete: (taskId: ITask['id']) => void
    onEdit: (taskId: ITask['id']) => void
}

export const TaskItem: React.FC<ITaskItem> = ({ task, onChange, onDelete, onEdit }) => {
    const onDoneChange = React.useCallback(() => {
        onChange({ isDone: !task.isDone })
    }, [task.isDone])

    const onEditClick = React.useCallback(() => {
        onEdit(task.id)
    }, [task.id])

    const onDeleteClick = React.useCallback(() => {
        onDelete(task.id)
    }, [task.id])

    return <div>
        <input type="checkbox" onChange={onDoneChange} checked={task.isDone} />
        <span>{task.name}</span>
        <button onClick={onEditClick}>icon pen</button>
        <button onClick={onDeleteClick}>icon basket</button>
    </div>
}
