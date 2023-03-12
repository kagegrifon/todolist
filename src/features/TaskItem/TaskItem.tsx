import * as React from "react"
import type { ITask } from 'entity/Task'
import { styled } from 'shared/globalDeps'
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { useIsOutsideClick } from "shared/hook/useIsOutsideClick";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { memo } from "react";

const TaskName = styled.span<{ isDone: boolean; isEditMode: boolean }>`
    ${({ isDone }) => isDone && 'text-decoration: line-through;'}
    ${({ isEditMode }) => isEditMode && 'display: none;'}
`

const StyledListItem = styled(ListItem)`
    padding: 0;
`

const TaskNameContainer = styled.div``

export interface ITaskItem {
    task: ITask
    onChange: (taskId: ITask['id'], modifiedTask: Partial<ITask>) => void
    onDelete: (taskId: ITask['id']) => void
    onEdit: (taskId: ITask['id']) => void
}

export const TaskItem: React.FC<ITaskItem> = memo(({ task, onChange, onDelete, onEdit }) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [tempName, setTempName] = useState(task.name)
    const taskNameRef = useRef<HTMLInputElement>(null);
    const { isOutside, startListen, stopListen } = useIsOutsideClick(taskNameRef)

    const onDoneChange = React.useCallback(() => {
        onChange(task.id, { isDone: !task.isDone })
    }, [task.isDone])

    const onEditClick = React.useCallback(() => {
        onEdit(task.id)
    }, [task.id])

    const onDeleteClick = React.useCallback(() => {
        onDelete(task.id)
    }, [task.id])

    useEffect(() => {
        if (isEditMode && taskNameRef.current) {
            startListen()
        }

        return () => stopListen()
    }, [isEditMode])

    useEffect(() => {
        if (isEditMode && isOutside) {
            stopListen()
            
            if (tempName !== task.name) {
                onChange(task.id, { name: tempName })
            }
            setIsEditMode(false)
        }
    }, [isOutside, isEditMode])

    return <StyledListItem>
        <Checkbox onChange={onDoneChange} checked={task.isDone} />
        <TaskNameContainer ref={taskNameRef}>
            {
                isEditMode && <TextField id="standard-basic" variant="standard" value={tempName} onChange={e => setTempName(e.target.value)} />}
            <TaskName onClick={() => setIsEditMode(true)} isDone={task.isDone} isEditMode={isEditMode}>{task.name}</TaskName>

        </TaskNameContainer>
        <IconButton onClick={onDeleteClick}><DeleteIcon /></IconButton>
    </StyledListItem>
})
