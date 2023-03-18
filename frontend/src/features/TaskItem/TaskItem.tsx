import * as React from 'react'
import type { ITask } from 'entity/Task'
import { styled } from 'shared/globalDeps'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { useIsOutsideClick } from 'shared/hook/useIsOutsideClick'
import { useRef, useEffect, useState, memo } from 'react'
import { Typography } from '@mui/material'

const StyledTextField = styled(TextField)`
    width: 100%;
`

const TaskName = styled.span<{ isDone: boolean; isEditMode: boolean }>`
    ${({ isDone }) => isDone && 'text-decoration: line-through;'}
    ${({ isEditMode }) => isEditMode && 'display: none;'}
`

const StyledListItem = styled(ListItem)`
    padding: 0;
    display: flex;
    flex-direction: column;
`

const Container = styled.span`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
`

const TaskNameContainer = styled.div`
    flex-grow: 1;
`

export interface ITaskItem {
    className?: string
    task: ITask
    onChange: (taskId: ITask['id'], modifiedTask: Partial<ITask>) => void
    onDelete: (taskId: ITask['id']) => void
}

export const TaskItem: React.FC<ITaskItem> = ({ task, onChange, onDelete, className }) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [tempName, setTempName] = useState(task.name)
    const taskNameRef = useRef<HTMLInputElement>(null)
    const { isOutside, startListen, stopListen } = useIsOutsideClick(taskNameRef)

    const onDoneChange = React.useCallback(() => {
        onChange(task.id, { isDone: !task.isDone })
    }, [onChange, task.id, task.isDone])

    const onDeleteClick = React.useCallback(() => {
        onDelete(task.id)
    }, [task.id, onDelete])

    useEffect(() => {
        if (isEditMode && taskNameRef.current) {
            startListen()
        }

        return () => stopListen()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditMode])

    useEffect(() => {
        if (isEditMode && isOutside) {
            stopListen()

            if (tempName !== task.name) {
                onChange(task.id, { name: tempName })
            }
            setIsEditMode(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOutside, isEditMode])

    return (
        <StyledListItem className={className}>
            <Container>
            <Checkbox
                onChange={onDoneChange}
                checked={task.isDone}
                color='success'
                sx={{ flexShrink: 0 }}
            />
            <TaskNameContainer ref={taskNameRef}>
                {isEditMode && (
                    <StyledTextField
                        id='standard-basic'
                        variant='standard'
                        multiline
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                    />
                )}
                <TaskName
                    onClick={() => setIsEditMode(true)}
                    isDone={task.isDone}
                    isEditMode={isEditMode}
                >
                    <Typography>{task.name}</Typography>
                </TaskName>
            </TaskNameContainer>
            <IconButton onClick={onDeleteClick}>
                <DeleteIcon />
            </IconButton>
            </Container>
        </StyledListItem>
    )
}

export default { TaskItem: memo(TaskItem) }
