import * as React from "react"
import type { ITask } from 'entity/Task'
import styled from 'styled-components'
import { IconButton } from "shared/Button"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export interface ITaskItem {
    task: ITask
    onChange: (taskId: ITask['id'], modifiedTask: Partial<ITask>) => void
    onDelete: (taskId: ITask['id']) => void
    onEdit: (taskId: ITask['id']) => void
}

const EditButton = styled(IconButton)`
    border: none;
    background: red;
`

export const TaskItem: React.FC<ITaskItem> = ({ task, onChange, onDelete, onEdit }) => {
    const onDoneChange = React.useCallback(() => {
        onChange(task.id, { isDone: !task.isDone })
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
        <EditButton onClick={onEditClick}><EditIcon /></EditButton>
        <IconButton onClick={onDeleteClick}><DeleteIcon /></IconButton>
    </div>
}
