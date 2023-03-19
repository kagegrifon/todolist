import { TaskList } from 'features/TaskList'
import * as React from 'react'
import { useTodoList } from './useTodoList'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { AddTaskModal } from 'features/AddTaskModal'
import { styled } from 'shared/globalDeps'
import { Typography } from '@mui/material'

const AddButton = styled(Button)`
    text-transform: none;
    margin: 0 10px 20px 10px;
    align-self: stretch;
`
const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export let TodoList: React.FC = () => {
    const { taskListProps, onAddNewTask, addNewTaskModal } = useTodoList()

    return (
        <Container>
            <InnerWrapper>
                <Typography variant='h1' sx={{ lineHeight: 'inherit' }}>
                    TodoList
                </Typography>
                <AddButton
                    variant='contained'
                    size='medium'
                    color='success'
                    onClick={addNewTaskModal.open}
                >
                    <AddIcon /> Add new
                </AddButton>
                <TaskList {...taskListProps} />
                <AddTaskModal
                    open={addNewTaskModal.isOpen}
                    onClose={addNewTaskModal.close}
                    onOk={onAddNewTask}
                />
            </InnerWrapper>
        </Container>
    )
}

TodoList = React.memo(TodoList)
